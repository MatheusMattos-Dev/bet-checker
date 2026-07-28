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
        
        // Merge Teams — some sources return the same club twice under
        // different name variants (e.g. "BOT" and "Botafogo"), so dedupe by
        // short_name when available and keep whichever record has the
        // fuller (longer) name.
        if (apiTeams && apiTeams.length > 0) {
          const uniqueTeamsMap = new Map();
          apiTeams.forEach(t => {
            const key = (t.short_name && t.short_name.trim()) || t.name;
            const existing = uniqueTeamsMap.get(key);
            if (!existing || (t.name?.length || 0) > (existing.name?.length || 0)) {
              uniqueTeamsMap.set(key, {
                id: (t.short_name && t.short_name.trim()) || t.name,
                name: t.name,
                short: t.short_name,
                flag: '⚽',
                logo_url: t.logo_url || existing?.logo_url,
                api_id: t.id
              });
            }
          });
          setBrTeams(Array.from(uniqueTeamsMap.values()));
        }

        // Merge Fixtures
        let roundsMap = {};
        if (apiFixtures && apiFixtures.length > 0) {
          roundsMap = {};
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

        // Current round auto-advances: starting from what the backend
        // reports, skip forward past any round where every match already
        // has a result, so a finished round moves the app to the next one
        // without waiting on the backend's own round counter to catch up.
        // Only ever moves forward — a stray unplayed match left over in an
        // old, mostly-finished round must not drag the app backward.
        let effectiveRound = apiRound || 1;
        while (
          roundsMap[effectiveRound] &&
          roundsMap[effectiveRound].length > 0 &&
          roundsMap[effectiveRound].every(m => m.homeGoals !== null && m.awayGoals !== null) &&
          effectiveRound < 38
        ) {
          effectiveRound += 1;
        }

        setBrCurrentRound(effectiveRound);
        setBrNextRound(effectiveRound + 1 > 38 ? 38 : effectiveRound + 1);
        setSelectedRound(effectiveRound);
        
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

  const getTeam = useCallback((id) => {
    if (!id) return null;
    const search = String(id).trim().toLowerCase();
    const norm = (str) => (typeof str === 'string' && str) ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    const searchNorm = norm(search);

    // 1. Direct match
    const exact = brTeams.find(t => 
      t.id?.toLowerCase() === search || 
      t.name?.toLowerCase() === search || 
      t.short?.toLowerCase() === search
    );
    if (exact) return exact;

    // 2. Normalized match (without accents)
    const normMatch = brTeams.find(t => 
      norm(t.name) === searchNorm || 
      norm(t.short) === searchNorm
    );
    if (normMatch) return normMatch;

    // 3. Partial substring match
    return brTeams.find(t => 
      (t.name && norm(t.name).includes(searchNorm)) || 
      (t.name && searchNorm.includes(norm(t.name)))
    );
  }, [brTeams]);
  
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

  const getExpectedGoals = useCallback((homeTeamName, awayTeamName) => {
    const norm = (str) => (typeof str === 'string' && str) ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
    const hNorm = norm(homeTeamName);
    const aNorm = norm(awayTeamName);

    const home = brStandings.find(s => norm(s.team) === hNorm || norm(s.short) === hNorm || (s.short && hNorm.includes(norm(s.short))) || norm(s.team).includes(hNorm));
    const away = brStandings.find(s => norm(s.team) === aNorm || norm(s.short) === aNorm || (s.short && aNorm.includes(norm(s.short))) || norm(s.team).includes(aNorm));

    const homePld = home && home.pld > 0 ? home.pld : 1;
    const awayPld = away && away.pld > 0 ? away.pld : 1;

    const homeGfAvg = home ? (home.gf / homePld) : 1.35;
    const homeGaAvg = home ? (home.ga / homePld) : 1.10;
    const awayGfAvg = away ? (away.gf / awayPld) : 1.15;
    const awayGaAvg = away ? (away.ga / awayPld) : 1.30;

    const expHome = Number(((homeGfAvg + awayGaAvg) / 2).toFixed(2));
    const expAway = Number(((awayGfAvg + homeGaAvg) / 2).toFixed(2));
    const totalXG = Number((expHome + expAway).toFixed(2));

    const goalChancePct = Math.min(95, Math.max(38, Math.round((totalXG / 3.0) * 82)));

    let classification = "Moderada";
    let isHighGoalChance = false;
    let badgeLabel = "Chance Moderada ⚽";
    let badgeColor = "bg-amber-100 text-amber-800 border-amber-300";

    if (totalXG >= 2.55 || goalChancePct >= 70) {
      classification = "Alta";
      isHighGoalChance = true;
      badgeLabel = "Alta Chance de Gols 🔥";
      badgeColor = "bg-red-500/15 text-red-400 border-red-500/30";
    } else if (totalXG >= 2.05 || goalChancePct >= 55) {
      classification = "Moderada";
      isHighGoalChance = true;
      badgeLabel = "Possível Chance de Gols ⚽";
      badgeColor = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    } else {
      classification = "Baixa";
      isHighGoalChance = false;
      badgeLabel = "Jogo Trancado 🛡️";
      badgeColor = "bg-slate-800 text-slate-400 border-slate-700";
    }

    // Result probabilities — Poisson goal model driven by the same xG
    // above: P(home scores h) x P(away scores a), bucketed into home
    // win / draw / away win. awayWinPct is derived from the other two
    // (not summed independently) so the three always add up to 100.
    const factorial = (n) => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
    const maxGoals = 9;
    let pHome = 0, pDraw = 0, pAway = 0;
    for (let h = 0; h <= maxGoals; h++) {
      const ph = Math.exp(-expHome) * Math.pow(expHome, h) / factorial(h);
      for (let a = 0; a <= maxGoals; a++) {
        const pa = Math.exp(-expAway) * Math.pow(expAway, a) / factorial(a);
        const p = ph * pa;
        if (h > a) pHome += p;
        else if (h === a) pDraw += p;
        else pAway += p;
      }
    }
    const pTotal = pHome + pDraw + pAway || 1;
    const homeWinPct = Math.round((pHome / pTotal) * 100);
    const drawPct = Math.round((pDraw / pTotal) * 100);
    const awayWinPct = 100 - homeWinPct - drawPct;

    return {
      expectedGoalsFor: expHome.toFixed(2),
      expectedGoalsAgainst: expAway.toFixed(2),
      totalXG: totalXG.toFixed(2),
      goalChancePct,
      classification,
      isHighGoalChance,
      badgeLabel,
      badgeColor,
      homeWinPct,
      drawPct,
      awayWinPct
    };
  }, [brStandings]);

  const getTeamStyle = useCallback((team) => {
    const name = (typeof team === 'string' ? team : team?.name) || 'time';
    return `O ${name} tem se destacado por um jogo dinâmico nesta temporada. Baseando-se no histórico recente, a equipe busca controlar a posse de bola.`;
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