import { useApp } from '../context/AppContext';
import FixtureCard from '../components/FixtureCard';
import StandingsTable from '../components/StandingsTable';
import QuickAnalysis from '../components/QuickAnalysis';

export default function HomePage() {
  const { standings, fixtures, topScorers } = useApp();

  const currentStandings = standings['br'] || [];

  return (
    <div>
      {/* Fixtures Section */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-gold-500">⚽</span>
          Jogos Recentes
        </h2>

        {fixtures.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Nenhum jogo encontrado</p>
          </div>
        ) : (
          <div className="space-y-3">
            {fixtures.map((fixture) => (
              <FixtureCard key={fixture.fixture.id} fixture={fixture} />
            ))}
          </div>
        )}
      </section>

      {/* Standings Section */}
      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-gold-500">🏆</span>
          Tabela de Classificação
        </h2>
        <StandingsTable standings={currentStandings} leagueKey="br" />
      </section>

      {/* Quick Analysis */}
      <QuickAnalysis />
    </div>
  );
}
