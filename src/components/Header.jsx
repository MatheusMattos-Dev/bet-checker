import { useApp } from '../context/AppContext';

export default function Header() {
  const { goHome } = useApp();

  return (
    <header className="bg-[#1f3a3a] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={goHome} className="flex items-center gap-2 group">
          <span className="text-2xl">🏆</span>
          <span className="text-xl font-bold text-white group-hover:text-[#d4a017] transition-colors">
            Copa do Mundo 2026
          </span>
        </button>
      </div>
    </header>
  );
}
