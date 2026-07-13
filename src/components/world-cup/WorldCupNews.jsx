import { useState } from 'react';
import { getSemifinalContexts } from '../../data/world-cup';

export default function WorldCupNews() {
  const contexts = getSemifinalContexts();
  const [activeMatch, setActiveMatch] = useState(0);

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a2e2e] via-[#1f3a3a] to-[#2a4a4a] p-6 sm:p-8 mb-6 shadow-lg border border-[#d4a017]/20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a017]/5 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d4a017]/5 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">📰</span>
            <span className="text-[#d4a017] text-xs font-bold uppercase tracking-widest">Semifinais</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Copa do Mundo 2026
          </h1>
          <p className="text-gray-400 text-sm max-w-lg">
            Tudo o que você precisa saber antes dos jogos decisivos pelas finais.
          </p>

          {/* Match selector tabs */}
          <div className="flex gap-3 mt-6">
            {contexts.map((sf, i) => (
              <button
                key={sf.id}
                onClick={() => setActiveMatch(i)}
                className={`flex-1 rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                  activeMatch === i
                    ? 'bg-[#d4a017]/20 border-2 border-[#d4a017] shadow-lg shadow-[#d4a017]/10'
                    : 'bg-white/5 border-2 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="text-[10px] text-[#d4a017] font-bold uppercase tracking-wider mb-1">
                  {sf.date.split('-').slice(1).join('/') } • {sf.time}
                </div>
                <div className="text-sm font-bold text-white truncate">
                  {sf.home} <span className="text-[#d4a017] mx-1">vs</span> {sf.away}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active match detail */}
      {contexts.map((sf, idx) => (
        activeMatch === idx && (
          <div key={sf.id} className="space-y-5 animate-fadeIn">
            {/* Venue info */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>📍</span>
              <span>{sf.venue}</span>
            </div>

            {/* Contexto principal - destaque */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#d4a017]/10 to-[#d4a017]/5 border border-[#d4a017]/30 p-5">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#d4a017] to-transparent"></div>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">⚡</span>
                <div>
                  <h3 className="text-sm font-bold text-[#d4a017] mb-1">Em destaque</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {sf.context}
                  </p>
                </div>
              </div>
            </div>

            {/* Destaques grid */}
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-dark-700/30">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Destaques do confronto
                </h3>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-700/30">
                {sf.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 dark:hover:bg-dark-700/20 transition-colors">
                    <div className="w-5 h-5 rounded-full bg-[#d4a017]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-[#d4a017]">{i + 1}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Jogadores-chave - cards lado a lado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Home team */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-[#1f3a3a] to-[#2a4a4a]">
                  <h3 className="text-sm font-bold text-white">{sf.home}</h3>
                  <p className="text-[10px] text-[#d4a017] uppercase tracking-wider">Principais jogadores</p>
                </div>
                <div className="p-4 space-y-3">
                  {sf.keyPlayers.home.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1f3a3a] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-[#d4a017]">{i + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{p}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Away team */}
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700/50 bg-gradient-to-r from-[#2a4a4a] to-[#1f3a3a]">
                  <h3 className="text-sm font-bold text-white">{sf.away}</h3>
                  <p className="text-[10px] text-[#d4a017] uppercase tracking-wider">Principais jogadores</p>
                </div>
                <div className="p-4 space-y-3">
                  {sf.keyPlayers.away.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1f3a3a] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-[#d4a017]">{i + 1}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  );
}