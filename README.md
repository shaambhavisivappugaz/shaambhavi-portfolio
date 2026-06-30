# Portfolio Hero — Setup Guide

## Quick Preview (no install needed)
1. Copy `public/hero.mp4` to the same folder as `preview.html`
2. Open `preview.html` in your browser (Chrome/Edge recommended for `autoplay`)
3. Because video autoplay requires the page be served, run:
   ```
   npx serve .
   # then open http://localhost:3000/preview.html
   ```

---

## Next.js Integration

### 1. Install dependencies
```bash
npm install three gsap
```

### 2. Copy files
```
components/
  VideoIntro.jsx       → your Next.js components folder
  CinematicLayer.jsx   → same folder
styles/
  VideoIntro.module.css → your styles folder
public/
  hero.mp4             → Next.js public folder (video is served from here)
```

### 3. Use in your page
```jsx
// app/page.jsx
import VideoIntro from '@/components/VideoIntro';

export default function Home() {
  return (
    <main>
      <VideoIntro videoSrc="/hero.mp4" />
      <section id="work">...</section>
    </main>
  );
}
```

### 4. Add Google Fonts to layout
```jsx
// app/layout.jsx — already included in the output folder
```

---

## File structure
```
portfolio-hero/
├── app/
│   ├── layout.jsx         ← Root layout with Inter + Black Han Sans fonts
│   └── page.jsx           ← Example page
├── components/
│   ├── VideoIntro.jsx     ← Main hero component (video + content + controls)
│   └── CinematicLayer.jsx ← Three.js floating particle canvas
├── styles/
│   └── VideoIntro.module.css
├── public/
│   └── hero.mp4           ← Your talking-head video
├── preview.html           ← Standalone browser preview (no build needed)
├── package.json
└── next.config.js
```

---

## What's inside

### VideoIntro.jsx
- Fullscreen sticky hero
- Blurred ambient duplicate of video as background layer
- Foreground video with cinematic vignette
- Layered gradient overlays (top, bottom, left, sides)
- GSAP entrance animations (staggered, skewed text reveal)
- CV data from Shaambhavi's resume baked in
- Play/Pause + Mute/Unmute glassmorphism controls
- Animated sound hint badge (auto-hides after 4s)
- Scroll indicator with animated pulse line

### CinematicLayer.jsx
- Three.js WebGL canvas (pointer-events: none, fully overlaid)
- 700 warm orange/gold/white additive-blended bokeh particles
- Sine-wave floating motion per particle
- Mouse parallax camera movement
- Slow rotation for cinematic depth
- Correct resource disposal on unmount
- 350 particles on mobile for performance

### CSS Module
- Mobile-first responsive
- `100svh` for safe-area aware fullscreen on iOS
- `prefers-reduced-motion` respected
- `clamp()` fluid type scale throughout
- No Bootstrap/Tailwind — zero external CSS deps

---

## CV data used
- Name, tagline, role, subtitle
- Skills: Java, TypeScript, React, Next.js, Claude API, Kafka, Elasticsearch, AWS, Python, Supabase
- Stats: 2.5+ yrs Zoho, 60% DB query reduction, 9.31 GPA, 2 papers
- Current project: Packlio (Next.js · Claude Vision API · Supabase · Razorpay)
- CTA: Get in touch (mailto) + View work (scroll anchor)
