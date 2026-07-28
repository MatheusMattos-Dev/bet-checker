import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getTeamColor } from '../../lib/teamColors';

function FormPills({ form }) {
  const styles = {
    W: 'bg-green-500 text-white',
    D: 'bg-gold-500 text-ink-900',
    L: 'bg-red-500 text-white',
  };
  return (
    <div className="flex gap-1">
      {form.split('').map((r, i) => (
        <span key={i} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${styles[r]}`}>
          {r}
        </span>
      ))}
    </div>
  );
}

export default function TeamsView() {
  const { brTeams, navigateView } = useApp();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return brTeams;
    return brTeams.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));
  }, [brTeams, search]);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 bg-slate-950 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity pointer-events-none transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('/stadium_hero_banner.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-violet-500/10 text-violet-400 border border-violet-500/30 uppercase tracking-widest backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Clubes da Série A 2026
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase drop-shadow-md">
            Times do Brasileirão
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed drop-shadow">
            Explore as 20 equipes participantes do campeonato, com raio-x completo de elencos, estatísticas e retrospecto recente.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="card p-5">
        <h2 className="text-base font-display font-bold text-ink-900 uppercase tracking-tight mb-1">Buscar Clube</h2>
        <p className="text-xs text-ink-600 mb-4">Filtre as equipes pelo nome</p>
        <input
          type="text"
          placeholder="Buscar time..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((team) => (
          <button
            key={team.id}
            onClick={() => navigateView('team', team.name)}
            className="card card-hover overflow-hidden text-left group"
          >
            <span className="team-bar block" style={{ backgroundColor: getTeamColor(team.name) }} />
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-16 bg-gray-50 rounded-md flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-105 transition-transform duration-300 overflow-hidden p-2">
                  {team.logo_url ? <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain" /> : <span className="text-2xl">{team.flag}</span>}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink-900 group-hover:text-green-600 transition-colors">{team.name}</h3>
                  <p className="text-[10px] text-ink-400">Posição {team.pos}º</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold font-display text-green-600">{team.points}</div>
                  <div className="text-[10px] text-ink-400">PTS</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold font-display text-ink-900">{team.goalsFor}</div>
                  <div className="text-[10px] text-ink-400">GP</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold font-display text-ink-900">{team.goalsAgainst}</div>
                  <div className="text-[10px] text-ink-400">GC</div>
                </div>
              </div>

              <FormPills form={team.form} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
