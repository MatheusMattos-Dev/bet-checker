import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { IconBall, IconChart, IconScale, IconJersey, IconNewspaper } from '../icons';

const fallbackNews = [
  {
    id: 1, title: 'Fim de semana agitado no Brasileirão',
    summary: 'Acompanhe tudo sobre a próxima rodada, com clássicos emocionantes e briga intensa no topo da tabela.',
    date: '2026-07-22', category: 'Prévia', icon: IconBall
  },
  {
    id: 2, title: 'Janela de transferências movimenta bastidores',
    summary: 'Clubes correm contra o tempo para fechar últimos reforços antes do fechamento da janela internacional.',
    date: '2026-07-21', category: 'Mercado', icon: IconChart
  },
  {
    id: 3, title: 'Arbitragem sob pressão',
    summary: 'Comissão de arbitragem analisa lances polêmicos da última rodada e promete maior transparência no VAR.',
    date: '2026-07-20', category: 'Análise', icon: IconScale
  },
  {
    id: 4, title: 'Corrida pelo artilheiro do campeonato',
    summary: 'Atacantes disparam na frente e prometem uma briga acirrada pela Chuteira de Ouro do Brasileirão.',
    date: '2026-07-19', category: 'Destaque', icon: IconJersey
  }
];

const tagStyle = {
  'Destaque': 'bg-gold-100 text-gold-700',
  'Mercado': 'bg-blue-100 text-blue-700',
  'Análise': 'bg-green-100 text-green-700',
  'Prévia': 'bg-gray-100 text-ink-600',
};

const CardImage = ({ isRealImage, image, icon: Icon }) => (
  <div className="absolute inset-0 bg-slate-900 overflow-hidden">
    <img 
      src={isRealImage && image ? image : '/images/news_hero_banner.png'} 
      alt="Notícia"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
  </div>
);

function ShareIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342a3 3 0 100-2.684m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}

function NewsCard({ item }) {
  return (
    <div className="card overflow-hidden group">
      <div className="relative h-44 overflow-hidden">
        <CardImage isRealImage={item.isRealImage} image={item.image} icon={item.icon} />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className={`tag ${tagStyle[item.category] || tagStyle['Prévia']}`}>{item.category}</span>
          <span className="text-[11px] text-ink-400 flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth="2" /><path strokeLinecap="round" strokeWidth="2" d="M12 7v5l3 3" /></svg>
            {item.date}
          </span>
        </div>
        <h3 className="text-base font-bold font-display text-ink-900 leading-snug mb-4 line-clamp-3">
          {item.title}
        </h3>
        <div className="flex items-center gap-2">
          {item.link ? (
            <a href={item.link} target="_blank" rel="noreferrer" className="btn-outline">Ler mais</a>
          ) : (
            <button className="btn-outline">Ler mais</button>
          )}
          <button aria-label="Compartilhar" className="w-10 h-10 shrink-0 rounded-md border border-gray-300 flex items-center justify-center text-ink-600 hover:border-ink-900 hover:text-ink-900 transition-colors">
            <ShareIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function ListCard({ item }) {
  return (
    <div onClick={() => item.link ? window.open(item.link, '_blank') : null}
         className="flex gap-4 p-3 rounded-lg bg-paper border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group">
      <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden relative">
        <CardImage isRealImage={item.isRealImage} image={item.image} icon={item.icon} />
      </div>
      <div className="flex-1 flex flex-col justify-center py-1 min-w-0">
        <h3 className="text-sm font-bold font-display text-ink-900 group-hover:text-green-600 transition-colors leading-tight mb-2 line-clamp-2">
          {item.title}
        </h3>
        <span className="text-[11px] text-ink-400">{item.date}</span>
      </div>
    </div>
  );
}

export default function NewsView() {
  const { brNews } = useApp();

  const allNews = useMemo(() => {
    if (!brNews || brNews.length === 0) return fallbackNews;

    return brNews.map((n, i) => ({
      id: `real-${i}`,
      title: n.title,
      summary: n.description,
      date: new Date(n.pub_date).toLocaleDateString('pt-BR'),
      category: 'Destaque',
      image: n.image_url,
      icon: IconNewspaper,
      link: n.link,
      isRealImage: !!n.image_url
    }));
  }, [brNews]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 bg-slate-950 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity pointer-events-none transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('/images/news_hero_banner.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase tracking-widest backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Cobertura Esportiva Ao Vivo
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase drop-shadow-md">
            Notícias do Brasileirão
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed drop-shadow">
            Fique por dentro dos bastidores, prévia dos confrontos, mercado da bola e análise de arbitragem das últimas rodadas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allNews.slice(0, 6).map((item) => <NewsCard key={item.id} item={item} />)}
      </div>

      {allNews.length > 6 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-5 px-1">
            <span className="w-1.5 h-6 rounded-full bg-green-500 block"></span>
            <h3 className="text-xl font-bold font-display text-ink-900 uppercase tracking-tight">
              Mais Notícias
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {allNews.slice(6).map(item => <ListCard key={item.id} item={item} />)}
          </div>
        </div>
      )}

      {allNews.length === 0 && (
        <div className="text-center py-16 card">
          <IconNewspaper className="w-10 h-10 mx-auto mb-4 text-gray-300" />
          <p className="text-ink-600 font-medium">Nenhuma notícia encontrada.</p>
        </div>
      )}
    </div>
  );
}
