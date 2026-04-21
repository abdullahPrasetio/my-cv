# PRD: Auto-Generated Portfolio Website from CV

## Overview
Membangun web portfolio modern berbasis SPA yang membaca CV dari folder /docs dan mengubahnya menjadi website profesional.

## Objectives
- Transform CV menjadi portfolio interaktif
- Menampilkan Fullstack Developer & Squad Leader profile
- Deploy ke GitHub Pages & CasaOS (Docker)

## Features
### CV Parser
Support:
- PDF
- Markdown
- JSON

Output JSON:
{
  "name": "",
  "title": "",
  "summary": "",
  "skills": [],
  "experience": [],
  "projects": [],
  "education": [],
  "contacts": {}
}

### Sections
- Hero
- About
- Skills
- Experience
- Projects
- Education
- Contact

## Tech Stack
- React / Vue (recommended)
- TailwindCSS
- SPA Architecture

## Deployment
- GitHub Pages
- Docker + Nginx (CasaOS)

## Dockerfile
FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

## docker-compose
version: "3"
services:
  portfolio:
    build: .
    ports:
      - "8080:80"

## Gemini Prompt
Create a modern portfolio SPA that parses CV from /docs and renders sections dynamically using TailwindCSS and React or Vue.

## Success Criteria
- CV auto parsed
- Responsive UI
- Deployable to GitHub Pages & Docker
