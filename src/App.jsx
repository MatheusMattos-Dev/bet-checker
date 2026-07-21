import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import BrasileiraoPage from './components/brasileirao/BrasileiraoPage';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-surface-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6 pb-8">
          <BrasileiraoPage />
        </main>
        <footer className="border-t border-surface-600/50 py-4 text-center text-sm text-text-muted">
          <p>GoalStats © 2026 — Brasileirão Série A 2026</p>
        </footer>
      </div>
    </AppProvider>
  );
}