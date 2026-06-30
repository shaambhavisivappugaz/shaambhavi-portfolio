'use client';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Portfolio.module.css';

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
    name:'Apgar Score Prediction using Machine Learning',
    period:'Jan 2023 – Apr 2023',
    status:'Published · Springer 2024',
    tagline:'Predictive modeling for neonatal health assessment',
    points:[
      'Designed an ML-based system to predict Apgar scores — a clinical measure of newborn well-being assessed at 1 and 5 minutes after birth across heartbeat, reflexes, color, muscle tone, and respiration.',
      'Benchmarked 13 machine learning algorithms to identify the best-performing model for R² score optimisation, with a hybrid approach achieving 96.5% R².',
      'Applied feature engineering and data preprocessing techniques to improve model accuracy and reliability on healthcare data.',
      'Developed a Flask-based web application to integrate the trained model for real-time score prediction.',
      'Findings contribute to neonatal research, supporting better-informed clinical decision-making for at-risk infants, including preterm and congenital-anomaly populations.',
      'Published in Springer WREC 2023 proceedings.',
    ],
    stack:['Python','Flask','Scikit-learn','Feature Engineering','Machine Learning'],
    color:'#34d399', glow:'rgba(52,211,153,.12)', span:'6',
  },
  {
    name:'Malware Classification using Deep Learning',
    period:'2023',
    status:'Published · Springer CVR 2023',
    tagline:'Comparative analysis of CNN, Random Forest, and Decision Tree for malware detection',
    points:[
      'Built and evaluated an ensemble-inspired classification approach combining CNN, Random Forest, and Decision Tree models to detect and categorise malware across compiled and assembly-level files.',
      'Trained models on malware image and classifier datasets sourced from Kaggle, benchmarking performance across architectures.',
      'Achieved 95.19% training / 99.89% testing accuracy with CNN, outperforming Random Forest (91.62% / 99.36%) and Decision Tree (92% / 99.13%).',
      'Demonstrated CNN\'s superiority for image-based malware datasets, offering anti-malware practitioners a flexible, computationally-aware classification framework.',
      'Extended the study to mobile malware detection, comparing SVM, Random Forest, and MLP for Android app classification using static feature extraction from app metadata.',
      'Evaluated all models on precision, recall, F1-score, and ROC-AUC to ensure robust, generalizable results, with Random Forest consistently outperforming alternatives on balanced datasets.',
      'Built a reproducible Scikit-learn pipeline enabling fair, repeatable cross-model evaluation.',
      'Published at CVR 2023, Algorithms for Intelligent Systems, Springer Singapore.',
    ],
    stack:['Python','CNN','Random Forest','Decision Tree','SVM','Neural Networks','Scikit-learn','Android Security','Research'],
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
    detail:'Full-time postgraduate program with coursework spanning software engineering, artificial intelligence, distributed data systems, and cloud computing. Building on professional experience in enterprise software development, with a focus on scalable system design, applied machine learning, and modern cloud-native architectures.',
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
    // Fallback: make visible after 2s even if IntersectionObserver doesn't fire (mobile Safari)
    const fallback=setTimeout(()=>{
      el.style.opacity='1'; el.style.transform='translateY(0)';
      setVal(target);
    },2000);
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return; obs.disconnect();
      clearTimeout(fallback);
      el.style.opacity='1'; el.style.transform='translateY(0)';
      const start=performance.now();
      const tick=(now)=>{
        const p=Math.min((now-start)/duration,1);
        const e2=p<.5?2*p*p:-1+(4-2*p)*p;
        setVal(+(e2*target).toFixed(dec));
        if(p<1) requestAnimationFrame(tick); else setVal(target);
      };
      requestAnimationFrame(tick);
    },{threshold:0.1});
    obs.observe(el); return ()=>{obs.disconnect();clearTimeout(fallback);};
  },[target,dec,duration]);
  return {val,ref};
}


function StatItem({stat,delay}) {
  const {val,ref}=useCountUp(stat.num,stat.dec);
  return (
    <div ref={ref} className={styles.statItem} style={{'--d':`${delay}s`}}>
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

function EmailCta() {
  const email = 'shaambhavishaam@gmail.com';
  const [copied, setCopied] = useState(false);
  const handleClick = async (e) => {
    // Copy to clipboard as fallback (don't prevent default so mailto: fires)
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };
  return (
    <div>
      <div className={styles.cInfoRow}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="17" height="17"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        <a href={`mailto:${email}`} className={styles.cEmailLink} onClick={handleClick}>
          {email}
        </a>
      </div>
      {copied && <span className={styles.copiedBadge}>Copied!</span>}
    </div>
  );
}

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function ContactForm() {
  const [f,setF]=useState({name:'',email:'',subject:'',message:''});
  const [st,setSt]=useState('idle');
  const [emailErr,setEmailErr]=useState('');
  const set=k=>e=>{
    const val=e.target.value;
    setF(p=>({...p,[k]:val}));
    if(k==='email') setEmailErr(val && !isValidEmail(val) ? 'Please enter a valid email address.' : '');
  };

  const openMailto=()=>{
    const sub=encodeURIComponent(f.subject||`Portfolio message from ${f.name}`);
    const body=encodeURIComponent(`Hi Shaambhavi,\n\n${f.message}\n\nBest,\n${f.name}\n${f.email}`);
    window.location.href=`mailto:shaambhavishaam@gmail.com?subject=${sub}&body=${body}`;
  };

  const submit=async()=>{
    if(!f.name||!f.email||!f.message) return;
    if(!isValidEmail(f.email)){ setEmailErr('Please enter a valid email address.'); return; }
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
        <div className={styles.fGroup}><input className={styles.fInput} placeholder="Name" value={f.name} onChange={set('name')}/></div>
        <div className={styles.fGroup}>
          <input className={`${styles.fInput} ${emailErr ? styles.fInputErr : ''}`} type="email" placeholder="Email" value={f.email} onChange={set('email')} onBlur={()=>{ if(f.email&&!isValidEmail(f.email)) setEmailErr('Please enter a valid email address.'); }}/>
          {emailErr && <span className={styles.fErrMsg}>{emailErr}</span>}
        </div>
      </div>
      <div className={styles.fGroup}><input className={styles.fInput} placeholder="Subject" value={f.subject} onChange={set('subject')}/></div>
      <div className={styles.fGroup}><textarea className={styles.fTextarea} placeholder="Message" value={f.message} onChange={set('message')}/></div>
      <button className={styles.fBtn} onClick={submit} disabled={st==='sending'}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        {st==='sending' ? 'Sending…' : 'Send Message'}
      </button>
      <p className={styles.fResponseTime}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="13" height="13"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        Avg. response time: within 24 hours
      </p>
      {st==='success'&&<div className={styles.fOk}>✓ Sent! I'll reply within 24 hours.</div>}
      {st==='mailto' &&<div className={styles.fOk}>✓ Your email client should open now. You can also reach me directly at shaambhavishaam@gmail.com</div>}
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


export default function Portfolio() {
  const eyP=useVis(); const ttP=useVis();
  const eyE=useVis(); const ttE=useVis();
  const eyS=useVis(); const ttS=useVis();
  const eyEd=useVis();const ttEd=useVis();
  const eyPub=useVis();const ttPub=useVis();
  const ctH=useVis();

  return (
    <div className={styles.wrap}>
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

      {}
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

      {}
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

      {}
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

      {}
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

      {}
      <section id="contact" className={styles.section}>
        <div className={styles.inner}>
          <div ref={ctH} className={styles.contactHero}>
            <div className={styles.availBadge}><span className={styles.availDot}/><span>Open to opportunities across Australia</span></div>
            <h2 className={styles.contactBig}>Let's build<span>something great</span></h2>
            <p className={styles.contactSub}>Available for full-time, part-time, contract, and collaborative roles in software engineering and AI. I'm currently on a Student Visa (500) and welcome conversations about sponsorship or graduate pathway opportunities.</p>
          </div>
          <div className={styles.contactGrid}>
            <div className={styles.contactLeft}>
              <div className={styles.cInfoBlock}>
                <EmailCta/>
                <div className={styles.cInfoRow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="17" height="17"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Melbourne, Australia</span>
                </div>
              </div>
              <div className={styles.cSocials}>
                <a href="https://github.com/shaambhavisivappugaz" target="_blank" rel="noreferrer" className={styles.cSocialBtn} aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/shaambhavi-sivappugaz" target="_blank" rel="noreferrer" className={styles.cSocialBtn} aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
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
