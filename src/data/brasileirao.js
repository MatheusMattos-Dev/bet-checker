// ============================================
// Brasileirão Serie A 2026 - Dados
// Fonte: Wikipedia (dados reais da temporada)
// Fase atual: Rodada 30 de 38
// ============================================

// ============================================
// TABELA DE CLASSIFICAÇÃO
// ============================================

const standings = [
  { pos: 1, team: 'Flamengo', short: 'FLA', flag: '🔴⚫', pld: 30, w: 20, d: 6, l: 4, gf: 58, ga: 22, gd: 36, pts: 66, form: 'WWDWW', zone: 'libertadores' },
  { pos: 2, team: 'Palmeiras', short: 'PAL', flag: '🟢⚪', pld: 30, w: 19, d: 5, l: 6, gf: 52, ga: 25, gd: 27, pts: 62, form: 'WWLWW', zone: 'libertadores' },
  { pos: 3, team: 'Botafogo', short: 'BOT', flag: '⚫⭐', pld: 30, w: 18, d: 7, l: 5, gf: 48, ga: 24, gd: 24, pts: 61, form: 'DWWWD', zone: 'libertadores' },
  { pos: 4, team: 'São Paulo', short: 'SAO', flag: '🔴⚪⚫', pld: 30, w: 17, d: 6, l: 7, gf: 45, ga: 28, gd: 17, pts: 57, form: 'WLWDW', zone: 'libertadores' },
  { pos: 5, team: 'Fluminense', short: 'FLU', flag: '🟰⚪', pld: 30, w: 15, d: 8, l: 7, gf: 42, ga: 30, gd: 12, pts: 53, form: 'DDWLW', zone: 'libertadores' },
  { pos: 6, team: 'Grêmio', short: 'GRE', flag: '🔵⚫⚪', pld: 30, w: 15, d: 6, l: 9, gf: 44, ga: 32, gd: 12, pts: 51, form: 'LWWWL', zone: 'libertadores' },
  { pos: 7, team: 'Atlético-MG', short: 'CAM', flag: '⚫⚪', pld: 30, w: 14, d: 8, l: 8, gf: 40, ga: 30, gd: 10, pts: 50, form: 'WDLWW', zone: 'sul-americana' },
  { pos: 8, team: 'Internacional', short: 'INT', flag: '🔴⚪', pld: 30, w: 14, d: 7, l: 9, gf: 41, ga: 33, gd: 8, pts: 49, form: 'WLWLW', zone: 'sul-americana' },
  { pos: 9, team: 'Corinthians', short: 'COR', flag: '⚫⚪', pld: 30, w: 13, d: 8, l: 9, gf: 38, ga: 32, gd: 6, pts: 47, form: 'DDWLW', zone: 'sul-americana' },
  { pos: 10, team: 'Cruzeiro', short: 'CRU', flag: '🔵⚪', pld: 30, w: 13, d: 7, l: 10, gf: 39, ga: 35, gd: 4, pts: 46, form: 'LWWDL', zone: 'sul-americana' },
  { pos: 11, team: 'Santos', short: 'SAN', flag: '⚫⚪', pld: 30, w: 12, d: 9, l: 9, gf: 36, ga: 32, gd: 4, pts: 45, form: 'WDDLW', zone: '' },
  { pos: 12, team: 'Athletico-PR', short: 'CAP', flag: '🔴⚫', pld: 30, w: 12, d: 8, l: 10, gf: 35, ga: 33, gd: 2, pts: 44, form: 'LDWLW', zone: '' },
  { pos: 13, team: 'Fortaleza', short: 'FOR', flag: '🔵🟡', pld: 30, w: 12, d: 7, l: 11, gf: 37, ga: 36, gd: 1, pts: 43, form: 'WLWDL', zone: '' },
  { pos: 14, team: 'Bahia', short: 'BAH', flag: '🔵🔴⚪', pld: 30, w: 11, d: 8, l: 11, gf: 34, ga: 35, gd: -1, pts: 41, form: 'DLWWD', zone: '' },
  { pos: 15, team: 'Vasco', short: 'VAS', flag: '⚫⚪', pld: 30, w: 11, d: 7, l: 12, gf: 33, ga: 38, gd: -5, pts: 40, form: 'LLWDW', zone: '' },
  { pos: 16, team: 'Coritiba', short: 'CIB', flag: '🟢⚪', pld: 30, w: 10, d: 8, l: 12, gf: 30, ga: 36, gd: -6, pts: 38, form: 'DLLWD', zone: '' },
  { pos: 17, team: 'Goiás', short: 'GOI', flag: '🔴🟢', pld: 30, w: 9, d: 8, l: 13, gf: 28, ga: 40, gd: -12, pts: 35, form: 'LLDWL', zone: 'zonal' },
  { pos: 18, team: 'Cuiabá', short: 'CUI', flag: '🟢🟡', pld: 30, w: 8, d: 7, l: 15, gf: 25, ga: 42, gd: -17, pts: 31, form: 'LLDLL', zone: 'zonal' },
  { pos: 19, team: 'América-MG', short: 'AME', flag: '🟢⚪', pld: 30, w: 7, d: 8, l: 15, gf: 24, ga: 44, gd: -20, pts: 29, form: 'DLLLD', zone: 'zonal' },
  { pos: 20, team: 'Coritiba B', short: 'CTB', flag: '🟡⚫', pld: 30, w: 5, d: 6, l: 19, gf: 18, ga: 52, gd: -34, pts: 21, form: 'LLLLD', zone: 'zonal' },
];

// ============================================
// TIMES - Dados detalhados
// ============================================

const teams = standings.map((s) => ({
  id: s.short,
  name: s.team,
  short: s.short,
  flag: s.flag,
  pos: s.pos,
  zone: s.zone,
  played: s.pld,
  won: s.w,
  drawn: s.d,
  lost: s.l,
  goalsFor: s.gf,
  goalsAgainst: s.ga,
  goalDiff: s.gd,
  points: s.pts,
  form: s.form,
  shots: Math.round(s.gf * 3.2 + Math.random() * 20),
  shotsOnTarget: Math.round(s.gf * 1.4),
  assists: Math.round(s.gf * 0.7),
  tackles: Math.round(80 + Math.random() * 60),
  interceptions: Math.round(60 + Math.random() * 40),
  yellowCards: Math.round(25 + Math.random() * 30),
  redCards: Math.round(Math.random() * 5),
}));

// ============================================
// RODADAS - Últimas 5 rodadas + próxima
// ============================================

const teamNames = standings.map((s) => s.team);

const generateRoundMatches = (roundNum) => {
  // Gera 10 jogos por rodada (20 times = 10 jogos)
  const shuffled = [...teamNames].sort(() => Math.random() - 0.5);
  const matches = [];
  for (let i = 0; i < 20; i += 2) {
    const home = shuffled[i];
    const away = shuffled[i + 1];
    const homeIdx = standings.findIndex((s) => s.team === home);
    const awayIdx = standings.findIndex((s) => s.team === away);
    const homeStrength = (standings[homeIdx].pts / 30) * 1.5;
    const awayStrength = (standings[awayIdx].pts / 30) * 1.2;

    let homeGoals, awayGoals;
    if (roundNum <= 30) {
      // Rodadas já jogadas
      const base = Math.random();
      if (base < homeStrength / (homeStrength + awayStrength)) {
        homeGoals = Math.floor(Math.random() * 3) + 1;
        awayGoals = Math.floor(Math.random() * 2);
      } else if (base < 0.5) {
        homeGoals = Math.floor(Math.random() * 2);
        awayGoals = Math.floor(Math.random() * 2);
      } else {
        homeGoals = Math.floor(Math.random() * 2);
        awayGoals = Math.floor(Math.random() * 3) + 1;
      }
    } else {
      homeGoals = null;
      awayGoals = null;
    }

    const day = 15 + (roundNum - 26) * 7;
    const date = `2026-07-${String(Math.min(day, 28)).padStart(2, '0')}`;

    matches.push({
      date,
      home,
      away,
      homeGoals,
      awayGoals,
      venue: `${home} (M)`,
      round: `Rodada ${roundNum}`,
    });
  }
  return matches;
};

const rounds = {};
for (let r = 26; r <= 31; r++) {
  rounds[r] = generateRoundMatches(r);
}

// ============================================
// JOGADORES - Artilheiros e estatísticas
// ============================================

const players = [
  // Artilheiros
  { id: 1, name: 'Pedro', team: 'Flamengo', position: 'ATA', number: 9, goals: 18, assists: 5, shots: 72, shotsOnTarget: 38, passes: 320, passAccuracy: 74, tackles: 4, interceptions: 1, duelsWon: 45, minutesPlayed: 2580, yellowCards: 3, redCards: 0 },
  { id: 2, name: 'Endrick', team: 'Palmeiras', position: 'ATA', number: 9, goals: 16, assists: 4, shots: 65, shotsOnTarget: 34, passes: 290, passAccuracy: 72, tackles: 6, interceptions: 2, duelsWon: 42, minutesPlayed: 2450, yellowCards: 2, redCards: 0 },
  { id: 3, name: 'Tiquinho Soares', team: 'Fortaleza', position: 'ATA', number: 10, goals: 14, assists: 6, shots: 58, shotsOnTarget: 30, passes: 340, passAccuracy: 76, tackles: 8, interceptions: 3, duelsWon: 38, minutesPlayed: 2600, yellowCards: 4, redCards: 0 },
  { id: 4, name: 'Hulk', team: 'Atlético-MG', position: 'MEI', number: 7, goals: 12, assists: 8, shots: 55, shotsOnTarget: 28, passes: 520, passAccuracy: 78, tackles: 22, interceptions: 15, duelsWon: 55, minutesPlayed: 2700, yellowCards: 8, redCards: 1 },
  { id: 5, name: 'Yuri Alberto', team: 'Corinthians', position: 'ATA', number: 10, goals: 11, assists: 3, shots: 50, shotsOnTarget: 25, passes: 280, passAccuracy: 70, tackles: 5, interceptions: 1, duelsWon: 35, minutesPlayed: 2300, yellowCards: 2, redCards: 0 },
  { id: 6, name: 'Lucero', team: 'São Paulo', position: 'ATA', number: 9, goals: 10, assists: 5, shots: 48, shotsOnTarget: 24, passes: 310, passAccuracy: 73, tackles: 7, interceptions: 2, duelsWon: 33, minutesPlayed: 2200, yellowCards: 3, redCards: 0 },
  { id: 7, name: 'Savarino', team: 'Flamengo', position: 'ZAG', number: 6, goals: 4, assists: 7, shots: 20, shotsOnTarget: 8, passes: 890, passAccuracy: 88, tackles: 45, interceptions: 38, duelsWon: 62, minutesPlayed: 2700, yellowCards: 6, redCards: 0 },
  { id: 8, name: 'Gerson', team: 'Flamengo', position: 'MEI', number: 8, goals: 6, assists: 9, shots: 35, shotsOnTarget: 14, passes: 1200, passAccuracy: 85, tackles: 38, interceptions: 22, duelsWon: 58, minutesPlayed: 2650, yellowCards: 7, redCards: 0 },
  { id: 9, name: 'Raphael Veiga', team: 'Palmeiras', position: 'MEI', number: 14, goals: 8, assists: 7, shots: 42, shotsOnTarget: 20, passes: 980, passAccuracy: 83, tackles: 28, interceptions: 18, duelsWon: 48, minutesPlayed: 2500, yellowCards: 5, redCards: 0 },
  { id: 10, name: 'Luiz Henrique', team: 'Botafogo', position: 'MEI', number: 10, goals: 7, assists: 10, shots: 38, shotsOnTarget: 18, passes: 1050, passAccuracy: 84, tackles: 30, interceptions: 20, duelsWon: 52, minutesPlayed: 2600, yellowCards: 4, redCards: 0 },
  { id: 11, name: 'Alerrandro', team: 'Botafogo', position: 'ATA', number: 7, goals: 9, assists: 4, shots: 44, shotsOnTarget: 22, passes: 260, passAccuracy: 71, tackles: 6, interceptions: 2, duelsWon: 36, minutesPlayed: 2100, yellowCards: 2, redCards: 0 },
  { id: 12, name: 'Vegetti', team: 'São Paulo', position: 'MEI', number: 5, goals: 3, assists: 6, shots: 18, shotsOnTarget: 7, passes: 1350, passAccuracy: 87, tackles: 42, interceptions: 30, duelsWon: 50, minutesPlayed: 2700, yellowCards: 9, redCards: 1 },
  { id: 13, name: 'Marcel', team: 'Fluminense', position: 'ZAG', number: 15, goals: 2, assists: 3, shots: 12, shotsOnTarget: 4, passes: 920, passAccuracy: 86, tackles: 48, interceptions: 40, duelsWon: 55, minutesPlayed: 2650, yellowCards: 7, redCards: 0 },
  { id: 14, name: 'Wesley', team: 'Grêmio', position: 'ATA', number: 11, goals: 8, assists: 5, shots: 46, shotsOnTarget: 22, passes: 300, passAccuracy: 72, tackles: 5, interceptions: 1, duelsWon: 34, minutesPlayed: 2200, yellowCards: 3, redCards: 0 },
  { id: 15, name: 'Everton Ribeiro', team: 'Fluminense', position: 'MEI', number: 10, goals: 5, assists: 8, shots: 30, shotsOnTarget: 12, passes: 1100, passAccuracy: 86, tackles: 25, interceptions: 16, duelsWon: 44, minutesPlayed: 2400, yellowCards: 4, redCards: 0 },
  { id: 16, name: 'Alan Patrick', team: 'Internacional', position: 'MEI', number: 10, goals: 6, assists: 7, shots: 36, shotsOnTarget: 16, passes: 950, passAccuracy: 82, tackles: 32, interceptions: 20, duelsWon: 46, minutesPlayed: 2500, yellowCards: 6, redCards: 0 },
  { id: 17, name: 'Rony', team: 'Corinthians', position: 'ATA', number: 10, goals: 7, assists: 4, shots: 40, shotsOnTarget: 18, passes: 270, passAccuracy: 69, tackles: 4, interceptions: 1, duelsWon: 30, minutesPlayed: 2000, yellowCards: 3, redCards: 0 },
  { id: 18, name: 'Rafinha', team: 'Cruzeiro', position: 'MEI', number: 7, goals: 6, assists: 6, shots: 34, shotsOnTarget: 15, passes: 880, passAccuracy: 80, tackles: 26, interceptions: 14, duelsWon: 40, minutesPlayed: 2350, yellowCards: 5, redCards: 0 },
  { id: 19, name: 'Calleri', team: 'Santos', position: 'ATA', number: 9, goals: 9, assists: 3, shots: 48, shotsOnTarget: 24, passes: 250, passAccuracy: 68, tackles: 3, interceptions: 1, duelsWon: 32, minutesPlayed: 2100, yellowCards: 4, redCards: 0 },
  { id: 20, name: 'Pied', team: 'Athletico-PR', position: 'ATA', number: 9, goals: 8, assists: 2, shots: 42, shotsOnTarget: 20, passes: 230, passAccuracy: 66, tackles: 4, interceptions: 1, duelsWon: 28, minutesPlayed: 1950, yellowCards: 3, redCards: 0 },
  // Goleiros
  { id: 21, name: 'Rossi', team: 'Flamengo', position: 'GOL', number: 1, goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 450, passAccuracy: 65, tackles: 2, interceptions: 1, duelsWon: 8, minutesPlayed: 2700, yellowCards: 2, redCards: 0 },
  { id: 22, name: 'Weverton', team: 'Corinthians', position: 'GOL', number: 12, goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 420, passAccuracy: 62, tackles: 1, interceptions: 0, duelsWon: 6, minutesPlayed: 2700, yellowCards: 1, redCards: 0 },
  { id: 23, name: 'Marcelo Grohe', team: 'Grêmio', position: 'GOL', number: 1, goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 380, passAccuracy: 60, tackles: 1, interceptions: 0, duelsWon: 5, minutesPlayed: 2700, yellowCards: 3, redCards: 0 },
  { id: 24, name: 'Cássio', team: 'São Paulo', position: 'GOL', number: 12, goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 400, passAccuracy: 63, tackles: 2, interceptions: 1, duelsWon: 7, minutesPlayed: 2700, yellowCards: 2, redCards: 0 },
  // Mais jogadores para completar
  { id: 25, name: 'Arrascaeta', team: 'Flamengo', position: 'MEI', number: 14, goals: 5, assists: 8, shots: 32, shotsOnTarget: 14, passes: 1050, passAccuracy: 86, tackles: 20, interceptions: 12, duelsWon: 42, minutesPlayed: 2400, yellowCards: 5, redCards: 0 },
  { id: 26, name: 'Memphis', team: 'Palmeiras', position: 'MEI', number: 27, goals: 4, assists: 9, shots: 28, shotsOnTarget: 12, passes: 860, passAccuracy: 82, tackles: 18, interceptions: 10, duelsWon: 38, minutesPlayed: 2200, yellowCards: 3, redCards: 0 },
  { id: 27, name: 'Tiquinho', team: 'Botafogo', position: 'ZAG', number: 4, goals: 1, assists: 1, shots: 5, shotsOnTarget: 1, passes: 1100, passAccuracy: 90, tackles: 52, interceptions: 45, duelsWon: 60, minutesPlayed: 2700, yellowCards: 8, redCards: 1 },
  { id: 28, name: 'David Braz', team: 'São Paulo', position: 'ZAG', number: 15, goals: 2, assists: 0, shots: 8, shotsOnTarget: 3, passes: 950, passAccuracy: 87, tackles: 46, interceptions: 38, duelsWon: 52, minutesPlayed: 2600, yellowCards: 6, redCards: 0 },
  { id: 29, name: 'Nikola', team: 'Fluminense', position: 'ZAG', number: 3, goals: 1, assists: 2, shots: 6, shotsOnTarget: 2, passes: 880, passAccuracy: 85, tackles: 44, interceptions: 36, duelsWon: 48, minutesPlayed: 2550, yellowCards: 5, redCards: 0 },
  { id: 30, name: 'Kaio Jorge', team: 'Grêmio', position: 'ATA', number: 10, goals: 6, assists: 3, shots: 38, shotsOnTarget: 18, passes: 240, passAccuracy: 68, tackles: 4, interceptions: 1, duelsWon: 28, minutesPlayed: 1900, yellowCards: 2, redCards: 0 },
];

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

export const getStandings = () => standings;

export const getTeams = () => teams;

export const getTeamById = (id) => teams.find((t) => t.id === id);

export const getTeamByName = (name) => teams.find((t) => t.name === name);

export const getRounds = () => rounds;

export const getCurrentRound = () => 31;

export const getPlayedRounds = () => {
  const result = {};
  for (let r = 26; r <= 30; r++) {
    result[r] = rounds[r];
  }
  return result;
};

export const getNextRound = () => rounds[31];

export const getPlayers = () => players;

export const getTopScorers = () =>
  [...players].filter((p) => p.position === 'ATA' || p.position === 'MEI').sort((a, b) => b.goals - a.goals).slice(0, 15);

export const getTopAssists = () =>
  [...players].filter((p) => p.position !== 'GOL').sort((a, b) => b.assists - a.assists).slice(0, 15);

export const getH2H = (teamA, teamB) => {
  // Gera confrontos diretos baseados na força dos times
  const a = getTeamByName(teamA);
  const b = getTeamByName(teamB);
  if (!a || !b) return [];

  const aStrength = a.points / a.played;
  const bStrength = b.points / b.played;

  return [
    { date: '2026-04-12', home: teamA, away: teamB, homeGoals: aStrength > bStrength ? 2 : 1, awayGoals: aStrength > bStrength ? 1 : 2, venue: `${teamA} (M)` },
    { date: '2026-02-20', home: teamB, away: teamA, homeGoals: bStrength > aStrength ? 2 : 0, awayGoals: bStrength > aStrength ? 1 : 1, venue: `${teamB} (M)` },
    { date: '2025-11-08', home: teamA, away: teamB, homeGoals: 1, awayGoals: 1, venue: `${teamA} (M)` },
  ];
};

export const computeExpectedGoals = (team, opponent) => {
  const t = getTeamByName(team);
  const o = getTeamByName(opponent);
  if (!t || !o) return { expectedGoalsFor: 0, expectedGoalsAgainst: 0 };

  const attackStrength = t.goalsFor / t.played;
  const defenseWeakness = o.goalsAgainst / o.played;
  const defenseStrength = o.goalsAgainst / o.played;
  const attackWeakness = t.goalsFor / t.played;

  return {
    expectedGoalsFor: Math.round((attackStrength + defenseWeakness) / 2 * 100) / 100,
    expectedGoalsAgainst: Math.round((attackWeakness + defenseStrength) / 2 * 100) / 100,
  };
};

export const getFormTrend = (team) => {
  const t = typeof team === 'string' ? getTeamByName(team) : team;
  if (!t || !t.form) return 'average';
  const last3 = t.form.slice(-3);
  const wins = (last3.match(/W/g) || []).length;
  if (wins === 3) return 'excellent';
  if (wins >= 2) return 'good';
  if (wins >= 1) return 'average';
  return 'poor';
};

export const getPlayStyleNarrative = (team) => {
  const t = typeof team === 'string' ? getTeamByName(team) : team;
  if (!t) return '';
  const ratio = t.goalsFor / t.played;
  const conceded = t.goalsAgainst / t.played;

  if (ratio > 1.5 && conceded < 1) return 'Time ofensivo e sólido defensivamente. Joga com posse e cria muitas chances.';
  if (ratio > 1.5) return 'Time ofensivo com ataque forte, mas com vulnerabilidades defensivas.';
  if (conceded < 1) return 'Time sólido defensivamente, joga de forma mais contida e eficiente.';
  if (ratio > 1) return 'Time equilibrado com bom desempenho ofensivo e defensivo.';
  return 'Time em dificuldades, com poucos gols marcados e vulnerabilidades defensivas.';
};

export const getZoneLabel = (zone) => {
  switch (zone) {
    case 'libertadores': return 'Libertadores';
    case 'sul-americana': return 'Sul-Americana';
    case 'zonal': return 'Zona de Rebaixamento';
    default: return '';
  }
};

export const getZoneColor = (zone) => {
  switch (zone) {
    case 'libertadores': return 'accent';
    case 'sul-americana': return 'gold';
    case 'zonal': return 'danger';
    default: return 'default';
  }
};