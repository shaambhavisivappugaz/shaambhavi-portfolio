'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Portfolio.module.css';

/* ══════════════════════════════════
   DATA — from CV
   ══════════════════════════════════ */

const STATS = [
  { num:2.5,  suf:'+', label:'Years at Zoho',        desc:'Full-time Software Developer, enterprise systems', dec:1 },
  { num:60,   suf:'%', label:'DB Query Reduction',    desc:'Via caching & query optimisation at scale', dec:0 },
  { num:9.31, suf:'',  label:'CGPA / 10',             desc:'B.E. Computer Science, Anna University', dec:2 },
  { num:2,    suf:'',  label:'Research Papers',        desc:'Published in Springer proceedings', dec:0 },
];

const PROJECTS = [
  {
    name:'Personal Portfolio — Cinematic Site',
    period:'2026',
    status:'Live',
    tagline:'Immersive, AI-assisted developer portfolio built from scratch',
    desc:'Designed and built this site end-to-end: a cinematic hero with a video intro, a Three.js particle starfield background, scroll-reveal animations, and a built-in AI chatbot that answers visitor questions about my experience.',
    points:[
      'Built with Next.js (App Router) and React, deployed on Vercel.',
      'Created a Three.js/WebGL particle system for the animated background.',
      'Implemented an AI chatbot (Claude API) that answers questions about my CV in real time.',
      'Added a working contact form wired to a serverless API route.',
      'Designed a light/dark theme system and fully responsive layout from the ground up.',
    ],
    stack:['Next.js','React','Three.js','Claude API','CSS Modules','Vercel'],
    color:'#00d4ff', glow:'rgba(0,212,255,.14)', span:'6',
  },
  {
    name:'Apgar Score Prediction',
    period:'Jan 2023 – Apr 2023',
    status:'Published · Springer 2024',
    tagline:'ML system for assessing newborn health using Apgar score analysis',
    points:[
      'Developed ML-based prediction system to assess newborn health conditions.',
      'Implemented and compared multiple ML algorithms on healthcare datasets.',
      'Built a Flask web app for model integration and real-time prediction.',
      'Applied feature engineering and data preprocessing to boost model reliability.',
      'Published findings in Springer WREC 2023 proceedings.',
    ],
    stack:['Python','Flask','Scikit-learn','Feature Engineering','ML'],
    color:'#34d399', glow:'rgba(52,211,153,.12)', span:'6',
  },
  {
    name:'Mobile Malware Detection',
    period:'2023',
    status:'Published · Springer CVR 2023',
    tagline:'Comparative study of ML models for mobile malware detection',
    points:[
      'Compared SVM, Random Forest, and Neural Network (MLP) approaches for Android malware classification.',
      'Conducted data preprocessing and static feature extraction from Android app metadata to improve detection accuracy.',
      'Achieved high classification accuracy with Random Forest outperforming SVM and MLP on balanced benchmark datasets.',
      'Evaluated models using precision, recall, F1-score, and ROC-AUC metrics to ensure robust, generalizable results.',
      'Designed a reproducible experimental pipeline with Scikit-learn, enabling fair cross-model comparison.',
      'Published at CVR 2023, Algorithms for Intelligent Systems, Springer Singapore — contributing insights for selecting optimal ML classifiers in mobile security applications.',
    ],
    stack:['Python','SVM','Random Forest','Neural Networks','Scikit-learn','Android Security','Research'],
    color:'#a78bfa', glow:'rgba(167,139,250,.12)', span:'12',
  },
];

const EXPERIENCE = [
  {
    company:'Digital Nexus AI',
    role:'Web Developer Intern',
    type:'Internship · Full Time',
    period:'May 2026 – Present',
    loc:'Melbourne, Australia',
    points:[
      'Developed responsive web pages using HTML, CSS, Bootstrap, and JavaScript — improved mobile responsiveness by 35%.',
      'Assisted in building React and Angular components, reducing page load time by 20%.',
      'Improved UI consistency and user experience across web applications, increasing usability efficiency by 30%.',
      'Collaborated with the development team to debug and optimise applications, reducing frontend issues by 25%.',
      'Participated in server-side scripting and testing, contributing to 15% faster feature deployment.',
    ],
    tags:['React','Angular','HTML','CSS','Bootstrap','JavaScript'],
  },
  {
    company:'Zoho Corporation Pvt Ltd',
    role:'Member Technical Staff',
    type:'Software Developer · Full Time',
    period:'Sep 2023 – Jan 2026',
    loc:'Coimbatore, India',
    points:[
      'Designed, developed, and maintained Java-based applications focused on log processing, monitoring, and management in high-scale distributed environments.',
      'Developed and optimised servlet-based solutions for handling HTTP requests and responses — ensuring low-latency, high-throughput performance.',
      'Applied OOP, SOLID principles, and design patterns (Singleton, Factory, Observer) to improve maintainability and scalability.',
      'Contributed to the Logs Team: log forwarding, indexing, storage, and search using Kafka, Elasticsearch, and HDFS.',
      'Enhanced system performance by optimising log processing pipelines, reducing latency, and implementing failover mechanisms.',
      'Developed and fine-tuned RESTful APIs to facilitate seamless integration between services and applications.',
      'Implemented caching strategies — reduced redundant DB queries by 60% and improved integration speed by 40%.',
      'Ensured security, compliance, and data retention standards through proactive issue resolution before deployment.',
    ],
    tags:['Java','Kafka','Elasticsearch','HDFS','REST APIs','OOP','SOLID','Servlets'],
  },
  {
    company:'ShopUp',
    role:'Software Development Intern',
    type:'Internship',
    period:'Jul 2023 – Sep 2023',
    loc:'Bangalore, India',
    points:[
      'Worked on Redx — a logistics and delivery management platform — contributing to feature enhancements and system improvements.',
      'Developed and executed automated test scripts using Katalon Studio, integrating them into the CI/CD pipeline for continuous validation.',
      'Conducted manual and automated testing to ensure software quality, stability, and compliance.',
    ],
    tags:['Katalon Studio','CI/CD','Automated Testing','QA'],
  },
];

const SKILLS = [
  { cat:'Languages & Frameworks', pills:['Java','Python','C','TypeScript','JavaScript','HTML5','CSS3','Flask'],        color:'#00d4ff' },
  { cat:'Web & Frontend',         pills:['React.js','Angular','Next.js','Bootstrap','REST APIs','Servlets'],           color:'#4f8ef7' },
  { cat:'Data & Distributed',     pills:['Kafka','Elasticsearch','HDFS','SQL','MySQL','MongoDB'],                      color:'#a78bfa' },
  { cat:'Libraries & ML',         pills:['OpenCV','Keras','TensorFlow','Scikit-learn'],                                color:'#34d399' },
  { cat:'Cloud & DevOps',         pills:['AWS','Docker','CI/CD','Git','GitHub','Vercel','Linux'],                      color:'#f59e0b' },
  { cat:'Concepts',               pills:['OOP','SOLID Principles','System Design','Data Structures','Algorithms','Agile'], color:'#fb7185' },
  { cat:'Tools & Analytics',      pills:['Power BI','Excel','Data Visualisation','Microsoft Office'],                  color:'#06b6d4' },
];

const EDUCATION = [
  {
    badge:'2026 – 2027',
    deg:'Master of Information Technology',
    school:'Monash University',
    period:'Mar 2026 – Dec 2027 · Melbourne, Australia',
    detail:'Full-time postgraduate program covering software engineering, AI, data systems, and cloud computing. Student Visa (500).',
    color:'#00d4ff', orb:'rgba(0,212,255,.07)',
    leadership:[
      'Member — Monash Student Association (MSA)',
      'Member — Monash Coding Club',
    ],
  },
  {
    badge:'CGPA 9.31 / 10',
    deg:'B.E. Computer Science & Engineering',
    school:'Thiagarajar College of Engineering, Anna University',
    period:'Jun 2019 – May 2023 · Madurai, India',
    detail:'Graduated with distinction. Strong foundation in algorithms, distributed systems, and ML.',
    color:'#a78bfa', orb:'rgba(167,139,250,.07)',
    leadership:[
      'Vice Chairman — Institution of Engineers (India), CSE Student Chapter 2022–2023',
      'General Treasurer — CSE Department 2022–2023',
      'NSS Volunteer · U&I Volunteer',
    ],
  },
];

const PUBLICATIONS = [
  {
    year:'2024',
    title:'A Systematic Approach for Effective Apgar Score Assessment in 1 and 5 min Using Manifold Machine Learning Algorithms',
    venue:'In: Mehta, G., Wickramasinghe, N., Kakkar, D. (eds) Innovations in VLSI, Signal Processing and Computational Technologies. WREC 2023. Lecture Notes in Electrical Engineering, vol 1095. Springer, Singapore.',
    authors:'Shaambhavi, S., Bhavani, G.',
    link:'https://link.springer.com/chapter/10.1007/978-981-99-7077-3_19',
  },
  {
    year:'2023',
    title:'Mobile Malware Detection: A Comparative Study of Machine Learning Models',
    venue:'In: Shukla, P.K., Mittal, H., Engelbrecht, A. (eds) Computer Vision and Robotics. CVR 2023. Algorithms for Intelligent Systems. Springer, Singapore.',
    authors:'Vijayalakshmi, M., Shaambhavi, S., Murale Manohar, M.',
    link:'https://link.springer.com/chapter/10.1007/978-981-99-4577-1_6',
  },
];

const SUGGESTIONS = ['What stack does she use?','Is she open to jobs in Australia?','Tell me about her projects','What are her publications?'];

/* ══════════════════════════════════
   HOOKS
   ══════════════════════════════════ */
function useVis(threshold=0.12) {
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){el.classList.add(styles.v);obs.disconnect();} },{threshold});
    obs.observe(el); return ()=>obs.disconnect();
  },[threshold]);
  return ref;
}

function useCountUp(target, dec, duration=1800) {
  const [val,setVal]=useState(0);
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return; obs.disconnect();
      const start=performance.now();
      const tick=(now)=>{
        const p=Math.min((now-start)/duration,1);
        const e2=p<.5?2*p*p:-1+(4-2*p)*p;
        setVal(+(e2*target).toFixed(dec));
        if(p<1) requestAnimationFrame(tick); else setVal(target);
      };
      requestAnimationFrame(tick);
    },{threshold:.5});
    obs.observe(el); return ()=>obs.disconnect();
  },[target,dec,duration]);
  return {val,ref};
}

/* ══════════════════════════════════
   SUB-COMPONENTS
   ══════════════════════════════════ */
function StatItem({stat,delay}) {
  const {val,ref}=useCountUp(stat.num,stat.dec);
  return (
    <div ref={ref} className={`${styles.statItem} ${styles.r}`} style={{'--d':`${delay}s`}}>
      <span className={styles.statNum}>{stat.dec===0?val:val.toFixed(stat.dec)}<span className={styles.statSuffix}>{stat.suf}</span></span>
      <span className={styles.statLabel}>{stat.label}</span>
      <span className={styles.statDesc}>{stat.desc}</span>
    </div>
  );
}

function RevCard({children,className,style,threshold=0.08}) {
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting){el.classList.add(styles.v);obs.disconnect();} },{threshold});
    obs.observe(el); return ()=>obs.disconnect();
  },[threshold]);
  return <div ref={ref} className={className} style={style}>{children}</div>;
}

function ContactForm() {
  const [f,setF]=useState({name:'',email:'',subject:'',message:''});
  const [st,setSt]=useState('idle');
  const set=k=>e=>setF(p=>({...p,[k]:e.target.value}));

  const openMailto=()=>{
    const sub=encodeURIComponent(f.subject||`Portfolio message from ${f.name}`);
    const body=encodeURIComponent(`Hi Shaambhavi,\n\n${f.message}\n\nBest,\n${f.name}\n${f.email}`);
    window.location.href=`mailto:shaambhavishaam@gmail.com?subject=${sub}&body=${body}`;
  };

  const submit=async()=>{
    if(!f.name||!f.email||!f.message) return;
    setSt('sending');
    try{
      const res=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(f)});
      const d=await res.json();
      if(d.success){setSt('success');setF({name:'',email:'',subject:'',message:''});setTimeout(()=>setSt('idle'),6000);}
      else{setSt('mailto');setTimeout(()=>setSt('idle'),8000);}
    }catch{setSt('mailto');setTimeout(()=>setSt('idle'),8000);}
  };

  return (
    <div className={styles.form}>
      <div className={styles.fRow}>
        <div className={styles.fGroup}><label className={styles.fLabel}>Name *</label><input className={styles.fInput} placeholder="Your name" value={f.name} onChange={set('name')}/></div>
        <div className={styles.fGroup}><label className={styles.fLabel}>Email *</label><input className={styles.fInput} type="email" placeholder="your@email.com" value={f.email} onChange={set('email')}/></div>
      </div>
      <div className={styles.fGroup}><label className={styles.fLabel}>Subject</label><input className={styles.fInput} placeholder="Job opportunity / Collaboration / Other" value={f.subject} onChange={set('subject')}/></div>
      <div className={styles.fGroup}><label className={styles.fLabel}>Message *</label><textarea className={styles.fTextarea} placeholder="Tell me about the opportunity or project..." value={f.message} onChange={set('message')}/></div>
      <div style={{display:'flex',gap:'.75rem',flexWrap:'wrap',alignItems:'center'}}>
        <button className={styles.fBtn} onClick={submit} disabled={st==='sending'}>{st==='sending'?'Sending…':'Send message →'}</button>
        <button className={styles.fBtn} onClick={openMailto} style={{background:'transparent',border:'1px solid var(--border-accent)',color:'var(--accent)',boxShadow:'none'}}>Open in Mail app ✉</button>
      </div>
      {st==='success'&&<div className={styles.fOk}>✓ Sent! I'll reply within 1–2 days.</div>}
      {st==='mailto' &&<div className={styles.fOk}>Click "Open in Mail app" above to send directly from your email client.</div>}
    </div>
  );
}

function Chatbot() {
  const [open,setOpen]=useState(false);
  const [msgs,setMsgs]=useState([{role:'bot',text:"Hi! I'm Shaambhavi's portfolio assistant. Ask me anything about her experience, skills, or projects 👋"}]);
  const [input,setInput]=useState('');
  const [typing,setTyping]=useState(false);
  const [showSugg,setShowSugg]=useState(true);
  const botRef=useRef(null);
  useEffect(()=>{botRef.current?.scrollIntoView({behavior:'smooth'});},[msgs,typing]);
  const send=async(txt)=>{
    const msg=(txt||input).trim(); if(!msg||typing) return;
    setInput(''); setShowSugg(false);
    setMsgs(m=>[...m,{role:'user',text:msg}]); setTyping(true);
    try{
      const res=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})});
      const d=await res.json();
      if(d.text){setMsgs(m=>[...m,{role:'bot',text:d.text}]);}
      else{setMsgs(m=>[...m,{role:'bot',text:'I\'m not able to respond right now. Email Shaambhavi directly at shaambhavishaam@gmail.com — she replies within 1–2 days!'}]);}
    }catch{
      setMsgs(m=>[...m,{role:'bot',text:'Connection issue. Reach Shaambhavi at shaambhavishaam@gmail.com or on LinkedIn.'}]);
    }
    finally{setTyping(false);}
  };
  return (
    <div className={styles.chatWidget}>
      {open&&(
        <div className={styles.chatWin}>
          <div className={styles.chatHead}>
            <div className={styles.chatHeadL}>
              <div className={styles.chatAvatar}>S</div>
              <div><div className={styles.chatName}>Shaambhavi's Assistant</div><div className={styles.chatOnline}>Online</div></div>
            </div>
            <button className={styles.chatX} onClick={()=>setOpen(false)}>✕</button>
          </div>
          <div className={styles.chatMsgs}>
            {msgs.map((m,i)=>(
              <div key={i} className={`${styles.cMsg} ${styles[m.role]}`}>
                <div className={styles.cBub}>{m.text}</div>
              </div>
            ))}
            {typing&&<div className={`${styles.cMsg} ${styles.bot}`}><div className={styles.cBub}><div className={styles.cTyping}><span/><span/><span/></div></div></div>}
            <div ref={botRef}/>
          </div>
          {showSugg&&<div className={styles.chatSuggs}>{SUGGESTIONS.map(s=><button key={s} className={styles.chatSugg} onClick={()=>send(s)}>{s}</button>)}</div>}
          <div className={styles.chatRow}>
            <input className={styles.chatIn} placeholder="Ask anything…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}/>
            <button className={styles.chatSend} onClick={()=>send()} aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
            </button>
          </div>
        </div>
      )}
      <button className={styles.chatToggle} onClick={()=>setOpen(o=>!o)} aria-label="Chat">
        {open
          ?<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          :<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>
    </div>
  );
}

/* ══════════════════════════════════
   MAIN
   ══════════════════════════════════ */
export default function Portfolio() {
  const eyP=useVis(); const ttP=useVis();
  const eyE=useVis(); const ttE=useVis();
  const eyS=useVis(); const ttS=useVis();
  const eyEd=useVis();const ttEd=useVis();
  const eyPub=useVis();const ttPub=useVis();
  const ctH=useVis();

  return (
    <div className={styles.wrap}>
      {/* ── STATS ── */}
      <div className={styles.statsWrap}>
        <div className={styles.statsGrid}>
          {STATS.map((s,i)=><StatItem key={s.label} stat={s} delay={i*.1}/>)}
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <section id="work" className={styles.section}>
        <div className={styles.inner}>
          <p ref={eyP} className={`${styles.eyebrow}`}>Selected Work</p>
          <h2 ref={ttP} className={styles.stitle}>Projects<span className={styles.stitleAccent}>& builds</span></h2>
          <div className={styles.bentoGrid}>
            {PROJECTS.map((p,i)=>(
              <RevCard key={p.name} className={`${styles.bCard} ${styles[`bSpan${p.span}`]}`} style={{'--d':`${i*.1}s`,'--glow':p.glow}}>
                <span className={styles.bBadge} style={{color:p.color,borderColor:p.color}}>{p.status}</span>
                <h3 className={styles.bName}>{p.name}</h3>
                <p className={styles.bTagline}>{p.tagline}</p>
                {p.desc&&<p className={styles.bDesc}>{p.desc}</p>}
                <ul className={styles.bPoints}>{p.points.map((pt,j)=><li key={j}>{pt}</li>)}</ul>
                <div className={styles.bStack}>{p.stack.map(s=><span key={s} className={styles.bPill}>{s}</span>)}</div>
                <span className={styles.bPeriod}>{p.period}</span>
              </RevCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className={styles.section}>
        <div className={styles.inner}>
          <p ref={eyE} className={styles.eyebrow}>Career</p>
          <h2 ref={ttE} className={styles.stitle}>Work<span className={styles.stitleAccent}>experience</span></h2>
          <div className={styles.timeline}>
            {EXPERIENCE.map((e,i)=>(
              <RevCard key={e.company} className={`${styles.tItem} ${styles.r}`} style={{'--d':`${i*.12}s`}}>
                <div className={styles.tMeta}>
                  <span className={styles.tPeriod}>{e.period}</span>
                  <span className={styles.tLoc}>{e.loc}</span>
                </div>
                <div className={styles.tTrack}>
                  <div className={styles.tDot}/>
                  <div className={styles.tLine}/>
                </div>
                <div className={styles.tBody}>
                  <h3 className={styles.tRole}>{e.role}</h3>
                  <p className={styles.tCompany}>{e.company}</p>
                  <p className={styles.tType}>{e.type}</p>
                  <ul className={styles.tPoints}>{e.points.map((pt,j)=><li key={j}>{pt}</li>)}</ul>
                  <div className={styles.tTags}>{e.tags.map(t=><span key={t} className={styles.tTag}>{t}</span>)}</div>
                </div>
              </RevCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className={styles.section}>
        <div className={styles.inner}>
          <p ref={eyS} className={styles.eyebrow}>Toolkit</p>
          <h2 ref={ttS} className={styles.stitle}>Skills<span className={styles.stitleAccent}>& stack</span></h2>
          <div className={styles.skillsOuter}>
            {SKILLS.map((sk,i)=>(
              <RevCard key={sk.cat} className={`${styles.skillCatBlock} ${styles.r}`} style={{'--d':`${i*.07}s`,'--cat-color':sk.color}}>
                <p className={styles.skillCatTitle}>{sk.cat}</p>
                <div className={styles.skillPills}>{sk.pills.map(p=><span key={p} className={styles.skillPill}>{p}</span>)}</div>
              </RevCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className={styles.section}>
        <div className={styles.inner}>
          <p ref={eyEd} className={styles.eyebrow}>Education</p>
          <h2 ref={ttEd} className={styles.stitle}>Academic<span className={styles.stitleAccent}>background</span></h2>
          <div className={styles.eduGrid}>
            {EDUCATION.map((e,i)=>(
              <RevCard key={e.deg} className={`${styles.eduCard} ${styles.r}`} style={{'--d':`${i*.1}s`,'--edu-orb':e.orb}}>
                <span className={styles.eduBadge} style={{color:e.color,borderColor:e.color}}>{e.badge}</span>
                <h3 className={styles.eduDeg}>{e.deg}</h3>
                <p className={styles.eduSchool}>{e.school}</p>
                <p className={styles.eduPeriod}>{e.period}</p>
                <p className={styles.eduDetail}>{e.detail}</p>
                {e.leadership.length>0&&(
                  <div className={styles.eduLeadership}>
                    <p className={styles.eduLeadTitle}>Leadership & Volunteering</p>
                    <ul className={styles.eduLeadList}>{e.leadership.map((l,j)=><li key={j}>{l}</li>)}</ul>
                  </div>
                )}
              </RevCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section id="publications" className={styles.section}>
        <div className={styles.inner}>
          <p ref={eyPub} className={styles.eyebrow}>Research</p>
          <h2 ref={ttPub} className={styles.stitle}>Publications</h2>
          <div className={styles.pubList}>
            {PUBLICATIONS.map((p,i)=>(
              <RevCard key={i} className={`${styles.pubCard} ${styles.r}`} style={{'--d':`${i*.1}s`}}>
                <div className={styles.pubTop}>
                  <span className={styles.pubYear}>{p.year}</span>
                  {p.link&&(
                    <a href={p.link} target="_blank" rel="noreferrer" className={styles.pubLink}>
                      View on Springer →
                    </a>
                  )}
                </div>
                <p className={styles.pubTitle}>{p.title}</p>
                <p className={styles.pubVenue}>{p.venue}</p>
                <p className={styles.pubAuthors}>{p.authors}</p>
              </RevCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={styles.section}>
        <div className={styles.inner}>
          <div ref={ctH} className={styles.contactHero}>
            <div className={styles.availBadge}><span className={styles.availDot}/><span>Open to opportunities across Australia</span></div>
            <h2 className={styles.contactBig}>Let's build<span>something great</span></h2>
            <p className={styles.contactSub}>Full-time, part-time, contracts, or collaborations in software engineering & AI. Student visa (500) — happy to discuss sponsorship or graduate pathways.</p>
          </div>
          <div className={styles.contactGrid}>
            <div className={styles.contactLeft}>
              <a href="mailto:shaambhavishaam@gmail.com" className={styles.cEmail}><span>✉</span>shaambhavishaam@gmail.com</a>
              <div className={styles.cLinks}>
                <a href="https://www.linkedin.com/in/shaambhavi-sivappugaz" target="_blank" rel="noreferrer" className={styles.cLink}>
                  <span className={styles.cLinkIcon}>in</span>LinkedIn — Shaambhavi Sivappugaz
                </a>
                <a href="https://github.com/shaambhavisivappugaz" target="_blank" rel="noreferrer" className={styles.cLink}>
                  <span className={styles.cLinkIcon}>gh</span>GitHub — shaambhavisivappugaz
                </a>
              </div>
            </div>
            <ContactForm/>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span className={styles.footerTxt}>© 2026 Shaambhavi Sivappugaz · Melbourne, Australia</span>
        <div className={styles.footerLinks}>
          <a href="mailto:shaambhavishaam@gmail.com" className={styles.footerLink}>Email</a>
          <a href="https://www.linkedin.com/in/shaambhavi-sivappugaz" target="_blank" rel="noreferrer" className={styles.footerLink}>LinkedIn</a>
          <a href="https://github.com/shaambhavisivappugaz" target="_blank" rel="noreferrer" className={styles.footerLink}>GitHub</a>
        </div>
      </footer>

      <Chatbot/>
    </div>
  );
}
