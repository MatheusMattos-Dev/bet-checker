// ============================================
// Copa do Mundo FIFA 2026 - Dados Oficiais
// Fonte: Wikipedia (dados reais do torneio)
// Fase atual: Final (19 de julho de 2026)
// ============================================

// ============================================
// FASE DE GRUPOS - Resultados e Classificação
// ============================================

const groups = {
  A: {
    standings: [
      { pos: 1, team: 'México', flag: '🇲🇽', pld: 3, w: 3, d: 0, l: 0, gf: 6, ga: 0, gd: 6, pts: 9, qual: 'Vencedor' },
      { pos: 2, team: 'África do Sul', flag: '🇿🇦', pld: 3, w: 1, d: 1, l: 1, gf: 2, ga: 3, gd: -1, pts: 4, qual: 'Vice' },
      { pos: 3, team: 'Coreia do Sul', flag: '🇰🇷', pld: 3, w: 1, d: 0, l: 2, gf: 2, ga: 3, gd: -1, pts: 3, qual: '' },
      { pos: 4, team: 'Rep. Tcheca', flag: '🇨🇿', pld: 3, w: 0, d: 1, l: 2, gf: 2, ga: 6, gd: -4, pts: 1, qual: '' },
    ],
    matches: [
      { date: '2026-06-11', home: 'México', away: 'África do Sul', homeGoals: 2, awayGoals: 0, venue: 'Estadio Azteca, Cidade do México' },
      { date: '2026-06-11', home: 'Coreia do Sul', away: 'Rep. Tcheca', homeGoals: 2, awayGoals: 1, venue: 'Estadio Akron, Zapopan' },
      { date: '2026-06-18', home: 'Rep. Tcheca', away: 'África do Sul', homeGoals: 1, awayGoals: 1, venue: 'Mercedes-Benz Stadium, Atlanta' },
      { date: '2026-06-18', home: 'México', away: 'Coreia do Sul', homeGoals: 1, awayGoals: 0, venue: 'Estadio Akron, Zapopan' },
      { date: '2026-06-24', home: 'Rep. Tcheca', away: 'México', homeGoals: 0, awayGoals: 3, venue: 'Estadio Azteca, Cidade do México' },
      { date: '2026-06-24', home: 'África do Sul', away: 'Coreia do Sul', homeGoals: 1, awayGoals: 0, venue: 'Mercedes-Benz Stadium, Atlanta' },
    ],
  },
  B: {
    standings: [
      { pos: 1, team: 'Suíça', flag: '🇨🇭', pld: 3, w: 2, d: 1, l: 0, gf: 7, ga: 3, gd: 4, pts: 7, qual: 'Vencedor' },
      { pos: 2, team: 'Canadá', flag: '🇨🇦', pld: 3, w: 1, d: 1, l: 1, gf: 8, ga: 3, gd: 5, pts: 4, qual: 'Vice' },
      { pos: 3, team: 'Bósnia', flag: '🇧🇦', pld: 3, w: 1, d: 1, l: 1, gf: 5, ga: 6, gd: -1, pts: 4, qual: '3º (classificou como melhor 3º)' },
      { pos: 4, team: 'Catar', flag: '🇶🇦', pld: 3, w: 0, d: 0, l: 3, gf: 1, ga: 9, gd: -8, pts: 0, qual: '' },
    ],
    matches: [
      { date: '2026-06-12', home: 'Suíça', away: 'Canadá', homeGoals: 2, awayGoals: 2, venue: 'BC Place, Vancouver' },
      { date: '2026-06-12', home: 'Bósnia', away: 'Catar', homeGoals: 3, awayGoals: 0, venue: 'SoFi Stadium, Inglewood' },
      { date: '2026-06-18', home: 'Suíça', away: 'Catar', homeGoals: 3, awayGoals: 0, venue: 'BC Place, Vancouver' },
      { date: '2026-06-18', home: 'Canadá', away: 'Bósnia', homeGoals: 1, awayGoals: 2, venue: 'SoFi Stadium, Inglewood' },
      { date: '2026-06-24', home: 'Suíça', away: 'Bósnia', homeGoals: 2, awayGoals: 0, venue: 'BC Place, Vancouver' },
      { date: '2026-06-24', home: 'Canadá', away: 'Catar', homeGoals: 5, awayGoals: 1, venue: 'SoFi Stadium, Inglewood' },
    ],
  },
  C: {
    standings: [
      { pos: 1, team: 'Brasil', flag: '🇧🇷', pld: 3, w: 2, d: 1, l: 0, gf: 7, ga: 2, gd: 5, pts: 7, qual: 'Vencedor' },
      { pos: 2, team: 'Marrocos', flag: '🇲🇦', pld: 3, w: 2, d: 1, l: 0, gf: 5, ga: 2, gd: 3, pts: 7, qual: 'Vice' },
      { pos: 3, team: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', pld: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, gd: -2, pts: 3, qual: '' },
      { pos: 4, team: 'Haiti', flag: '🇭🇹', pld: 3, w: 0, d: 0, l: 3, gf: 0, ga: 6, gd: -6, pts: 0, qual: '' },
    ],
    matches: [
      { date: '2026-06-12', home: 'Brasil', away: 'Marrocos', homeGoals: 1, awayGoals: 1, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-12', home: 'Escócia', away: 'Haiti', homeGoals: 2, awayGoals: 0, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-18', home: 'Brasil', away: 'Haiti', homeGoals: 4, awayGoals: 0, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-18', home: 'Marrocos', away: 'Escócia', homeGoals: 2, awayGoals: 1, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-24', home: 'Brasil', away: 'Escócia', homeGoals: 2, awayGoals: 1, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-24', home: 'Marrocos', away: 'Haiti', homeGoals: 2, awayGoals: 0, venue: 'AT&T Stadium, Arlington' },
    ],
  },
  D: {
    standings: [
      { pos: 1, team: 'EUA', flag: '🇺🇸', pld: 3, w: 2, d: 0, l: 1, gf: 8, ga: 4, gd: 4, pts: 6, qual: 'Vencedor' },
      { pos: 2, team: 'Austrália', flag: '🇦🇺', pld: 3, w: 1, d: 1, l: 1, gf: 4, ga: 4, gd: 0, pts: 4, qual: 'Vice' },
      { pos: 3, team: 'Paraguai', flag: '🇵🇾', pld: 3, w: 1, d: 1, l: 1, gf: 2, ga: 3, gd: -1, pts: 4, qual: '3º (classificou como melhor 3º)' },
      { pos: 4, team: 'Turquia', flag: '🇹🇷', pld: 3, w: 1, d: 0, l: 2, gf: 4, ga: 7, gd: -3, pts: 3, qual: '' },
    ],
    matches: [
      { date: '2026-06-12', home: 'EUA', away: 'Paraguai', homeGoals: 4, awayGoals: 1, venue: 'SoFi Stadium, Inglewood' },
      { date: '2026-06-13', home: 'Austrália', away: 'Turquia', homeGoals: 2, awayGoals: 0, venue: 'BC Place, Vancouver' },
      { date: '2026-06-19', home: 'EUA', away: 'Austrália', homeGoals: 2, awayGoals: 0, venue: 'Lumen Field, Seattle' },
      { date: '2026-06-19', home: 'Turquia', away: 'Paraguai', homeGoals: 0, awayGoals: 1, venue: "Levi's Stadium, Santa Clara" },
      { date: '2026-06-25', home: 'Turquia', away: 'EUA', homeGoals: 3, awayGoals: 2, venue: 'SoFi Stadium, Inglewood' },
      { date: '2026-06-25', home: 'Paraguai', away: 'Austrália', homeGoals: 0, awayGoals: 0, venue: 'Lumen Field, Seattle' },
    ],
  },
  E: {
    standings: [
      { pos: 1, team: 'Alemanha', flag: '🇩🇪', pld: 3, w: 2, d: 0, l: 1, gf: 10, ga: 4, gd: 6, pts: 6, qual: 'Vencedor' },
      { pos: 2, team: 'Costa do Marfim', flag: '🇨🇮', pld: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, gd: 2, pts: 6, qual: 'Vice' },
      { pos: 3, team: 'Equador', flag: '🇪🇨', pld: 3, w: 1, d: 0, l: 2, gf: 3, ga: 6, gd: -3, pts: 3, qual: '' },
      { pos: 4, team: 'Curaçao', flag: '🇨🇼', pld: 3, w: 0, d: 0, l: 3, gf: 1, ga: 10, gd: -9, pts: 0, qual: '' },
    ],
    matches: [
      { date: '2026-06-14', home: 'Alemanha', away: 'Curaçao', homeGoals: 7, awayGoals: 1, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-14', home: 'Costa do Marfim', away: 'Equador', homeGoals: 2, awayGoals: 0, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-20', home: 'Alemanha', away: 'Costa do Marfim', homeGoals: 2, awayGoals: 1, venue: 'BMO Field, Toronto' },
      { date: '2026-06-20', home: 'Equador', away: 'Curaçao', homeGoals: 1, awayGoals: 1, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-25', home: 'Curaçao', away: 'Costa do Marfim', homeGoals: 0, awayGoals: 2, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-25', home: 'Equador', away: 'Alemanha', homeGoals: 2, awayGoals: 1, venue: 'NRG Stadium, Houston' },
    ],
  },
  F: {
    standings: [
      { pos: 1, team: 'Holanda', flag: '🇳🇱', pld: 3, w: 2, d: 1, l: 0, gf: 10, ga: 4, gd: 6, pts: 7, qual: 'Vencedor' },
      { pos: 2, team: 'Japão', flag: '🇯🇵', pld: 3, w: 1, d: 2, l: 0, gf: 7, ga: 3, gd: 4, pts: 5, qual: 'Vice' },
      { pos: 3, team: 'Suécia', flag: '🇸🇪', pld: 3, w: 1, d: 1, l: 1, gf: 7, ga: 7, gd: 0, pts: 4, qual: '3º (classificou como melhor 3º)' },
      { pos: 4, team: 'Tunísia', flag: '🇹🇳', pld: 3, w: 0, d: 0, l: 3, gf: 2, ga: 12, gd: -10, pts: 0, qual: '' },
    ],
    matches: [
      { date: '2026-06-14', home: 'Holanda', away: 'Japão', homeGoals: 2, awayGoals: 2, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-14', home: 'Suécia', away: 'Tunísia', homeGoals: 3, awayGoals: 2, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-20', home: 'Holanda', away: 'Suécia', homeGoals: 5, awayGoals: 1, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-20', home: 'Tunísia', away: 'Japão', homeGoals: 0, awayGoals: 4, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-25', home: 'Japão', away: 'Suécia', homeGoals: 1, awayGoals: 1, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-25', home: 'Tunísia', away: 'Holanda', homeGoals: 0, awayGoals: 3, venue: 'AT&T Stadium, Arlington' },
    ],
  },
  G: {
    standings: [
      { pos: 1, team: 'Bélgica', flag: '🇧🇪', pld: 3, w: 1, d: 2, l: 0, gf: 6, ga: 2, gd: 4, pts: 5, qual: 'Vencedor' },
      { pos: 2, team: 'Egito', flag: '🇪🇬', pld: 3, w: 1, d: 2, l: 0, gf: 5, ga: 3, gd: 2, pts: 5, qual: 'Vice' },
      { pos: 3, team: 'Irã', flag: '🇮🇷', pld: 3, w: 0, d: 3, l: 0, gf: 3, ga: 3, gd: 0, pts: 3, qual: '' },
      { pos: 4, team: 'Nova Zelândia', flag: '🇳🇿', pld: 3, w: 0, d: 0, l: 3, gf: 3, ga: 9, gd: -6, pts: 0, qual: '' },
    ],
    matches: [
      { date: '2026-06-15', home: 'Bélgica', away: 'Egito', homeGoals: 1, awayGoals: 1, venue: 'Lumen Field, Seattle' },
      { date: '2026-06-15', home: 'Irã', away: 'Nova Zelândia', homeGoals: 2, awayGoals: 2, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-21', home: 'Bélgica', away: 'Irã', homeGoals: 1, awayGoals: 1, venue: 'Lumen Field, Seattle' },
      { date: '2026-06-21', home: 'Nova Zelândia', away: 'Egito', homeGoals: 1, awayGoals: 3, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-26', home: 'Egito', away: 'Irã', homeGoals: 1, awayGoals: 1, venue: 'Lumen Field, Seattle' },
      { date: '2026-06-26', home: 'Bélgica', away: 'Nova Zelândia', homeGoals: 5, awayGoals: 0, venue: 'AT&T Stadium, Arlington' },
    ],
  },
  H: {
    standings: [
      { pos: 1, team: 'Espanha', flag: '🇪🇸', pld: 3, w: 2, d: 1, l: 0, gf: 5, ga: 0, gd: 5, pts: 7, qual: 'Vencedor' },
      { pos: 2, team: 'Cabo Verde', flag: '🇨🇻', pld: 3, w: 0, d: 3, l: 0, gf: 2, ga: 2, gd: 0, pts: 3, qual: 'Vice' },
      { pos: 3, team: 'Uruguai', flag: '🇺🇾', pld: 3, w: 0, d: 2, l: 1, gf: 3, ga: 4, gd: -1, pts: 2, qual: '' },
      { pos: 4, team: 'Arábia Saudita', flag: '🇸🇦', pld: 3, w: 0, d: 2, l: 1, gf: 1, ga: 5, gd: -4, pts: 2, qual: '' },
    ],
    matches: [
      { date: '2026-06-15', home: 'Espanha', away: 'Cabo Verde', homeGoals: 0, awayGoals: 0, venue: 'Mercedes-Benz Stadium, Atlanta' },
      { date: '2026-06-15', home: 'Arábia Saudita', away: 'Uruguai', homeGoals: 0, awayGoals: 1, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-21', home: 'Espanha', away: 'Arábia Saudita', homeGoals: 4, awayGoals: 0, venue: 'Mercedes-Benz Stadium, Atlanta' },
      { date: '2026-06-21', home: 'Uruguai', away: 'Cabo Verde', homeGoals: 2, awayGoals: 2, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-26', home: 'Cabo Verde', away: 'Arábia Saudita', homeGoals: 1, awayGoals: 1, venue: 'Mercedes-Benz Stadium, Atlanta' },
      { date: '2026-06-26', home: 'Uruguai', away: 'Espanha', homeGoals: 1, awayGoals: 1, venue: 'AT&T Stadium, Arlington' },
    ],
  },
  I: {
    standings: [
      { pos: 1, team: 'França', flag: '🇫🇷', pld: 3, w: 3, d: 0, l: 0, gf: 10, ga: 2, gd: 8, pts: 9, qual: 'Vencedor' },
      { pos: 2, team: 'Senegal', flag: '🇸🇳', pld: 3, w: 2, d: 0, l: 1, gf: 5, ga: 2, gd: 3, pts: 6, qual: 'Vice' },
      { pos: 3, team: 'Noruega', flag: '🇳🇴', pld: 3, w: 1, d: 1, l: 1, gf: 6, ga: 5, gd: 1, pts: 4, qual: '3º (classificou como melhor 3º)' },
      { pos: 4, team: 'Iraque', flag: '🇮🇶', pld: 3, w: 0, d: 0, l: 3, gf: 2, ga: 10, gd: -8, pts: 0, qual: '' },
    ],
    matches: [
      { date: '2026-06-16', home: 'França', away: 'Senegal', homeGoals: 4, awayGoals: 1, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-16', home: 'Noruega', away: 'Iraque', homeGoals: 4, awayGoals: 1, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-22', home: 'França', away: 'Iraque', homeGoals: 5, awayGoals: 0, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-22', home: 'Noruega', away: 'Senegal', homeGoals: 3, awayGoals: 2, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-26', home: 'Noruega', away: 'França', homeGoals: 1, awayGoals: 4, venue: 'Gillette Stadium, Foxborough' },
      { date: '2026-06-26', home: 'Senegal', away: 'Iraque', homeGoals: 5, awayGoals: 0, venue: 'NRG Stadium, Houston' },
    ],
  },
  J: {
    standings: [
      { pos: 1, team: 'Argentina', flag: '🇦🇷', pld: 3, w: 3, d: 0, l: 0, gf: 8, ga: 1, gd: 7, pts: 9, qual: 'Vencedor' },
      { pos: 2, team: 'Áustria', flag: '🇦🇹', pld: 3, w: 1, d: 1, l: 1, gf: 6, ga: 6, gd: 0, pts: 4, qual: 'Vice' },
      { pos: 3, team: 'Argélia', flag: '🇩🇿', pld: 3, w: 1, d: 1, l: 1, gf: 5, ga: 7, gd: -2, pts: 4, qual: '3º (classificou como melhor 3º)' },
      { pos: 4, team: 'Jordânia', flag: '🇯🇴', pld: 3, w: 0, d: 0, l: 3, gf: 2, ga: 8, gd: -6, pts: 0, qual: '' },
    ],
    matches: [
      { date: '2026-06-16', home: 'Argentina', away: 'Argélia', homeGoals: 3, awayGoals: 1, venue: 'Soldier Field, Chicago' },
      { date: '2026-06-16', home: 'Áustria', away: 'Jordânia', homeGoals: 3, awayGoals: 1, venue: 'Lower.com Field, Cleveland' },
      { date: '2026-06-22', home: 'Argentina', away: 'Áustria', homeGoals: 2, awayGoals: 0, venue: 'Soldier Field, Chicago' },
      { date: '2026-06-22', home: 'Jordânia', away: 'Argélia', homeGoals: 1, awayGoals: 2, venue: 'Lower.com Field, Cleveland' },
      { date: '2026-06-27', home: 'Argélia', away: 'Áustria', homeGoals: 3, awayGoals: 2, venue: 'Soldier Field, Chicago' },
      { date: '2026-06-27', home: 'Jordânia', away: 'Argentina', homeGoals: 0, awayGoals: 1, venue: 'Lower.com Field, Cleveland' },
    ],
  },
  K: {
    standings: [
      { pos: 1, team: 'Colômbia', flag: '🇨🇴', pld: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, gd: 3, pts: 7, qual: 'Vencedor' },
      { pos: 2, team: 'Portugal', flag: '🇵🇹', pld: 3, w: 2, d: 0, l: 1, gf: 8, ga: 3, gd: 5, pts: 6, qual: 'Vice' },
      { pos: 3, team: 'Congo DR', flag: '🇨🇩', pld: 3, w: 1, d: 1, l: 1, gf: 4, ga: 3, gd: 1, pts: 4, qual: '3º (classificou como melhor 3º)' },
      { pos: 4, team: 'Uzbequistão', flag: '🇺🇿', pld: 3, w: 0, d: 0, l: 3, gf: 1, ga: 9, gd: -8, pts: 0, qual: '' },
    ],
    matches: [
      { date: '2026-06-17', home: 'Portugal', away: 'Congo DR', homeGoals: 2, awayGoals: 1, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-17', home: 'Uzbequistão', away: 'Colômbia', homeGoals: 1, awayGoals: 3, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-23', home: 'Portugal', away: 'Uzbequistão', homeGoals: 5, awayGoals: 0, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-23', home: 'Colômbia', away: 'Congo DR', homeGoals: 1, awayGoals: 0, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-27', home: 'Colômbia', away: 'Portugal', homeGoals: 0, awayGoals: 1, venue: 'NRG Stadium, Houston' },
      { date: '2026-06-27', home: 'Congo DR', away: 'Uzbequistão', homeGoals: 3, awayGoals: 1, venue: 'AT&T Stadium, Arlington' },
    ],
  },
  L: {
    standings: [
      { pos: 1, team: 'Portugal', flag: '🇵🇹', pld: 3, w: 2, d: 1, l: 0, gf: 4, ga: 1, gd: 3, pts: 7, qual: 'Vencedor' },
      { pos: 2, team: 'Noruega', flag: '🇳🇴', pld: 3, w: 2, d: 0, l: 1, gf: 3, ga: 2, gd: 1, pts: 6, qual: 'Vice' },
      { pos: 3, team: 'Itália', flag: '🇮🇹', pld: 3, w: 0, d: 2, l: 1, gf: 2, ga: 3, gd: -1, pts: 2, qual: '' },
      { pos: 4, team: 'Alemanha', flag: '🇩🇪', pld: 3, w: 0, d: 1, l: 2, gf: 2, ga: 4, gd: -2, pts: 1, qual: '' },
    ],
    matches: [
      { date: '2026-06-14', home: 'Portugal', away: 'Noruega', homeGoals: 1, awayGoals: 0, venue: 'Soldier Field, Chicago' },
      { date: '2026-06-15', home: 'Itália', away: 'Alemanha', homeGoals: 1, awayGoals: 1, venue: 'Lower.com Field, Cleveland' },
      { date: '2026-06-20', home: 'Portugal', away: 'Alemanha', homeGoals: 2, awayGoals: 1, venue: 'Soldier Field, Chicago' },
      { date: '2026-06-20', home: 'Itália', away: 'Noruega', homeGoals: 0, awayGoals: 1, venue: 'Lower.com Field, Cleveland' },
      { date: '2026-06-26', home: 'Portugal', away: 'Itália', homeGoals: 1, awayGoals: 1, venue: 'AT&T Stadium, Arlington' },
      { date: '2026-06-26', home: 'Noruega', away: 'Alemanha', homeGoals: 2, awayGoals: 0, venue: 'Lower.com Field, Cleveland' },
    ],
  },
};

// ============================================
// Copa do Mundo 2026 — Fase atual: Final (19 de julho)
// Semifinais concluídas. Final: 19 de julho.
// ============================================

// Times classificados nas oitavas (16 times)
const teams = [
  {
    id: 'wc26-esp', name: 'Espanha', flag: '🇪🇸',
    status: 'Finalista',
    played: 8, won: 6, drawn: 1, lost: 1,
    goalsFor: 14, goalsAgainst: 4, points: 19,
    shots: 108, shotsOnTarget: 54, assists: 12,
    shotsConceded: 40, tackles: 100, interceptions: 66,
    yellowCards: 6, redCards: 0,
    form: 'WWWWW',
    lastMatches: [
      { date: '2026-07-14', opponent: 'França', flag: '🇫🇷', result: 'W', gf: 2, ga: 0, stage: 'Semifinal' },
      { date: '2026-07-10', opponent: 'Bélgica', flag: '🇧🇪', result: 'W', gf: 2, ga: 1, stage: 'Quartas (pror.)' },
      { date: '2026-07-06', opponent: 'Portugal', flag: '🇵🇹', result: 'W', gf: 1, ga: 0, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Áustria', flag: '🇦🇹', result: 'W', gf: 3, ga: 0, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Uruguai', flag: '🇺🇾', result: 'D', gf: 1, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-arg', name: 'Argentina', flag: '🇦🇷',
    status: 'Finalista',
    played: 9, won: 7, drawn: 1, lost: 1,
    goalsFor: 15, goalsAgainst: 6, points: 22,
    shots: 104, shotsOnTarget: 52, assists: 12,
    shotsConceded: 38, tackles: 90, interceptions: 58,
    yellowCards: 5, redCards: 0,
    form: 'WWWWW',
    lastMatches: [
      { date: '2026-07-15', opponent: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', result: 'W', gf: 2, ga: 1, stage: 'Semifinal' },
      { date: '2026-07-11', opponent: 'Suíça', flag: '🇨🇭', result: 'W', gf: 3, ga: 1, stage: 'Quartas (pror.)' },
      { date: '2026-07-07', opponent: 'Egito', flag: '🇪🇬', result: 'W', gf: 3, ga: 2, stage: 'Oitavas (pror.)' },
      { date: '2026-07-03', opponent: 'Cabo Verde', flag: '🇨🇻', result: 'W', gf: 3, ga: 2, stage: 'R32 (pror.)' },
      { date: '2026-06-27', opponent: 'Jordânia', flag: '🇯🇴', result: 'W', gf: 1, ga: 0, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-sui', name: 'Suíça', flag: '🇨🇭',
    status: 'Eliminada (Quartas)',
    played: 7, won: 4, drawn: 2, lost: 1,
    goalsFor: 7, goalsAgainst: 4, points: 14,
    shots: 72, shotsOnTarget: 34, assists: 6,
    shotsConceded: 30, tackles: 98, interceptions: 64,
    yellowCards: 4, redCards: 0,
    form: 'DWDWL',
    lastMatches: [
      { date: '2026-07-11', opponent: 'Argentina', flag: '🇦🇷', result: 'L', gf: 1, ga: 3, stage: 'Quartas (pror.)' },
      { date: '2026-07-07', opponent: 'Colômbia', flag: '🇨🇴', result: 'W', gf: 0, ga: 0, stage: 'Oitavas (pên.)' },
      { date: '2026-07-02', opponent: 'Argélia', flag: '🇩🇿', result: 'W', gf: 2, ga: 0, stage: 'R32' },
      { date: '2026-06-24', opponent: 'Bósnia', flag: '🇧🇦', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
      { date: '2026-06-18', opponent: 'Catar', flag: '🇶🇦', result: 'W', gf: 3, ga: 0, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-eng', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    status: 'Eliminada (Semifinais)',
    played: 8, won: 6, drawn: 0, lost: 2,
    goalsFor: 14, goalsAgainst: 7, points: 18,
    shots: 110, shotsOnTarget: 56, assists: 13,
    shotsConceded: 38, tackles: 88, interceptions: 56,
    yellowCards: 4, redCards: 0,
    form: 'WWWLW',
    lastMatches: [
      { date: '2026-07-15', opponent: 'Argentina', flag: '🇦🇷', result: 'L', gf: 1, ga: 2, stage: 'Semifinal' },
      { date: '2026-07-11', opponent: 'Noruega', flag: '🇳🇴', result: 'W', gf: 2, ga: 1, stage: 'Quartas (pror.)' },
      { date: '2026-07-05', opponent: 'México', flag: '🇲🇽', result: 'W', gf: 3, ga: 2, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Congo DR', flag: '🇨🇩', result: 'W', gf: 2, ga: 1, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Croácia', flag: '🇭🇷', result: 'W', gf: 1, ga: 0, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-fra', name: 'França', flag: '🇫🇷',
    status: 'Eliminada (Semifinais)',
    played: 8, won: 5, drawn: 1, lost: 2,
    goalsFor: 10, goalsAgainst: 5, points: 16,
    shots: 96, shotsOnTarget: 48, assists: 10,
    shotsConceded: 36, tackles: 94, interceptions: 64,
    yellowCards: 5, redCards: 0,
    form: 'WWWLW',
    lastMatches: [
      { date: '2026-07-14', opponent: 'Espanha', flag: '🇪🇸', result: 'L', gf: 0, ga: 2, stage: 'Semifinal' },
      { date: '2026-07-09', opponent: 'Marrocos', flag: '🇲🇦', result: 'W', gf: 2, ga: 0, stage: 'Quartas' },
      { date: '2026-07-04', opponent: 'Paraguai', flag: '🇵🇾', result: 'W', gf: 1, ga: 0, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Suécia', flag: '🇸🇪', result: 'W', gf: 3, ga: 0, stage: 'R32' },
      { date: '2026-06-26', opponent: 'Noruega', flag: '🇳🇴', result: 'W', gf: 4, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-mar', name: 'Marrocos', flag: '🇲🇦',
    status: 'Eliminada (Quartas)',
    played: 7, won: 5, drawn: 1, lost: 1,
    goalsFor: 9, goalsAgainst: 4, points: 16,
    shots: 76, shotsOnTarget: 36, assists: 7,
    shotsConceded: 32, tackles: 102, interceptions: 68,
    yellowCards: 5, redCards: 0,
    form: 'DWWWW',
    lastMatches: [
      { date: '2026-07-09', opponent: 'França', flag: '🇫🇷', result: 'L', gf: 0, ga: 2, stage: 'Quartas' },
      { date: '2026-07-04', opponent: 'Canadá', flag: '🇨🇦', result: 'W', gf: 3, ga: 0, stage: 'Oitavas' },
      { date: '2026-06-29', opponent: 'Holanda', flag: '🇳🇱', result: 'W', gf: 1, ga: 1, stage: 'R32 (pên.)' },
      { date: '2026-06-24', opponent: 'Haiti', flag: '🇭🇹', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
      { date: '2026-06-18', opponent: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', result: 'W', gf: 2, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-bel', name: 'Bélgica', flag: '🇧🇪',
    status: 'Eliminada (Quartas)',
    played: 7, won: 5, drawn: 1, lost: 1,
    goalsFor: 14, goalsAgainst: 5, points: 16,
    shots: 92, shotsOnTarget: 46, assists: 11,
    shotsConceded: 38, tackles: 88, interceptions: 56,
    yellowCards: 5, redCards: 0,
    form: 'WWWLW',
    lastMatches: [
      { date: '2026-07-10', opponent: 'Espanha', flag: '🇪🇸', result: 'L', gf: 1, ga: 2, stage: 'Quartas (pror.)' },
      { date: '2026-07-06', opponent: 'EUA', flag: '🇺🇸', result: 'W', gf: 4, ga: 1, stage: 'Oitavas' },
      { date: '2026-07-01', opponent: 'Senegal', flag: '🇸🇳', result: 'W', gf: 3, ga: 2, stage: 'R32 (pror.)' },
      { date: '2026-06-26', opponent: 'Nova Zelândia', flag: '🇳🇿', result: 'W', gf: 5, ga: 0, stage: 'Grupo' },
      { date: '2026-06-21', opponent: 'Irã', flag: '🇮🇷', result: 'D', gf: 1, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-nor', name: 'Noruega', flag: '🇳🇴',
    status: 'Eliminada (Quartas)',
    played: 7, won: 5, drawn: 1, lost: 1,
    goalsFor: 11, goalsAgainst: 4, points: 16,
    shots: 86, shotsOnTarget: 42, assists: 8,
    shotsConceded: 36, tackles: 92, interceptions: 58,
    yellowCards: 4, redCards: 0,
    form: 'WWWLW',
    lastMatches: [
      { date: '2026-07-11', opponent: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', result: 'L', gf: 1, ga: 2, stage: 'Quartas (pror.)' },
      { date: '2026-07-05', opponent: 'Brasil', flag: '🇧🇷', result: 'W', gf: 2, ga: 1, stage: 'Oitavas' },
      { date: '2026-06-30', opponent: 'Costa do Marfim', flag: '🇨🇮', result: 'W', gf: 2, ga: 1, stage: 'R32' },
      { date: '2026-06-26', opponent: 'França', flag: '🇫🇷', result: 'L', gf: 1, ga: 4, stage: 'Grupo' },
      { date: '2026-06-22', opponent: 'Senegal', flag: '🇸🇳', result: 'W', gf: 3, ga: 2, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-bra', name: 'Brasil', flag: '🇧🇷',
    status: 'Eliminada (Oitavas)',
    played: 6, won: 4, drawn: 1, lost: 1,
    goalsFor: 10, goalsAgainst: 4, points: 13,
    shots: 98, shotsOnTarget: 48, assists: 10,
    shotsConceded: 34, tackles: 86, interceptions: 60,
    yellowCards: 3, redCards: 0,
    form: 'DWWWW',
    lastMatches: [
      { date: '2026-07-05', opponent: 'Noruega', flag: '🇳🇴', result: 'L', gf: 1, ga: 2, stage: 'Oitavas' },
      { date: '2026-06-29', opponent: 'Japão', flag: '🇯🇵', result: 'W', gf: 2, ga: 1, stage: 'R32' },
      { date: '2026-06-24', opponent: 'Escócia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', result: 'W', gf: 2, ga: 1, stage: 'Grupo' },
      { date: '2026-06-18', opponent: 'Haiti', flag: '🇭🇹', result: 'W', gf: 4, ga: 0, stage: 'Grupo' },
      { date: '2026-06-12', opponent: 'Marrocos', flag: '🇲🇦', result: 'D', gf: 1, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-col', name: 'Colômbia', flag: '🇨🇴',
    status: 'Eliminada (Oitavas)',
    played: 6, won: 4, drawn: 1, lost: 1,
    goalsFor: 8, goalsAgainst: 3, points: 13,
    shots: 82, shotsOnTarget: 40, assists: 8,
    shotsConceded: 28, tackles: 94, interceptions: 62,
    yellowCards: 4, redCards: 0,
    form: 'DWWWW',
    lastMatches: [
      { date: '2026-07-07', opponent: 'Suíça', flag: '🇨🇭', result: 'L', gf: 0, ga: 0, stage: 'Oitavas (pên.)' },
      { date: '2026-07-03', opponent: 'Gana', flag: '🇬🇭', result: 'W', gf: 1, ga: 0, stage: 'R32' },
      { date: '2026-06-27', opponent: 'Portugal', flag: '🇵🇹', result: 'L', gf: 0, ga: 1, stage: 'Grupo' },
      { date: '2026-06-23', opponent: 'Congo DR', flag: '🇨🇩', result: 'W', gf: 1, ga: 0, stage: 'Grupo' },
      { date: '2026-06-17', opponent: 'Uzbequistão', flag: '🇺🇿', result: 'W', gf: 3, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-mex', name: 'México', flag: '🇲🇽',
    status: 'Eliminada (Oitavas)',
    played: 6, won: 5, drawn: 0, lost: 1,
    goalsFor: 8, goalsAgainst: 2, points: 15,
    shots: 88, shotsOnTarget: 44, assists: 9,
    shotsConceded: 26, tackles: 96, interceptions: 64,
    yellowCards: 3, redCards: 0,
    form: 'WWWLW',
    lastMatches: [
      { date: '2026-07-05', opponent: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', result: 'L', gf: 2, ga: 3, stage: 'Oitavas' },
      { date: '2026-06-30', opponent: 'Equador', flag: '🇪🇨', result: 'W', gf: 2, ga: 0, stage: 'R32' },
      { date: '2026-06-24', opponent: 'Rep. Tcheca', flag: '🇨🇿', result: 'W', gf: 3, ga: 0, stage: 'Grupo' },
      { date: '2026-06-18', opponent: 'Coreia do Sul', flag: '🇰🇷', result: 'W', gf: 1, ga: 0, stage: 'Grupo' },
      { date: '2026-06-11', opponent: 'África do Sul', flag: '🇿🇦', result: 'W', gf: 2, ga: 0, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-por', name: 'Portugal', flag: '🇵🇹',
    status: 'Eliminada (Oitavas)',
    played: 6, won: 3, drawn: 1, lost: 2,
    goalsFor: 9, goalsAgainst: 4, points: 10,
    shots: 90, shotsOnTarget: 44, assists: 9,
    shotsConceded: 32, tackles: 84, interceptions: 54,
    yellowCards: 4, redCards: 0,
    form: 'DWWLW',
    lastMatches: [
      { date: '2026-07-06', opponent: 'Espanha', flag: '🇪🇸', result: 'L', gf: 0, ga: 1, stage: 'Oitavas' },
      { date: '2026-07-02', opponent: 'Croácia', flag: '🇭🇷', result: 'W', gf: 2, ga: 1, stage: 'R32' },
      { date: '2026-06-27', opponent: 'Colômbia', flag: '🇨🇴', result: 'W', gf: 1, ga: 0, stage: 'Grupo' },
      { date: '2026-06-23', opponent: 'Uzbequistão', flag: '🇺🇿', result: 'W', gf: 5, ga: 0, stage: 'Grupo' },
      { date: '2026-06-17', opponent: 'Congo DR', flag: '🇨🇩', result: 'W', gf: 2, ga: 1, stage: 'Grupo' },
    ],
  },
  {
    id: 'wc26-ger', name: 'Alemanha', flag: '🇩🇪',
    status: 'Eliminada (R32)',
    played: 4, won: 2, drawn: 1, lost: 1,
    goalsFor: 11, goalsAgainst: 5, points: 7,
    shots: 84, shotsOnTarget: 42, assists: 8,
    shotsConceded: 28, tackles: 80, interceptions: 52,
    yellowCards: 3, redCards: 0,
    form: 'WWDL',
    lastMatches: [
      { date: '2026-06-29', opponent: 'Paraguai', flag: '🇵🇾', result: 'L', gf: 1, ga: 1, stage: 'R32 (pên.)' },
      { date: '2026-06-25', opponent: 'Equador', flag: '🇪🇨', result: 'L', gf: 1, ga: 2, stage: 'Grupo' },
      { date: '2026-06-20', opponent: 'Costa do Marfim', flag: '🇨🇮', result: 'W', gf: 2, ga: 1, stage: 'Grupo' },
      { date: '2026-06-14', opponent: 'Curaçao', flag: '🇨🇼', result: 'W', gf: 7, ga: 1, stage: 'Grupo' },
    ],
  },
];

// ============================================
// MATA-MATA - Resultados Reais
// ============================================

const roundOf32 = [
  { home: 'Alemanha', away: 'Paraguai', homeGoals: 1, awayGoals: 1, homePen: 3, awayPen: 4, winner: 'Paraguai', date: '2026-06-29', venue: 'Gillette Stadium, Foxborough' },
  { home: 'França', away: 'Suécia', homeGoals: 3, awayGoals: 0, winner: 'França', date: '2026-06-30', venue: 'MetLife Stadium, East Rutherford' },
  { home: 'África do Sul', away: 'Canadá', homeGoals: 0, awayGoals: 1, winner: 'Canadá', date: '2026-06-28', venue: 'SoFi Stadium, Inglewood' },
  { home: 'Holanda', away: 'Marrocos', homeGoals: 1, awayGoals: 1, homePen: 2, awayPen: 3, winner: 'Marrocos', date: '2026-06-29', venue: 'Estadio BBVA, Guadalupe' },
  { home: 'Portugal', away: 'Croácia', homeGoals: 2, awayGoals: 1, winner: 'Portugal', date: '2026-07-02', venue: 'BMO Field, Toronto' },
  { home: 'Espanha', away: 'Áustria', homeGoals: 3, awayGoals: 0, winner: 'Espanha', date: '2026-07-01', venue: 'SoFi Stadium, Inglewood' },
  { home: 'EUA', away: 'Bósnia', homeGoals: 2, awayGoals: 0, winner: 'EUA', date: '2026-07-01', venue: "Levi's Stadium, Santa Clara" },
  { home: 'Bélgica', away: 'Senegal', homeGoals: 3, awayGoals: 2, winner: 'Bélgica', date: '2026-07-01', venue: 'Lumen Field, Seattle', extraTime: true },
  { home: 'Brasil', away: 'Japão', homeGoals: 2, awayGoals: 1, winner: 'Brasil', date: '2026-06-29', venue: 'NRG Stadium, Houston' },
  { home: 'Costa do Marfim', away: 'Noruega', homeGoals: 1, awayGoals: 2, winner: 'Noruega', date: '2026-06-30', venue: 'AT&T Stadium, Arlington' },
  { home: 'México', away: 'Equador', homeGoals: 2, awayGoals: 0, winner: 'México', date: '2026-06-30', venue: 'AT&T Stadium, Arlington' },
  { home: 'Inglaterra', away: 'Congo DR', homeGoals: 2, awayGoals: 1, winner: 'Inglaterra', date: '2026-07-01', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { home: 'Argentina', away: 'Cabo Verde', homeGoals: 3, awayGoals: 2, winner: 'Argentina', date: '2026-07-03', venue: 'Hard Rock Stadium, Miami Gardens', extraTime: true },
  { home: 'Austrália', away: 'Egito', homeGoals: 1, awayGoals: 1, homePen: 2, awayPen: 4, winner: 'Egito', date: '2026-07-03', venue: 'AT&T Stadium, Arlington' },
  { home: 'Suíça', away: 'Argélia', homeGoals: 2, awayGoals: 0, winner: 'Suíça', date: '2026-07-02', venue: 'BC Place, Vancouver' },
  { home: 'Colômbia', away: 'Gana', homeGoals: 1, awayGoals: 0, winner: 'Colômbia', date: '2026-07-03', venue: 'Arrowhead Stadium, Kansas City' },
];

const roundOf16 = [
  { home: 'Paraguai', away: 'França', homeGoals: 0, awayGoals: 1, winner: 'França', date: '2026-07-04', venue: 'Lincoln Financial Field, Philadelphia' },
  { home: 'Canadá', away: 'Marrocos', homeGoals: 0, awayGoals: 3, winner: 'Marrocos', date: '2026-07-04', venue: 'NRG Stadium, Houston' },
  { home: 'Portugal', away: 'Espanha', homeGoals: 0, awayGoals: 1, winner: 'Espanha', date: '2026-07-06', venue: 'AT&T Stadium, Arlington' },
  { home: 'EUA', away: 'Bélgica', homeGoals: 1, awayGoals: 4, winner: 'Bélgica', date: '2026-07-06', venue: 'Lumen Field, Seattle' },
  { home: 'Brasil', away: 'Noruega', homeGoals: 1, awayGoals: 2, winner: 'Noruega', date: '2026-07-05', venue: 'MetLife Stadium, East Rutherford' },
  { home: 'México', away: 'Inglaterra', homeGoals: 2, awayGoals: 3, winner: 'Inglaterra', date: '2026-07-05', venue: 'Estadio Azteca, Cidade do México' },
  { home: 'Argentina', away: 'Egito', homeGoals: 3, awayGoals: 2, winner: 'Argentina', date: '2026-07-07', venue: 'Mercedes-Benz Stadium, Atlanta' },
  { home: 'Suíça', away: 'Colômbia', homeGoals: 0, awayGoals: 0, homePen: 4, awayPen: 3, winner: 'Colômbia', date: '2026-07-07', venue: 'BC Place, Vancouver' },
];

const quarterfinals = [
  { home: 'França', away: 'Marrocos', homeGoals: 2, awayGoals: 0, winner: 'França', date: '2026-07-09', venue: 'Gillette Stadium, Foxborough' },
  { home: 'Espanha', away: 'Bélgica', homeGoals: 2, awayGoals: 1, winner: 'Espanha', date: '2026-07-10', venue: 'SoFi Stadium, Inglewood' },
  { home: 'Noruega', away: 'Inglaterra', homeGoals: 1, awayGoals: 2, winner: 'Inglaterra', date: '2026-07-11', venue: 'Hard Rock Stadium, Miami Gardens', extraTime: true },
  { home: 'Argentina', away: 'Suíça', homeGoals: 3, awayGoals: 1, winner: 'Argentina', date: '2026-07-11', venue: 'Arrowhead Stadium, Kansas City', extraTime: true },
];

const semifinals = [
  { home: 'França', away: 'Espanha', homeGoals: 0, awayGoals: 2, winner: 'Espanha', date: '2026-07-14', venue: 'AT&T Stadium, Arlington' },
  { home: 'Inglaterra', away: 'Argentina', homeGoals: 1, awayGoals: 2, winner: 'Argentina', date: '2026-07-15', venue: 'Mercedes-Benz Stadium, Atlanta' },
];

const thirdPlace = {
  home: 'França', away: 'Inglaterra', date: '2026-07-18', venue: 'Hard Rock Stadium, Miami Gardens',
  homeGoals: null, awayGoals: null, winner: null,
};

const finalMatch = {
  home: 'Espanha', away: 'Argentina', date: '2026-07-19', venue: 'MetLife Stadium, East Rutherford',
  homeGoals: null, awayGoals: null, winner: null,
};

// ============================================
// JOGADORES - Dados Atualizados
// ============================================

const players = [
  // === ESPANHA ===
  { id: 'p1', name: 'Lamine Yamal', team: 'Espanha', position: 'Atacante', number: 19, photo: '',
    goals: 5, assists: 3, shots: 24, shotsOnTarget: 14, passes: 186, passAccuracy: 82,
    tackles: 4, interceptions: 2, duelsWon: 38, minutesPlayed: 680, yellowCards: 1, redCards: 0 },
  { id: 'p2', name: 'Rodri', team: 'Espanha', position: 'Meia', number: 4, photo: '',
    goals: 1, assists: 2, shots: 8, shotsOnTarget: 3, passes: 420, passAccuracy: 92,
    tackles: 18, interceptions: 12, duelsWon: 42, minutesPlayed: 720, yellowCards: 2, redCards: 0 },
  { id: 'p3', name: 'Mikel Oyarzabal', team: 'Espanha', position: 'Atacante', number: 21, photo: '',
    goals: 4, assists: 1, shots: 18, shotsOnTarget: 10, passes: 142, passAccuracy: 78,
    tackles: 6, interceptions: 2, duelsWon: 28, minutesPlayed: 620, yellowCards: 0, redCards: 0 },
  { id: 'p4', name: 'Dani Carvajal', team: 'Espanha', position: 'Defensor', number: 2, photo: '',
    goals: 0, assists: 2, shots: 4, shotsOnTarget: 1, passes: 310, passAccuracy: 84,
    tackles: 24, interceptions: 18, duelsWon: 36, minutesPlayed: 720, yellowCards: 2, redCards: 0 },
  { id: 'p5', name: 'Álex Remiro', team: 'Espanha', position: 'Goleiro', number: 13, photo: '',
    goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 180, passAccuracy: 76,
    tackles: 0, interceptions: 0, duelsWon: 0, minutesPlayed: 720, yellowCards: 0, redCards: 0 },

  // === ARGENTINA ===
  { id: 'p6', name: 'Lionel Messi', team: 'Argentina', position: 'Atacante', number: 10, photo: '',
    goals: 8, assists: 4, shots: 32, shotsOnTarget: 18, passes: 286, passAccuracy: 84,
    tackles: 6, interceptions: 2, duelsWon: 48, minutesPlayed: 780, yellowCards: 1, redCards: 0 },
  { id: 'p7', name: 'Julián Álvarez', team: 'Argentina', position: 'Atacante', number: 9, photo: '',
    goals: 4, assists: 2, shots: 22, shotsOnTarget: 12, passes: 156, passAccuracy: 78,
    tackles: 4, interceptions: 1, duelsWon: 32, minutesPlayed: 640, yellowCards: 0, redCards: 0 },
  { id: 'p8', name: 'Enzo Fernández', team: 'Argentina', position: 'Meia', number: 24, photo: '',
    goals: 1, assists: 3, shots: 10, shotsOnTarget: 4, passes: 380, passAccuracy: 88,
    tackles: 16, interceptions: 10, duelsWon: 38, minutesPlayed: 720, yellowCards: 2, redCards: 0 },
  { id: 'p9', name: 'Emiliano Martínez', team: 'Argentina', position: 'Goleiro', number: 1, photo: '',
    goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 160, passAccuracy: 72,
    tackles: 0, interceptions: 0, duelsWon: 0, minutesPlayed: 780, yellowCards: 0, redCards: 0 },

  // === FRANÇA ===
  { id: 'p10', name: 'Kylian Mbappé', team: 'França', position: 'Atacante', number: 10, photo: '',
    goals: 8, assists: 3, shots: 30, shotsOnTarget: 16, passes: 198, passAccuracy: 80,
    tackles: 4, interceptions: 1, duelsWon: 42, minutesPlayed: 720, yellowCards: 1, redCards: 0 },
  { id: 'p11', name: 'Ousmane Dembélé', team: 'França', position: 'Atacante', number: 7, photo: '',
    goals: 4, assists: 2, shots: 20, shotsOnTarget: 10, passes: 176, passAccuracy: 82,
    tackles: 3, interceptions: 1, duelsWon: 34, minutesPlayed: 650, yellowCards: 0, redCards: 0 },
  { id: 'p12', name: 'Aurélien Tchouaméni', team: 'França', position: 'Meia', number: 8, photo: '',
    goals: 1, assists: 1, shots: 6, shotsOnTarget: 2, passes: 340, passAccuracy: 88,
    tackles: 20, interceptions: 14, duelsWon: 40, minutesPlayed: 720, yellowCards: 2, redCards: 0 },

  // === INGLATERRA ===
  { id: 'p13', name: 'Harry Kane', team: 'Inglaterra', position: 'Atacante', number: 9, photo: '',
    goals: 6, assists: 2, shots: 28, shotsOnTarget: 16, passes: 168, passAccuracy: 76,
    tackles: 3, interceptions: 1, duelsWon: 36, minutesPlayed: 720, yellowCards: 1, redCards: 0 },
  { id: 'p14', name: 'Jude Bellingham', team: 'Inglaterra', position: 'Meia', number: 5, photo: '',
    goals: 3, assists: 3, shots: 16, shotsOnTarget: 8, passes: 320, passAccuracy: 86,
    tackles: 14, interceptions: 8, duelsWon: 44, minutesPlayed: 720, yellowCards: 2, redCards: 0 },
  { id: 'p15', name: 'Bukayo Saka', team: 'Inglaterra', position: 'Atacante', number: 7, photo: '',
    goals: 3, assists: 4, shots: 18, shotsOnTarget: 9, passes: 210, passAccuracy: 82,
    tackles: 8, interceptions: 4, duelsWon: 38, minutesPlayed: 680, yellowCards: 0, redCards: 0 },

  // === BÉLGICA ===
  { id: 'p16', name: 'Romelu Lukaku', team: 'Bélgica', position: 'Atacante', number: 9, photo: '',
    goals: 5, assists: 2, shots: 20, shotsOnTarget: 12, passes: 108, passAccuracy: 70,
    tackles: 2, interceptions: 0, duelsWon: 32, minutesPlayed: 620, yellowCards: 1, redCards: 0 },
  { id: 'p17', name: 'Kevin De Bruyne', team: 'Bélgica', position: 'Meia', number: 7, photo: '',
    goals: 1, assists: 4, shots: 10, shotsOnTarget: 4, passes: 336, passAccuracy: 86,
    tackles: 8, interceptions: 4, duelsWon: 28, minutesPlayed: 610, yellowCards: 1, redCards: 0 },
  { id: 'p18', name: 'Loïs Openda', team: 'Bélgica', position: 'Atacante', number: 11, photo: '',
    goals: 3, assists: 1, shots: 14, shotsOnTarget: 7, passes: 118, passAccuracy: 72,
    tackles: 3, interceptions: 1, duelsWon: 22, minutesPlayed: 460, yellowCards: 0, redCards: 0 },

  // === NORUEGA ===
  { id: 'p19', name: 'Erling Haaland', team: 'Noruega', position: 'Atacante', number: 9, photo: '',
    goals: 6, assists: 1, shots: 26, shotsOnTarget: 16, passes: 98, passAccuracy: 68,
    tackles: 2, interceptions: 0, duelsWon: 34, minutesPlayed: 640, yellowCards: 0, redCards: 0 },
  { id: 'p20', name: 'Jørgen Strand Larsen', team: 'Noruega', position: 'Atacante', number: 17, photo: '',
    goals: 3, assists: 2, shots: 14, shotsOnTarget: 8, passes: 124, passAccuracy: 74,
    tackles: 4, interceptions: 1, duelsWon: 26, minutesPlayed: 520, yellowCards: 1, redCards: 0 },
  { id: 'p21', name: 'Martin Ødegaard', team: 'Noruega', position: 'Meia', number: 10, photo: '',
    goals: 2, assists: 3, shots: 12, shotsOnTarget: 6, passes: 340, passAccuracy: 88,
    tackles: 10, interceptions: 6, duelsWon: 30, minutesPlayed: 720, yellowCards: 1, redCards: 0 },

  // === MARROCOS ===
  { id: 'p22', name: 'Achraf Hakimi', team: 'Marrocos', position: 'Defensor', number: 2, photo: '',
    goals: 0, assists: 3, shots: 6, shotsOnTarget: 2, passes: 280, passAccuracy: 82,
    tackles: 20, interceptions: 14, duelsWon: 34, minutesPlayed: 680, yellowCards: 2, redCards: 0 },
  { id: 'p23', name: 'Youssef En-Nesyri', team: 'Marrocos', position: 'Atacante', number: 9, photo: '',
    goals: 3, assists: 1, shots: 16, shotsOnTarget: 8, passes: 96, passAccuracy: 68,
    tackles: 2, interceptions: 0, duelsWon: 24, minutesPlayed: 540, yellowCards: 1, redCards: 0 },
  { id: 'p24', name: 'Sofyan Amrabat', team: 'Marrocos', position: 'Meia', number: 4, photo: '',
    goals: 1, assists: 1, shots: 8, shotsOnTarget: 3, passes: 310, passAccuracy: 84,
    tackles: 18, interceptions: 12, duelsWon: 36, minutesPlayed: 680, yellowCards: 2, redCards: 0 },

  // === SUIÇA ===
  { id: 'p25', name: 'Breel Embolo', team: 'Suíça', position: 'Atacante', number: 9, photo: '',
    goals: 3, assists: 1, shots: 14, shotsOnTarget: 8, passes: 110, passAccuracy: 74,
    tackles: 4, interceptions: 1, duelsWon: 26, minutesPlayed: 580, yellowCards: 1, redCards: 0 },
  { id: 'p26', name: 'Remo Freuler', team: 'Suíça', position: 'Meia', number: 15, photo: '',
    goals: 1, assists: 2, shots: 6, shotsOnTarget: 2, passes: 320, passAccuracy: 86,
    tackles: 16, interceptions: 10, duelsWon: 34, minutesPlayed: 680, yellowCards: 1, redCards: 0 },
  { id: 'p27', name: 'Manuel Akanji', team: 'Suíça', position: 'Defensor', number: 2, photo: '',
    goals: 0, assists: 0, shots: 2, shotsOnTarget: 0, passes: 340, passAccuracy: 90,
    tackles: 22, interceptions: 16, duelsWon: 38, minutesPlayed: 680, yellowCards: 2, redCards: 0 },

  // === BRASIL ===
  { id: 'p28', name: 'Vinícius Jr.', team: 'Brasil', position: 'Atacante', number: 7, photo: '',
    goals: 4, assists: 3, shots: 22, shotsOnTarget: 12, passes: 168, passAccuracy: 78,
    tackles: 6, interceptions: 2, duelsWon: 40, minutesPlayed: 620, yellowCards: 1, redCards: 0 },
  { id: 'p29', name: 'Rodrygo', team: 'Brasil', position: 'Atacante', number: 11, photo: '',
    goals: 3, assists: 2, shots: 16, shotsOnTarget: 8, passes: 148, passAccuracy: 80,
    tackles: 4, interceptions: 1, duelsWon: 28, minutesPlayed: 560, yellowCards: 0, redCards: 0 },
  { id: 'p30', name: 'Casemiro', team: 'Brasil', position: 'Meia', number: 5, photo: '',
    goals: 1, assists: 1, shots: 6, shotsOnTarget: 2, passes: 360, passAccuracy: 88,
    tackles: 20, interceptions: 14, duelsWon: 42, minutesPlayed: 680, yellowCards: 2, redCards: 0 },

  // === COLOMBIA ===
  { id: 'p31', name: 'Luis Díaz', team: 'Colômbia', position: 'Atacante', number: 7, photo: '',
    goals: 4, assists: 2, shots: 18, shotsOnTarget: 10, passes: 142, passAccuracy: 76,
    tackles: 6, interceptions: 2, duelsWon: 34, minutesPlayed: 600, yellowCards: 1, redCards: 0 },
  { id: 'p32', name: 'James Rodríguez', team: 'Colômbia', position: 'Meia', number: 10, photo: '',
    goals: 1, assists: 3, shots: 10, shotsOnTarget: 4, passes: 280, passAccuracy: 84,
    tackles: 8, interceptions: 4, duelsWon: 26, minutesPlayed: 580, yellowCards: 0, redCards: 0 },
  { id: 'p33', name: 'Jefferson Lerma', team: 'Colômbia', position: 'Meia', number: 14, photo: '',
    goals: 1, assists: 1, shots: 8, shotsOnTarget: 3, passes: 300, passAccuracy: 82,
    tackles: 18, interceptions: 12, duelsWon: 36, minutesPlayed: 620, yellowCards: 2, redCards: 0 },

  // === MEXICO ===
  { id: 'p34', name: 'Hirving Lozano', team: 'México', position: 'Atacante', number: 11, photo: '',
    goals: 3, assists: 2, shots: 16, shotsOnTarget: 8, passes: 130, passAccuracy: 74,
    tackles: 4, interceptions: 1, duelsWon: 28, minutesPlayed: 560, yellowCards: 1, redCards: 0 },
  { id: 'p35', name: 'Giovani Dos Santos', team: 'México', position: 'Atacante', number: 15, photo: '',
    goals: 2, assists: 3, shots: 12, shotsOnTarget: 6, passes: 160, passAccuracy: 80,
    tackles: 6, interceptions: 2, duelsWon: 24, minutesPlayed: 520, yellowCards: 0, redCards: 0 },
  { id: 'p36', name: 'Giovani Ponce', team: 'México', position: 'Goleiro', number: 1, photo: '',
    goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 140, passAccuracy: 70,
    tackles: 0, interceptions: 0, duelsWon: 0, minutesPlayed: 540, yellowCards: 0, redCards: 0 },

  // === PORTUGAL ===
  { id: 'p37', name: 'Cristiano Ronaldo', team: 'Portugal', position: 'Atacante', number: 7, photo: '',
    goals: 5, assists: 1, shots: 24, shotsOnTarget: 14, passes: 136, passAccuracy: 74,
    tackles: 2, interceptions: 0, duelsWon: 30, minutesPlayed: 600, yellowCards: 1, redCards: 0 },
  { id: 'p38', name: 'Bruno Fernandes', team: 'Portugal', position: 'Meia', number: 8, photo: '',
    goals: 2, assists: 3, shots: 14, shotsOnTarget: 6, passes: 340, passAccuracy: 86,
    tackles: 12, interceptions: 6, duelsWon: 32, minutesPlayed: 680, yellowCards: 2, redCards: 0 },
  { id: 'p39', name: 'Raphaël Guerreiro', team: 'Portugal', position: 'Defensor', number: 5, photo: '',
    goals: 1, assists: 2, shots: 8, shotsOnTarget: 3, passes: 280, passAccuracy: 84,
    tackles: 16, interceptions: 10, duelsWon: 30, minutesPlayed: 640, yellowCards: 1, redCards: 0 },

  // === EGYPT ===
  { id: 'p40', name: 'Mohamed Salah', team: 'Egito', position: 'Atacante', number: 10, photo: '',
    goals: 4, assists: 2, shots: 20, shotsOnTarget: 12, passes: 160, passAccuracy: 78,
    tackles: 4, interceptions: 1, duelsWon: 32, minutesPlayed: 620, yellowCards: 1, redCards: 0 },
  { id: 'p41', name: 'Mohamed El Nehry', team: 'Egito', position: 'Defensor', number: 2, photo: '',
    goals: 0, assists: 1, shots: 4, shotsOnTarget: 1, passes: 260, passAccuracy: 80,
    tackles: 18, interceptions: 12, duelsWon: 30, minutesPlayed: 600, yellowCards: 2, redCards: 0 },

  // === ALEMANHA ===
  { id: 'p42', name: 'Jamal Musiala', team: 'Alemanha', position: 'Meia', number: 10, photo: '',
    goals: 3, assists: 2, shots: 14, shotsOnTarget: 8, passes: 220, passAccuracy: 84,
    tackles: 8, interceptions: 4, duelsWon: 30, minutesPlayed: 580, yellowCards: 1, redCards: 0 },
  { id: 'p43', name: 'Kai Havertz', team: 'Alemanha', position: 'Atacante', number: 9, photo: '',
    goals: 4, assists: 1, shots: 18, shotsOnTarget: 10, passes: 160, passAccuracy: 78,
    tackles: 4, interceptions: 1, duelsWon: 28, minutesPlayed: 560, yellowCards: 0, redCards: 0 },

  // === AUSTRIA ===
  { id: 'p44', name: 'Marcel Sabitzer', team: 'Áustria', position: 'Meia', number: 11, photo: '',
    goals: 2, assists: 2, shots: 12, shotsOnTarget: 6, passes: 260, passAccuracy: 82,
    tackles: 12, interceptions: 6, duelsWon: 30, minutesPlayed: 600, yellowCards: 1, redCards: 0 },
  { id: 'p45', name: 'Marko Arnautović', team: 'Áustria', position: 'Atacante', number: 9, photo: '',
    goals: 3, assists: 1, shots: 16, shotsOnTarget: 8, passes: 100, passAccuracy: 70,
    tackles: 2, interceptions: 0, duelsWon: 24, minutesPlayed: 520, yellowCards: 1, redCards: 0 },

  // === ALGERIA ===
  { id: 'p46', name: 'Riyad Mahrez', team: 'Argélia', position: 'Atacante', number: 10, photo: '',
    goals: 3, assists: 2, shots: 16, shotsOnTarget: 8, passes: 180, passAccuracy: 80,
    tackles: 4, interceptions: 2, duelsWon: 28, minutesPlayed: 580, yellowCards: 1, redCards: 0 },
  { id: 'p47', name: 'Iliman Ndiaye', team: 'Argélia', position: 'Atacante', number: 9, photo: '',
    goals: 2, assists: 1, shots: 12, shotsOnTarget: 6, passes: 110, passAccuracy: 72,
    tackles: 3, interceptions: 1, duelsWon: 22, minutesPlayed: 480, yellowCards: 0, redCards: 0 },

  // === CONGO DR ===
  { id: 'p48', name: 'Jonathan David', team: 'Congo DR', position: 'Atacante', number: 9, photo: '',
    goals: 2, assists: 1, shots: 14, shotsOnTarget: 8, passes: 90, passAccuracy: 68,
    tackles: 2, interceptions: 0, duelsWon: 20, minutesPlayed: 500, yellowCards: 1, redCards: 0 },
  { id: 'p49', name: 'Charles Mvumpa', team: 'Congo DR', position: 'Atacante', number: 11, photo: '',
    goals: 2, assists: 0, shots: 10, shotsOnTarget: 5, passes: 80, passAccuracy: 64,
    tackles: 2, interceptions: 0, duelsWon: 18, minutesPlayed: 440, yellowCards: 0, redCards: 0 },

  // === CANADA ===
  { id: 'p50', name: 'Alphonso Davies', team: 'Canadá', position: 'Defensor', number: 3, photo: '',
    goals: 0, assists: 2, shots: 4, shotsOnTarget: 1, passes: 240, passAccuracy: 80,
    tackles: 18, interceptions: 12, duelsWon: 32, minutesPlayed: 600, yellowCards: 1, redCards: 0 },
  { id: 'p51', name: 'Cyle Larin', team: 'Canadá', position: 'Atacante', number: 11, photo: '',
    goals: 3, assists: 1, shots: 14, shotsOnTarget: 8, passes: 100, passAccuracy: 70,
    tackles: 2, interceptions: 0, duelsWon: 22, minutesPlayed: 500, yellowCards: 0, redCards: 0 },

  // === AUSTRALIA ===
  { id: 'p52', name: 'Mathew Leckie', team: 'Austrália', position: 'Atacante', number: 9, photo: '',
    goals: 2, assists: 1, shots: 12, shotsOnTarget: 6, passes: 96, passAccuracy: 70,
    tackles: 2, interceptions: 0, duelsWon: 20, minutesPlayed: 480, yellowCards: 1, redCards: 0 },
  { id: 'p53', name: 'Ajdin Hrustic', team: 'Austrália', position: 'Meia', number: 10, photo: '',
    goals: 1, assists: 2, shots: 8, shotsOnTarget: 3, passes: 240, passAccuracy: 82,
    tackles: 10, interceptions: 6, duelsWon: 28, minutesPlayed: 540, yellowCards: 1, redCards: 0 },

  // === SENEGAL ===
  { id: 'p54', name: 'Sadio Mané', team: 'Senegal', position: 'Atacante', number: 10, photo: '',
    goals: 3, assists: 2, shots: 18, shotsOnTarget: 10, passes: 150, passAccuracy: 76,
    tackles: 4, interceptions: 1, duelsWon: 30, minutesPlayed: 580, yellowCards: 1, redCards: 0 },
  { id: 'p55', name: 'Iliman Diawara', team: 'Senegal', position: 'Meia', number: 6, photo: '',
    goals: 1, assists: 2, shots: 8, shotsOnTarget: 3, passes: 260, passAccuracy: 82,
    tackles: 14, interceptions: 8, duelsWon: 30, minutesPlayed: 580, yellowCards: 1, redCards: 0 },

  // === PARAGUAY ===
  { id: 'p56', name: 'Alfredo Aguilar', team: 'Paraguai', position: 'Meia', number: 10, photo: '',
    goals: 1, assists: 2, shots: 8, shotsOnTarget: 3, passes: 240, passAccuracy: 80,
    tackles: 12, interceptions: 8, duelsWon: 28, minutesPlayed: 540, yellowCards: 1, redCards: 0 },
  { id: 'p57', name: 'Ángel Romero', team: 'Paraguai', position: 'Atacante', number: 9, photo: '',
    goals: 2, assists: 0, shots: 12, shotsOnTarget: 6, passes: 80, passAccuracy: 66,
    tackles: 2, interceptions: 0, duelsWon: 18, minutesPlayed: 420, yellowCards: 1, redCards: 0 },

  // === USA ===
  { id: 'p58', name: 'Christian Pulisic', team: 'EUA', position: 'Atacante', number: 10, photo: '',
    goals: 4, assists: 2, shots: 20, shotsOnTarget: 12, passes: 160, passAccuracy: 78,
    tackles: 6, interceptions: 2, duelsWon: 32, minutesPlayed: 620, yellowCards: 1, redCards: 0 },
  { id: 'p59', name: 'Weston McKennie', team: 'EUA', position: 'Meia', number: 8, photo: '',
    goals: 2, assists: 1, shots: 10, shotsOnTarget: 4, passes: 260, passAccuracy: 82,
    tackles: 14, interceptions: 8, duelsWon: 30, minutesPlayed: 600, yellowCards: 1, redCards: 0 },
  { id: 'p60', name: 'Matt Turner', team: 'EUA', position: 'Goleiro', number: 1, photo: '',
    goals: 0, assists: 0, shots: 0, shotsOnTarget: 0, passes: 140, passAccuracy: 72,
    tackles: 0, interceptions: 0, duelsWon: 0, minutesPlayed: 540, yellowCards: 0, redCards: 0 },
];

// ============================================
// ARTELHARES (Golden Boot)
// ============================================

const topScorers = [
  { name: 'Lionel Messi', team: 'Argentina', flag: '🇦🇷', goals: 8, assists: 4, minutesPlayed: 780 },
  { name: 'Kylian Mbappé', team: 'França', flag: '🇫🇷', goals: 8, assists: 3, minutesPlayed: 720 },
  { name: 'Harry Kane', team: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', goals: 6, assists: 2, minutesPlayed: 720 },
  { name: 'Erling Haaland', team: 'Noruega', flag: '🇳🇴', goals: 6, assists: 1, minutesPlayed: 640 },
  { name: 'Lamine Yamal', team: 'Espanha', flag: '🇪🇸', goals: 5, assists: 3, minutesPlayed: 680 },
  { name: 'Romelu Lukaku', team: 'Bélgica', flag: '🇧🇪', goals: 5, assists: 2, minutesPlayed: 620 },
  { name: 'Cristiano Ronaldo', team: 'Portugal', flag: '🇵🇹', goals: 5, assists: 1, minutesPlayed: 600 },
  { name: 'Kai Havertz', team: 'Alemanha', flag: '🇩🇪', goals: 4, assists: 1, minutesPlayed: 560 },
  { name: 'Julián Álvarez', team: 'Argentina', flag: '🇦🇷', goals: 4, assists: 2, minutesPlayed: 640 },
  { name: 'Mikel Oyarzabal', team: 'Espanha', flag: '🇪🇸', goals: 4, assists: 1, minutesPlayed: 620 },
  { name: 'Ousmane Dembélé', team: 'França', flag: '🇫🇷', goals: 4, assists: 2, minutesPlayed: 650 },
  { name: 'Mohamed Salah', team: 'Egito', flag: '🇪🇬', goals: 4, assists: 2, minutesPlayed: 620 },
  { name: 'Vinícius Jr.', team: 'Brasil', flag: '🇧🇷', goals: 4, assists: 3, minutesPlayed: 620 },
  { name: 'Luis Díaz', team: 'Colômbia', flag: '🇨🇴', goals: 4, assists: 2, minutesPlayed: 600 },
  { name: 'Christian Pulisic', team: 'EUA', flag: '🇺🇸', goals: 4, assists: 2, minutesPlayed: 620 },
];

// ============================================
// PRÊMIOS
// ============================================

const awards = {
  goldenBall: { name: 'Lionel Messi', team: 'Argentina', flag: '🇦🇷' },
  goldenBoot: { name: 'Lionel Messi / Kylian Mbappé', team: 'Argentina / França', flag: '🇦🇷 / 🇫🇷', goals: 8 },
  goldenGlove: { name: 'Emiliano Martínez', team: 'Argentina', flag: '🇦🇷' },
  fairPlay: { name: 'Espanha', flag: '🇪🇸' },
};

// ============================================
// EXPORTS
// ============================================

export function getGroups() {
  return groups;
}

export function getGroup(groupLetter) {
  return groups[groupLetter.toUpperCase()];
}

export function getTeams() {
  return teams;
}

export function getTeamById(id) {
  return teams.find(t => t.id === id);
}

export function getTopScorers() {
  return topScorers;
}

export function getAwards() {
  return awards;
}

export function getBracket() {
  return {
    roundOf32,
    roundOf16,
    quarterfinals,
    semifinals,
    thirdPlace,
    final: finalMatch,
  };
}

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

export function getTeamFormNarrative(team) {
  const form = team.form || '-----';
  const wins = form.split('').filter(c => c === 'W').length;
  const losses = form.split('').filter(c => c === 'L').length;
  if (wins >= 4) return `Em sequência invicta impressionante — ${wins} vitórias nos últimos ${form.length} jogos.`;
  if (losses === 0) return `Sem derrotas no torneio — forma consistente.`;
  if (losses >= 2) return `Equipe enfrentando dificuldades recentes.`;
  return `Desempenho equilibrado com ${wins} vitórias e ${losses} derrotas nos últimos ${form.length} jogos.`;
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

export function getEliminated() {
  return teams.filter(t => t.status.startsWith('Eliminada'));
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

export function computeExpectedGoals(team) {
  const avgGoalsFor = team.goalsFor / team.played;
  const avgGoalsAgainst = team.goalsAgainst / team.played;
  return {
    expectedGoalsFor: Math.round(avgGoalsFor * 10) / 10,
    expectedGoalsAgainst: Math.round(avgGoalsAgainst * 10) / 10,
  };
}

export function getFormTrend(team) {
  const form = team.form || '-----';
  const recent = form.slice(-3);
  const wins = recent.split('').filter(c => c === 'W').length;
  if (wins === 3) return 'excellent';
  if (wins >= 2) return 'good';
  if (wins === 1) return 'average';
  return 'poor';
}

export function getSemifinalContexts() {
  return [
    {
      id: 'sf1',
      match: 'França × Espanha',
      date: '2026-07-14',
      time: '21:00',
      venue: 'AT&T Stadium, Arlington',
      home: 'França',
      away: 'Espanha',
      homeGoals: 0,
      awayGoals: 2,
      winner: 'Espanha',
      context: 'Espanha venceu a França por 2-0 na semifinal em 14 de julho. Com gols de Lamine Yamal e Mikel Oyarzabal, a Espanha garantiu vaga na final com uma atuação sólida. A França, apesar de ter Mbappé com 8 gols no torneio, não conseguiu romper a defesa espanhola.',
      highlights: [
        'Lamine Yamal abre o placar aos 23\' com um chute de fora da área',
        'Oyarzabal amplia aos 67\' com cabeçada cruzada por Carvajal',
        'Mbappé desperdiça chance clara aos 78\'',
        'Espanha controlou 62% da posse de bola',
        'Martínez fez 3 defesas importantes para Argentina na semifinal seguinte'
      ],
      keyPlayers: {
        home: ['Mbappé (8 gols no torneio)', 'Dembélé (4 gols, 2 assistências)', 'Tchouaméni (meio-campo sólido)'],
        away: ['Lamine Yamal (5 gols, 3 assistências)', 'Oyarzabal (4 gols)', 'Rodri (92% de acerto nos passes)']
      }
    },
    {
      id: 'sf2',
      match: 'Inglaterra × Argentina',
      date: '2026-07-15',
      time: '21:00',
      venue: 'Mercedes-Benz Stadium, Atlanta',
      home: 'Inglaterra',
      away: 'Argentina',
      homeGoals: 1,
      awayGoals: 2,
      winner: 'Argentina',
      context: 'Argentina venceu a Inglaterra por 2-1 em 15 de julho e garantiu vaga na final. Messi marcou um gol espetacular de falta e Álvarez completou o placar. Inglaterra resistiu com gol de Kane, mas não conseguiu evitar a derrota. Messi busca seu terceiro título mundial.',
      highlights: [
        'Messi abre o placar com falta aos 34\'',
        'Kane equaliza aos 55\' com cabeçada',
        'Álvarez marca o gol da vitória aos 72\'',
        'Emi Martínez faz defesa crucial nos pênaltis da fase anterior',
        'Argentina vence sua 4ª partida consecutiva no torneio'
      ],
      keyPlayers: {
        home: ['Harry Kane (6 gols, 2 assistências)', 'Bellingham (3 gols, 3 assistências)', 'Saka (3 gols, 4 assistências)'],
        away: ['Messi (8 gols, 4 assistências)', 'Álvarez (4 gols, 2 assistências)', 'Enzo Fernández (88% de passes)']
      }
    },
  ];
}