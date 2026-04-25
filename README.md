# Abdul-Tawab Tariq — Portfolio

A cinematic dark-mode portfolio built with **Next.js 14 App Router** + **Framer Motion**.

## ✨ Features
- Custom magnetic cursor with spring physics
- Glitch text effect on hero name
- Parallax scroll transforms
- Rotating title ticker with AnimatePresence
- Staggered scroll-triggered reveals
- Animated tech stack cards with per-card glow colors
- Project cards with hover shimmer + left accent bar
- Interactive calendar with slot selection
- Marquee ticker strip
- Border-gradient animation (CSS @property)
- Scanline effect overlay
- Noise texture overlay

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Stack
- **Next.js 14** — App Router
- **Framer Motion 11** — All animations
- **Tailwind CSS 3** — Utility styling
- **TypeScript**
- Google Fonts: Bebas Neue + Syne + JetBrains Mono

## 🖼️ Adding Your Photo
Replace the avatar placeholder in `src/components/Hero.tsx`:

```tsx
// Replace the avatar-placeholder div with:
<Image
  src="/your-photo.jpg"
  alt="Abdul-Tawab Tariq"
  fill
  className="object-cover object-top"
/>
```

Put your photo in `/public/your-photo.jpg`.

## 📁 Structure
```
src/
├── app/
│   ├── globals.css      ← All CSS variables, keyframes, utilities
│   ├── layout.tsx       ← Fonts + metadata
│   └── page.tsx         ← Page assembly
└── components/
    ├── Cursor.tsx        ← Custom cursor with spring physics
    ├── Navbar.tsx        ← Animated sticky nav
    ├── Hero.tsx          ← Glitch name + parallax + floating card
    ├── Marquee.tsx       ← Infinite ticker
    ├── About.tsx         ← Fast Report panel
    ├── TechStack.tsx     ← 7-card animated grid
    ├── Projects.tsx      ← 4-card hover system
    ├── Contact.tsx       ← Calendar + socials
    ├── Footer.tsx
    └── Reveal.tsx        ← Reusable scroll reveal wrapper
```

## 🎨 Customization
All colors in `tailwind.config.ts` under `theme.extend.colors`.
Edit data arrays at the top of each component file.
