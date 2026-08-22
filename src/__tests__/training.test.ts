import { describe, it, expect } from 'vitest';

describe('Training Attendance & Workload Engine', () => {
  interface TrainingSession {
    id: string;
    duration: number;
    attendance: Record<string, 'present' | 'excused' | 'injured' | 'absent'>;
  }

  const session: TrainingSession = {
    id: 't1',
    duration: 90,
    attendance: {
      p1: 'present',
      p2: 'present',
      p3: 'excused',
      p4: 'injured',
      p5: 'absent',
    },
  };

  it('calculates attendee counts correctly', () => {
    const present = Object.values(session.attendance).filter((s) => s === 'present').length;
    const injured = Object.values(session.attendance).filter((s) => s === 'injured').length;

    expect(present).toBe(2);
    expect(injured).toBe(1);
  });
});
