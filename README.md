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

**COACHIFY.OS** is a high-performance, AI-assisted Football Club & Sports Academy Operating System. It unifies **interactive tactic boards, real-time training roll-calls, match timeline recording, multi-role portals (Club President, Head Coach, Player), and financial analytics** in a unified reactive architecture.

<p align="center">
  <img src="docs/assets/coachify_landing.png" alt="Coachify OS Landing Page" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

---

## 🌟 Core Pillars & Architecture

```mermaid
graph TD
    A[COACHIFY Reactive Club Store] --> B[⚽ Interactive Tactic Board]
    A --> C[📋 Training Roll Call & Fatigue Engine]
    A --> D[🏆 Match Events & Fixture Timeline]
    A --> E[👑 President Financial Ledger]
    A --> F[📊 Recharts & AI Tactical Advisor]
    
    B --> G[4-3-3, 4-4-2, 4-2-3-1, 3-5-2 Pitch Engine]
    C --> H[Attendance: Present / Excused / Injured / Absent]
    E --> I[Cash Flow, Squad Valuation, Salaries]
    F --> J[AI Scout & Opponent Weakness Radar]
```

### 1. ⚽ Interactive Pitch & Tactic Board
- Visual grass pitch supporting multiple standard tactical formations (`4-3-3`, `4-4-2`, `4-2-3-1`, `3-5-2`).
- Real-time squad lineup assignment, tactical mentality selectors, captain, penalty, and free-kick assignments.

<p align="center">
  <img src="docs/assets/coachify_tactic_board.png" alt="Coachify OS Tactical Pitch" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

### 2. 📋 Training Planner & Live Roll Call
- Schedule drills focused on **Tactics, Conditioning, Shooting, Passing, or Goalkeeping**.
- 1-click squad roll call tracker with 4 status states (*Katıldı / Present, İzinli / Excused, Sakat / Injured, Gelmedi / Absent*).

<p align="center">
  <img src="docs/assets/coachify_training.png" alt="Coachify Training Roll Call" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

### 3. 👥 Squad & Player Management
- 22-player rich roster with OVR ratings, injury tracking, market values, and instant player creation/editing.

<p align="center">
  <img src="docs/assets/coachify_players.png" alt="Coachify Players Management" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

### 4. 👑 Multi-Role Unified Portals
- **👑 President**: Total squad valuation (€), income/expense ledger, transfer budgets, sponsorship agreements.
- **📋 Head Coach**: Next match tactical readiness, squad fitness average (%88), weekly sessions, and injury radar.
- **⚽ Player**: Individual match rating, goals/assists, fitness radar, attendance score, and coach feedback.

<p align="center">
  <img src="docs/assets/coachify_dashboard.png" alt="Coachify Coach Dashboard" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

### 5. 📊 Performance Analytics & AI Advisor
- Radar charts for squad balance (Offense, Defense, Physical, Passing, Pace, Discipline).
- Automated AI Tactical Advisor generating scouting insights and substitution suggestions for upcoming derby fixtures.

<p align="center">
  <img src="docs/assets/coachify_analytics.png" alt="Coachify Analytics" width="100%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
</p>

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/adacreativeco/coachify.git
cd coachify

# Install dependencies
npm install

# Run development server
npm run dev

# Run automated Vitest test suite (8/8 tests passing)
npm test

# Build production bundle
npm run build
```

---

## 📄 License
Licensed under the Apache License 2.0. Developed with 🧠 by [ADA Creative Co.](https://github.com/adacreativeco).
