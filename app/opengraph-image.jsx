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
          background: '#03060f',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        {/* Top label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
          <div style={{ width: '32px', height: '2px', background: '#4f8ef7' }} />
          <span style={{ fontSize: '16px', color: '#4f8ef7', fontWeight: '700', letterSpacing: '4px' }}>
            PORTFOLIO
          </span>
        </div>

        {/* Name */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
          <span style={{
            fontSize: '88px', fontWeight: '900', color: '#ffffff',
            lineHeight: '1', letterSpacing: '-3px',
          }}>
            SHAAMBHAVI
          </span>
          <span style={{
            fontSize: '88px', fontWeight: '900', color: '#4f8ef7',
            lineHeight: '1', letterSpacing: '-3px',
          }}>
            SIVAPPUGAZ
          </span>
        </div>

        {/* Role */}
        <span style={{ fontSize: '26px', color: 'rgba(160,196,255,0.8)', marginBottom: '36px' }}>
          Full-Stack Developer &amp; AI Engineer · Melbourne, Australia
        </span>

        {/* Divider */}
        <div style={{ width: '500px', height: '1px', background: 'rgba(79,142,247,0.3)', marginBottom: '36px' }} />

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '56px', marginBottom: '40px' }}>
          {[
            { val: '2.5+', lbl: 'YRS EXPERIENCE' },
            { val: '9.31', lbl: 'GPA / 10' },
            { val: '2',    lbl: 'PAPERS PUBLISHED' },
            { val: '60%',  lbl: 'DB QUERY REDUCTION' },
          ].map(s => (
            <div key={s.lbl} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '34px', fontWeight: '900', color: '#ffffff' }}>{s.val}</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px' }}>{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          border: '1px solid rgba(52,211,153,0.4)',
          borderRadius: '100px', padding: '10px 24px',
          width: '380px',
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399' }} />
          <span style={{ fontSize: '13px', color: '#34d399', fontWeight: '700', letterSpacing: '1.5px' }}>
            OPEN TO WORK · AUSTRALIA
          </span>
        </div>

        {/* URL watermark */}
        <span style={{
          position: 'absolute', bottom: '36px', right: '80px',
          fontSize: '13px', color: 'rgba(255,255,255,0.18)',
        }}>
          shaambhavisivappugaz-portfolio-zeta.vercel.app
        </span>
      </div>
    ),
    { ...size }
  );
}
