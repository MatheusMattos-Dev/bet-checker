import { useApp } from '../../context/AppContext';
import { getZoneLabel, getZoneColor } from '../../data/brasileirao';

function ZoneBadge({ zone }) {
  const colorMap = {
    accent: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
    gold: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
    danger: 'bg-danger-500/10 text-danger-400 border-danger-500/20',
    default: 'bg-surface-700 text-text-secondary border-surface-600',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${colorMap[getZoneColor(zone)]}`}>
      {getZoneLabel(zone)}
    </span>
  );
}

function FormPills({ form }) {
  const styles = {
    W: 'bg-accent-500/20 text-accent-300',
    D: 'bg-gold-500/20 text-gold-400',
    L: 'bg-danger-500/20 text-danger-400',
  };
  return (
    <div className="flex gap-1">
      {form.split('').map((r, j) => (
        <span key={j} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${styles[r]}`}>
          {r}
        </span>
      ))}
    </div>
  );
}

export default function StandingsTable() {
  const { brStandings, navigateView, brCurrentRound } = useApp();

  return (
    <div className="glass-card rounded-2xl border border-surface-600/40 overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-surface-600/30">
        <h2 className="text-base font-display font-bold text-text-primary">Classificação</h2>
        <p className="text-xs text-text-secondary mt-0.5">Brasileirão Série A 2026 • Rodada {brCurrentRound}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-text-muted border-b border-surface-600/30">
              <th className="px-4 py-3 text-left font-semibold w-8">#</th>
              <th className="px-3 py-3 text-left font-semibold">Time</th>
              <th className="px-2 py-3 text-center font-semibold w-8">P</th>
              <th className="px-2 py-3 text-center font-semibold w-8">V</th>
              <th className="px-2 py-3 text-center font-semibold w-8">E</th>
              <th className="px-2 py-3 text-center font-semibold w-8">D</th>
              <th className="px-2 py-3 text-center font-semibold w-8">GP</th>
              <th className="px-2 py-3 text-center font-semibold w-8">GC</th>
              <th className="px-2 py-3 text-center font-semibold w-8">SG</th>
              <th className="px-3 py-3 text-center font-semibold w-12">PTS</th>
              <th className="px-3 py-3 text-center font-semibold w-24">Forma</th>
              <th className="px-4 py-3 text-left font-semibold w-24">Zona</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-600/20">
            {brStandings.map((s, i) => {
              const isLib = i < 6;
              const isSul = i >= 6 && i < 10;
              const isZon = s.zone === 'zonal';

              return (
                <tr
                  key={s.pos}
                  onClick={() => navigateView('team', s.team)}
                  className={`cursor-pointer transition-colors hover:bg-surface-700/20 ${
                    isLib ? 'bg-accent-500/[0.03]' : isSul ? 'bg-gold-500/[0.02]' : isZon ? 'bg-danger-500/[0.02]' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-display ${
                      isLib ? 'bg-accent-500/15 text-accent-300' :
                      isZon ? 'bg-danger-500/15 text-danger-400' :
                      'bg-surface-700/50 text-text-muted'
                    }`}>
                      {s.pos}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        {s.logo_url ? <img src={s.logo_url} alt={s.team} className="w-full h-full object-contain" /> : <span className="text-base">{s.flag}</span>}
                      </div>
                      <span className="text-sm font-semibold text-text-primary">{s.team}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center text-xs text-text-secondary font-mono">{s.pld}</td>
                  <td className="px-2 py-3 text-center text-xs text-accent-300 font-mono font-semibold">{s.w}</td>
                  <td className="px-2 py-3 text-center text-xs text-text-secondary font-mono">{s.d}</td>
                  <td className="px-2 py-3 text-center text-xs text-danger-400 font-mono">{s.l}</td>
                  <td className="px-2 py-3 text-center text-xs text-text-primary font-mono">{s.gf}</td>
                  <td className="px-2 py-3 text-center text-xs text-text-secondary font-mono">{s.ga}</td>
                  <td className={`px-2 py-3 text-center text-xs font-mono font-semibold ${
                    s.gd > 0 ? 'text-accent-300' : s.gd < 0 ? 'text-danger-400' : 'text-text-secondary'
                  }`}>
                    {s.gd > 0 ? '+' : ''}{s.gd}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm font-bold font-display text-text-primary">{s.pts}</span>
                  </td>
                  <td className="px-3 py-3">
                    <FormPills form={s.form} />
                  </td>
                  <td className="px-4 py-3">
                    {s.zone && <ZoneBadge zone={s.zone} />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-5 sm:px-6 py-3 border-t border-surface-600/30 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-text-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent-500/50 ring-1 ring-accent-500/30"></span>
          <span>Libertadores</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gold-500/50 ring-1 ring-gold-500/30"></span>
          <span>Sul-Americana</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-danger-500/50 ring-1 ring-danger-500/30"></span>
          <span>Rebaixamento</span>
        </div>
      </div>
    </div>
  );
}