const BASE_URL = 'http://localhost:8000/api';

export async function fetchTeams() {
  try {
    const res = await fetch(`${BASE_URL}/teams`);
    if (!res.ok) throw new Error('Falha ao carregar times');
    return await res.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}

export async function fetchFixtures() {
  try {
    const res = await fetch(`${BASE_URL}/fixtures`);
    if (!res.ok) throw new Error('Falha ao carregar partidas');
    return await res.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}

export async function fetchStandings() {
  try {
    // 71 is the Brasileirao league ID
    const res = await fetch(`${BASE_URL}/standings/71`);
    if (!res.ok) throw new Error('Falha ao carregar classificação');
    return await res.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}

export async function fetchNews() {
  try {
    const res = await fetch(`${BASE_URL}/news`);
    if (!res.ok) throw new Error('Falha ao carregar notícias');
    return await res.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}

export async function fetchCurrentRound() {
  try {
    const res = await fetch(`${BASE_URL}/fixtures/current_round`);
    if (!res.ok) throw new Error('Falha ao carregar rodada');
    const data = await res.json();
    return data.current_round || 1;
  } catch (error) {
    console.error('Erro na API:', error);
    return 1;
  }
}

export async function fetchPlayers() {
  try {
    const res = await fetch(`${BASE_URL}/players?limit=1000`);
    if (!res.ok) throw new Error('Falha ao carregar jogadores');
    return await res.json();
  } catch (error) {
    console.error('Erro na API:', error);
    return [];
  }
}
