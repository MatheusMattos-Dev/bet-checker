import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { LEAGUES, LEAGUE_KEYS } from '../lib/leagues';
import { useTheme } from '../context/ThemeContext';

function SearchBar() {
  const { navigateToTeam, searchTeams } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    const found = searchTeams(q);
    setResults(found);
    setOpen(true);
  };

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setOpen(true)}
          placeholder="Buscar time..."
          className="w-40 sm:w-56 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 focus:bg-white/15 transition-all"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-dark-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
          {results.map((team) => (
            <button
              key={team.id}
              onClick={() => {
                navigateToTeam(team);
                setQuery('');
                setResults([]);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors text-left"
            >
              <img src={team.logo} alt={team.name} className="w-6 h-6 rounded-full" />
              <span className="text-sm text-gray-800 dark:text-gray-200 font-medium">{team.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { goHome, league, setLeague } = useApp();
  const { dark, toggle } = useTheme();

  return (
    <header className="bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border-b border-white/10 sticky top-0 z-40 shadow-lg shadow-black/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={goHome} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-300 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-gold-500/30 transition-shadow">
            <span className="text-dark-900 font-bold text-lg">GS</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-white tracking-tight">GoalStats</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest -mt-0.5">Estatísticas</p>
          </div>
        </button>

        <div className="flex items-center gap-3">
          {/* League Selector */}
          <div className="hidden sm:flex items-center gap-2">
            <select
              value={league}
              onChange={(e) => setLeague(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
            >
              {LEAGUE_KEYS.map(key => (
                <option key={key} value={key} className="bg-dark-800 text-white">
                  {LEAGUES[key]?.flag} {LEAGUES[key]?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <SearchBar />

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors text-base"
            title={dark ? 'Modo claro' : 'Modo escuro'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
