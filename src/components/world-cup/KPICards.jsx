// KPI Cards — Dashboard metrics with donut charts, progress bars, and dot indicators

function DonutChart({ value, max, color = 'accent' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const colorVar = color === 'accent' ? 'var(--color-accent-500)' : color === 'gold' ? 'var(--color-gold-500)' : 'var(--color-info-500)';

  return (
    <div
      className="donut"
      style={{
        background: `conic-gradient(${colorVar} 0% ${pct}%, var(--color-surface-600) ${pct}% 100%)`,
      }}
      data-value={`${pct}%`}
    />
  );
}

function ProgressBar({ value, max, color = 'accent' }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const gradient =
    color === 'accent'
      ? 'linear-gradient(90deg, #00e676, #69f0ae)'
      : color === 'gold'
        ? 'linear-gradient(90deg, #ffd740, #ffe400)'
        : color === 'danger'
          ? 'linear-gradient(90deg, #ff5252, #ff8a80)'
          : 'linear-gradient(90deg, #448aff, #82b1ff)';

  return (
    <div className="w-full h-1.5 bg-surface-600 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: gradient }}
      />
    </div>
  );
}

function DotIndicator({ value, max = 10 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full transition-colors ${
            i < value ? 'bg-accent-500 shadow-sm shadow-accent-500/50' : 'bg-surface-600'
          }`}
        />
      ))}
    </div>
  );
}

function KPICard({ icon, label, value, subtext, children, accent = 'accent' }) {
  const glowColor = accent === 'accent' ? 'bg-accent-500/5' : accent === 'gold' ? 'bg-gold-500/5' : accent === 'danger' ? 'bg-danger-500/5' : 'bg-info-500/5';
  const borderColor = accent === 'accent' ? 'hover:border-accent-500/30' : accent === 'gold' ? 'hover:border-gold-500/30' : accent === 'danger' ? 'hover:border-danger-500/30' : 'hover:border-info-500/30';

  return (
    <div className={`bg-surface-800 rounded-xl p-5 border border-surface-600/50 relative overflow-hidden group transition-all duration-200 hover:${borderColor}`}>
      {/* Decorative glow */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 ${glowColor} rounded-full blur-2xl transition-all group-hover:w-32 group-hover:h-32`} />

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-medium text-text-secondary uppercase tracking-widest">{label}</span>
          <span className="text-lg">{icon}</span>
        </div>
        <div className="text-2xl font-display font-bold text-text-primary mb-1">{value}</div>
        {subtext && <p className="text-xs text-text-muted mb-3">{subtext}</p>}
        {children}
      </div>
    </div>
  );
}

export default function KPICards() {
  // Mock data — replace with real backend data later
  const kpis = {
    totalInvested: 'R$ 12.450',
    investedTrend: '+12% vs rodada anterior',
    zebrasCovered: 15,
    zebrasTotal: 24,
    efficiency: 78,
    efficiencyDots: 8,
    activeBoloes: 1203,
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Investido */}
      <KPICard icon="💰" label="Total Investido" value={kpis.totalInvested} accent="gold">
        <div className="flex items-center gap-1.5 text-xs">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-accent-300">
            <path d="M6 2L10 7H2L6 2Z" fill="currentColor" />
          </svg>
          <span className="text-accent-300 font-medium">{kpis.investedTrend}</span>
        </div>
      </KPICard>

      {/* Zebras Cercadas */}
      <KPICard icon="⚡" label="Zebras Cercadas" value={`${kpis.zebrasCovered}/${kpis.zebrasTotal}`} accent="danger">
        <div className="flex items-center gap-3">
          <DonutChart value={kpis.zebrasCovered} max={kpis.zebrasTotal} color="accent" />
          <div className="flex-1">
            <ProgressBar value={kpis.zebrasCovered} max={kpis.zebrasTotal} />
          </div>
        </div>
      </KPICard>

      {/* Eficiência */}
      <KPICard icon="🎯" label="Eficiência" value={`${kpis.efficiency}%`} accent="accent">
        <DotIndicator value={kpis.efficiencyDots} max={10} />
      </KPICard>

      {/* Bolões Ativos */}
      <KPICard icon="📊" label="Bolões Ativos" value={kpis.activeBoloes.toLocaleString('pt-BR')} accent="info">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <ProgressBar value={kpis.activeBoloes} max={kpis.activeBoloes} color="info" />
          </div>
          <span className="text-[10px] text-text-muted font-mono">100%</span>
        </div>
      </KPICard>
    </div>
  );
}