// Mock data for when API is unavailable

const brTeams = [
  { id: 1, name: 'Botafogo', logo: 'https://media.api-sports.io/football/teams/127.png' },
  { id: 2, name: 'Palmeiras', logo: 'https://media.api-sports.io/football/teams/126.png' },
  { id: 3, name: 'Flamengo', logo: 'https://media.api-sports.io/football/teams/127.png' },
  { id: 4, name: 'Fluminense', logo: 'https://media.api-sports.io/football/teams/128.png' },
  { id: 5, name: 'São Paulo', logo: 'https://media.api-sports.io/football/teams/129.png' },
  { id: 6, name: 'Corinthians', logo: 'https://media.api-sports.io/football/teams/131.png' },
  { id: 7, name: 'Atlético-MG', logo: 'https://media.api-sports.io/football/teams/130.png' },
  { id: 8, name: 'Internacional', logo: 'https://media.api-sports.io/football/teams/132.png' },
  { id: 9, name: 'Grêmio', logo: 'https://media.api-sports.io/football/teams/133.png' },
  { id: 10, name: 'Cruzeiro', logo: 'https://media.api-sports.io/football/teams/134.png' },
  { id: 11, name: 'Santos', logo: 'https://media.api-sports.io/football/teams/135.png' },
  { id: 12, name: 'Bahia', logo: 'https://media.api-sports.io/football/teams/136.png' },
  { id: 13, name: 'Fortaleza', logo: 'https://media.api-sports.io/football/teams/137.png' },
  { id: 14, name: 'Athletico-PR', logo: 'https://media.api-sports.io/football/teams/138.png' },
  { id: 15, name: 'Bragantino', logo: 'https://media.api-sports.io/football/teams/139.png' },
  { id: 16, name: 'Cuiabá', logo: 'https://media.api-sports.io/football/teams/140.png' },
  { id: 17, name: 'Goiás', logo: 'https://media.api-sports.io/football/teams/141.png' },
  { id: 18, name: 'Coritiba', logo: 'https://media.api-sports.io/football/teams/142.png' },
  { id: 19, name: 'Vasco', logo: 'https://media.api-sports.io/football/teams/143.png' },
  { id: 20, name: 'Criciúma', logo: 'https://media.api-sports.io/football/teams/144.png' },
];

const plTeams = [
  { id: 101, name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
  { id: 102, name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
  { id: 103, name: 'Man City', logo: 'https://media.api-sports.io/football/teams/50.png' },
  { id: 104, name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png' },
  { id: 105, name: 'Tottenham', logo: 'https://media.api-sports.io/football/teams/47.png' },
  { id: 106, name: 'Man United', logo: 'https://media.api-sports.io/football/teams/33.png' },
  { id: 107, name: 'Newcastle', logo: 'https://media.api-sports.io/football/teams/34.png' },
  { id: 108, name: 'Brighton', logo: 'https://media.api-sports.io/football/teams/51.png' },
  { id: 109, name: 'Aston Villa', logo: 'https://media.api-sports.io/football/teams/66.png' },
  { id: 110, name: 'West Ham', logo: 'https://media.api-sports.io/football/teams/48.png' },
  { id: 111, name: 'Bournemouth', logo: 'https://media.api-sports.io/football/teams/57.png' },
  { id: 112, name: 'Fulham', logo: 'https://media.api-sports.io/football/teams/36.png' },
  { id: 113, name: 'Wolves', logo: 'https://media.api-sports.io/football/teams/39.png' },
  { id: 114, name: 'Brentford', logo: 'https://media.api-sports.io/football/teams/55.png' },
  { id: 115, name: 'Everton', logo: 'https://media.api-sports.io/football/teams/45.png' },
  { id: 116, name: 'Nottm Forest', logo: 'https://media.api-sports.io/football/teams/65.png' },
  { id: 117, name: 'Crystal Palace', logo: 'https://media.api-sports.io/football/teams/52.png' },
  { id: 118, name: 'Ipswich', logo: 'https://media.api-sports.io/football/teams/56.png' },
  { id: 119, name: 'Leicester', logo: 'https://media.api-sports.io/football/teams/46.png' },
  { id: 120, name: 'Southampton', logo: 'https://media.api-sports.io/football/teams/41.png' },
];

function generateStandings(teams) {
  return teams.map((team, i) => {
    const played = 30 + Math.floor(Math.random() * 5);
    const wins = Math.max(0, Math.floor(Math.random() * 18) - i * 0.5);
    const draws = Math.floor(Math.random() * 8);
    const losses = played - wins - draws;
    const gf = wins * 1.5 + Math.floor(Math.random() * 10);
    const ga = losses * 1.2 + Math.floor(Math.random() * 8);
    return {
      rank: i + 1,
      team: {
        id: team.id,
        name: team.name,
        logo: team.logo,
      },
      points: wins * 3 + draws,
      all: { played, win: wins, draw: draws, lose: losses },
      goalDiff: {
        for: Math.round(gf),
        against: Math.round(ga),
      },
      form: 'WDLWW'.split('').map(() => ['W', 'D', 'L'][Math.floor(Math.random() * 3)]).join(''),
    };
  }).sort((a, b) => b.points - a.points || (b.goalDiff.for - b.goalDiff.against) - (a.goalDiff.for - a.goalDiff.against));
}

function generateFixtures(teams, count = 10) {
  const fixtures = [];
  const shuffled = [...teams].sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(count, shuffled.length - 1); i += 2) {
    const home = shuffled[i];
    const away = shuffled[i + 1];
    const status = Math.random() > 0.5 ? 'FT' : Math.random() > 0.5 ? 'LIVE' : 'NS';
    const homeGoals = status === 'NS' ? null : Math.floor(Math.random() * 4);
    const awayGoals = status === 'NS' ? null : Math.floor(Math.random() * 3);
    const date = new Date(Date.now() + (Math.random() - 0.5) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const time = `${String(Math.floor(Math.random() * 12) + 10).padStart(2, '0')}:00`;

    fixtures.push({
      fixture: {
        id: 10000 + i,
        date: `${date}T${time}:00Z`,
        status: {
          long: status === 'FT' ? 'Match Finished' : status === 'LIVE' ? 'In Play' : 'Not Started',
          short: status,
          elapsed: status === 'LIVE' ? Math.floor(Math.random() * 90) : undefined,
        },
        venue: { name: `Estádio ${home.name}`, city: 'City' },
      },
      league: { round: 'Regular Season - ' + (Math.floor(Math.random() * 5) + 26) },
      teams: { home: { id: home.id, name: home.name, logo: home.logo }, away: { id: away.id, name: away.name, logo: away.logo } },
      goals: { home: homeGoals, away: awayGoals },
      score: {
        halftime: { home: homeGoals ? Math.floor(homeGoals / 2) : null, away: awayGoals ? Math.floor(awayGoals / 2) : null },
        fulltime: { home: homeGoals, away: awayGoals },
      },
    });
  }
  return fixtures;
}

function generateTeamStats(team, standings) {
  const rank = standings.find(s => s.team.id === team.id);
  if (!rank) return null;

  const fixtures = [];
  for (let i = 0; i < 10; i++) {
    const result = ['W', 'D', 'L'][Math.floor(Math.random() * 3)];
    const gf = Math.floor(Math.random() * 4);
    const ga = result === 'W' ? Math.min(gf, Math.floor(Math.random() * 2)) : Math.max(gf, Math.floor(Math.random() * 3));
    const date = new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    fixtures.push({
      date,
      opponent: `${['Flamengo', 'Palmeiras', 'Corinthians', 'São Paulo', 'Grêmio'][Math.floor(Math.random() * 5)]}`,
      result,
      gf,
      ga,
      home: Math.random() > 0.5,
    });
  }

  return {
    team,
    rank: rank.rank,
    points: rank.points,
    goalDiff: { for: rank.goalDiff.for, against: rank.goalDiff.against },
    goalDiffNet: rank.goalDiff.for - rank.goalDiff.against,
    form: rank.form,
    winRate: Math.round((rank.all.win / rank.all.played) * 100),
    fixtures,
    homeRecord: { played: 15, wins: 11, draws: 2, losses: 2 },
    awayRecord: { played: 15, wins: 6, draws: 4, losses: 5 },
    positionHistory: Array.from({ length: 30 }, (_, i) => ({
      round: i + 1,
      position: Math.max(1, Math.min(20, rank.rank + Math.floor(Math.random() * 7) - 3)),
    })),
  };
}

function generateTopScorers(teams) {
  const scorers = [];
  for (let i = 0; i < 10; i++) {
    const team = teams[Math.floor(Math.random() * teams.length)];
    scorers.push({
      player: {
        id: 2000 + i,
        name: ['H.ulk', 'Pedro', 'Endrick', 'Germán', 'Lucas', 'Weverton', 'Yuri', 'R. Veiga', 'Tiquinho', 'Memê'][i],
        photo: '',
      },
      statistics: [
        {
          team: { id: team.id, name: team.name, logo: team.logo },
          games: { played: 28 + Math.floor(Math.random() * 5) },
          goals: { total: 12 + Math.floor(Math.random() * 15) },
          assists: { total: Math.floor(Math.random() * 8) },
        },
      ],
    });
  }
  return scorers.sort((a, b) => b.statistics[0].goals.total - a.statistics[0].goals.total);
}

function generateTeamDetails(team, leagueKey) {
  const teams = leagueKey === 'pl' ? plTeams : brTeams;
  const standings = generateStandings(teams);
  return generateTeamStats(team, standings);
}

export { brTeams, plTeams, generateStandings, generateFixtures, generateTopScorers, generateTeamDetails };
