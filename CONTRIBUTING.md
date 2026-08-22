# Katkıda Bulunma Rehberi (Contributing Guide)

COACHIFY.OS projesine katkıda bulunmak istediğiniz için teşekkür ederiz!

## 🚀 Geliştirme Ortamı Kurulumu

```bash
# 1. Projeyi forkladıktan sonra klonlayın
git clone https://github.com/adacreativeco/coachify.git
cd coachify

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev

# 4. Testleri çalıştırın
npm test
```

## 📋 Kurallar & Standartlar
1. **Commit Mesajları:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`) standardına uyunuz.
2. **Yazar Bilgisi:** Kurumsal commitler için `ADA Creative Co. <git@adacreative.co>` kullanılmalıdır.
3. **Tip Güvenliği:** `npm run check` sıfır hata vermelidir.
4. **Test Kapsamı:** Yeni eklenen modüller için `src/__tests__/` altına Vitest testleri yazılmalıdır.
