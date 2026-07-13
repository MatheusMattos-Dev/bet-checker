import { useApp } from '../../context/AppContext';
import WorldCupBracket from './WorldCupBracket';
import WorldCupTeams from './WorldCupTeams';
import WorldCupTeamDetail from './WorldCupTeamDetail';
import WorldCupComparative from './WorldCupComparative';
import WorldCupMatchDetail from './WorldCupMatchDetail';
import WorldCupPlayers from './WorldCupPlayers';
import WorldCupNews from './WorldCupNews';

const views = [
  { key: 'bracket', label: 'Mata-Mata', icon: '🏆' },
  { key: 'teams', label: 'Times', icon: '⚽' },
  { key: 'players', label: 'Jogadores', icon: '👤' },
  { key: 'comparative', label: 'Análises', icon: '📊' },
  { key: 'news', label: 'Notícias', icon: '📰' },
];

export default function WorldCupPage() {
  const { worldCupView, navigateWCView, selectedWCTeam, selectedWCMatch, wcAnalyses } = useApp();

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1f3a3a] to-[#2a4a4a] rounded-xl p-4 shadow-sm border border-[#d4a017]/30 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">Copa do Mundo 2026</h1>
              <p className="text-xs text-[#d4a017]">Fase de Quartas de Final • 8 de Julho</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {views.map((v) => (
          <button
            key={v.key}
            onClick={() => navigateWCView(v.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              worldCupView === v.key
                ? 'bg-[#d4a017] text-dark-900'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            <span className="mr-1">{v.icon}</span> {v.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {worldCupView === 'bracket' && <WorldCupBracket />}
      {worldCupView === 'teams' && !selectedWCTeam && <WorldCupTeams />}
      {worldCupView === 'team' && selectedWCTeam && <WorldCupTeamDetail team={selectedWCTeam} />}
      {worldCupView === 'players' && <WorldCupPlayers />}
      {worldCupView === 'comparative' && <WorldCupComparative analyses={wcAnalyses} />}
      {worldCupView === 'news' && <WorldCupNews />}
      {worldCupView === 'match' && selectedWCMatch && <WorldCupMatchDetail match={selectedWCMatch} />}
    </div>
  );
}
