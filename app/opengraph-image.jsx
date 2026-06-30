import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Shaambhavi Sivappugaz — Software Developer & AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px', height: '630px',
          background: 'linear-gradient(135deg, #03060f 0%, #0a0f2e 50%, #03060f 100%)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow orb */}
        <div style={{
          position: 'absolute', right: '120px', top: '50%',
          transform: 'translateY(-50%)',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
        }}/>

        {/* Left accent bar */}
        <div style={{
          position: 'absolute', left: '80px', top: '180px',
          width: '4px', height: '270px', borderRadius: '2px',
          background: 'linear-gradient(to bottom, #2563eb, #00d4ff)',
        }}/>

        {/* S. logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '40px', marginLeft: '4px' }}>
          <span style={{ fontSize: '40px', fontWeight: '900', color: 'white', letterSpacing: '-1px' }}>S</span>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00d4ff', marginTop: '12px' }}/>
        </div>

        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', marginBottom: '24px' }}>
          <span style={{ fontSize: '78px', fontWeight: '900', color: 'white', letterSpacing: '-3px', lineHeight: '1' }}>
            SHAAMBHAVI
          </span>
          <span style={{ fontSize: '78px', fontWeight: '900', letterSpacing: '-3px', lineHeight: '1',
            background: 'linear-gradient(90deg, #2563eb, #00d4ff)',
            backgroundClip: 'text', color: 'transparent' }}>
            SIVAPPUGAZ
          </span>
        </div>

        {/* Role */}
        <div style={{ fontSize: '24px', color: 'rgba(160,196,255,0.8)', marginBottom: '28px', letterSpacing: '0.5px' }}>
          Full-Stack Developer &amp; AI Engineer · Melbourne, Australia
        </div>

        {/* Divider */}
        <div style={{ width: '480px', height: '1px', background: 'rgba(79,142,247,0.3)', marginBottom: '28px' }}/>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '48px', marginBottom: '36px' }}>
          {[
            { val: '2.5+', lbl: 'YRS EXPERIENCE' },
            { val: '9.31', lbl: 'GPA / 10' },
            { val: '2',    lbl: 'PAPERS PUBLISHED' },
          ].map(s => (
            <div key={s.lbl} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: '900', color: 'white' }}>{s.val}</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px' }}>{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* Available badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(52,211,153,0.08)',
          border: '1px solid rgba(52,211,153,0.3)',
          borderRadius: '99px', padding: '8px 20px', width: 'fit-content',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399' }}/>
          <span style={{ fontSize: '13px', color: '#34d399', fontWeight: '600', letterSpacing: '1px' }}>
            OPEN TO OPPORTUNITIES · AUSTRALIA
          </span>
        </div>

        {/* URL bottom right */}
        <div style={{
          position: 'absolute', bottom: '28px', right: '80px',
          fontSize: '13px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px',
        }}>
          shaambhavisivappugaz-portfolio-zeta.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
