# ⚽ COACHIFY.OS

<p align="center">
  <a href="README.md">🇬🇧 English</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a>
</p>

---

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Tested-green.svg?logo=vitest&logoColor=white)](https://vitest.dev/)
[![CI Pipeline](https://github.com/adacreativeco/coachify/actions/workflows/ci.yml/badge.svg)](https://github.com/adacreativeco/coachify/actions)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**COACHIFY.OS**, profesyonel futbol kulüpleri ve spor akademileri için geliştirilmiş, yapay zeka destekli yeni nesil kulüp yönetim işletim sistemidir. **İnteraktif yeşil saha taktik tahtası, canlı antrenman yoklaması, maç olay akışı, 3 farklı rol paneli (Başkan, Teknik Direktör, Futbolcu) ve finansal bütçe yönetimini** tek bir reaktif mimaride birleştirir.

<p align="center">
  <img src="docs/assets/coachify_landing.png" alt="Coachify OS Karşılama Sayfası" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

---

## 🌟 Temel Modüller & Mimari

```mermaid
graph TD
    A[COACHIFY Reaktif Kulüp Deposu] --> B[⚽ İnteraktif Taktik Tahtası]
    A --> C[📋 Antrenman Yoklama & Yorgunluk Takibi]
    A --> D[🏆 Maç Olayları & Fikstür Çizelgesi]
    A --> E[👑 Başkan Finans & Bütçe Yönetimi]
    A --> F[📊 Recharts & Yapay Zeka Taktik Danışmanı]
    
    B --> G[4-3-3, 4-4-2, 4-2-3-1, 3-5-2 Saha Dizilişi]
    C --> H[Yoklama: Katıldı / İzinli / Sakat / Gelmedi]
    E --> I[Nakit Akışı, Kadro Değeri, Maaş & Sponsorluk]
    F --> J[AI Rakip Analizi & Zayıf Nokta Radarı]
```

### 1. ⚽ İnteraktif Saha & Taktik Tahtası
* `4-3-3`, `4-4-2`, `4-2-3-1`, `3-5-2` formasyonlarında ilk 11 belirleme.
* Kaptan, penaltıcı, frikikçi ve kornerci atamaları; hücum/savunma anlayışı seçimi.

<p align="center">
  <img src="docs/assets/coachify_tactic_board.png" alt="Coachify OS Saha Dizilişi ve Taktik Tahtası" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

### 2. 📋 Antrenman Planlama & Canlı Yoklama
* Taktik, Kondisyon, Şut, Pas ve Kaleci odaklı seans oluşturma.
* Tek tıkla tüm kadronun katılım yoklamasını (*Katıldı, İzinli, Sakat, Gelmedi*) alma motoru.

<p align="center">
  <img src="docs/assets/coachify_training.png" alt="Coachify Antrenman Yoklaması" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

### 3. 👥 Kadro & Oyuncu Yönetimi
* 22 kişilik zengin kadro, OVR reytingleri, sakatlık takibi, piyasa değerleri ve anlık oyuncu ekleme/düzenleme.

<p align="center">
  <img src="docs/assets/coachify_players.png" alt="Coachify Oyuncu Yönetimi" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

### 4. 👑 3 Farklı Kullanıcı Rol Portali
* **👑 Kulüp Başkanı**: Toplam kadro değeri (€91.2M), gelir/gider kaydı, transfer bütçesi, sponsorluk anlaşmaları.
* **📋 Teknik Direktör**: Sıradaki maç taktiği, takım kondisyon ortalaması (%88), sakatlık radarı ve antrenman takvimi.
* **⚽ Futbolcu**: Bireysel maç karnesi, kondisyon radarı, antrenman devamlılığı ve hocanın taktik notları.

<p align="center">
  <img src="docs/assets/coachify_dashboard.png" alt="Coachify Teknik Direktör Paneli" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

### 5. 📊 Performans Analitiği & AI Danışmanı
* Takım denge radarı (Hücum, Savunma, Fizik, Pas, Hız, Disiplin).
* Rakip analizine göre anlık taktiksel öneriler üreten yapay zeka asistanı.

<p align="center">
  <img src="docs/assets/coachify_analytics.png" alt="Coachify Performans Analitiği" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

---

## 🚀 Hızlı Başlangıç

```bash
# Depoyu klonlayın
git clone https://github.com/adacreativeco/coachify.git
cd coachify

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Otomatik Vitest testlerini çalıştırın (8/8 test başarılı)
npm test

# Prodüksiyon derlemesini alın
npm run build
```

---

## 📄 Lisans
Apache License 2.0 ile lisanslanmıştır. [ADA Creative Co.](https://github.com/adacreativeco) tarafından geliştirilmiştir.
