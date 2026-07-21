import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

function FormPills({ form }) {
  const styles = {
    W: 'bg-accent-500/20 text-accent-300',
    D: 'bg-gold-500/20 text-gold-400',
    L: 'bg-danger-500/20 text-danger-400',
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
    <div className="space-y-4">
      {/* Search */}
      <div className="glass-card rounded-2xl border border-surface-600/40 p-5">
        <h2 className="text-base font-display font-bold text-text-primary mb-1">Times</h2>
        <p className="text-xs text-text-secondary mb-4">20 clubes da Série A 2026</p>
        <input
          type="text"
          placeholder="Buscar time..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface-800/80 border border-surface-600/40 rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500/40 focus:ring-1 focus:ring-accent-500/20 transition-all"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((team) => (
          <button
            key={team.id}
            onClick={() => navigateView('team', team.name)}
            className="glass-card rounded-xl border border-surface-600/40 p-4 text-left hover:border-accent-500/30 transition-all hover:shadow-lg hover:shadow-accent-500/5 group card-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-16 h-16 bg-surface-800/80 rounded-xl flex items-center justify-center shrink-0 border border-surface-600/30 group-hover:scale-110 transition-transform duration-300 overflow-hidden p-2">
                {team.logo_url ? <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain drop-shadow-md" /> : <span className="text-2xl">{team.flag}</span>}
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-primary group-hover:text-accent-300 transition-colors">{team.name}</h3>
                <p className="text-[10px] text-text-muted">Posição {team.pos}º</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <div className="text-lg font-bold font-display text-accent-300">{team.points}</div>
                <div className="text-[10px] text-text-muted">PTS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold font-display text-text-primary">{team.goalsFor}</div>
                <div className="text-[10px] text-text-muted">GP</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold font-display text-text-primary">{team.goalsAgainst}</div>
                <div className="text-[10px] text-text-muted">GC</div>
              </div>
            </div>

            <FormPills form={team.form} />
          </button>
        ))}
      </div>
    </div>
  );
}