// Real club colors, used for the team-accent-bar signature across cards/tables.
export function getTeamColor(teamName) {
  if (!teamName) return '#2fa876';
  const name = teamName.toLowerCase();

  if (name.includes('flamengo')) return '#ef4444';
  if (name.includes('palmeiras')) return '#1c7a51';
  if (name.includes('são paulo') || name.includes('sao paulo')) return '#ef4444';
  if (name.includes('corinthians')) return '#171a21';
  if (name.includes('santos')) return '#171a21';
  if (name.includes('vasco')) return '#171a21';
  if (name.includes('botafogo')) return '#171a21';
  if (name.includes('fluminense')) return '#9f1a24';
  if (name.includes('cruzeiro')) return '#3b6fd4';
  if (name.includes('atlético-mg') || name.includes('atletico-mg')) return '#171a21';
  if (name.includes('grêmio') || name.includes('gremio')) return '#3b6fd4';
  if (name.includes('internacional')) return '#ef4444';
  if (name.includes('bahia')) return '#3b6fd4';
  if (name.includes('vitória') || name.includes('vitoria')) return '#ef4444';
  if (name.includes('athletico')) return '#ef4444';
  if (name.includes('fortaleza')) return '#3b6fd4';
  if (name.includes('criciúma') || name.includes('criciuma')) return '#f2c94c';
  if (name.includes('juventude')) return '#1c7a51';
  if (name.includes('bragantino')) return '#ef4444';
  if (name.includes('atlético-go') || name.includes('atletico-go')) return '#ef4444';
  if (name.includes('cuiabá') || name.includes('cuiaba')) return '#f2c94c';
  if (name.includes('coritiba')) return '#1c7a51';
  if (name.includes('remo')) return '#3b6fd4';
  if (name.includes('chapecoense')) return '#1c7a51';

  return '#2fa876';
}
