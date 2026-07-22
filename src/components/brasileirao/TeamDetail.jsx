import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

function TeamNewsCard({ item }) {
  return (
    <div onClick={() => item.link ? window.open(item.link, '_blank') : null} 
         className="flex gap-4 p-3 rounded-2xl bg-surface-800/40 backdrop-blur-xl border border-surface-600/30 hover:border-surface-500/50 hover:bg-surface-700/30 transition-all cursor-pointer group shadow-sm mt-3">
      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden relative shadow-md bg-surface-800 flex items-center justify-center">
        {item.image_url ? (
          <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <span className="text-3xl transform group-hover:scale-110 transition-transform duration-700">📰</span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center py-1">
        <span className="text-[10px] text-text-muted mb-1">{item.pub_date ? new Date(item.pub_date).toLocaleDateString('pt-BR') : ''}</span>
        <h3 className="text-sm font-bold font-display text-text-primary group-hover:text-accent-300 transition-colors leading-tight line-clamp-2">
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
    return <div className="text-sm text-text-muted p-4 text-center animate-pulse">Buscando notícias do {teamName}...</div>;
  }

  if (news.length === 0) {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl border border-surface-600/40 p-5">
      <h3 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
        <span className="w-1.5 h-4 rounded-full bg-accent-500 block"></span>
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

function StatBar({ label, value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-text-secondary">{label}</span>
        <span className="text-text-primary font-mono font-semibold">{value}</span>
      </div>
      <div className="w-full h-2 bg-surface-600 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function FormPills({ form }) {
  if (!form) return <span className="text-xs text-text-muted">Sem dados</span>;
  const styles = {
    W: 'bg-accent-500/20 text-accent-300',
    D: 'bg-gold-500/20 text-gold-400',
    L: 'bg-danger-500/20 text-danger-400',
  };
  return (
    <div className="flex gap-1">
      {form.split('').map((r, i) => (
        <span key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold ${styles[r] || 'bg-surface-700 text-text-muted'}`}>
          {r}
        </span>
      ))}
    </div>
  );
}

export default function TeamDetail({ team }) {
  const { brTeams, brStandings, getExpectedGoals, getTeamForm, getTeamStyle, navigateView, getTeam } = useApp();

  // Sempre busca no brTeams (que tem os dados enriquecidos) usando o nome do time
  const teamNameStr = typeof team === 'string' ? team : team?.name;
  const teamData = brTeams.find((t) => t.name === teamNameStr);

  if (!teamData) {
    return <div className="text-text-secondary p-4">Time não encontrado.</div>;
  }

  const trend = getTeamForm(teamData);
  const style = getTeamStyle(teamData);
  const expected = getExpectedGoals(teamData, null);

  const trendLabel = { excellent: 'Excelente', good: 'Bom', average: 'Médio', poor: 'Ruim' };
  const trendColor = {
    excellent: 'text-accent-300',
    good: 'text-accent-400',
    average: 'text-gold-400',
    poor: 'text-danger-400',
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="glass-card rounded-2xl border border-surface-600/40 p-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-surface-800/80 rounded-2xl flex items-center justify-center border border-surface-600/40 shrink-0 p-2">
            {teamData.logo_url ? <img src={teamData.logo_url} alt={teamData.name} className="w-full h-full object-contain drop-shadow-md" /> : <span className="text-4xl">{teamData.flag}</span>}
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-text-primary">{teamData.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-text-secondary">{teamData.pos}º lugar • {teamData.points} pontos</span>
              <span className={`text-xs font-semibold ${trendColor[trend]}`}>{trendLabel[trend]}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-text-secondary mt-4">{style}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl border border-surface-600/40 p-5">
          <h3 className="text-sm font-bold text-text-primary mb-4">Estatísticas</h3>
          <div className="space-y-4">
            <StatBar label="Aproveitamento (%)" value={teamData.played > 0 ? Math.round((teamData.points / (teamData.played * 3)) * 100) : 0} max={100} />
            <StatBar label="Gols Marcados" value={teamData.goalsFor} max={60} />
            <StatBar label="Gols Sofridos" value={teamData.goalsAgainst} max={60} />
            <StatBar label="Vitórias" value={teamData.won} max={teamData.played} />
            <StatBar label="Empates" value={teamData.drawn} max={teamData.played} />
            <StatBar label="Derrotas" value={teamData.lost} max={teamData.played} />
            <StatBar label="Jogos" value={teamData.played} max={38} />
          </div>
        </div>

        <div className="glass-card rounded-2xl border border-surface-600/40 p-5">
          <h3 className="text-sm font-bold text-text-primary mb-4">Detalhes</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-surface-800/60 rounded-xl">
              <div className="text-2xl font-bold font-display text-accent-300">{teamData.goalsFor}</div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider">Gols Pró</div>
            </div>
            <div className="text-center p-3 bg-surface-800/60 rounded-xl">
              <div className="text-2xl font-bold font-display text-danger-400">{teamData.goalsAgainst}</div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider">Gols Contra</div>
            </div>
            <div className="text-center p-3 bg-surface-800/60 rounded-xl">
              <div className="text-2xl font-bold font-display text-text-primary">{teamData.goalDiff > 0 ? '+' : ''}{teamData.goalDiff}</div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider">Saldo</div>
            </div>
            <div className="text-center p-3 bg-surface-800/60 rounded-xl">
              <div className="text-2xl font-bold font-display text-gold-400">{teamData.yellowCards}</div>
              <div className="text-[10px] text-text-muted uppercase tracking-wider">Cartões</div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold text-text-secondary mb-2">Forma Recente</h4>
            <FormPills form={teamData.form} />
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold text-text-secondary mb-2">Gols Esperados</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-surface-800/60 rounded-lg">
                <div className="text-lg font-bold text-accent-300">{expected.expectedGoalsFor}</div>
                <div className="text-[10px] text-text-muted">xG Pró</div>
              </div>
              <div className="text-center p-2 bg-surface-800/60 rounded-lg">
                <div className="text-lg font-bold text-danger-400">{expected.expectedGoalsAgainst}</div>
                <div className="text-[10px] text-text-muted">xG Contra</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-surface-600/40 p-5">
        <h3 className="text-sm font-bold text-text-primary mb-3">Posição na Tabela</h3>
        <div className="space-y-1.5">
          {brStandings.slice(Math.max(0, teamData.pos - 3), teamData.pos + 3).map((s) => (
            <div
              key={s.pos}
              onClick={() => {
                const clickedTeam = getTeam(s.team);
                if (clickedTeam) navigateView('team', clickedTeam);
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-surface-700/50 group ${s.pos === teamData.pos ? 'bg-accent-500/10 border border-accent-500/20' : ''}`}
            >
              <span className={`w-6 text-center text-sm font-bold ${s.pos === teamData.pos ? 'text-accent-300' : 'text-text-muted'}`}>{s.pos}º</span>
              {s.logo_url ? (
                <img src={s.logo_url} alt={s.team} className="w-5 h-5 object-contain drop-shadow-sm" />
              ) : (
                <span className="text-sm">{s.flag}</span>
              )}
              <span className={`flex-1 text-sm group-hover:text-accent-300 transition-colors ${s.pos === teamData.pos ? 'text-text-primary font-bold' : 'text-text-secondary'}`}>{s.team}</span>
              <span className={`text-sm font-mono font-semibold ${s.pos === teamData.pos ? 'text-accent-300' : 'text-text-secondary'}`}>{s.pts} pts</span>
            </div>
          ))}
        </div>
      </div>

      <TeamNews teamName={teamData.name} />
    </div>
  );
}