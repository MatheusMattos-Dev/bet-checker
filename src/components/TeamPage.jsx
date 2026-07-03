import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeamPage({ team }) {
  const { goHome, getTeamStats } = useApp();
  const stats = useMemo(() => getTeamStats(team.id), [team.id, getTeamStats]);

  if (!stats) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-red-500">Erro ao carregar dados do time</p>
        <button onClick={goHome} className="mt-4 text-gold-500 hover:underline">← Voltar</button>
      </div>
    );
  }

  const { team: t, rank, points, goalDiff, form, winRate, fixtures, homeRecord, awayRecord, positionHistory } = stats;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={goHome} className="mb-4 flex items-center gap-1 text-gold-500 hover:text-gold-400 transition-colors font-medium">
        ← Voltar
      </button>

      {/* Team Header */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
        <div className="flex items-center gap-4">
          <img src={t.logo} alt={t.name} className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 p-2" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{t.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Posição: {rank}º | Pontos: {points}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <p className="text-2xl font-bold text-gold-500">{winRate}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Taxa de Vitória</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <p className="text-2xl font-bold text-green-500">+{goalDiff.for}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gols Marcados</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <p className="text-2xl font-bold text-red-500">{goalDiff.against}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gols Sofridos</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <p className="text-2xl font-bold text-blue-500">{fixtures.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Jogos</p>
        </div>
      </div>

      {/* Form */}
      {form && (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Últimos Jogos</h3>
          <div className="flex gap-2">
            {form.split('').map((result, i) => (
              <div key={i} className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                result === 'W' ? 'bg-green-500' : result === 'D' ? 'bg-gray-500' : 'bg-red-500'
              }`}>
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Position History */}
      {positionHistory && positionHistory.length > 0 && (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Evolução da Posição</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={positionHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="round" stroke="#9CA3AF" />
              <YAxis reversed domain={[1, 20]} stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
                labelStyle={{ color: '#FBBF24' }}
              />
              <Line type="monotone" dataKey="position" stroke="#FBBF24" strokeWidth={2} dot={{ fill: '#FBBF24' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Home vs Away */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Em Casa</h3>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Jogos</span><span className="font-bold">{homeRecord.played}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Vitórias</span><span className="font-bold text-green-500">{homeRecord.win}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Empates</span><span className="font-bold text-gray-500">{homeRecord.draw}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Derrotas</span><span className="font-bold text-red-500">{homeRecord.lose}</span></div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Fora</h3>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Jogos</span><span className="font-bold">{awayRecord.played}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Vitórias</span><span className="font-bold text-green-500">{awayRecord.win}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Empates</span><span className="font-bold text-gray-500">{awayRecord.draw}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Derrotas</span><span className="font-bold text-red-500">{awayRecord.lose}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
