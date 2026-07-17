import { useState } from 'react';
import { getSemifinalContexts } from '../../data/world-cup';

export default function WorldCupNews() {
  const contexts = getSemifinalContexts();
  const [activeTab, setActiveTab] = useState('final');

  const tabs = [
    { id: 'final', label: 'Final', icon: '🏆' },
    ...contexts.map(c => ({ id: c.match, label: `${c.home} vs ${c.away}`, icon: '⚽' })),
  ];

  const activeContext = activeTab === 'final'
    ? {
        home: 'Espanha', away: 'Argentina',
        homeFlag: '🇪🇸', awayFlag: '🇦🇷',
        date: '19 de Julho', venue: 'MetLife Stadium, Nova Jersey',
        highlights: ['Espanha lidera o ranking de posse de bola', 'Argentina venceu nos pênaltis na última final', 'Lionel Messi busca seu primeiro título mundial'],
        keyPlayers: { home: ['Pedri', 'Rodri', 'Morata'], away: ['Messi', 'De Paul', 'Martínez'] },
      }
    : contexts.find(c => c.match === activeTab);

  if (!activeContext) return null;

  return (
    <div>
      {/* Hero banner */}
      <div className="relative bg-surface-800 rounded-2xl overflow-hidden mb-6 border border-surface-600/50">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-gold-500/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>

        <div className="relative p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
            <span className="text-xs font-mono text-gold-400 uppercase tracking-wider">
              {activeTab === 'final' ? 'Próxima Final' : 'Semifinal'}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-center flex-1">
              <span className="text-4xl block mb-2">{activeContext.homeFlag}</span>
              <span className="font-display font-bold text-text-primary text-lg">{activeContext.home}</span>
            </div>
            <div className="px-4 text-center">
              <span className="text-2xl font-mono font-bold text-gold-400">VS</span>
              {activeContext.date && <p className="text-xs text-text-muted mt-1">{activeContext.date}</p>}
            </div>
            <div className="text-center flex-1">
              <span className="text-4xl block mb-2">{activeContext.awayFlag}</span>
              <span className="font-display font-bold text-text-primary text-lg">{activeContext.away}</span>
            </div>
          </div>

          {activeContext.venue && (
            <p className="text-center text-xs text-text-muted">{activeContext.venue}</p>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gold-500/15 text-gold-400 border border-gold-500/30'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-800 border border-transparent'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Highlights */}
        <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50">
          <h3 className="text-sm font-display font-semibold text-text-primary mb-3">🔑 Destaques</h3>
          <ul className="space-y-2">
            {activeContext.highlights?.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-accent-500 mt-0.5">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Players */}
        <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50">
          <h3 className="text-sm font-display font-semibold text-text-primary mb-3">⭐ Jogadores Chave</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-muted mb-2">{activeContext.home}</p>
              {activeContext.keyPlayers?.home?.map((p, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 text-sm text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                  {p}
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-text-muted mb-2">{activeContext.away}</p>
              {activeContext.keyPlayers?.away?.map((p, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 text-sm text-text-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-info-500"></span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}