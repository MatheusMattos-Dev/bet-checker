import { useApp } from '../../context/AppContext';
import { getZoneLabel, getZoneColor } from '../../data/brasileirao';

function ZoneBadge({ zone }) {
  const colorMap = {
    accent: 'bg-green-500 text-white',
    gold: 'bg-gold-500 text-ink-900',
    danger: 'bg-red-500 text-white',
    default: 'bg-gray-200 text-ink-600',
  };
  return (
    <span className={`tag whitespace-nowrap ${colorMap[getZoneColor(zone)]}`}>
      {getZoneLabel(zone)}
    </span>
  );
}

function FormPills({ form }) {
  const styles = {
    W: 'bg-green-500 text-white',
    D: 'bg-gold-500 text-ink-900',
    L: 'bg-red-500 text-white',
  };
  return (
    <div className="flex gap-1">
      {form.split('').map((r, j) => (
        <span key={j} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${styles[r] || 'bg-gray-100 text-ink-400'}`}>
          {r}
        </span>
      ))}
    </div>
  );
}

export default function StandingsTable() {
  const { brStandings, navigateView, brCurrentRound, getTeamForm } = useApp();

  return (
    <div className="card overflow-hidden">
      <div className="px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-base font-display font-bold text-ink-900 uppercase tracking-tight">Classificação</h2>
        <p className="text-xs text-ink-600 mt-0.5">Brasileirão Série A 2026 • Rodada {brCurrentRound}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-wider text-ink-400 border-b border-gray-100">
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
              <th className="px-4 py-3 text-left font-semibold w-32">Zona</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {brStandings.map((s, i) => {
              const isLib = i < 6;
              const isSul = i >= 6 && i < 10;
              const isZon = s.zone === 'zonal';
              const form = getTeamForm(s.team).join('');

              return (
                <tr
                  key={s.pos}
                  onClick={() => navigateView('team', s.team)}
                  style={{ animationDelay: `${Math.min(i * 20, 400)}ms`, animationFillMode: 'backwards' }}
                  className={`animate-fadeIn cursor-pointer transition-colors hover:bg-gray-50 group ${
                    isLib ? 'bg-green-100/25' : isSul ? 'bg-gold-100/25' : isZon ? 'bg-red-100/25' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold font-display ${
                      isLib ? 'bg-green-100 text-green-700' :
                      isZon ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-ink-400'
                    }`}>
                      {s.pos}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 flex items-center justify-center shrink-0">
                        {s.logo_url ? <img src={s.logo_url} alt={s.team} className="w-full h-full object-contain" /> : <span className="text-base">{s.flag}</span>}
                      </div>
                      <span className="text-sm font-semibold text-ink-900 group-hover:text-green-600 transition-colors">{s.team}</span>
                    </div>
                  </td>
                  <td className="px-2 py-3 text-center text-xs text-ink-600 font-mono">{s.pld}</td>
                  <td className="px-2 py-3 text-center text-xs text-green-700 font-mono font-semibold">{s.w}</td>
                  <td className="px-2 py-3 text-center text-xs text-ink-600 font-mono">{s.d}</td>
                  <td className="px-2 py-3 text-center text-xs text-red-600 font-mono">{s.l}</td>
                  <td className="px-2 py-3 text-center text-xs text-ink-900 font-mono">{s.gf}</td>
                  <td className="px-2 py-3 text-center text-xs text-ink-600 font-mono">{s.ga}</td>
                  <td className={`px-2 py-3 text-center text-xs font-mono font-semibold ${
                    s.gd > 0 ? 'text-green-700' : s.gd < 0 ? 'text-red-600' : 'text-ink-600'
                  }`}>
                    {s.gd > 0 ? '+' : ''}{s.gd}
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="text-sm font-bold font-display text-ink-900">{s.pts}</span>
                  </td>
                  <td className="px-3 py-3">
                    <FormPills form={form} />
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

      <div className="px-5 sm:px-6 py-3 border-t border-gray-100 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-ink-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-green-500"></span>
          <span>Libertadores</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-gold-500"></span>
          <span>Sul-Americana</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-red-500"></span>
          <span>Rebaixamento</span>
        </div>
      </div>
    </div>
  );
}
