# COACHIFY.OS

<p align="center">
  <a href="README.md">🇬🇧 English</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a>
</p>

---

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-green.svg?logo=vitest&logoColor=white)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**COACHIFY.OS**, profesyonel futbol kulüpleri ve akademiler için geliştirilmiş reaktif bir kulüp yönetim işletim sistemidir. **İnteraktif taktik tahtası, canlı antrenman yoklaması, maç olay çizelgesi, çoklu rol panelleri (Kulüp Başkanı, Teknik Direktör, Futbolcu) ve finansal bütçe yönetimini** tek bir modern platformda birleştirir.

<p align="center">
  <img src="docs/screenshots/01_home_hero.png" alt="Coachify OS Ana Sayfa" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);" />
</p>

---

## Mimari & Modüller

```mermaid
graph TD
    A[COACHIFY Reaktif Durum Motoru] --> B[İnteraktif Taktik Tahtası]
    A --> C[Antrenman & Canlı Yoklama]
    A --> D[Maçlar & Fikstür Çizelgesi]
    A --> E[Başkan Finans & Bütçe Defteri]
    A --> F[Recharts & AI Taktik Danışmanı]
    
    B --> G[4-3-3, 4-4-2, 4-2-3-1, 3-5-2 Saha Motoru]
    C --> H[Yoklama: Katıldı / İzinli / Sakat / Gelmedi]
    E --> I[Transfer Bütçesi, Kadro Değeri, Maaşlar]
    F --> J[AI Scout & Rakip Zayıf Nokta Radarı]
```

### 1. İnteraktif Yeşil Saha & Taktik Tahtası
- Modern taktiksel formasyon desteği (`4-3-3`, `4-4-2`, `4-2-3-1`, `3-5-2`).
- Gerçek zamanlı ilk 11 ataması, taktiksel anlayış, kaptan, penaltıcı ve duran top kullanıcılarının seçimi.

<p align="center">
  <img src="docs/screenshots/03_tactic_board.png" alt="Coachify OS Taktik Tahtası" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);" />
</p>

### 2. Antrenman Planlama & Canlı Yoklama
- **Taktik, Kondisyon, Şut, Pas ve Kaleci** odaklı seans planlama.
- 4 durumlu tek tıkla canlı katılım takip masası (*Katıldı, İzinli, Sakat, Gelmedi*).

<p align="center">
  <img src="docs/screenshots/04_training_attendance.png" alt="Coachify Antrenman Yoklama" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);" />
</p>

### 3. Çoklu Rol Panelleri
- **Kulüp Başkanı**: Kadro piyasa değeri, gelir/gider çift taraflı kayıt defteri, transfer bütçesi ve sponsorluklar.
- **Teknik Direktör**: Maç günü taktik hazırlığı, ortalama kondisyon (%88), haftalık seanslar ve sakatlık radarı.
- **Futbolcu**: Bireysel maç puanı, gol/asist katkısı, kondisyon grafiği, antrenman devamlılığı ve hoca notları.

<p align="center">
  <img src="docs/screenshots/02_coach_dashboard.png" alt="Coachify Teknik Direktör Paneli" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);" />
</p>

### 4. Performans Analitiği & Yapay Zeka Danışmanı
- Kadro denge radarı (Hücum, Savunma, Orta Saha, Kaleci, Kondisyon, Genel Güç).
- Otomatik AI Taktik Motoru ile rakip analizi, sakatlık ikazı ve oyuncu değişikliği tavsiyeleri.

<p align="center">
  <img src="docs/screenshots/05_ai_analytics.png" alt="Coachify Performans Analitiği" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.4);" />
</p>

---

## Hızlı Başlangıç

```bash
# Depoyu klonlayın
git clone https://github.com/adacreativeco/coachify.git
cd coachify

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Testleri çalıştırın
npm test

# Üretim paketini derleyin
npm run build
```

---

## Lisans
Apache License 2.0 ile lisanslanmıştır. [ADA Creative Co.](https://github.com/adacreativeco) tarafından geliştirilmiştir.
