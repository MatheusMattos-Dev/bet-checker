import { getCached, setCache } from '../lib/cache';
import { LEAGUES } from '../lib/leagues';

const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY || '';
const RAPIDAPI_HOST = 'api-football-v1.p.rapidapi.com';
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || '';

const headers = {
  'X-RapidAPI-Key': RAPIDAPI_KEY,
  'X-RapidAPI-Host': RAPIDAPI_HOST,
};

async function fetchAPI(endpoint, params = {}) {
  const url = new URL(`https://${RAPIDAPI_HOST}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

  const cached = getCached(url.toString());
  if (cached) return cached;

  const res = await fetchWithRetry(url.toString(), { headers });
  if (res.status === 429) {
    throw new Error('RATE_LIMIT');
  }
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const json = await res.json();
  setCache(url.toString(), json);
  return json;
}

async function fetchWithRetry(url, options, maxRetries = 1) {
  for (let i = 0; i <= maxRetries; i++) {
    const res = await fetch(url, options);
    if (res.status !== 429) return res;
    const delay = Math.min(2000 * Math.pow(2, i), 10000);
    await new Promise(r => setTimeout(r, delay));
  }
  return fetch(url, options);
}

export async function getStandings(leagueKey) {
  const league = LEAGUES[leagueKey];
  const data = await fetchAPI('/league/standings', {
    season: league.season,
    league: league.apiId,
  });
  return data.response?.[0]?.league?.standings?.[0] || [];
}

export async function getFixtures(leagueKey, week = null) {
  const league = LEAGUES[leagueKey];
  const params = { season: league.season, league: league.apiId };
  if (week) params.week = week;
  else {
    const today = new Date().toISOString().split('T')[0];
    const from = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    params.from = from;
    params.to = today;
  }
  const data = await fetchAPI('/fixtures', params);
  return data.response || [];
}

export async function getFixtureDetails(fixtureId) {
  const data = await fetchAPI('/fixtures', { fixture: fixtureId });
  return data.response?.[0];
}

export async function getTeamStats(leagueKey, teamId) {
  const league = LEAGUES[leagueKey];
  const data = await fetchAPI('/teams/stats', {
    season: league.season,
    team: teamId,
  });
  return data.response || [];
}

export async function getTeamFixtures(teamId, from = null, to = null) {
  const params = { team: teamId };
  if (from) params.from = from;
  if (to) params.to = to;
  const data = await fetchAPI('/fixtures', params);
  return data.response || [];
}

export async function getTopScorers(leagueKey) {
  const league = LEAGUES[leagueKey];
  const data = await fetchAPI('/players/topscorers', {
    season: league.season,
    league: league.apiId,
  });
  return data.response || [];
}

export async function searchTeams(query) {
  if (!query || query.length < 2) return [];
  const data = await fetchAPI('/teams/search', { name: query });
  return data.response || [];
}
