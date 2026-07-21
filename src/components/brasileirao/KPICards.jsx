import { useApp } from '../../context/AppContext';

function generateMockBoloes() {
  const boloes = [];
  for (let i = 0; i < 80; i++) {
    boloes.push({
      id: i + 1,
      name: `Bolão #${i + 1}`,
      coverage: Math.floor(Math.random() * 50) + 40,
      invested: Math.floor(Math.random() * 5000) + 500,
    });
  }
  return boloes;
}

export default function KPICards() {
  const { brStandings } = useApp();
  const boloes = generateMockBoloes();
  const totalInvested = boloes.reduce((sum, b) => sum + b.invested, 0);
  const avgCoverage = Math.round(boloes.reduce((sum, b) => sum + b.coverage, 0) / boloes.length);

  // Calcular zebras (vitórias de times de posição baixa contra times de posição alta)
  const zebras = 3; // Mock

  const kpis = [
    {
      label: 'Investido',
      value: `R$ ${totalInvested.toLocaleString('pt-BR')}`,
      change: '+12%',
      isPositive: true,
      icon: '💰',
      color: 'accent',
    },
    {
      label: 'Zebras',
      value: zebras,
      change: '+1',
      isPositive: false,
      icon: '🐦',
      color: 'gold',
    },
    {
      label: 'Eficiência',
      value: `${avgCoverage}%`,
      change: '+3%',
      isPositive: true,
      icon: '📈',
      color: 'accent',
    },
    {
      label: 'Bolões',
      value: boloes.length,
      change: '+8',
      isPositive: true,
      icon: '🎯',
      color: 'accent',
    },
  ];

  const colorMap = {
    accent: 'from-accent-500/10 to-accent-500/5 border-accent-500/20',
    gold: 'from-gold-500/10 to-gold-500/5 border-gold-500/20',
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((kpi) => (
        <div key={kpi.label} className={`glass-card rounded-xl border bg-gradient-to-br ${colorMap[kpi.color]} p-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-muted font-medium">{kpi.label}</span>
            <span className="text-lg">{kpi.icon}</span>
          </div>
          <div className="text-xl font-bold font-display text-text-primary">{kpi.value}</div>
          <div className={`text-xs font-semibold mt-1 ${kpi.isPositive ? 'text-accent-300' : 'text-danger-400'}`}>
            {kpi.change}
          </div>
        </div>
      ))}
    </div>
  );
}