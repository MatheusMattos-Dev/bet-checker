export const LEAGUES = {
  br: { name: 'Brasileirão', flag: '🇧🇷', apiId: 71, season: 2025 },
  ar: { name: 'Liga Argentina', flag: '🇦🇷', apiId: 128, season: 2025 },
  es: { name: 'La Liga', flag: '🇪🇸', apiId: 140, season: 2025 },
  en: { name: 'Premier League', flag: '🏴󠁧󠁥󠁮󠁧󠁿', apiId: 39, season: 2025 },
  fr: { name: 'Ligue 1', flag: '🇫🇷', apiId: 61, season: 2025 },
  de: { name: 'Bundesliga', flag: '🇩🇪', apiId: 78, season: 2025 },
  it: { name: 'Serie A', flag: '🇮🇹', apiId: 135, season: 2025 },
  pt: { name: 'Liga Portugal', flag: '🇵🇹', apiId: 94, season: 2025 },
  mx: { name: 'Liga MX', flag: '🇲🇽', apiId: 262, season: 2025 },
  co: { name: 'Liga Colombiana', flag: '🇨🇴', apiId: 283, season: 2025 },
  ucl: { name: 'Champions League', flag: '🏆', apiId: 2, season: 2025 },
};

export const LEAGUE_KEYS = Object.keys(LEAGUES);
export const DEFAULT_LEAGUE = 'br';
