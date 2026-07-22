import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

const fallbackNews = [
  {
    id: 1, title: 'Fim de semana agitado no Brasileirão',
    summary: 'Acompanhe tudo sobre a próxima rodada, com clássicos emocionantes e briga intensa no topo da tabela.',
    date: '2026-07-22', category: 'Prévia', image: '⚽'
  },
  {
    id: 2, title: 'Janela de transferências movimenta bastidores',
    summary: 'Clubes correm contra o tempo para fechar últimos reforços antes do fechamento da janela internacional.',
    date: '2026-07-21', category: 'Mercado', image: '💸'
  },
  {
    id: 3, title: 'Arbitragem sob pressão',
    summary: 'Comissão de arbitragem analisa lances polêmicos da última rodada e promete maior transparência no VAR.',
    date: '2026-07-20', category: 'Análise', image: '⚖️'
  },
  {
    id: 4, title: 'Corrida pelo artilheiro do campeonato',
    summary: 'Atacantes disparam na frente e prometem uma briga acirrada pela Chuteira de Ouro do Brasileirão.',
    date: '2026-07-19', category: 'Destaque', image: '👟'
  }
];

const CardImage = ({ isRealImage, image }) => (
  isRealImage ? (
    <img src={image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
  ) : (
    <div className="absolute inset-0 bg-gradient-to-br from-surface-800 to-surface-900 flex items-center justify-center">
      <span className="text-6xl transform group-hover:scale-110 transition-transform duration-700">{image}</span>
    </div>
  )
);

function HeroCard({ item }) {
  return (
    <div onClick={() => item.link ? window.open(item.link, '_blank') : null} 
         className="md:col-span-2 lg:col-span-3 relative h-[380px] sm:h-[480px] rounded-[2rem] overflow-hidden cursor-pointer group shadow-xl border border-surface-600/30 hover:border-surface-500/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <CardImage isRealImage={item.isRealImage} image={item.image} />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-900/40 to-transparent opacity-90" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col justify-end">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] sm:text-xs font-bold text-accent-950 bg-accent-400 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">{item.category}</span>
          <span className="text-xs font-bold text-text-primary flex items-center gap-1.5 drop-shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            {item.date}
          </span>
        </div>
        <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-display text-text-primary group-hover:text-accent-300 transition-colors leading-tight mb-3 drop-shadow-lg">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base text-text-primary/90 line-clamp-2 max-w-3xl drop-shadow-md font-medium">
          {item.summary}
        </p>
      </div>
    </div>
  );
}

function BentoCard({ item }) {
  return (
    <div onClick={() => item.link ? window.open(item.link, '_blank') : null} 
         className="relative h-[280px] sm:h-[320px] rounded-3xl overflow-hidden cursor-pointer group shadow-md border border-surface-600/30 hover:border-surface-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <CardImage isRealImage={item.isRealImage} image={item.image} />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-900/60 to-transparent opacity-90" />
      
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] sm:text-[10px] font-bold text-text-primary bg-surface-600/80 backdrop-blur-md px-2.5 py-1 rounded-full uppercase tracking-wider group-hover:bg-accent-500/20 group-hover:text-accent-300 transition-colors">{item.category}</span>
          <span className="text-[10px] text-text-primary/80 drop-shadow-md font-semibold">{item.date}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold font-display text-text-primary group-hover:text-accent-300 transition-colors leading-tight line-clamp-3 drop-shadow-md">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

function ListCard({ item }) {
  return (
    <div onClick={() => item.link ? window.open(item.link, '_blank') : null} 
         className="flex gap-4 p-3 sm:p-4 rounded-2xl bg-surface-800/40 backdrop-blur-xl border border-surface-600/30 hover:border-surface-500/50 hover:bg-surface-700/30 transition-all cursor-pointer group shadow-sm">
      <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden relative shadow-md">
        <CardImage isRealImage={item.isRealImage} image={item.image} />
      </div>
      <div className="flex-1 flex flex-col justify-center py-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] sm:text-[10px] font-bold text-text-primary bg-surface-700/80 px-2 py-0.5 rounded-full uppercase tracking-wider group-hover:bg-accent-500/20 group-hover:text-accent-300 transition-colors">{item.category}</span>
          <span className="text-[10px] text-text-muted">{item.date}</span>
        </div>
        <h3 className="text-sm sm:text-base font-bold font-display text-text-primary group-hover:text-accent-300 transition-colors leading-tight mb-1.5 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-text-secondary line-clamp-2 hidden sm:-webkit-box">
          {item.summary}
        </p>
      </div>
    </div>
  );
}

export default function NewsView() {
  const { brNews } = useApp();
  const [filter, setFilter] = useState('Todas');
  
  const allNews = useMemo(() => {
    if (!brNews || brNews.length === 0) return fallbackNews;
    
    return brNews.map((n, i) => ({
      id: `real-${i}`,
      title: n.title,
      summary: n.description,
      date: new Date(n.pub_date).toLocaleDateString('pt-BR'),
      category: 'Destaque',
      image: n.image_url || '📰',
      link: n.link,
      isRealImage: !!n.image_url
    }));
  }, [brNews]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Grid Bento / Magazine */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allNews[0] && <HeroCard item={allNews[0]} />}
        
        {allNews[1] && <BentoCard item={allNews[1]} />}
        {allNews[2] && <BentoCard item={allNews[2]} />}
        {allNews[3] && <BentoCard item={allNews[3]} />}
      </div>

      {/* Feed em Lista */}
      {allNews.length > 4 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-5 px-1">
            <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-accent-400 to-accent-500 block shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
            <h3 className="text-xl font-bold font-display text-text-primary tracking-tight">
              Mais Notícias
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allNews.slice(4).map(item => <ListCard key={item.id} item={item} />)}
          </div>
        </div>
      )}
      
      {allNews.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl">
          <span className="text-4xl mb-4 block opacity-50">📭</span>
          <p className="text-text-secondary font-medium">Nenhuma notícia encontrada.</p>
        </div>
      )}
    </div>
  );
}