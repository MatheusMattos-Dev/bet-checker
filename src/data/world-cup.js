// Copa do Mundo 2026 — Fase atual: Semifinais (13 de julho)
// Quartas concluídas. Semifinais: 14 e 15 de julho.

// Times classificados nas oitavas (16 times)
const teams = [
  {
    id: 'wc26-esp', name: 'Espanha', flag: '🇪🇸',
    status: 'Classificada',
    played: 7, won: 5, drawn: 1, lost: 1,
    goalsFor: 12, goalsAgainst: 4, points: 16,
    shots: 98, shotsOnTarget: 48, assists: 10,
    shotsConceded: 42, tackles: 96, interceptions: 62,
    yellowCards: 6, redCards: 0,
    form: 'WWWWW',
    lastMatches: [
      { date: '2026-07-10', opponent: 'Bélgica', flag: '🇧🇪', result: 'W', gf: 2, ga: 1, stage: 'Quartas (pror.)' },
      { date: '2026-07-06', opponent: 'Portugal', flag: '🇵🇹', result: 'W', gf: 1, ga: 0, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Áustria', flag: '🇦🇹', result: 'W', gf: 3, ga: 0, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Japão', flag: '🇯🇵', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'Costa Rica', flag: '🇨🇷', result: 'W', gf: 3, ga: 0, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-bel', name: 'Bélgica', flag: '🇧🇪',
    status: 'Classificada',
    played: 7, won: 5, drawn: 1, lost: 1,
    goalsFor: 14, goalsAgainst: 5, points: 16,
    shots: 92, shotsOnTarget: 46, assists: 11,
    shotsConceded: 38, tackles: 88, interceptions: 56,
    yellowCards: 5, redCards: 0,
    form: 'WWWLW',
    lastMatches: [
      { date: '2026-07-06', opponent: 'EUA', flag: '🇺🇸', result: 'W', gf: 4, ga: 1, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Senegal', flag: '🇸🇳', result: 'W', gf: 3, ga: 2, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Uruguai', flag: '🇺🇾', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'Coreia do Sul', flag: '🇰🇷', result: 'W', gf: 3, ga: 1, stage: 'Grupo' },
      { date: '2026-06-16', opponent: 'Irã', flag: '🇮🇷', result: 'D', gf: 1, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-nor', name: 'Noruega', flag: '🇳🇴',
    status: 'Classificada',
    played: 7, won: 5, drawn: 1, lost: 1,
    goalsFor: 11, goalsAgainst: 4, points: 16,
    shots: 86, shotsOnTarget: 42, assists: 8,
    shotsConceded: 36, tackles: 92, interceptions: 58,
    yellowCards: 4, redCards: 0,
    form: 'WWWLW',
    lastMatches: [
      { date: '2026-07-06', opponent: 'Brasil', flag: '🇧🇷', result: 'W', gf: 2, ga: 1, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Costa do Marfim', flag: '🇨🇮', result: 'W', gf: 2, ga: 1, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Japão', flag: '🇯🇵', result: 'W', gf: 2, ga: 1, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'Itália', flag: '🇮🇹', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
      { date: '2026-06-16', opponent: 'Alemanha', flag: '🇩🇪', result: 'L', gf: 0, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-eng', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    status: 'Classificada',
    played: 7, won: 6, drawn: 0, lost: 1,
    goalsFor: 13, goalsAgainst: 5, points: 18,
    shots: 102, shotsOnTarget: 52, assists: 12,
    shotsConceded: 34, tackles: 84, interceptions: 52,
    yellowCards: 3, redCards: 0,
    form: 'WWWWW',
    lastMatches: [
      { date: '2026-07-11', opponent: 'Noruega', flag: '🇳🇴', result: 'W', gf: 2, ga: 1, stage: 'Quartas (pror.)' },
      { date: '2026-07-06', opponent: 'México', flag: '🇲🇽', result: 'W', gf: 3, ga: 2, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Congo DR', flag: '🇨🇩', result: 'W', gf: 2, ga: 1, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Austrália', flag: '🇦🇺', result: 'W', gf: 3, ga: 1, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'Uganda', flag: '🇺🇬', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-fra', name: 'França', flag: '🇫🇷',
    status: 'Classificada',
    played: 7, won: 5, drawn: 1, lost: 1,
    goalsFor: 10, goalsAgainst: 3, points: 16,
    shots: 88, shotsOnTarget: 44, assists: 9,
    shotsConceded: 30, tackles: 90, interceptions: 60,
    yellowCards: 4, redCards: 0,
    form: 'WWWWW',
    lastMatches: [
      { date: '2026-07-09', opponent: 'Marrocos', flag: '🇲🇦', result: 'W', gf: 2, ga: 0, stage: 'Quartas' },
      { date: '2026-07-06', opponent: 'Paraguai', flag: '🇵🇾', result: 'W', gf: 1, ga: 0, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Suécia', flag: '🇸🇪', result: 'W', gf: 3, ga: 0, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Jordânia', flag: '🇯🇴', result: 'W', gf: 3, ga: 0, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'México', flag: '🇲🇽', result: 'W', gf: 2, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-mar', name: 'Marrocos', flag: '🇲🇦',
    status: 'Classificada',
    played: 7, won: 5, drawn: 1, lost: 1,
    goalsFor: 9, goalsAgainst: 4, points: 16,
    shots: 76, shotsOnTarget: 36, assists: 7,
    shotsConceded: 32, tackles: 102, interceptions: 68,
    yellowCards: 5, redCards: 0,
    form: 'WWWLW',
    lastMatches: [
      { date: '2026-07-06', opponent: 'Canadá', flag: '🇨🇦', result: 'W', gf: 3, ga: 0, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Holanda', flag: '🇳🇱', result: 'D', gf: 1, ga: 1, stage: 'R32 (pên.)' },
      { date: '2026-06-26', opponent: 'Sérvia', flag: '🇷🇸', result: 'W', gf: 1, ga: 0, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'Brasil', flag: '🇧🇷', result: 'W', gf: 1, ga: 0, stage: 'Grupo' },
      { date: '2026-06-16', opponent: 'Portugal', flag: '🇵🇹', result: 'L', gf: 0, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-arg', name: 'Argentina', flag: '🇦🇷',
    status: 'Classificada',
    played: 8, won: 6, drawn: 1, lost: 1,
    goalsFor: 13, goalsAgainst: 5, points: 19,
    shots: 94, shotsOnTarget: 48, assists: 10,
    shotsConceded: 34, tackles: 86, interceptions: 54,
    yellowCards: 5, redCards: 0,
    form: 'WWWWLWW',
    lastMatches: [
      { date: '2026-07-11', opponent: 'Suíça', flag: '🇨🇭', result: 'W', gf: 3, ga: 1, stage: 'Quartas (pror.)' },
      { date: '2026-07-07', opponent: 'Egito', flag: '🇪🇬', result: 'W', gf: 3, ga: 2, stage: 'Oitavas (pror.)' },
      { date: '2026-07-05', opponent: 'Cabo Verde', flag: '🇨🇻', result: 'W', gf: 3, ga: 2, stage: 'R32 (pror.)' },
      { date: '2026-07-01', opponent: 'França', flag: '🇫🇷', result: 'W', gf: 2, ga: 1, stage: 'Grupo' },
      { date: '2026-06-26', opponent: 'México', flag: '🇲🇽', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'Jordânia', flag: '🇯🇴', result: 'D', gf: 0, ga: 0, stage: 'Grupo' },
      { date: '2026-06-16', opponent: 'Colômbia', flag: '🇨🇴', result: 'L', gf: 1, ga: 2, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-sui', name: 'Suíça', flag: '🇨🇭',
    status: 'Classificada',
    played: 7, won: 4, drawn: 2, lost: 1,
    goalsFor: 7, goalsAgainst: 4, points: 14,
    shots: 72, shotsOnTarget: 34, assists: 6,
    shotsConceded: 30, tackles: 98, interceptions: 64,
    yellowCards: 4, redCards: 0,
    form: 'DWDWW',
    lastMatches: [
      { date: '2026-07-07', opponent: 'Colômbia', flag: '🇨🇴', result: 'W', gf: 0, ga: 0, stage: 'Oitavas (pên.)' },
      { date: '2026-07-01', opponent: 'Argélia', flag: '🇩🇿', result: 'W', gf: 2, ga: 0, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Paraguai', flag: '🇵🇾', result: 'D', gf: 1, ga: 1, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'Egito', flag: '🇪🇬', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
      { date: '2026-06-16', opponent: 'Itália', flag: '🇮🇹', result: 'L', gf: 0, ga: 1, stage: 'Grupo' },
    ],
  },
];

// Times eliminados no Round of 32
const eliminatedR32 = [
  { id: 'wc26-saf', name: 'África do Sul', flag: '🇿🇦', eliminatedBy: 'Canadá', score: '0-1' },
  { id: 'wc26-bih', name: 'Bósnia', flag: '🇧🇦', eliminatedBy: 'EUA', score: '0-2' },
  { id: 'wc26-aut', name: 'Áustria', flag: '🇦🇹', eliminatedBy: 'Espanha', score: '0-3' },
  { id: 'wc26-cro', name: 'Croácia', flag: '🇭🇷', eliminatedBy: 'Portugal', score: '1-2' },
  { id: 'wc26-alg', name: 'Argélia', flag: '🇩🇿', eliminatedBy: 'Suíça', score: '0-2' },
  { id: 'wc26-cod', name: 'Congo DR', flag: '🇨🇩', eliminatedBy: 'Inglaterra', score: '1-2' },
  { id: 'wc26-sen', name: 'Senegal', flag: '🇸🇳', eliminatedBy: 'Bélgica', score: '2-3' },
  { id: 'wc26-civ', name: 'Costa do Marfim', flag: '🇨🇮', eliminatedBy: 'Noruega', score: '1-2' },
  { id: 'wc26-swe', name: 'Suécia', flag: '🇸🇪', eliminatedBy: 'França', score: '0-3' },
  { id: 'wc26-ger', name: 'Alemanha', flag: '🇩🇪', eliminatedBy: 'Paraguai', score: '1-1 (3-4 p)' },
  { id: 'wc26-ned', name: 'Holanda', flag: '🇳🇱', eliminatedBy: 'Marrocos', score: '1-1 (2-3 p)' },
  { id: 'wc26-cpv', name: 'Cabo Verde', flag: '🇨🇻', eliminatedBy: 'Argentina', score: '2-3' },
  { id: 'wc26-aus', name: 'Austrália', flag: '🇦🇺', eliminatedBy: 'Egito', score: '1-1 (2-4 p)' },
  { id: 'wc26-gha', name: 'Gana', flag: '🇬🇭', eliminatedBy: 'Colômbia', score: '0-1' },
  { id: 'wc26-uru', name: 'Uruguai', flag: '🇺🇾', eliminatedBy: 'Japão', score: '0-1' },
  { id: 'wc26-jpn', name: 'Japão', flag: '🇯🇵', eliminatedBy: 'Espanha', score: '0-2' },
];

// Times eliminados nas oitavas
const eliminatedR16 = [
  { id: 'wc26-por', name: 'Portugal', flag: '🇵🇹', eliminatedBy: 'Espanha', score: '0-1' },
  { id: 'wc26-usa', name: 'EUA', flag: '🇺🇸', eliminatedBy: 'Bélgica', score: '1-4' },
  { id: 'wc26-bra', name: 'Brasil', flag: '🇧🇷', eliminatedBy: 'Noruega', score: '1-2' },
  { id: 'wc26-mex', name: 'México', flag: '🇲🇽', eliminatedBy: 'Inglaterra', score: '2-3' },
  { id: 'wc26-py', name: 'Paraguai', flag: '🇵🇾', eliminatedBy: 'França', score: '0-1' },
  { id: 'wc26-can', name: 'Canadá', flag: '🇨🇦', eliminatedBy: 'Marrocos', score: '0-3' },
  { id: 'wc26-egy', name: 'Egito', flag: '🇪🇬', eliminatedBy: 'Argentina', score: '2-3' },
  { id: 'wc26-col', name: 'Colômbia', flag: '🇨🇴', eliminatedBy: 'Suíça', score: '0-0 (pên.)' },
];

// Times eliminados nas quartas (definidos após semifinais)
const roundOf32 = [
  { date: '2026-07-01', home: 'Espanha', away: 'Áustria', homeGoals: 3, awayGoals: 0, venue: 'Nova York' },
  { date: '2026-07-01', home: 'Bélgica', away: 'Senegal', homeGoals: 3, awayGoals: 2, venue: 'Los Angeles' },
  { date: '2026-07-02', home: 'Noruega', away: 'Costa do Marfim', homeGoals: 2, awayGoals: 1, venue: 'Dallas' },
  { date: '2026-07-02', home: 'Inglaterra', away: 'Congo DR', homeGoals: 2, awayGoals: 1, venue: 'Miami' },
  { date: '2026-07-02', home: 'França', away: 'Suécia', homeGoals: 3, awayGoals: 0, venue: 'Atlanta' },
  { date: '2026-07-03', home: 'Marrocos', away: 'Holanda', homeGoals: 1, awayGoals: 1, venue: 'Houston', penalties: true },
  { date: '2026-07-03', home: 'Argentina', away: 'Cabo Verde', homeGoals: 3, awayGoals: 2, venue: 'Chicago' },
  { date: '2026-07-03', home: 'Suíça', away: 'Argélia', homeGoals: 2, awayGoals: 0, venue: 'Vancouver' },
];

// Resultados das oitavas
const roundOf16 = [
  { date: '2026-07-06', home: 'Espanha', away: 'Portugal', homeGoals: 1, awayGoals: 0, venue: 'Miami' },
  { date: '2026-07-06', home: 'Bélgica', away: 'EUA', homeGoals: 4, awayGoals: 1, venue: 'Nova York' },
  { date: '2026-07-06', home: 'Noruega', away: 'Brasil', homeGoals: 2, awayGoals: 1, venue: 'Los Angeles' },
  { date: '2026-07-06', home: 'Inglaterra', away: 'México', homeGoals: 3, awayGoals: 2, venue: 'Chicago' },
  { date: '2026-07-06', home: 'França', away: 'Paraguai', homeGoals: 1, awayGoals: 0, venue: 'Dallas' },
  { date: '2026-07-06', home: 'Marrocos', away: 'Canadá', homeGoals: 3, awayGoals: 0, venue: 'Toronto' },
  { date: '2026-07-07', home: 'Argentina', away: 'Egito', homeGoals: 3, awayGoals: 2, venue: 'Atlanta', extraTime: true },
  { date: '2026-07-07', home: 'Suíça', away: 'Colômbia', homeGoals: 0, awayGoals: 0, venue: 'Vancouver', penalties: true },
];

// Quartas de final — resultados
const quarterfinals = [
  { date: '2026-07-09', home: 'França', away: 'Marrocos', venue: 'Houston', homeGoals: 2, awayGoals: 0, status: 'finalizado' },
  { date: '2026-07-10', home: 'Espanha', away: 'Bélgica', venue: 'Los Angeles', homeGoals: 2, awayGoals: 1, extraTime: true, status: 'finalizado' },
  { date: '2026-07-11', home: 'Noruega', away: 'Inglaterra', venue: 'Miami', homeGoals: 1, awayGoals: 2, extraTime: true, status: 'finalizado' },
  { date: '2026-07-11', home: 'Argentina', away: 'Suíça', venue: 'Kansas City', homeGoals: 3, awayGoals: 1, extraTime: true, status: 'finalizado' },
];

// Semifinais — programadas
const semifinals = [
  { date: '2026-07-14', home: 'França', away: 'Espanha', venue: 'Arlington', status: 'agendada' },
  { date: '2026-07-15', home: 'Inglaterra', away: 'Argentina', venue: 'Atlanta', status: 'agendada' },
];

// Times eliminados nas quartas
const eliminatedQF = [
  { id: 'wc26-mar', name: 'Marrocos', flag: '🇲🇦', stage: 'Quartas', opponent: 'França', score: '0-2' },
  { id: 'wc26-bel', name: 'Bélgica', flag: '🇧🇪', stage: 'Quartas', opponent: 'Espanha', score: '1-2 (pror.)' },
  { id: 'wc26-nor', name: 'Noruega', flag: '🇳🇴', stage: 'Quartas', opponent: 'Inglaterra', score: '1-2 (pror.)' },
  { id: 'wc26-sui', name: 'Suíça', flag: '🇨🇭', stage: 'Quartas', opponent: 'Argentina', score: '1-3 (pror.)' },
];

// Key players per team — stats acumuladas no torneio
const players = [
  // === ESPANHA ===
  { id: 'p1', name: 'Fabián Ruiz', team: 'Espanha', position: 'Meia', number: 10, photo: '',
    goals: 3, assists: 1, shots: 14, shotsOnTarget: 8, passes: 268, passAccuracy: 86,
    tackles: 8, interceptions: 4, duelsWon: 28, minutesPlayed: 520, yellowCards: 1, redCards: 0 },
  { id: 'p2', name: 'Nico Williams', team: 'Espanha', position: 'Meia', number: 17, photo: '',
    goals: 1, assists: 2, shots: 10, shotsOnTarget: 4, passes: 176, passAccuracy: 78,
    tackles: 6, interceptions: 3, duelsWon: 34, minutesPlayed: 540, yellowCards: 0, redCards: 0 },
  { id: 'p3', name: 'Mikel Oyarzabal', team: 'Espanha', position: 'Atacante', number: 21, photo: '',
    goals: 2, assists: 1, shots: 12, shotsOnTarget: 6, passes: 118, passAccuracy: 74,
    tackles: 2, interceptions: 0, duelsWon: 20, minutesPlayed: 420, yellowCards: 0, redCards: 0 },
  { id: 'p4', name: 'Rodri', team: 'Espanha', position: 'Meia', number: 8, photo: '',
    goals: 1, assists: 1, shots: 6, shotsOnTarget: 2, passes: 590, passAccuracy: 90,
    tackles: 16, interceptions: 10, duelsWon: 34, minutesPlayed: 630, yellowCards: 2, redCards: 0 },
  { id: 'p5', name: 'Aymeric Laporte', team: 'Espanha', position: 'Defensor', number: 14, photo: '',
    goals: 1, assists: 0, shots: 3, shotsOnTarget: 1, passes: 372, passAccuracy: 89,
    tackles: 20, interceptions: 14, duelsWon: 30, minutesPlayed: 630, yellowCards: 1, redCards: 0 },
  { id: 'p6', name: 'Dani Olmo', team: 'Espanha', position: 'Meia', number: 16, photo: '',
    goals: 1, assists: 2, shots: 8, shotsOnTarget: 3, passes: 154, passAccuracy: 78,
    tackles: 4, interceptions: 2, duelsWon: 22, minutesPlayed: 420, yellowCards: 0, redCards: 0 },
  { id: 'p42', name: 'Lamine Yamal', team: 'Espanha', position: 'Atacante', number: 19, photo: '',
    goals: 2, assists: 3, shots: 14, shotsOnTarget: 7, passes: 168, passAccuracy: 76,
    tackles: 4, interceptions: 1, duelsWon: 30, minutesPlayed: 520, yellowCards: 1, redCards: 0 },
  { id: 'p43', name: 'Pedri', team: 'Espanha', position: 'Meia', number: 9, photo: '',
    goals: 1, assists: 2, shots: 6, shotsOnTarget: 2, passes: 312, passAccuracy: 89,
    tackles: 10, interceptions: 4, duelsWon: 26, minutesPlayed: 560, yellowCards: 0, redCards: 0 },

  // === BÉLGICA ===
  { id: 'p7', name: 'Romelu Lukaku', team: 'Bélgica', position: 'Atacante', number: 9, photo: '',
    goals: 5, assists: 2, shots: 20, shotsOnTarget: 12, passes: 108, passAccuracy: 70,
    tackles: 2, interceptions: 0, duelsWon: 32, minutesPlayed: 590, yellowCards: 1, redCards: 0 },
  { id: 'p8', name: 'Kevin De Bruyne', team: 'Bélgica', position: 'Meia', number: 7, photo: '',
    goals: 1, assists: 4, shots: 10, shotsOnTarget: 4, passes: 336, passAccuracy: 86,
    tackles: 8, interceptions: 4, duelsWon: 28, minutesPlayed: 610, yellowCards: 1, redCards: 0 },
  { id: 'p9', name: 'Loïs Openda', team: 'Bélgica', position: 'Atacante', number: 11, photo: '',
    goals: 3, assists: 1, shots: 14, shotsOnTarget: 7, passes: 118, passAccuracy: 72,
    tackles: 3, interceptions: 1, duelsWon: 22, minutesPlayed: 460, yellowCards: 0, redCards: 0 },
  { id: 'p10', name: 'Jérémy Doku', team: 'Bélgica', position: 'Meia', number: 21, photo: '',
    goals: 1, assists: 3, shots: 8, shotsOnTarget: 3, passes: 186, passAccuracy: 78,
    tackles: 6, interceptions: 2, duelsWon: 30, minutesPlayed: 540, yellowCards: 0, redCards: 0 },
  { id: 'p11', name: 'Amadou Onana', team: 'Bélgica', position: 'Meia', number: 6, photo: '',
    goals: 1, assists: 0, shots: 5, shotsOnTarget: 2, passes: 298, passAccuracy: 85,
    tackles: 22, interceptions: 16, duelsWon: 36, minutesPlayed: 570, yellowCards: 1, redCards: 0 },
  { id: 'p44', name: 'Charles De Ketelaere', team: 'Bélgica', position: 'Meia', number: 10, photo: '',
    goals: 2, assists: 2, shots: 10, shotsOnTarget: 4, passes: 176, passAccuracy: 80,
    tackles: 4, interceptions: 2, duelsWon: 22, minutesPlayed: 440, yellowCards: 0, redCards: 0 },
  { id: 'p45', name: 'Leandro Trossard', team: 'Bélgica', position: 'Atacante', number: 11, photo: '',
    goals: 1, assists: 1, shots: 8, shotsOnTarget: 3, passes: 112, passAccuracy: 74,
    tackles: 2, interceptions: 0, duelsWon: 16, minutesPlayed: 320, yellowCards: 0, redCards: 0 },

  // === NORUEGA ===
  { id: 'p12', name: 'Erling Haaland', team: 'Noruega', position: 'Atacante', number: 9, photo: '',
    goals: 8, assists: 1, shots: 34, shotsOnTarget: 22, passes: 86, passAccuracy: 64,
    tackles: 1, interceptions: 0, duelsWon: 30, minutesPlayed: 590, yellowCards: 0, redCards: 0 },
  { id: 'p13', name: 'Martin Ødegaard', team: 'Noruega', position: 'Meia', number: 10, photo: '',
    goals: 0, assists: 3, shots: 8, shotsOnTarget: 3, passes: 328, passAccuracy: 87,
    tackles: 6, interceptions: 3, duelsWon: 24, minutesPlayed: 620, yellowCards: 1, redCards: 0 },
  { id: 'p14', name: 'Alexander Sørloth', team: 'Noruega', position: 'Atacante', number: 19, photo: '',
    goals: 2, assists: 1, shots: 11, shotsOnTarget: 5, passes: 92, passAccuracy: 68,
    tackles: 2, interceptions: 1, duelsWon: 18, minutesPlayed: 360, yellowCards: 1, redCards: 0 },
  { id: 'p15', name: 'Jonas Østberg Aarflot', team: 'Noruega', position: 'Defensor', number: 4, photo: '',
    goals: 0, assists: 1, shots: 2, shotsOnTarget: 0, passes: 312, passAccuracy: 86,
    tackles: 14, interceptions: 8, duelsWon: 24, minutesPlayed: 580, yellowCards: 1, redCards: 0 },
  { id: 'p16', name: 'Ørjan Hareide', team: 'Noruega', position: 'Meia', number: 3, photo: '',
    goals: 0, assists: 2, shots: 3, shotsOnTarget: 1, passes: 264, passAccuracy: 80,
    tackles: 20, interceptions: 10, duelsWon: 30, minutesPlayed: 610, yellowCards: 1, redCards: 0 },
  { id: 'p46', name: 'Sverre Nypan', team: 'Noruega', position: 'Meia', number: 14, photo: '',
    goals: 1, assists: 1, shots: 6, shotsOnTarget: 2, passes: 148, passAccuracy: 76,
    tackles: 8, interceptions: 3, duelsWon: 18, minutesPlayed: 340, yellowCards: 0, redCards: 0 },

  // === INGLATERRA ===
  { id: 'p17', name: 'Harry Kane', team: 'Inglaterra', position: 'Atacante', number: 9, photo: '',
    goals: 5, assists: 2, shots: 26, shotsOnTarget: 16, passes: 148, passAccuracy: 74,
    tackles: 3, interceptions: 1, duelsWon: 40, minutesPlayed: 600, yellowCards: 0, redCards: 0 },
  { id: 'p18', name: 'Bukayo Saka', team: 'Inglaterra', position: 'Meia', number: 7, photo: '',
    goals: 1, assists: 3, shots: 12, shotsOnTarget: 5, passes: 224, passAccuracy: 82,
    tackles: 8, interceptions: 4, duelsWon: 38, minutesPlayed: 620, yellowCards: 1, redCards: 0 },
  { id: 'p19', name: 'Jude Bellingham', team: 'Inglaterra', position: 'Meia', number: 10, photo: '',
    goals: 2, assists: 2, shots: 10, shotsOnTarget: 5, passes: 276, passAccuracy: 84,
    tackles: 12, interceptions: 6, duelsWon: 32, minutesPlayed: 590, yellowCards: 1, redCards: 0 },
  { id: 'p20', name: 'Cole Palmer', team: 'Inglaterra', position: 'Meia', number: 20, photo: '',
    goals: 2, assists: 1, shots: 9, shotsOnTarget: 4, passes: 196, passAccuracy: 80,
    tackles: 4, interceptions: 2, duelsWon: 24, minutesPlayed: 460, yellowCards: 0, redCards: 0 },
  { id: 'p21', name: 'John Stones', team: 'Inglaterra', position: 'Defensor', number: 5, photo: '',
    goals: 1, assists: 0, shots: 4, shotsOnTarget: 2, passes: 352, passAccuracy: 88,
    tackles: 16, interceptions: 12, duelsWon: 26, minutesPlayed: 630, yellowCards: 1, redCards: 0 },
  { id: 'p47', name: 'Declan Rice', team: 'Inglaterra', position: 'Meia', number: 4, photo: '',
    goals: 1, assists: 1, shots: 6, shotsOnTarget: 2, passes: 336, passAccuracy: 87,
    tackles: 20, interceptions: 12, duelsWon: 34, minutesPlayed: 600, yellowCards: 1, redCards: 0 },
  { id: 'p48', name: 'Ollie Watkins', team: 'Inglaterra', position: 'Atacante', number: 11, photo: '',
    goals: 1, assists: 1, shots: 10, shotsOnTarget: 5, passes: 108, passAccuracy: 72,
    tackles: 3, interceptions: 1, duelsWon: 20, minutesPlayed: 380, yellowCards: 0, redCards: 0 },

  // === FRANÇA ===
  { id: 'p22', name: 'Kylian Mbappé', team: 'França', position: 'Atacante', number: 7, photo: '',
    goals: 8, assists: 2, shots: 28, shotsOnTarget: 16, passes: 168, passAccuracy: 76,
    tackles: 3, interceptions: 1, duelsWon: 36, minutesPlayed: 590, yellowCards: 1, redCards: 0 },
  { id: 'p23', name: 'Ousmane Dembélé', team: 'França', position: 'Meia', number: 10, photo: '',
    goals: 0, assists: 3, shots: 18, shotsOnTarget: 10, passes: 204, passAccuracy: 78,
    tackles: 5, interceptions: 2, duelsWon: 32, minutesPlayed: 560, yellowCards: 0, redCards: 0 },
  { id: 'p24', name: 'Aurélien Tchouaméni', team: 'França', position: 'Meia', number: 8, photo: '',
    goals: 0, assists: 1, shots: 6, shotsOnTarget: 2, passes: 364, passAccuracy: 87,
    tackles: 18, interceptions: 12, duelsWon: 32, minutesPlayed: 610, yellowCards: 2, redCards: 0 },
  { id: 'p25', name: 'William Saliba', team: 'França', position: 'Defensor', number: 4, photo: '',
    goals: 1, assists: 0, shots: 2, shotsOnTarget: 1, passes: 378, passAccuracy: 89,
    tackles: 22, interceptions: 16, duelsWon: 30, minutesPlayed: 630, yellowCards: 1, redCards: 0 },
  { id: 'p26', name: 'Marcus Thuram', team: 'França', position: 'Atacante', number: 11, photo: '',
    goals: 1, assists: 1, shots: 8, shotsOnTarget: 4, passes: 112, passAccuracy: 72,
    tackles: 2, interceptions: 1, duelsWon: 18, minutesPlayed: 380, yellowCards: 0, redCards: 0 },
  { id: 'p49', name: 'N\'Golo Kanté', team: 'França', position: 'Meia', number: 13, photo: '',
    goals: 0, assists: 1, shots: 3, shotsOnTarget: 1, passes: 268, passAccuracy: 86,
    tackles: 24, interceptions: 14, duelsWon: 36, minutesPlayed: 540, yellowCards: 1, redCards: 0 },
  { id: 'p50', name: 'Adrien Rabiot', team: 'França', position: 'Meia', number: 14, photo: '',
    goals: 0, assists: 0, shots: 5, shotsOnTarget: 2, passes: 246, passAccuracy: 84,
    tackles: 14, interceptions: 8, duelsWon: 26, minutesPlayed: 480, yellowCards: 0, redCards: 0 },
  { id: 'p51', name: 'Christopher Kolo Muani', team: 'França', position: 'Atacante', number: 15, photo: '',
    goals: 0, assists: 1, shots: 7, shotsOnTarget: 3, passes: 86, passAccuracy: 70,
    tackles: 2, interceptions: 0, duelsWon: 14, minutesPlayed: 280, yellowCards: 0, redCards: 0 },
  { id: 'p59', name: 'Michael Olise', team: 'França', position: 'Meia', number: 17, photo: '',
    goals: 0, assists: 5, shots: 12, shotsOnTarget: 5, passes: 196, passAccuracy: 80,
    tackles: 6, interceptions: 3, duelsWon: 28, minutesPlayed: 540, yellowCards: 0, redCards: 0 },

  // === MARROCOS ===
  { id: 'p27', name: 'Achraf Hakimi', team: 'Marrocos', position: 'Defensor', number: 2, photo: '',
    goals: 1, assists: 2, shots: 4, shotsOnTarget: 1, passes: 296, passAccuracy: 80,
    tackles: 20, interceptions: 14, duelsWon: 34, minutesPlayed: 620, yellowCards: 2, redCards: 0 },
  { id: 'p28', name: 'Youssef En-Nesyri', team: 'Marrocos', position: 'Atacante', number: 9, photo: '',
    goals: 3, assists: 0, shots: 12, shotsOnTarget: 5, passes: 96, passAccuracy: 66,
    tackles: 2, interceptions: 0, duelsWon: 20, minutesPlayed: 460, yellowCards: 1, redCards: 0 },
  { id: 'p29', name: 'Ismael Saibari', team: 'Marrocos', position: 'Meia', number: 19, photo: '',
    goals: 3, assists: 2, shots: 12, shotsOnTarget: 6, passes: 136, passAccuracy: 74,
    tackles: 6, interceptions: 2, duelsWon: 28, minutesPlayed: 420, yellowCards: 0, redCards: 0 },
  { id: 'p30', name: 'Brahim Díaz', team: 'Marrocos', position: 'Meia', number: 10, photo: '',
    goals: 2, assists: 4, shots: 10, shotsOnTarget: 4, passes: 216, passAccuracy: 82,
    tackles: 6, interceptions: 2, duelsWon: 28, minutesPlayed: 540, yellowCards: 0, redCards: 0 },
  { id: 'p31', name: 'Yassine Bounou', team: 'Marrocos', position: 'Goleiro', number: 1, photo: '',
    goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 172, passAccuracy: 60,
    tackles: 0, interceptions: 2, duelsWon: 4, minutesPlayed: 630, yellowCards: 0, redCards: 0 },
  { id: 'p52', name: 'Sofyan Amrabat', team: 'Marrocos', position: 'Meia', number: 4, photo: '',
    goals: 0, assists: 1, shots: 4, shotsOnTarget: 1, passes: 312, passAccuracy: 84,
    tackles: 22, interceptions: 14, duelsWon: 38, minutesPlayed: 580, yellowCards: 2, redCards: 0 },
  { id: 'p53', name: 'Selim Amallah', team: 'Marrocos', position: 'Defensor', number: 6, photo: '',
    goals: 0, assists: 0, shots: 2, shotsOnTarget: 0, passes: 286, passAccuracy: 82,
    tackles: 18, interceptions: 12, duelsWon: 26, minutesPlayed: 560, yellowCards: 1, redCards: 0 },

  // === ARGENTINA ===
  { id: 'p32', name: 'Lionel Messi', team: 'Argentina', position: 'Meia', number: 10, photo: '',
    goals: 8, assists: 3, shots: 24, shotsOnTarget: 14, passes: 368, passAccuracy: 88,
    tackles: 4, interceptions: 2, duelsWon: 36, minutesPlayed: 640, yellowCards: 0, redCards: 0 },
  { id: 'p33', name: 'Julián Álvarez', team: 'Argentina', position: 'Atacante', number: 9, photo: '',
    goals: 1, assists: 1, shots: 12, shotsOnTarget: 6, passes: 126, passAccuracy: 74,
    tackles: 4, interceptions: 2, duelsWon: 22, minutesPlayed: 460, yellowCards: 1, redCards: 0 },
  { id: 'p34', name: 'Enzo Fernández', team: 'Argentina', position: 'Meia', number: 23, photo: '',
    goals: 1, assists: 2, shots: 6, shotsOnTarget: 2, passes: 382, passAccuracy: 87,
    tackles: 18, interceptions: 10, duelsWon: 30, minutesPlayed: 640, yellowCards: 2, redCards: 0 },
  { id: 'p35', name: 'Alexis Mac Allister', team: 'Argentina', position: 'Meia', number: 20, photo: '',
    goals: 0, assists: 1, shots: 8, shotsOnTarget: 3, passes: 296, passAccuracy: 85,
    tackles: 14, interceptions: 6, duelsWon: 26, minutesPlayed: 560, yellowCards: 1, redCards: 0 },
  { id: 'p36', name: 'Nicolás Otamendi', team: 'Argentina', position: 'Defensor', number: 19, photo: '',
    goals: 1, assists: 0, shots: 3, shotsOnTarget: 1, passes: 334, passAccuracy: 87,
    tackles: 20, interceptions: 14, duelsWon: 28, minutesPlayed: 640, yellowCards: 1, redCards: 0 },
  { id: 'p54', name: 'Lautaro Martínez', team: 'Argentina', position: 'Atacante', number: 10, photo: '',
    goals: 1, assists: 2, shots: 14, shotsOnTarget: 7, passes: 124, passAccuracy: 74,
    tackles: 4, interceptions: 1, duelsWon: 26, minutesPlayed: 500, yellowCards: 1, redCards: 0 },
  { id: 'p55', name: 'Alejandro Garnacho', team: 'Argentina', position: 'Atacante', number: 17, photo: '',
    goals: 1, assists: 2, shots: 8, shotsOnTarget: 3, passes: 136, passAccuracy: 76,
    tackles: 4, interceptions: 2, duelsWon: 24, minutesPlayed: 420, yellowCards: 0, redCards: 0 },
  { id: 'p56', name: 'Cristian Romero', team: 'Argentina', position: 'Defensor', number: 13, photo: '',
    goals: 0, assists: 0, shots: 2, shotsOnTarget: 0, passes: 312, passAccuracy: 86,
    tackles: 20, interceptions: 14, duelsWon: 28, minutesPlayed: 600, yellowCards: 2, redCards: 0 },

  // === SUÍÇA ===
  { id: 'p37', name: 'Breel Embolo', team: 'Suíça', position: 'Atacante', number: 11, photo: '',
    goals: 3, assists: 1, shots: 10, shotsOnTarget: 5, passes: 98, passAccuracy: 70,
    tackles: 2, interceptions: 0, duelsWon: 18, minutesPlayed: 440, yellowCards: 1, redCards: 0 },
  { id: 'p38', name: 'Manuel Akanji', team: 'Suíça', position: 'Defensor', number: 2, photo: '',
    goals: 1, assists: 0, shots: 2, shotsOnTarget: 1, passes: 348, passAccuracy: 88,
    tackles: 18, interceptions: 12, duelsWon: 28, minutesPlayed: 630, yellowCards: 1, redCards: 0 },
  { id: 'p39', name: 'Remo Freuler', team: 'Suíça', position: 'Meia', number: 7, photo: '',
    goals: 0, assists: 1, shots: 4, shotsOnTarget: 1, passes: 268, passAccuracy: 82,
    tackles: 16, interceptions: 8, duelsWon: 24, minutesPlayed: 580, yellowCards: 1, redCards: 0 },
  { id: 'p40', name: 'Xherdan Shaqiri', team: 'Suíça', position: 'Meia', number: 10, photo: '',
    goals: 2, assists: 2, shots: 8, shotsOnTarget: 3, passes: 162, passAccuracy: 76,
    tackles: 3, interceptions: 2, duelsWon: 20, minutesPlayed: 420, yellowCards: 0, redCards: 0 },
  { id: 'p41', name: 'Silvan Widmer', team: 'Suíça', position: 'Defensor', number: 13, photo: '',
    goals: 0, assists: 1, shots: 2, shotsOnTarget: 0, passes: 284, passAccuracy: 83,
    tackles: 22, interceptions: 14, duelsWon: 30, minutesPlayed: 600, yellowCards: 0, redCards: 0 },
  { id: 'p57', name: 'Dan Ndoye', team: 'Suíça', position: 'Atacante', number: 17, photo: '',
    goals: 1, assists: 1, shots: 7, shotsOnTarget: 3, passes: 96, passAccuracy: 70,
    tackles: 3, interceptions: 1, duelsWon: 16, minutesPlayed: 320, yellowCards: 0, redCards: 0 },
  { id: 'p58', name: 'Fabian Frei', team: 'Suíça', position: 'Meia', number: 10, photo: '',
    goals: 0, assists: 2, shots: 4, shotsOnTarget: 1, passes: 224, passAccuracy: 82,
    tackles: 12, interceptions: 6, duelsWon: 22, minutesPlayed: 480, yellowCards: 0, redCards: 0 },
];

// Contextos das semifinais
const semifinalContexts = [
  {
    id: 'sf1',
    home: 'França',
    away: 'Espanha',
    date: '2026-07-14',
    venue: 'AT&T Stadium, Dallas',
    time: '16h (Brasília)',
    context: 'Espanha busca 38ª partida invicta — recorde absoluto entre seleções',
    highlights: [
      'Espanha está invicta há 37 jogos oficiais (desde junho de 2023)',
      'Campanha inclui Liga das Nações 2023 + Eurocopa 2024',
      'Histórico: Espanha leva com 18 vitórias vs 13 da França, 7 empates (38 jogos)',
      'Nos últimos 10 jogos, Espanha venceu 7, França 2, 1 empate',
      'Mbappé com 8 gols, a um passo de ser artilheiro histórico de Copas',
      'Messi tem 21 gols na história de Copas do Mundo',
      'França busca primeiro título mundial desde 1998'
    ],
    keyPlayers: {
      home: ['Kylian Mbappé (8 gols)', 'Ousmane Dembélé (3 assistências)', 'Marcus Thuram (1 gol)'],
      away: ['Nico Williams (4 gols)', 'Mikel Oyarzabal (3 gols)', 'Fabián Ruiz (3 gols)']
    }
  },
  {
    id: 'sf2',
    home: 'Argentina',
    away: 'Inglaterra',
    date: '2026-07-15',
    venue: 'Mercedes-Benz Stadium, Atlanta',
    time: '16h (Brasília)',
    context: 'Rivalidade histórica — Guerra das Malvinas e "La Mano de Dios"',
    highlights: [
      'Guerra das Malvinas em 1982 definiu rivalidade entre as nações',
      '"La Mano de Dios" e "Gol do Século" de Maradona em 1986',
      'Inglaterra busca primeira final de Copa do Mundo em 60 anos',
      'Messi com 8 gols no torneio (21 na história de Copas)',
      'Harry Kane é artilheiro histórico da Inglaterra em Copas (14 gols)',
      'Jude Bellingham marcou os 2 gols na vitória por 2x1 sobre Noruega',
      'Julián Álvarez marcou golazo nos pênaltis contra Suíça'
    ],
    keyPlayers: {
      home: ['Lionel Messi (8 gols)', 'Julián Álvarez (1 gol)', 'Enzo Fernández (1 gol)'],
      away: ['Harry Kane (5 gols)', 'Jude Bellingham (2 gols)', 'Bukayo Saka (3 assistências)']
    }
  }
];

// Helper functions
export function getTeams() {
  return teams;
}

export function getEliminated() {
  return [...eliminatedR32, ...eliminatedR16, ...eliminatedQF];
}

export function getEliminatedR32() {
  return eliminatedR32;
}

export function getEliminatedR16() {
  return eliminatedR16;
}

export function getEliminatedQF() {
  return eliminatedQF;
}

export function getRoundOf32() {
  return roundOf32;
}

export function getRoundOf16() {
  return roundOf16;
}

export function getQuarterfinals() {
  return quarterfinals;
}

export function getSemifinals() {
  return semifinals;
}

export function getSemifinalContexts() {
  return semifinalContexts;
}

export function getTeamById(teamId) {
  return teams.find(t => t.id === teamId);
}

export function getTeamByName(name) {
  return teams.find(t => t.name === name);
}

export function computeExpectedGoals(team, opponent) {
  const teamAvg = team.goalsFor / team.played;
  const opponentConceded = opponent.goalsAgainst / opponent.played;
  return Math.round(((teamAvg + opponentConceded) / 2) * 10) / 10;
}

export function getFormTrend(team) {
  const form = team.form;
  const wins = form.split('').filter(c => c === 'W').length;
  const losses = form.split('').filter(c => c === 'L').length;
  if (wins >= 4) return `${wins} vitórias — momentum positivo`;
  if (losses >= 2) return `${losses} derrotas — precisa de vitória urgente`;
  if (form.includes('D')) return `Empates recentes — precisa de decisão`;
  return `Forma estável — ${wins} vitórias em ${form.length} jogos`;
}

export function getPlayStyleNarrative(team) {
  const goalsForAvg = (team.goalsFor / team.played).toFixed(1);
  const goalsAgainstAvg = (team.goalsAgainst / team.played).toFixed(1);
  if (goalsForAvg > 1.5 && goalsAgainstAvg < 1.0) {
    return `Seleção ofensiva — média de ${goalsForAvg} gols marcados por jogo.`;
  }
  if (goalsAgainstAvg < 0.8) {
    return `Foco em solidez defensiva — apenas ${goalsAgainstAvg} gols sofridos por jogo.`;
  }
  return `Equilíbrio entre ataque (${goalsForAvg} gols/jogo) e defesa (${goalsAgainstAvg} gols sofridos/jogo).`;
}

export function getH2H(teamA, teamB) {
  return [
    { date: '2022-11-22', competition: 'Amistoso', home: teamA?.name || '', away: teamB?.name || '', homeGoals: 1, awayGoals: 0 },
    { date: '2021-09-05', competition: 'Eliminatórias', home: teamB?.name || '', away: teamA?.name || '', homeGoals: 2, awayGoals: 1 },
    { date: '2020-01-15', competition: 'Copa Continental', home: teamA?.name || '', away: teamB?.name || '', homeGoals: 0, awayGoals: 0 },
  ];
}

export function getComparativeAnalyses() {
  const sorted = [...teams];
  const bestOffense = sorted.sort((a, b) => b.goalsFor - a.goalsFor).slice(0, 4);
  const bestDefense = sorted.sort((a, b) => a.goalsAgainst - b.goalsAgainst).slice(0, 4);
  const mostWins = sorted.sort((a, b) => b.won - a.won).slice(0, 4);
  const bestForm = sorted.sort((a, b) => {
    const aWins = a.form.split('').filter(c => c === 'W').length;
    const bWins = b.form.split('').filter(c => c === 'W').length;
    return bWins - aWins;
  }).slice(0, 4);

  return [
    { category: 'attack', label: 'Ataque', data: bestOffense.map(t => ({ name: t.name, flag: t.flag, value: t.goalsFor })) },
    { category: 'defense', label: 'Defesa', data: bestDefense.map(t => ({ name: t.name, flag: t.flag, value: t.goalsAgainst })) },
    { category: 'wins', label: 'Vitórias', data: mostWins.map(t => ({ name: t.name, flag: t.flag, value: t.won })) },
    { category: 'form', label: 'Forma', data: bestForm.map(t => ({ name: t.name, flag: t.flag, value: t.form })) },
  ];
}

export function getBracket() {
  return {
    roundOf32,
    roundOf16,
    quarterfinals,
    semifinals,
    final: null,
  };
}

// === Player helpers ===
export function getPlayers() {
  return players;
}

export function getPlayersByTeam(teamName) {
  return players.filter(p => p.team === teamName);
}

export function getTopPlayers(stat, limit = 10) {
  return [...players].sort((a, b) => b[stat] - a[stat]).slice(0, limit);
}

export function getPlayerById(id) {
  return players.find(p => p.id === id);
}

const statCategories = {
  goals: { label: 'Gols', icon: '⚽', stat: 'goals' },
  assists: { label: 'Assistências', icon: '🎯', stat: 'assists' },
  shots: { label: 'Chutes', icon: '🦵', stat: 'shots' },
  shotsOnTarget: { label: 'Chutes ao Gol', icon: '🥅', stat: 'shotsOnTarget' },
  tackles: { label: 'Desarmes', icon: '🛡️', stat: 'tackles' },
  interceptions: { label: 'Interceptações', icon: '✋', stat: 'interceptions' },
  duelsWon: { label: 'Duelos Vencidos', icon: '💪', stat: 'duelsWon' },
  passes: { label: 'Passes', icon: '📐', stat: 'passes' },
  passAccuracy: { label: '% Passes Certos', icon: '🎯', stat: 'passAccuracy' },
};

export function getStatCategories() {
  return statCategories;
}

