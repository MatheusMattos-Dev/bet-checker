import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getTeamColor } from '../../lib/teamColors';
import { useRevealed } from '../../lib/useRevealed';
import { IconNewspaper } from '../icons';

function TeamNewsCard({ item }) {
  return (
    <div onClick={() => item.link ? window.open(item.link, '_blank') : null}
         className="flex gap-4 p-3 rounded-lg bg-paper border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group mt-3">
      <div className="w-20 h-20 shrink-0 rounded-md overflow-hidden relative bg-gray-50 flex items-center justify-center">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <IconNewspaper className="w-7 h-7 text-gray-300 transform group-hover:scale-110 transition-transform duration-700" />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center py-1">
        <span className="text-[10px] text-ink-400 mb-1">{item.pub_date ? new Date(item.pub_date).toLocaleDateString('pt-BR') : ''}</span>
        <h3 className="text-sm font-bold font-display text-ink-900 group-hover:text-green-600 transition-colors leading-tight line-clamp-2">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

function TeamNews({ teamName }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/news?team_name=${encodeURIComponent(teamName)}`)
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [teamName]);

  if (loading) {
    return <div className="text-sm text-ink-400 p-4 text-center animate-pulse">Buscando notícias do {teamName}...</div>;
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <div className="card p-5">
      <h3 className="text-sm font-bold text-ink-900 mb-2 flex items-center gap-2">
        <span className="w-1.5 h-4 rounded-full bg-green-500 block"></span>
        Notícias Recentes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {news.slice(0, 4).map((item, idx) => (
          <TeamNewsCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

function StatBar({ label, value, max, index = 0 }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const revealed = useRevealed();
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-ink-600">{label}</span>
        <span className="text-ink-900 font-mono font-semibold">{value}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-700 ease-out"
          style={{ width: `${revealed ? pct : 0}%`, transitionDelay: `${index * 70}ms` }}
        />
      </div>
    </div>
  );
}

function FormPills({ form }) {
  if (!form) return <span className="text-xs text-ink-400">Sem dados</span>;
  const styles = {
    W: 'bg-green-500 text-white',
    D: 'bg-gold-500 text-ink-900',
    L: 'bg-red-500 text-white',
  };
  return (
    <div className="flex gap-1">
      {form.split('').map((r, i) => (
        <span key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${styles[r] || 'bg-gray-100 text-ink-400'}`}>
          {r}
        </span>
      ))}
    </div>
  );
}

export default function TeamDetail({ team }) {
  const { brTeams, brStandings, getExpectedGoals, getTeamForm, getTeamStyle, navigateView, getTeam } = useApp();

  const teamNameStr = typeof team === 'string' ? team : team?.name;
  const teamData = brTeams.find((t) => t.name === teamNameStr);

  if (!teamData) {
    return <div className="text-ink-600 p-4">Time não encontrado.</div>;
  }

  const trend = getTeamForm(teamNameStr);
  const style = getTeamStyle(teamData);
  const expected = getExpectedGoals(teamNameStr, null);
  const teamColor = getTeamColor(teamData.name);

  const trendLabel = { excellent: 'Excelente', good: 'Bom', average: 'Médio', poor: 'Ruim' };
  const trendColor = {
    excellent: 'text-green-700',
    good: 'text-green-600',
    average: 'text-gold-700',
    poor: 'text-red-600',
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="card overflow-hidden">
        <span className="team-bar block" style={{ backgroundColor: teamColor }} />
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 shrink-0 p-2">
              {teamData.logo_url ? <img src={teamData.logo_url} alt={teamData.name} className="w-full h-full object-contain" /> : <span className="text-4xl">{teamData.flag}</span>}
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-ink-900 uppercase">{teamData.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-ink-600">{teamData.pos}º lugar • {teamData.points} pontos</span>
                <span className={`text-xs font-semibold ${trendColor[trend]}`}>{trendLabel[trend]}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-ink-600 mt-4">{style}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink-900 mb-4">Estatísticas</h3>
          <div className="space-y-4">
            <StatBar index={0} label="Aproveitamento (%)" value={teamData.played > 0 ? Math.round((teamData.points / (teamData.played * 3)) * 100) : 0} max={100} />
            <StatBar index={1} label="Gols Marcados" value={teamData.goalsFor} max={60} />
            <StatBar index={2} label="Gols Sofridos" value={teamData.goalsAgainst} max={60} />
            <StatBar index={3} label="Vitórias" value={teamData.won} max={teamData.played} />
            <StatBar index={4} label="Empates" value={teamData.drawn} max={teamData.played} />
            <StatBar index={5} label="Derrotas" value={teamData.lost} max={teamData.played} />
            <StatBar index={6} label="Jogos" value={teamData.played} max={38} />
          </div>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink-900 mb-4">Detalhes</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold font-display text-green-700">{teamData.goalsFor}</div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wider">Gols Pró</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold font-display text-red-600">{teamData.goalsAgainst}</div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wider">Gols Contra</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold font-display text-ink-900">{teamData.goalDiff > 0 ? '+' : ''}{teamData.goalDiff}</div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wider">Saldo</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold font-display text-gold-700">{teamData.yellowCards}</div>
              <div className="text-[10px] text-ink-400 uppercase tracking-wider">Cartões</div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold text-ink-600 mb-2">Forma Recente</h4>
            <FormPills form={teamData.form} />
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold text-ink-600 mb-2">Gols Esperados</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-bold text-green-700">{expected.expectedGoalsFor}</div>
                <div className="text-[10px] text-ink-400">xG Pró</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-bold text-red-600">{expected.expectedGoalsAgainst}</div>
                <div className="text-[10px] text-ink-400">xG Contra</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-3">Posição na Tabela</h3>
        <div className="space-y-1.5">
          {brStandings.slice(Math.max(0, teamData.pos - 3), teamData.pos + 3).map((s) => (
            <div
              key={s.pos}
              onClick={() => {
                const clickedTeam = getTeam(s.team);
                if (clickedTeam) navigateView('team', clickedTeam);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors hover:bg-gray-50 group ${s.pos === teamData.pos ? 'bg-gold-100/60 border border-gold-500/30' : ''}`}
            >
              <span className={`w-6 text-center text-sm font-bold ${s.pos === teamData.pos ? 'text-gold-700' : 'text-ink-400'}`}>{s.pos}º</span>
              {s.logo_url ? (
                <img src={s.logo_url} alt={s.team} className="w-5 h-5 object-contain" />
              ) : (
                <span className="text-sm">{s.flag}</span>
              )}
              <span className={`flex-1 text-sm group-hover:text-green-600 transition-colors ${s.pos === teamData.pos ? 'text-ink-900 font-bold' : 'text-ink-600'}`}>{s.team}</span>
              <span className={`text-sm font-mono font-semibold ${s.pos === teamData.pos ? 'text-gold-700' : 'text-ink-600'}`}>{s.pts} pts</span>
            </div>
          ))}
        </div>
      </div>

      <TeamNews teamName={teamData.name} />
    </div>
  );
}
