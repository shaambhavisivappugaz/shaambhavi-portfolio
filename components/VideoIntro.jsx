'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import styles from '../styles/VideoIntro.module.css';

export default function VideoIntro({ videoSrc = '/hero.mp4' }) {
  const videoRef   = useRef(null);
  const ambientRef = useRef(null);
  const canvasRef  = useRef(null);
  const [muted,    setMuted]    = useState(true);
  const [playing,  setPlaying]  = useState(true);
  const [showHint, setShowHint] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Unmute main video on first user interaction (ambient video stays muted — visual only)
  useEffect(() => {
    const unlock = () => {
      const v = videoRef.current;
      if (v && v.muted) { v.muted = false; v.play().catch(()=>{}); }
      setMuted(false);
      setShowHint(false);
    };
    document.addEventListener('click',     unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
    return () => {
      document.removeEventListener('click',     unlock);
      document.removeEventListener('touchstart', unlock);
    };
  }, []);

  useEffect(() => {
    const els = [
      { id: 'tg', d: 300 }, { id: 'n1', d: 600 }, { id: 'n2', d: 800 },
      { id: 'rl', d: 1000 }, { id: 'sb', d: 1150 }, { id: 'av', d: 1300 },
      { id: 'ct', d: 1450 }, { id: 'ss', d: 1650 }, { id: 'sc', d: 2000 },
    ];
    const timers = els.map(({ id, d }) =>
      setTimeout(() => document.getElementById(id)?.classList.add(styles.in), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
    }
    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d');

    const count = window.innerWidth < 768 ? 70 : 140;
    const pts = Array.from({ length: count }, () => ({
      x:     Math.random(),
      y:     Math.random(),
      r:     Math.random() * 1.5 + 0.3,
      vx:    (Math.random() - 0.5) * 0.00012,
      vy:    (Math.random() - 0.5) * 0.00012,
      phase: Math.random() * Math.PI * 2,
      speed: 0.012 + Math.random() * 0.022,
    }));

    let t = 0;
    function draw() {
      const w = canvas.width  / dpr;
      const h = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      t += 1;

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

        const twinkle = 0.15 + 0.85 * Math.abs(Math.sin(t * p.speed + p.phase));
        const px = p.x * w, py = p.y * h;

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,165,255,${twinkle * 0.9})`;
        ctx.fill();

        if (p.r > 1.1) {
          const g = ctx.createRadialGradient(px, py, 0, px, py, p.r * 5);
          g.addColorStop(0, `rgba(130,190,255,${twinkle * 0.22})`);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(px, py, p.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current, a = ambientRef.current;
    const next = !playing;
    setPlaying(next);
    if (next) { v?.play().catch(()=>{}); a?.play().catch(()=>{}); }
    else { v?.pause(); a?.pause(); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    const next = !muted;
    setMuted(next);
    if (v) v.muted = next;
    // ambientRef stays muted always — it's visual only
  };

  return (
    <section className={`${styles.hero} ${theme === 'light' ? styles.heroLight : ''}`}>
      <video ref={ambientRef} className={styles.ambientVideo} src={videoSrc} autoPlay loop muted playsInline aria-hidden="true" />

      {/* LEFT */}
      <div className={styles.contentSide}>
        <p className={styles.tagline} id="tg">Software Developer · AI Engineer</p>

        <h1 className={styles.nameBlock}>
          <span className={styles.nameFirst} id="n1">Shaambhavi</span>
          <span className={styles.nameLast}  id="n2">Sivappugaz</span>
        </h1>

        <p className={styles.role}     id="rl">Full-Stack Developer &amp; AI Engineer</p>
        <p className={styles.subtitle} id="sb">
          Software Developer with 2.5+ years at Zoho Corporation, currently pursuing a Master of IT at Monash University. Specialised in Java-based distributed systems, REST APIs, and enterprise log processing using Kafka, Elasticsearch, and HDFS.
        </p>

        <div className={styles.available} id="av">
          <span className={styles.availDot} />
          <span>Open to opportunities in Australia</span>
        </div>

        <div className={styles.ctas} id="ct">
          <a href="#contact" className={styles.ctaPrimary}>Get in touch</a>
          <a href="#work" onClick={(e)=>{e.preventDefault();document.getElementById('work')?.scrollIntoView({behavior:'smooth'})}} className={styles.ctaSecondary}>View work ↓</a>
          <a href="/Shaambhavi_Sivappugaz_Resume.pdf" download="Shaambhavi_Sivappugaz_Resume.pdf" className={styles.ctaCV}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </a>
        </div>

        <div className={styles.statsStrip} id="ss">
          {[
            { v: '2.5+', l: 'Yrs Experience' },
            { v: '60%',  l: 'DB Query Reduction' },
            { v: '9.31', l: 'GPA / 10' },
            { v: '2',    l: 'Papers Published' },
          ].map(s => (
            <div key={s.l} className={styles.stat}>
              <span className={styles.statVal}>{s.v}</span>
              <span className={styles.statLbl}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className={styles.videoSide}>
        <video ref={videoRef} className={styles.mainVideo} src={videoSrc}
          autoPlay loop muted playsInline />
        <div className={styles.videoFade} />
      </div>

      {/* Glitter canvas — z-index 4 over everything */}
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.controls}>
        <button className={styles.glassBtn} onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing
            ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>}
        </button>
        <button className={styles.glassBtn} onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted
            ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54,8.46a5,5,0,0,1,0,7.07"/><path d="M19.07,4.93a10,10,0,0,1,0,14.14"/></svg>}
        </button>
      </div>

      {showHint && (
        <div className={styles.soundHint}>
          <span className={styles.soundDot} />
          Tap for sound
        </div>
      )}

      <button className={styles.scrollBtn} id="sc"
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Scroll down">
        <span className={styles.scrollLbl}>SCROLL</span>
        <span className={styles.scrollLine} />
      </button>
    </section>
  );
}
