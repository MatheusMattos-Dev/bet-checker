import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function WorldCupTeams() {
  const { wcTeams, wcEliminated, navigateWCView } = useApp();
  const [search, setSearch] = useState('');

  const filtered = wcTeams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar time..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface-800 border border-surface-600/50 rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-500/50 transition-colors"
        />
      </div>

      {/* Active teams */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.map((team) => (
          <div
            key={team.id}
            className="bg-surface-800 rounded-xl p-5 border border-surface-600/50 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-500/5 hover:border-surface-700 active:scale-[0.98] group"
            onClick={() => navigateWCView('team', team)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{team.flag}</span>
              <div>
                <h3 className="font-display font-bold text-text-primary group-hover:text-accent-300 transition-colors">{team.name}</h3>
                <span className="text-xs text-text-muted">{team.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-surface-700/50 rounded-lg p-2">
                <p className="text-lg font-mono font-bold text-accent-300">{team.points}</p>
                <p className="text-[10px] text-text-muted uppercase">PTS</p>
              </div>
              <div className="bg-surface-700/50 rounded-lg p-2">
                <p className="text-lg font-mono font-bold text-text-primary">{team.goalsFor}</p>
                <p className="text-[10px] text-text-muted uppercase">GM</p>
              </div>
              <div className="bg-surface-700/50 rounded-lg p-2">
                <p className="text-lg font-mono font-bold text-text-primary">{team.goalsAgainst}</p>
                <p className="text-[10px] text-text-muted uppercase">GS</p>
              </div>
            </div>

            {/* Form */}
            <div className="flex gap-1 mt-3">
              {team.form.split('').map((r, i) => {
                const colors = { W: 'bg-accent-500', D: 'bg-gold-500', L: 'bg-danger-500' };
                return (
                  <div key={i} className={`w-2 h-2 rounded-full ${colors[r]}`} />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Eliminated */}
      {wcEliminated.length > 0 && (
        <div>
          <h3 className="text-sm font-display font-semibold text-text-muted mb-3 uppercase tracking-wider">Eliminados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wcEliminated.map((team) => (
              <div
                key={team.id}
                className="bg-surface-800/50 rounded-xl p-4 border border-surface-600/30 cursor-pointer transition-all duration-200 hover:border-surface-700 opacity-60 hover:opacity-100"
                onClick={() => navigateWCView('team', team)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{team.flag}</span>
                  <div>
                    <h3 className="font-display font-semibold text-text-secondary">{team.name}</h3>
                    <span className="text-xs text-danger-400">{team.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}