'use client';
import { useEffect, useRef } from 'react';

export default function CinematicLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let THREE, renderer, scene, camera, particles, animId;
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

    const init = async () => {
      THREE = await import('three');
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      const count = window.innerWidth < 768 ? 300 : 600;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const sz  = new Float32Array(count);
      const sp  = new Float32Array(count);
      const off = new Float32Array(count);
      const ini = new Float32Array(count * 3);

      // Blue / cyan / white palette
      const blue  = new THREE.Color(0x4f8ef7);
      const cyan  = new THREE.Color(0x7dd3fc);
      const white = new THREE.Color(0xe0eeff);
      const indigo= new THREE.Color(0x818cf8);

      for (let i = 0; i < count; i++) {
        pos[i*3]   = ini[i*3]   = (Math.random() - 0.5) * 14;
        pos[i*3+1] = ini[i*3+1] = (Math.random() - 0.5) * 8;
        pos[i*3+2] = ini[i*3+2] = (Math.random() - 0.5) * 6;
        const r = Math.random();
        const c = r < 0.4 ? blue : r < 0.65 ? cyan : r < 0.85 ? white : indigo;
        col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
        sz[i]  = Math.random() * 5 + 1.5;
        sp[i]  = Math.random() * 0.3 + 0.04;
        off[i] = Math.random() * Math.PI * 2;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      geo.setAttribute('size',     new THREE.BufferAttribute(sz,  1));

      const tc = document.createElement('canvas'); tc.width = tc.height = 64;
      const cx = tc.getContext('2d');
      const gr = cx.createRadialGradient(32,32,0,32,32,32);
      gr.addColorStop(0,   'rgba(255,255,255,1)');
      gr.addColorStop(0.3, 'rgba(120,180,255,0.5)');
      gr.addColorStop(1,   'rgba(0,0,0,0)');
      cx.fillStyle = gr; cx.fillRect(0,0,64,64);

      const mat = new THREE.PointsMaterial({
        size: 0.07, map: new THREE.CanvasTexture(tc),
        vertexColors: true, blending: THREE.AdditiveBlending,
        transparent: true, opacity: 0.7, depthWrite: false, sizeAttenuation: true,
      });

      particles = new THREE.Points(geo, mat);
      particles.userData = { sp, off, ini };
      scene.add(particles);

      const onMouse = e => { mouseX = (e.clientX/innerWidth-.5)*2; mouseY = -(e.clientY/innerHeight-.5)*2; };
      const onTouch = e => { if(e.touches[0]){mouseX=(e.touches[0].clientX/innerWidth-.5)*2;mouseY=-(e.touches[0].clientY/innerHeight-.5)*2;}};
      const onResize = () => { camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); };
      window.addEventListener('mousemove', onMouse);
      window.addEventListener('touchmove', onTouch, { passive: true });
      window.addEventListener('resize', onResize);

      let t = 0;
      const loop = () => {
        animId = requestAnimationFrame(loop);
        t += 0.003;
        const p = particles.geometry.attributes.position.array;
        const { sp: s, off: o, ini: n } = particles.userData;
        for (let i = 0; i < count; i++) {
          p[i*3+1] = n[i*3+1] + Math.sin(t*s[i]+o[i]) * 0.3;
          p[i*3]   = n[i*3]   + Math.cos(t*s[i]*0.7+o[i]) * 0.12;
        }
        particles.geometry.attributes.position.needsUpdate = true;
        targetX += (mouseX - targetX) * 0.025;
        targetY += (mouseY - targetY) * 0.025;
        camera.position.x = targetX * 0.35;
        camera.position.y = targetY * 0.2;
        camera.lookAt(scene.position);
        particles.rotation.z = t * 0.01;
        renderer.render(scene, camera);
      };
      loop();

      return () => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('touchmove', onTouch);
        window.removeEventListener('resize', onResize);
      };
    };

    const cleanup = init();
    return () => {
      cancelAnimationFrame(animId);
      renderer?.dispose();
      particles?.geometry.dispose();
      particles?.material.dispose();
      cleanup.then(fn => fn?.());
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0 }} />;
}
