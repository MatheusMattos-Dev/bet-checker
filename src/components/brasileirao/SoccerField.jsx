import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { fetchLineups } from '../../api/backend';
import { getPairColors } from '../../lib/teamColors';

function PlayerAvatar({ p, teamColor, isGK, brPlayers, isReal }) {
  const [imgError, setImgError] = useState(false);

  if (!p) return <div className="w-14 h-16" />;

  const name = p.name || '';
  const names = name.split(' ');
  const displayName = names.length > 1 && names[names.length - 1].length > 3
    ? names[names.length - 1]
    : names[0];
  const initial = displayName ? displayName[0].toUpperCase() : '?';

  const shirtNumber = p.number || p.shirtNumber || ((p.id || 0) % 99) + 1;

  const stripDiacritics = (str) => str.normalize("NFD").replace(new RegExp("[̀-ͯ]", "g"), "").toLowerCase();
  let photoUrl = !imgError ? (p.photo || p.photo_url) : null;
  if (!photoUrl && isReal && !imgError) {
    const normalizedName = stripDiacritics(name);
    const matched = brPlayers.find(brP => {
      const brName = stripDiacritics(brP.name || '');
      return brName === normalizedName || brName.includes(normalizedName) || normalizedName.includes(brName.split(' ')[0]);
    });
    if (matched) photoUrl = matched.photo || matched.photo_url;
  }

  return (
    <div className="flex flex-col items-center justify-center w-14 z-10 hover:-translate-y-2 transition-transform cursor-pointer group">
      <div className="relative">
        <div
          className={`relative w-10 h-10 shrink-0 rounded-full grid place-items-center text-sm font-bold leading-none shadow-[0_4px_12px_rgba(0,0,0,0.6)] text-white group-hover:scale-110 transition-transform bg-neutral-700 overflow-hidden border-2 ${isGK ? 'border-gold-500' : 'border-white/90'}`}
          style={{ backgroundColor: !photoUrl ? teamColor : undefined }}
        >
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={name}
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
          ) : (
            <span>{initial}</span>
          )}
        </div>
        {/* Shirt number — always shown, same spot, regardless of photo availability */}
        <div
          className="absolute -bottom-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full grid place-items-center text-[10px] font-extrabold leading-none border-2 border-white shadow-md text-white tabular-nums"
          style={{ backgroundColor: teamColor }}
        >
          {shirtNumber}
        </div>
      </div>
      <div className="text-[10px] font-bold text-white bg-black/80 px-2 py-0.5 rounded-full mt-2 truncate max-w-[80px] text-center backdrop-blur-md group-hover:bg-green-500 transition-colors border border-white/10">
        {displayName}
      </div>
    </div>
  );
}

export default function SoccerField({ match }) {
  const { brPlayers } = useApp();
  
  const [realLineups, setRealLineups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isReal, setIsReal] = useState(false);

  // Tentar buscar escalação real da API
  useEffect(() => {
    let cancelled = false;
    
    async function loadRealLineups() {
      setLoading(true);
      try {
        // Extrair data ISO da match (pode estar em formato "DD/MM às HH:MM" ou ISO)
        let dateISO = '';
        if (match.dateISO) {
          dateISO = match.dateISO.split('T')[0];
        } else if (match.date && match.date.includes('-')) {
          dateISO = match.date.split('T')[0];
        } else {
          // Formato "DD/MM às HH:MM" — não temos ano, usar ano atual
          const now = new Date();
          const year = now.getFullYear();
          const parts = (match.date || '').split(' ')[0]?.split('/');
          if (parts && parts.length === 2) {
            dateISO = `${year}-${parts[1].padStart(2,'0')}-${parts[0].padStart(2,'0')}`;
          }
        }
        
        if (dateISO && match.home && match.away) {
          const data = await fetchLineups(dateISO, match.home, match.away);
          if (!cancelled && data && data.available !== false) {
            setRealLineups(data);
            setIsReal(true);
          }
        }
      } catch (err) {
        console.error('Falha ao buscar escalações reais:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    
    loadRealLineups();
    return () => { cancelled = true; };
  }, [match.home, match.away, match.date, match.dateISO]);

  // Fallback: escalações simuladas a partir dos brPlayers
  const simulatedLineups = useMemo(() => {
    const getFormation = (teamName) => {
      const teamPlayers = brPlayers.filter(p => p.team === teamName);
      
      const gk = teamPlayers.filter(p => p.position === 'Goalkeeper' || p.position === 'Goleiro').slice(0, 1);
      const def = teamPlayers.filter(p => ['Defender', 'Defensor', 'Zagueiro', 'Lateral'].includes(p.position)).slice(0, 4);
      const mid = teamPlayers.filter(p => ['Midfielder', 'Meio-campo', 'Meia'].includes(p.position)).slice(0, 3);
      const att = teamPlayers.filter(p => ['Attacker', 'Atacante'].includes(p.position)).slice(0, 3);
      
      const selectedIds = new Set([...gk, ...def, ...mid, ...att].map(p => p.id));
      let extras = teamPlayers.filter(p => !selectedIds.has(p.id));
      
      while (gk.length < 1 && extras.length) gk.push(extras.shift());
      while (def.length < 4 && extras.length) def.push(extras.shift());
      while (mid.length < 3 && extras.length) mid.push(extras.shift());
      while (att.length < 3 && extras.length) att.push(extras.shift());

      return { starters: [gk, def, mid, att] };
    };

    return {
      home: getFormation(match.home),
      away: getFormation(match.away)
    };
  }, [brPlayers, match.home, match.away]);

  // Decidir qual escalação usar
  const { homeLineup, awayLineup, homeFormation, awayFormation } = useMemo(() => {
    if (isReal && realLineups) {
      const homeRows = realLineups.home?.players || [];
      const awayRows = realLineups.away?.players || [];

      // Se a API retornou jogadores reais, usar
      const hasHomePlayers = homeRows.some(row => row.length > 0);
      const hasAwayPlayers = awayRows.some(row => row.length > 0);

      if (hasHomePlayers || hasAwayPlayers) {
        return {
          homeLineup: hasHomePlayers ? homeRows : simulatedLineups.home.starters,
          awayLineup: hasAwayPlayers ? awayRows : simulatedLineups.away.starters,
          homeFormation: realLineups.home?.formation || '',
          awayFormation: realLineups.away?.formation || '',
        };
      }
    }

    return {
      homeLineup: simulatedLineups.home.starters,
      awayLineup: simulatedLineups.away.starters,
      homeFormation: '4-3-3',
      awayFormation: '4-3-3',
    };
  }, [isReal, realLineups, simulatedLineups]);

  const { colorA: homeColor, colorB: awayColor } = getPairColors(match.home, match.away);

  const renderPlayer = (p, teamColor, isGK) => (
    <PlayerAvatar key={p?.id || p?.name || Math.random()} p={p} teamColor={teamColor} isGK={isGK} brPlayers={brPlayers} isReal={isReal} />
  );

  // flex-1 (not a fixed height) so any number of tactical rows share the
  // pitch height evenly instead of overlapping when a formation has more
  // than the 4 rows the simulated fallback always produces.
  const renderRow = (players, teamColor, key, isGK) => (
    <div key={key} className="flex-1 flex w-full justify-around items-center min-h-0">
      {players.map((p, i) => <div key={i}>{renderPlayer(p, teamColor, isGK)}</div>)}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center p-2 sm:p-4 animate-fadeIn">
      
      {/* Title + Status */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${isReal ? 'bg-green-500' : 'bg-gold-500'} animate-pulse`}></span>
        <h3 className="text-sm font-bold font-display text-ink-900 tracking-wide uppercase">
          {loading ? 'Carregando Escalações...' : isReal ? 'Escalações Oficiais' : 'Escalações Prováveis'}
        </h3>
        {isReal && (
          <span className="tag bg-green-500 text-white">
            Ao vivo
          </span>
        )}
      </div>

      {/* Formação */}
      {(homeFormation || awayFormation) && (
        <div className="flex items-center justify-between w-full max-w-xs mb-3 text-[10px]">
          <span className="text-ink-600 font-mono font-bold bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">{homeFormation || '?'}</span>
          <span className="text-ink-400">×</span>
          <span className="text-ink-600 font-mono font-bold bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">{awayFormation || '?'}</span>
        </div>
      )}

      {/* Container do Campo Verde */}
      <div 
        className="relative w-full max-w-lg flex-1 min-h-[520px] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl flex flex-col p-2 mx-auto"
        style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, #2a7a30, #2a7a30 10%, #256b2a 10%, #256b2a 20%)',
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6), 0 20px 40px rgba(0,0,0,0.4)'
        }}
      >
        
        {/* Linhas do Campo (Pintura Branca) */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          {/* Bordas internas */}
          <div className="absolute inset-1 border border-white"></div>
          {/* Linha Central */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white -translate-y-1/2"></div>
          {/* Círculo Central */}
          <div className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full border border-white -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-white -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Grande Área Top */}
          <div className="absolute top-1 left-1/2 w-36 h-16 border border-t-0 border-white -translate-x-1/2"></div>
          {/* Pequena Área Top */}
          <div className="absolute top-1 left-1/2 w-16 h-6 border border-t-0 border-white -translate-x-1/2"></div>
          {/* Meia lua Top */}
          <div className="absolute top-17 left-1/2 w-12 h-6 border border-t-0 border-white rounded-b-full -translate-x-1/2" style={{ top: '4.25rem' }}></div>
          
          {/* Grande Área Bottom */}
          <div className="absolute bottom-1 left-1/2 w-36 h-16 border border-b-0 border-white -translate-x-1/2"></div>
          {/* Pequena Área Bottom */}
          <div className="absolute bottom-1 left-1/2 w-16 h-6 border border-b-0 border-white -translate-x-1/2"></div>
          {/* Meia lua Bottom */}
          <div className="absolute bottom-17 left-1/2 w-12 h-6 border border-b-0 border-white rounded-t-full -translate-x-1/2" style={{ bottom: '4.25rem' }}></div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/30 backdrop-blur-sm rounded-2xl">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-white/80 font-medium">Buscando escalações...</span>
            </div>
          </div>
        )}

        {/* Away Team (Top - GK first row, outfield rows toward center).
            Rendered from whatever rows the lineup actually has, so a
            formation with more or fewer than 4 tactical lines never
            overlaps — each row gets an equal flex-1 share of the height. */}
        <div className="flex-1 flex flex-col justify-between gap-3 mb-2 min-h-0">
          {awayLineup.map((row, idx) => (
            row && row.length > 0 ? renderRow(row, awayColor, `away-${idx}`, idx === 0) : null
          ))}
        </div>

        {/* Home Team (Bottom - outfield rows toward center, GK last row) */}
        <div className="flex-1 flex flex-col justify-between gap-3 mt-2 min-h-0">
          {homeLineup
            .map((row, idx) => ({ row, idx }))
            .reverse()
            .map(({ row, idx }) => (
              row && row.length > 0 ? renderRow(row, homeColor, `home-${idx}`, idx === 0) : null
            ))}
        </div>

      </div>
    </div>
  );
}
