/**
 * Security Input Validation & File Upload Sanity Engine
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validatePlayerInput(data: {
  name: string;
  jerseyNumber: number;
  rating: number;
  age: number;
  marketValue: number;
}): ValidationResult {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Oyuncu adi en az 2 karakter olmalidir.' };
  }
  if (data.name.length > 50) {
    return { valid: false, error: 'Oyuncu adi en fazla 50 karakter olabilir.' };
  }
  if (data.jerseyNumber < 1 || data.jerseyNumber > 99) {
    return { valid: false, error: 'Forma numarasi 1 ile 99 arasinda olmalidir.' };
  }
  if (data.rating < 50 || data.rating > 99) {
    return { valid: false, error: 'OVR puani 50 ile 99 arasinda olmalidir.' };
  }
  if (data.age < 15 || data.age > 45) {
    return { valid: false, error: 'Oyuncu yasi 15 ile 45 arasinda olmalidir.' };
  }
  if (data.marketValue < 0) {
    return { valid: false, error: 'Piyasa degeri negatif olamaz.' };
  }
  return { valid: true };
}

export function validateFinancialInput(data: {
  title: string;
  amount: number;
  type: 'income' | 'expense';
}): ValidationResult {
  if (!data.title || data.title.trim().length < 3) {
    return { valid: false, error: 'Islem aciklamasi en az 3 karakter olmalidir.' };
  }
  if (data.amount <= 0) {
    return { valid: false, error: 'Tutar sifirdan buyuk pozitif bir deger olmalidir.' };
  }
  if (!['income', 'expense'].includes(data.type)) {
    return { valid: false, error: 'Gecersiz finansal islem turu.' };
  }
  return { valid: true };
}

export function validateFileUpload(
  file: { name: string; size: number; type: string },
  maxBytes: number = 2 * 1024 * 1024,
  allowedMimes: string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
): ValidationResult {
  if (file.size > maxBytes) {
    return { valid: false, error: `Dosya boyutu maksimum ${(maxBytes / (1024 * 1024)).toFixed(0)}MB olabilir.` };
  }
  if (!allowedMimes.includes(file.type.toLowerCase())) {
    return { valid: false, error: 'Desteklenmeyen dosya turu. Yalnizca JPEG, PNG veya WEBP yukleyebilirsiniz.' };
  }
  return { valid: true };
}
