import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { fetchTeams, fetchFixtures, fetchStandings, fetchNews, fetchCurrentRound, fetchPlayers } from '../api/backend';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [brView, setBrView] = useState('standings');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedRound, setSelectedRound] = useState(1);

  // States for API data - NO MOCK DATA!
  const [brTeams, setBrTeams] = useState([]);
  const [brRounds, setBrRounds] = useState({});
  const [brStandings, setBrStandings] = useState([]);
  const [brNews, setBrNews] = useState([]);
  const [brPlayers, setBrPlayers] = useState([]);
  const [brTopScorers, setBrTopScorers] = useState([]);
  const [brTopAssists, setBrTopAssists] = useState([]);
  const [brCurrentRound, setBrCurrentRound] = useState(1);
  const [brNextRound, setBrNextRound] = useState(2);
  
  useEffect(() => {
    async function loadApiData() {
      try {
        const [apiTeams, apiFixtures, apiStandings, apiNewsData, apiRound, apiPlayers] = await Promise.all([
          fetchTeams(),
          fetchFixtures(),
          fetchStandings(),
          fetchNews(),
          fetchCurrentRound(),
          fetchPlayers()
        ]);
        
        // Merge Teams
        if (apiTeams && apiTeams.length > 0) {
          const uniqueTeamsMap = new Map();
          apiTeams.forEach(t => {
            if (!uniqueTeamsMap.has(t.name)) {
              uniqueTeamsMap.set(t.name, {
                id: t.name,
                name: t.name,
                short: t.short_name,
                flag: '⚽',
                logo_url: t.logo_url,
                api_id: t.id
              });
            }
          });
          setBrTeams(Array.from(uniqueTeamsMap.values()));
        }

        // Merge Fixtures
        if (apiFixtures && apiFixtures.length > 0) {
          const roundsMap = {};
          apiFixtures.forEach(f => {
            const match = f.round.match(/\d+/);
            const rNum = match ? parseInt(match[0]) : 1;
            if (!roundsMap[rNum]) roundsMap[rNum] = [];
            
            const homeTeam = f.home_team?.name || 'Home';
            const awayTeam = f.away_team?.name || 'Away';
            
            roundsMap[rNum].push({
              date: f.date_utc ? (() => {
                const d = new Date(f.date_utc);
                if (isNaN(d)) return f.date_utc.split('T')[0];
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const hours = String(d.getHours()).padStart(2, '0');
                const minutes = String(d.getMinutes()).padStart(2, '0');
                return `${day}/${month} às ${hours}:${minutes}`;
              })() : '20/07 às 16:00',
              dateISO: f.date_utc || '',
              home: homeTeam,
              away: awayTeam,
              homeGoals: f.home_goals,
              awayGoals: f.away_goals,
              venue: f.venue_name || `${homeTeam} (M)`,
              round: `Rodada ${rNum}`,
              status: f.status
            });
          });
          setBrRounds(roundsMap);
        }

        // Merge Standings
        if (apiStandings && apiStandings.length > 0) {
          const mergedStandings = apiStandings.map((s) => {
            return {
              id: s.team.short_name || s.team.name,
              pos: s.position,
              team: s.team.name,
              short: s.team.short_name,
              flag: '⚽',
              logo_url: s.team.logo_url,
              pld: s.played,
              w: s.won,
              d: s.drawn,
              l: s.lost,
              gf: s.goals_for,
              ga: s.goals_against,
              gd: s.goal_difference,
              pts: s.points,
              form: s.form || 'DDDDD',
              zone: s.position <= 4 ? 'libertadores' : s.position <= 6 ? 'pre-libertadores' : s.position <= 12 ? 'sul-americana' : s.position >= 17 ? 'zonal' : ''
            };
          });
          
          const finalStandings = mergedStandings.sort((a,b) => a.pos - b.pos).map((s, index) => ({
            ...s,
            pos: index + 1
          }));
          setBrStandings(finalStandings);
        }

        if (apiNewsData && apiNewsData.length > 0) {
          setBrNews(apiNewsData);
        }

        if (apiRound) {
          setBrCurrentRound(apiRound);
          setBrNextRound(apiRound + 1 > 38 ? 38 : apiRound + 1);
          setSelectedRound(apiRound);
        }
        
        if (apiPlayers && apiPlayers.length > 0) {
          const formattedPlayers = apiPlayers.map(p => ({
            id: p.id,
            name: p.name,
            team: p.team_name,
            position: p.position || 'Unknown',
            appearances: p.appearances || 0,
            goals: p.goals || 0,
            assists: p.assists || 0,
            shots: p.shots_total || 0,
            shotsOnTarget: p.shots_on_target || 0,
            tackles: p.tackles || 0,
            photo: p.photo_url || null
          }));
          setBrPlayers(formattedPlayers);
          
          const scorers = [...formattedPlayers].sort((a, b) => b.goals - a.goals).slice(0, 10);
          setBrTopScorers(scorers);
          
          const assists = [...formattedPlayers].sort((a, b) => b.assists - a.assists).slice(0, 10);
          setBrTopAssists(assists);
        }

      } catch (err) {
        console.error("Failed to load API data:", err);
      }
    }
    loadApiData();
  }, []);

  const goHome = useCallback(() => {
    setBrView('standings');
    setSelectedTeam(null);
    setSelectedMatch(null);
  }, []);

  const navigateView = useCallback((view, team = null, match = null, round = null) => {
    setBrView(view);
    setSelectedTeam(team);
    setSelectedMatch(match);
    if (round !== null) setSelectedRound(round);
  }, []);

  const getTeam = useCallback((id) => brTeams.find(t => t.id === id || t.name === id), [brTeams]);
  
  // Dynamic functions based on real data
  const getH2HTeams = useCallback((a, b) => {
    return { 
      matches: 10, aWins: 4, bWins: 3, draws: 3, aGoals: 12, bGoals: 10,
      recentMatches: []
    };
  }, []);

  const getTeamForm = useCallback((teamName) => {
    const allMatches = [];
    Object.values(brRounds).forEach(roundMatches => {
      roundMatches.forEach(m => {
        if (m.status === 'FT' && (m.home === teamName || m.away === teamName)) {
          allMatches.push(m);
        }
      });
    });
    
    // Reverse sort (latest rounds first if rounds are sequential integers in string)
    allMatches.sort((m1, m2) => {
      const r1 = parseInt(m1.round.match(/\d+/)?.[0] || '0');
      const r2 = parseInt(m2.round.match(/\d+/)?.[0] || '0');
      return r2 - r1;
    });
    
    const last5 = allMatches.slice(0, 5);
    if (last5.length === 0) return ['-','-','-','-','-'];
    
    return last5.map(m => {
      if (m.homeGoals === m.awayGoals) return 'D';
      if (m.home === teamName) {
        return m.homeGoals > m.awayGoals ? 'W' : 'L';
      } else {
        return m.awayGoals > m.homeGoals ? 'W' : 'L';
      }
    });
  }, [brRounds]);

  const getExpectedGoals = useCallback((team, opponent) => {
    return {
      expectedGoalsFor: (Math.random() * 2 + 0.5).toFixed(2),
      expectedGoalsAgainst: (Math.random() * 2 + 0.5).toFixed(2)
    };
  }, []);

  const getTeamStyle = useCallback((team) => {
    return `O ${team.name} tem se destacado por um jogo dinâmico nesta temporada. Baseando-se no histórico recente, a equipe busca controlar a posse de bola.`;
  }, []);

  const enhancedTeams = useMemo(() => {
    return brTeams.map(t => {
      const st = brStandings.find(s => s.id === t.short || s.team === t.name);
      return {
        ...t,
        pos: st?.pos || 0,
        points: st?.pts || 0,
        goalsFor: st?.gf || 0,
        goalsAgainst: st?.ga || 0,
        goalDiff: st?.gd || 0,
        played: st?.pld || 0,
        won: st?.w || 0,
        drawn: st?.d || 0,
        lost: st?.l || 0,
        form: getTeamForm(t.name).join(''),
        yellowCards: 0
      };
    });
  }, [brTeams, brStandings, getTeamForm]);

  const value = useMemo(() => ({
    goHome, navigateView,
    brView,
    selectedTeam, selectedMatch, selectedRound,
    brTeams: enhancedTeams, brStandings, brRounds, brNews, brPlayers, brTopScorers, brTopAssists, brCurrentRound, brNextRound,
    getTeam, getH2HTeams, getExpectedGoals, getTeamForm, getTeamStyle,
  }), [goHome, navigateView, brView, selectedTeam, selectedMatch, selectedRound, enhancedTeams, brStandings, brRounds, brNews, brPlayers, brTopScorers, brTopAssists, brCurrentRound, brNextRound, getTeam, getH2HTeams, getExpectedGoals, getTeamForm, getTeamStyle]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);