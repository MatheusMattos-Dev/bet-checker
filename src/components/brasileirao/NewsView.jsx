import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

const news = [
  {
    id: 1,
    title: 'Flamengo lidera o Brasileirão com campanha dominante',
    summary: 'O Rubro-Negro carioca segue na liderança com 66 pontos após 30 rodadas, com Pedro como artilheiro com 18 gols.',
    date: '2026-07-18',
    category: 'Análise',
    image: '🔴⚫',
  },
  {
    id: 2,
    title: 'Palmeiras busca o título com Endrick em alta',
    summary: 'O time paulista está em 2º lugar e depende de si mesmo para conquistar o campeonato. Endrick tem 16 gols.',
    date: '2026-07-17',
    category: 'Destaque',
    image: '🟢⚪',
  },
  {
    id: 3,
    title: 'Zona de rebaixamento: Coritiba B luta pela sobrevivência',
    summary: 'Com apenas 21 pontos, o time está isolado na lanterna e precisa de milagres para evitar o descenso.',
    date: '2026-07-16',
    category: 'Rebaixamento',
    image: '🟡⚫',
  },
  {
    id: 4,
    title: 'Botafogo surpreende e briga pelo título',
    summary: 'O Glorioso está em 3º lugar com 61 pontos, impulsionado por Luiz Henrique e Alerrandro.',
    date: '2026-07-15',
    category: 'Análise',
    image: '⚫⭐',
  },
  {
    id: 5,
    title: 'São Paulo busca vaga na Libertadores com força total',
    summary: 'O Tricolor está em 4º lugar e Lucero tem sido fundamental com 10 gols na temporada.',
    date: '2026-07-14',
    category: 'Libertadores',
    image: '🔴⚪⚫',
  },
  {
    id: 6,
    title: 'Hulk continua sendo o craque do Atlético-MG',
    summary: 'O meia mineiro tem 12 gols e 8 assistências, sendo um dos jogadores mais completos do campeonato.',
    date: '2026-07-13',
    category: 'Jogador',
    image: '⚫⚪',
  },
  {
    id: 7,
    title: 'Goleiro Rossi do Flamengo faz temporada histórica',
    summary: 'Com apenas 22 gols sofridos em 30 jogos, Rossi é um dos goleiros mais sólidos do Brasileirão.',
    date: '2026-07-12',
    category: 'Goleiro',
    image: '🧤',
  },
  {
    id: 8,
    title: 'Rodada 31 promete grandes confrontos',
    summary: 'Na próxima rodada, Flamengo recebe o Palmeiras em um dos jogos mais aguardados do campeonato.',
    date: '2026-07-11',
    category: 'Prévia',
    image: '⚽',
  },
];

const categories = ['Todas', 'Análise', 'Destaque', 'Rebaixamento', 'Libertadores', 'Jogador', 'Prévia'];

export default function NewsView() {
  const { brNews } = useApp();
  const [filter, setFilter] = useState('Todas');
  
  // Combine real news with mock news to always have content
  const allNews = useMemo(() => {
    if (!brNews || brNews.length === 0) return news;
    
    // Map real news to the component format
    const realNews = brNews.map((n, i) => ({
      id: `real-${i}`,
      title: n.title,
      summary: n.description,
      date: new Date(n.pub_date).toLocaleDateString('pt-BR'),
      category: 'Últimas',
      image: '📰', // fallback emoji
      link: n.link
    }));
    return realNews.length > 0 ? realNews : news;
  }, [brNews]);

  const filtered = filter === 'Todas' ? allNews : allNews.filter((n) => n.category === filter);

  // Update categories dynamically based on what exists
  const dynamicCategories = useMemo(() => {
    const cats = new Set(['Todas']);
    allNews.forEach(n => cats.add(n.category));
    return Array.from(cats);
  }, [allNews]);

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {dynamicCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              filter === cat
                ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30'
                : 'bg-surface-800/50 text-text-secondary border border-surface-700/50 hover:bg-surface-700/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item, index) => {
          const isFeatured = filter === 'Todas' && index === 0;
          return (
            <div 
              key={item.id} 
              onClick={() => item.link ? window.open(item.link, '_blank') : null}
              className={`glass-card rounded-2xl border border-surface-600/30 overflow-hidden hover:border-accent-500/40 hover:shadow-xl hover:shadow-accent-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group ${isFeatured ? 'md:col-span-2 lg:col-span-3 flex flex-col md:flex-row' : 'flex flex-col'}`}
            >
              <div className={`bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center p-6 ${isFeatured ? 'md:w-1/3 border-b md:border-b-0 md:border-r border-surface-600/30' : 'border-b border-surface-600/30'}`}>
                <span className={`${isFeatured ? 'text-7xl' : 'text-5xl'} transform group-hover:scale-110 transition-transform duration-500`}>
                  {item.image}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between bg-surface-900/50 backdrop-blur-sm">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-accent-900 bg-accent-400 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">{item.category}</span>
                    <span className="text-[10px] font-medium text-text-muted flex items-center gap-1">
                      🗓️ {item.date}
                    </span>
                  </div>
                  <h3 className={`${isFeatured ? 'text-xl sm:text-2xl' : 'text-base'} font-bold font-display text-text-primary group-hover:text-accent-300 transition-colors leading-tight mb-2`}>
                    {item.title}
                  </h3>
                  <p className={`text-text-secondary ${isFeatured ? 'text-sm' : 'text-xs line-clamp-3'}`}>
                    {item.summary}
                  </p>
                </div>
                {item.link && (
                  <div className="mt-4 pt-4 border-t border-surface-600/30 flex items-center gap-1.5 text-xs font-bold text-accent-400 group-hover:text-accent-300 transition-colors">
                    Ler matéria completa
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}