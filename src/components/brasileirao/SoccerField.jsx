import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { fetchLineups } from '../../api/backend';

export default function SoccerField({ match }) {
  const { brPlayers, getTeam } = useApp();
  
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

      return [gk, def, mid, att];
    };

    return {
      homeLineup: getFormation(match.home),
      awayLineup: getFormation(match.away)
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
          homeLineup: hasHomePlayers ? homeRows : simulatedLineups.homeLineup,
          awayLineup: hasAwayPlayers ? awayRows : simulatedLineups.awayLineup,
          homeFormation: realLineups.home?.formation || '',
          awayFormation: realLineups.away?.formation || ''
        };
      }
    }
    
    return {
      homeLineup: simulatedLineups.homeLineup,
      awayLineup: simulatedLineups.awayLineup,
      homeFormation: '4-3-3',
      awayFormation: '4-3-3'
    };
  }, [isReal, realLineups, simulatedLineups]);

  const renderPlayer = (p, teamColor) => {
    if (!p) return <div className="w-16 h-20" />;
    
    const name = p.name || '';
    const names = name.split(' ');
    const displayName = names.length > 1 && names[names.length - 1].length > 3 
      ? names[names.length - 1] 
      : names[0];
      
    const shirtNumber = p.number || p.shirtNumber || ((p.id || 0) % 99) + 1;
    
    // Find photo from brPlayers context
    let photoUrl = p.photo || p.photo_url;
    if (!photoUrl && isReal) {
      // Try to match player by name to get Cartola's photo
      const normalizedName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const matched = brPlayers.find(brP => {
        const brName = (brP.name || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        return brName === normalizedName || brName.includes(normalizedName) || normalizedName.includes(brName.split(' ')[0]);
      });
      if (matched) {
        photoUrl = matched.photo || matched.photo_url;
      }
    }

    return (
      <div key={p.id || p.name} className="flex flex-col items-center justify-center w-16 z-10 hover:-translate-y-2 transition-transform cursor-pointer group">
        <div 
          className="relative w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.6)] text-white group-hover:scale-110 transition-transform bg-surface-700"
          style={{ backgroundColor: !photoUrl ? teamColor : undefined }}
        >
          {photoUrl ? (
            <>
              <img src={photoUrl} alt={name} className="w-full h-full object-cover rounded-full" />
              <div 
                className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold border border-white/80 shadow-sm"
                style={{ backgroundColor: teamColor }}
              >
                {shirtNumber}
              </div>
            </>
          ) : (
            shirtNumber
          )}
        </div>
        <div className="text-xs font-bold text-white bg-surface-900/80 px-2.5 py-1 rounded-full mt-2 truncate max-w-[90px] text-center drop-shadow-lg backdrop-blur-md group-hover:bg-accent-500 transition-colors border border-white/20">
          {displayName}
        </div>
      </div>
    );
  };

  const renderRow = (players, teamColor) => (
    <div className="flex w-full justify-around items-center h-1/4">
      {players.map((p, i) => <div key={i}>{renderPlayer(p, teamColor)}</div>)}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-4 animate-fadeIn">
      
      {/* Title + Status */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${isReal ? 'bg-accent-500' : 'bg-gold-500'} animate-pulse`}></span>
        <h3 className="text-sm font-bold font-display text-white tracking-wide uppercase">
          {loading ? 'Carregando Escalações...' : isReal ? 'Escalações Oficiais' : 'Escalações Prováveis'}
        </h3>
        {isReal && (
          <span className="text-[9px] bg-accent-500/20 text-accent-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-accent-500/30">
            AO VIVO
          </span>
        )}
      </div>

      {/* Formação */}
      {(homeFormation || awayFormation) && (
        <div className="flex items-center justify-between w-full max-w-xs mb-3 text-[10px]">
          <span className="text-white/70 font-mono font-bold bg-surface-900/60 px-2 py-0.5 rounded">{homeFormation || '?'}</span>
          <span className="text-white/40">×</span>
          <span className="text-white/70 font-mono font-bold bg-surface-900/60 px-2 py-0.5 rounded">{awayFormation || '?'}</span>
        </div>
      )}

      {/* Container do Campo Verde */}
      <div 
        className="relative w-full max-w-full flex-1 min-h-[600px] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl flex flex-col p-4 mx-auto"
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
              <div className="w-8 h-8 border-2 border-accent-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-white/80 font-medium">Buscando escalações...</span>
            </div>
          </div>
        )}

        {/* Away Team (Top - reversed order: GK, DEF, MID, ATT) */}
        <div className="flex-1 flex flex-col justify-between mb-2">
           {awayLineup[0] && renderRow(awayLineup[0], '#7c3aed')} {/* GK - Purple */}
           {awayLineup[1] && renderRow(awayLineup[1], '#dc2626')} {/* DEF - Red */}
           {awayLineup[2] && renderRow(awayLineup[2], '#dc2626')} {/* MID - Red */}
           {awayLineup[3] && renderRow(awayLineup[3], '#dc2626')} {/* ATT - Red */}
        </div>

        {/* Home Team (Bottom - standard order: ATT, MID, DEF, GK) */}
        <div className="flex-1 flex flex-col justify-between mt-2">
           {homeLineup[3] && renderRow(homeLineup[3], '#2563eb')} {/* ATT - Blue */}
           {homeLineup[2] && renderRow(homeLineup[2], '#2563eb')} {/* MID - Blue */}
           {homeLineup[1] && renderRow(homeLineup[1], '#2563eb')} {/* DEF - Blue */}
           {homeLineup[0] && renderRow(homeLineup[0], '#eab308')} {/* GK - Yellow */}
        </div>

      </div>
    </div>
  );
}
