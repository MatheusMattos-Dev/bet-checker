import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import BrasileiraoPage from './components/brasileirao/BrasileiraoPage';

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-6 pb-8">
          <BrasileiraoPage />
        </main>
        <footer className="border-t border-gray-100 py-4 text-center text-sm text-ink-400">
          <p>GoalStats © 2026 — Brasileirão Série A 2026</p>
        </footer>
      </div>
    </AppProvider>
  );
}