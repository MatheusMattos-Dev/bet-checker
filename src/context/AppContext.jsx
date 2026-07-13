import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getTeams, getEliminated, getRoundOf16, getRoundOf32, getQuarterfinals, getTeamById, getComparativeAnalyses, getH2H, computeExpectedGoals, getFormTrend, getPlayStyleNarrative, getBracket, getPlayers } from '../data/world-cup';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [worldCupView, setWorldCupView] = useState('bracket');
  const [selectedWCTeam, setSelectedWCTeam] = useState(null);
  const [selectedWCMatch, setSelectedWCMatch] = useState(null);

  const goHome = useCallback(() => {
    setWorldCupView('bracket');
    setSelectedWCTeam(null);
    setSelectedWCMatch(null);
  }, []);

  const navigateWCView = useCallback((view, team = null, match = null) => {
    setWorldCupView(view);
    setSelectedWCTeam(team);
    setSelectedWCMatch(match);
  }, []);

  const wcTeams = useMemo(() => getTeams(), []);
  const wcEliminated = useMemo(() => getEliminated(), []);
  const wcRoundOf16 = useMemo(() => getRoundOf16(), []);
  const wcQuarterfinals = useMemo(() => getQuarterfinals(), []);
  const wcBracket = useMemo(() => getBracket(), []);
  const wcAnalyses = useMemo(() => getComparativeAnalyses(), []);
  const wcPlayers = useMemo(() => getPlayers(), []);
  const wcRoundOf32 = useMemo(() => getRoundOf32(), []);

  const getWCTeam = useCallback((id) => getTeamById(id), []);
  const getWCH2H = useCallback((a, b) => getH2H(a, b), []);
  const getWCEligibleGoals = useCallback((team, opponent) => computeExpectedGoals(team, opponent), []);
  const getWCTeamForm = useCallback((team) => getFormTrend(team), []);
  const getWCTeamStyle = useCallback((team) => getPlayStyleNarrative(team), []);

  const value = useMemo(() => ({
    goHome, navigateWCView,
    worldCupView,
    selectedWCTeam, selectedWCMatch,
    wcTeams, wcEliminated, wcRoundOf16, wcRoundOf32, wcQuarterfinals, wcBracket, wcAnalyses, wcPlayers,
    getWCTeam, getWCH2H, getWCEligibleGoals, getWCTeamForm, getWCTeamStyle,
  }), [
    goHome, navigateWCView,
    worldCupView,
    selectedWCTeam, selectedWCMatch,
    wcTeams, wcEliminated, wcRoundOf16, wcRoundOf32, wcQuarterfinals, wcBracket, wcAnalyses, wcPlayers,
    getWCTeam, getWCH2H, getWCEligibleGoals, getWCTeamForm, getWCTeamStyle,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
