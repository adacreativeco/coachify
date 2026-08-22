import { describe, it, expect } from 'vitest';
import { formationCoordinates } from '../components/tactic/TacticBoard';

describe('Tactical Formation & Lineup Engine', () => {
  it('supports 4-3-3, 4-4-2, 4-2-3-1, 3-5-2 formations', () => {
    expect(formationCoordinates['4-3-3']).toBeDefined();
    expect(formationCoordinates['4-4-2']).toBeDefined();
    expect(formationCoordinates['4-2-3-1']).toBeDefined();
    expect(formationCoordinates['3-5-2']).toBeDefined();
  });

  it('ensures each formation defines exactly 11 distinct pitch positions', () => {
    Object.entries(formationCoordinates).forEach(([fmt, slots]) => {
      const slotKeys = Object.keys(slots);
      expect(slotKeys).toHaveLength(11);
    });
  });

  it('always includes Goalkeeper (GK) in all formations', () => {
    Object.values(formationCoordinates).forEach((slots) => {
      expect(slots.gk).toBeDefined();
      expect(slots.gk.label).toBe('KL');
    });
  });
});
