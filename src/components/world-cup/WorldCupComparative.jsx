import { useApp } from '../../context/AppContext';

export default function WorldCupComparative() {
  const { navigateWCView, wcTeams } = useApp();

  const categoryIcons = {
    attack: '⚔️',
    defense: '🛡️',
    wins: '🏆',
    form: '📈',
  };

  const categoryLabels = {
    attack: 'Melhor Ataque',
    defense: 'Melhor Defesa',
    wins: 'Mais Vitórias',
    form: 'Melhor Forma',
  };

  // Generate analyses from wcTeams
  const analyses = [
    {
      category: 'attack',
      data: [...wcTeams].sort((a, b) => b.goalsFor - a.goalsFor).slice(0, 4).map(t => ({
        name: t.name,
        flag: t.flag,
        value: t.goalsFor,
      })),
    },
    {
      category: 'defense',
      data: [...wcTeams].sort((a, b) => a.goalsAgainst - b.goalsAgainst).slice(0, 4).map(t => ({
        name: t.name,
        flag: t.flag,
        value: t.goalsAgainst,
      })),
    },
    {
      category: 'wins',
      data: [...wcTeams].sort((a, b) => b.won - a.won).slice(0, 4).map(t => ({
        name: t.name,
        flag: t.flag,
        value: t.won,
      })),
    },
    {
      category: 'form',
      data: [...wcTeams].sort((a, b) => b.points - a.points).slice(0, 4).map(t => ({
        name: t.name,
        flag: t.flag,
        value: t.points,
      })),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analyses.map((analysis) => (
          <div key={analysis.category} className="bg-surface-800 rounded-xl p-5 border border-surface-600/50">
            <h3 className="font-display font-semibold text-accent-300 mb-3 flex items-center gap-2">
              <span>{categoryIcons[analysis.category] || '📊'}</span>
              {categoryLabels[analysis.category] || analysis.label}
            </h3>
            <div className="space-y-2">
              {analysis.data.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm cursor-pointer hover:bg-surface-700/30 rounded-lg px-2 py-2 transition-colors"
                  onClick={() => {
                    const team = wcTeams.find(t => t.name === item.name);
                    if (team) navigateWCView('team', team);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold w-4 ${
                      i === 0 ? 'text-gold-400' : i === 1 ? 'text-text-secondary' : i === 2 ? 'text-amber-600' : 'text-text-muted'
                    }`}>#{i + 1}</span>
                    <span className="text-base">{item.flag}</span>
                    <span className="font-medium text-text-primary">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-accent-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}