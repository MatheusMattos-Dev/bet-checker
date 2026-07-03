import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { brStandings } from '../data/standings';
import { brFixtures } from '../data/fixtures';
import { brScorers } from '../data/scorers';
import { brTeams, plTeams, generateTeamDetails } from '../data/mock';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [league, setLeague] = useState('br');
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // All data is local, no API calls
  const standings = useMemo(() => ({ br: brStandings }), []);
  const fixtures = useMemo(() => brFixtures, []);
  const topScorers = useMemo(() => brScorers, []);

  const goHome = useCallback(() => {
    setSelectedFixture(null);
    setSelectedTeam(null);
  }, []);

  const navigateToFixture = useCallback((fixture) => {
    setSelectedTeam(null);
    setSelectedFixture(fixture);
  }, []);

  const navigateToTeam = useCallback((team) => {
    setSelectedFixture(null);
    setSelectedTeam(team);
  }, []);

  const getTeamStats = useCallback((teamId) => {
    const teams = brTeams;
    const team = teams.find(t => t.id === teamId) || teams[0];
    return generateTeamDetails(team, 'br');
  }, []);

  const searchTeams = useCallback((query) => {
    const allTeams = [...brTeams, ...plTeams];
    return allTeams.filter(t =>
      t.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, []);

  const value = useMemo(() => ({
    league,
    setLeague,
    goHome,
    navigateToFixture,
    navigateToTeam,
    selectedFixture,
    selectedTeam,
    standings,
    fixtures,
    topScorers,
    getTeamStats,
    searchTeams,
  }), [
    league, setLeague, goHome, navigateToFixture, navigateToTeam,
    selectedFixture, selectedTeam, standings, fixtures, topScorers,
    getTeamStats, searchTeams,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
