import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FixtureDetail from './components/FixtureDetail';
import TeamPage from './components/TeamPage';

function AppContent() {
  const { selectedFixture, selectedTeam } = useApp();

  if (selectedFixture) {
    return <FixtureDetail fixture={selectedFixture} />;
  }

  if (selectedTeam) {
    return <TeamPage team={selectedTeam} />;
  }

  return <HomePage />;
}

function ThemedApp() {
  const { dark } = useTheme();
  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f1419] transition-colors">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6 pb-8">
          <AppContent />
        </main>
        <footer className="bg-[#1f3a3a] dark:bg-[#0a0f14] border-t border-white/10 py-4 text-center text-sm text-gray-400">
          <p>GoalStats © 2025 — Dados fornecidos por API-Football</p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <ThemedApp />
      </AppProvider>
    </ThemeProvider>
  );
}
