import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import WorldCupPage from './components/world-cup/WorldCupPage';

export default function App() {
  return (
    <AppProvider>
      <div className="dark">
        <div className="min-h-screen bg-[#0f1419]">
          <Header />
          <main className="max-w-6xl mx-auto px-4 py-6 pb-8">
            <WorldCupPage />
          </main>
          <footer className="bg-[#0a0f14] border-t border-white/10 py-4 text-center text-sm text-gray-400">
            <p>GoalStats © 2025 — Copa do Mundo 2026</p>
          </footer>
        </div>
      </div>
    </AppProvider>
  );
}