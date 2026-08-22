import { describe, it, expect } from 'vitest';
import { validatePlayerInput, validateFinancialInput, validateFileUpload } from '../lib/validations';

describe('Security & Input Validation Engine', () => {
  describe('Player Input Boundaries', () => {
    it('rejects empty or single character player names', () => {
      const result = validatePlayerInput({
        name: 'A',
        jerseyNumber: 10,
        rating: 80,
        age: 24,
        marketValue: 1000000,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('en az 2 karakter');
    });

    it('rejects invalid jersey numbers (e.g. 0 or 105)', () => {
      const r1 = validatePlayerInput({ name: 'Valid Name', jerseyNumber: 0, rating: 80, age: 24, marketValue: 1000 });
      const r2 = validatePlayerInput({ name: 'Valid Name', jerseyNumber: 105, rating: 80, age: 24, marketValue: 1000 });
      expect(r1.valid).toBe(false);
      expect(r2.valid).toBe(false);
    });

    it('rejects invalid rating range below 50 or above 99', () => {
      const rLow = validatePlayerInput({ name: 'Valid Name', jerseyNumber: 7, rating: 40, age: 24, marketValue: 1000 });
      const rHigh = validatePlayerInput({ name: 'Valid Name', jerseyNumber: 7, rating: 120, age: 24, marketValue: 1000 });
      expect(rLow.valid).toBe(false);
      expect(rHigh.valid).toBe(false);
    });
  });

  describe('Financial Input Sanity', () => {
    it('rejects negative or zero financial amounts', () => {
      const rZero = validateFinancialInput({ title: 'Sponsorluk', amount: 0, type: 'income' });
      const rNeg = validateFinancialInput({ title: 'Sponsorluk', amount: -5000, type: 'income' });
      expect(rZero.valid).toBe(false);
      expect(rNeg.valid).toBe(false);
    });
  });

  describe('File Upload MIME & Size Restrictions', () => {
    it('rejects files exceeding 2MB limit', () => {
      const oversizedFile = { name: 'large_image.jpg', size: 3 * 1024 * 1024, type: 'image/jpeg' };
      const res = validateFileUpload(oversizedFile, 2 * 1024 * 1024);
      expect(res.valid).toBe(false);
      expect(res.error).toContain('maksimum 2MB');
    });

    it('rejects executable or script file MIME types', () => {
      const scriptFile = { name: 'malicious.php', size: 500, type: 'application/x-php' };
      const res = validateFileUpload(scriptFile);
      expect(res.valid).toBe(false);
      expect(res.error).toContain('Desteklenmeyen dosya');
    });

    it('accepts valid JPEG, PNG and WEBP image uploads', () => {
      const validImage = { name: 'avatar.png', size: 500 * 1024, type: 'image/png' };
      const res = validateFileUpload(validImage);
      expect(res.valid).toBe(true);
    });
  });
});
