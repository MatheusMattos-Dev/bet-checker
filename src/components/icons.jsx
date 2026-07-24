// Custom line-icon set — replaces platform emoji so the interface reads as
// one designed system instead of whatever the OS ships for ⚽🏆🎯 etc.
// All icons share the same stroke weight and corner style.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconBall({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.2l2.7 1.9-1 3.2H10.3l-1-3.2z" fill="currentColor" stroke="none" />
      <path d="M12 8.2V5.3M14.7 10.1l2.7-1M9.3 10.1l-2.7-1M10.9 13.3l-1.4 2.7M13.1 13.3l1.4 2.7" />
    </svg>
  );
}

export function IconTrophy({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M7 4h10v4a5 5 0 01-10 0V4z" />
      <path d="M7 5H4v2a3 3 0 003 3M17 5h3v2a3 3 0 01-3 3" />
      <path d="M12 13v3M9 20h6M9.5 20c0-1.7.7-2.7 2.5-3 1.8.3 2.5 1.3 2.5 3" />
    </svg>
  );
}

export function IconPitch({ className }) {
  return (
    <svg className={className} {...base}>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <line x1="12" y1="4.5" x2="12" y2="19.5" />
      <circle cx="12" cy="12" r="2.8" />
      <path d="M3 9.5h2.5v5H3M21 9.5h-2.5v5H21" />
    </svg>
  );
}

export function IconTarget({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconJersey({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M8.2 4L4.5 6.8l1.8 3 1.9-1.1V20h7.6V8.7l1.9 1.1 1.8-3L15.8 4l-1.9 2h-3.8l-1.9-2z" />
    </svg>
  );
}

export function IconShield({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.2l6.8 2.6v5.6c0 4.6-2.9 7.7-6.8 9.2-3.9-1.5-6.8-4.6-6.8-9.2V5.8L12 3.2z" />
    </svg>
  );
}

export function IconChart({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M4 20V11M9.5 20V4M15 20V13.5M20 20V8" />
    </svg>
  );
}

export function IconNewspaper({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M4 5.5h13a2 2 0 012 2V17a2 2 0 01-2 2H6a2 2 0 01-2-2V5.5z" />
      <path d="M20 8.5v9a1.5 1.5 0 01-1.5 1.5" />
      <rect x="6.3" y="7.7" width="4.2" height="4.2" rx="0.5" />
      <path d="M12.7 8h4M12.7 10.3h4M6.3 14.3h10.4M6.3 16.6h10.4" />
    </svg>
  );
}

export function IconGlobe({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.6" ry="8.5" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
    </svg>
  );
}

export function IconScale({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M12 3.5v17M8 20.5h8" />
      <path d="M5 6.5h14M5 6.5L3 11a2.5 2.5 0 005 0L5 6.5zM19 6.5L17 11a2.5 2.5 0 005 0L19 6.5z" />
    </svg>
  );
}

export function IconSun({ className }) {
  return (
    <svg className={className} {...base}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.3M12 19.2v2.3M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2.5 12h2.3M19.2 12h2.3M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
    </svg>
  );
}

export function IconMoon({ className }) {
  return (
    <svg className={className} {...base}>
      <path d="M20 14.2A8.5 8.5 0 119.8 4a6.8 6.8 0 0010.2 10.2z" />
    </svg>
  );
}
