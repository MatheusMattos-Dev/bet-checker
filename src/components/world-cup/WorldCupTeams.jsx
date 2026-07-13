import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function WorldCupTeams() {
  const { wcTeams, wcEliminated, navigateWCView } = useApp();
  const [filter, setFilter] = useState('');

  const filtered = filter
    ? wcTeams.filter(t => t.name.toLowerCase().includes(filter.toLowerCase()))
    : wcTeams;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Buscar seleção..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#d4a017] transition-colors w-48"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-8">
        {filtered.map((team) => (
          <div
            key={team.id}
            className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:border-[#d4a017]/50 transition-all cursor-pointer"
            onClick={() => navigateWCView('team', team)}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{team.flag}</span>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{team.name}</h3>
                <p className="text-xs text-[#d4a017]">{team.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <p className="font-bold text-[#d4a017]">{team.points}</p>
                <p className="text-gray-400">PTS</p>
              </div>
              <div>
                <p className="font-bold text-green-500">{team.goalsFor}</p>
                <p className="text-gray-400">GM</p>
              </div>
              <div>
                <p className="font-bold text-red-400">{team.goalsAgainst}</p>
                <p className="text-gray-400">GS</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Eliminados */}
      <h2 className="text-lg font-bold text-gray-400 mb-3">Eliminados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2">
        {wcEliminated.map((team) => (
          <div key={team.id} className="bg-white/5 dark:bg-dark-800/50 rounded-xl p-3 border border-gray-200/30 dark:border-gray-700/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">{team.flag}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">{team.name}</span>
            </div>
            <p className="text-xs text-red-400 mt-1">Eliminado por {team.eliminatedBy} ({team.score})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
