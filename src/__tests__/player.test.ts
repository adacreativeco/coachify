import { describe, it, expect } from 'vitest';

describe('Player & Squad Management Engine', () => {
  interface Player {
    id: string;
    name: string;
    rating: number;
    marketValue: number;
    status: 'fit' | 'injured' | 'suspended';
  }

  const squad: Player[] = [
    { id: '1', name: 'Fernando Muslera', rating: 86, marketValue: 1200000, status: 'fit' },
    { id: '2', name: 'Victor Osimhen', rating: 91, marketValue: 75000000, status: 'fit' },
    { id: '3', name: 'Mauro Icardi', rating: 88, marketValue: 15000000, status: 'injured' },
  ];

  it('calculates total squad valuation accurately', () => {
    const totalValuation = squad.reduce((sum, p) => sum + p.marketValue, 0);
    expect(totalValuation).toBe(91200000);
  });

  it('filters ready vs injured players', () => {
    const fitPlayers = squad.filter((p) => p.status === 'fit');
    const injuredPlayers = squad.filter((p) => p.status === 'injured');

    expect(fitPlayers).toHaveLength(2);
    expect(injuredPlayers).toHaveLength(1);
    expect(injuredPlayers[0].name).toBe('Mauro Icardi');
  });

  it('computes average squad rating', () => {
    const avg = squad.reduce((acc, p) => acc + p.rating, 0) / squad.length;
    expect(Math.round(avg)).toBe(88);
  });
});
