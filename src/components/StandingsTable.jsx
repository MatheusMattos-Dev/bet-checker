import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function StandingsTable({ standings, leagueKey }) {
  const { navigateToTeam } = useApp();
  const [sortCol, setSortCol] = useState('rank');
  const [sortDir, setSortDir] = useState('asc');

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir(col === 'rank' ? 'asc' : 'desc');
    }
  };

  const sorted = [...standings].sort((a, b) => {
    let va, vb;
    switch (sortCol) {
      case 'rank': va = a.rank; vb = b.rank; break;
      case 'team': va = a.team.name; vb = b.team.name; break;
      case 'played': va = a.all.played; vb = b.all.played; break;
      case 'wins': va = a.all.win; vb = b.all.win; break;
      case 'draws': va = a.all.draw; vb = b.all.draw; break;
      case 'losses': va = a.all.lose; vb = b.all.lose; break;
      case 'gf': va = a.goalDiff.for; vb = b.goalDiff.for; break;
      case 'ga': va = a.goalDiff.against; vb = b.goalDiff.against; break;
      case 'gd': va = a.goalDiff.for - a.goalDiff.against; vb = b.goalDiff.for - b.goalDiff.against; break;
      case 'points': va = a.points; vb = b.points; break;
      default: va = a.rank; vb = b.rank;
    }
    if (typeof va === 'string') {
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    return sortDir === 'asc' ? va - vb : vb - va;
  });

  const total = standings.length;
  const getZone = (rank) => {
    if (leagueKey === 'br') {
      if (rank <= 4) return 'green';
      if (rank <= 6) return 'blue';
      if (rank >= total - 3) return 'red';
      return 'yellow';
    }
    if (leagueKey === 'pl') {
      if (rank <= 4) return 'green';
      if (rank >= total - 3) return 'red';
      return 'yellow';
    }
    if (rank <= 3) return 'green';
    if (rank >= total - 2) return 'red';
    return 'yellow';
  };

  const zoneColors = {
    green: 'border-l-green-500',
    blue: 'border-l-blue-500',
    yellow: '',
    red: 'border-l-red-500',
  };

  const SortIcon = ({ col }) => {
    if (sortCol !== col) return <span className="text-gray-400 ml-1">↕</span>;
    return <span className="text-gold-500 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700/50">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-dark-700 text-xs uppercase tracking-wider">
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('rank')}>
                #<SortIcon col="rank" />
              </th>
              <th className="px-3 py-3 text-left cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('team')}>
                Time<SortIcon col="team" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('played')}>
                J<SortIcon col="played" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('wins')}>
                V<SortIcon col="wins" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('draws')}>
                E<SortIcon col="draws" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('losses')}>
                D<SortIcon col="losses" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('gf')}>
                GM<SortIcon col="gf" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('ga')}>
                GS<SortIcon col="ga" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('gd')}>
                SG<SortIcon col="gd" />
              </th>
              <th className="px-3 py-3 text-center cursor-pointer hover:text-gold-500 transition-colors" onClick={() => handleSort('points')}>
                PTS<SortIcon col="points" />
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((team) => {
              const zone = getZone(team.rank);
              return (
                <tr
                  key={team.team.id}
                  className={`border-t border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors cursor-pointer border-l-4 ${zoneColors[zone]}`}
                  onClick={() => navigateToTeam(team.team)}
                >
                  <td className="px-3 py-3 text-center font-bold text-gold-500">{team.rank}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <img src={team.team.logo} alt={team.team.name} className="w-5 h-5" />
                      <span className="font-medium text-sm text-gray-800 dark:text-gray-200">{team.team.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{team.all.played}</td>
                  <td className="px-3 py-3 text-center text-sm text-green-600 dark:text-green-400">{team.all.win}</td>
                  <td className="px-3 py-3 text-center text-sm text-gray-600 dark:text-gray-400">{team.all.draw}</td>
                  <td className="px-3 py-3 text-center text-sm text-red-600 dark:text-red-400">{team.all.lose}</td>
                  <td className="px-3 py-3 text-center text-sm">{team.goalDiff.for}</td>
                  <td className="px-3 py-3 text-center text-sm">{team.goalDiff.against}</td>
                  <td className="px-3 py-3 text-center text-sm font-medium">{team.goalDiff.for - team.goalDiff.against > 0 ? '+' : ''}{team.goalDiff.for - team.goalDiff.against}</td>
                  <td className="px-3 py-3 text-center font-bold text-gold-500">{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
