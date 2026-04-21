# Development Plan - Modern Portfolio SPA

## 1. Project Overview
Membangun website portfolio profesional menggunakan React, TailwindCSS, dan Framer Motion. Data bersumber dari CV dan LinkedIn Waluyo Ade Prasetio.

## 2. Technical Stack
- **Framework:** React (Vite)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Multi-language:** i18next
- **Deployment:** Docker (Nginx) & GitHub Pages

## 3. Implementation Phases

### Phase 1: Data Structuring (Extract & Merge)
- Menggabungkan data dari `CV_WaluyoAdePrasetio_APP.pdf` dan data LinkedIn.
- Membuat file `src/data/cv.json` yang berisi data terstruktur (ID & EN).
- Menambahkan project **wapify**.

### Phase 2: Core Setup
- Instalasi dependensi: `tailwindcss`, `framer-motion`, `lucide-react`, `i18next`, `react-i18next`.
- Konfigurasi Tailwind (Dark Mode).
- Setup i18n untuk Bahasa Indonesia dan English.

### Phase 3: Component Development
- **Navbar:** Navigasi, Toggle Dark Mode, Language Switcher.
- **Hero Section:** Intro, Profile Image, Location, CTA Hire Me.
- **About Section:** Professional Summary & Personal Statement.
- **Skills Section:** Progress bars visual.
- **Experience Section:** Detailed timeline dari LinkedIn & CV.
- **Projects Section:** Card UI dengan filter/grid.
- **Education Section:** Riwayat pendidikan.
- **Contact Section:** Form (Name, Email, Message) dengan trigger mailto.

### Phase 4: Refinement & Animation
- Implementasi Framer Motion untuk transisi halus.
- Optimalisasi responsivitas mobile.

### Phase 5: Deployment Setup
- Pembuatan `Dockerfile` dan `docker-compose.yml`.
- Setup GitHub Actions untuk auto-deploy ke GitHub Pages.

## 4. Requirement Checklist
- [ ] Parse CV & LinkedIn to JSON
- [ ] Responsive Layout
- [ ] Dark Mode Support
- [ ] Multi-language (ID/EN)
- [ ] Hero Section
- [ ] About Section
- [ ] Skills Section (Progress Bars)
- [ ] Experience Section (Timeline)
- [ ] Projects Section (Cards)
- [ ] Education Section
- [ ] Contact Section (Email Trigger)
- [ ] Add "wapify" project
- [ ] Dockerization
- [ ] GitHub Pages Support
