'use client'

import { useEffect, useRef } from 'react'

const VERT = `#version 300 es
in vec2 a;
out vec2 v;
void main(){ v=a*.5+.5; gl_Position=vec4(a,0,1); }`

/* ═══════════════════════════════════════════════════════════
   SOLID FRACTAL CLOUD SIMULATION
   Creates 100% solid, dense clouds that swell outwards.
   No "tunnels", no holes. Just massive, smooth fluid expansion
   with fractal edges, identical to 14islands.
   ═══════════════════════════════════════════════════════════ */
const SIM = `#version 300 es
precision highp float;
uniform sampler2D uPrev;
uniform sampler2D uTrail;
uniform float uTime;
uniform float uDt;
uniform vec2  uRes;
uniform float uHue;
in  vec2 v;
out vec4 o;

// Ashima simplex noise
vec3 mod289(vec3 x){return x-floor(x/289.)*289.;}
vec2 mod289(vec2 x){return x-floor(x/289.)*289.;}
vec3 perm(vec3 x){return mod289((x*34.+1.)*x);}
float snoise(vec2 p){
  const vec4 C=vec4(.211324865,.366025404,-.577350269,.024390244);
  vec2 i=floor(p+dot(p,C.yy)),x0=p-i+dot(i,C.xx);
  vec2 i1=x0.x>x0.y?vec2(1,0):vec2(0,1);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
  vec3 pp=perm(perm(i.y+vec3(0,i1.y,1.))+i.x+vec3(0,i1.x,1.));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m*m*m;
  vec3 xx=2.*fract(pp*.024390244)-1., h=abs(xx)-.5, ox=floor(xx+.5), a0=xx-ox;
  m*=1.79284-.85373*(a0*a0+h*h);
  return 130.*dot(m,vec3(a0.x*x0.x+h.x*x0.y, a0.yz*x12.xz+h.yz*x12.yw));
}

vec3 hsl(float h,float s,float l){
  vec3 c=clamp(abs(mod(h*6.+vec3(0,4,2),6.)-3.)-1.,0.,1.);
  return l+s*(c-.5)*(1.-abs(2.*l-1.));
}

void main(){
  vec2 tx = 1.0 / uRes;
  // [PARAMETR] t: Prędkość animacji ewoluowania szumu. Wyższe wartości = macki szybciej falują na zewnątrz.
  float t = uTime * 0.15;
  
  vec4 center = texture(uPrev, v);
  
  // 1. Color Diffusion (Slightly reduced blur to keep sharp fractal details crisp)
  vec3 rgbSum = center.rgb * center.a * 4.0;
  float aSum = center.a * 4.0;
  
  // [PARAMETR] blurRad: Promień rozmycia kolorów wewnątrz chmury. 
  // Wyższa wartość = kolory wewnątrz lepiej się mieszają (efekt mokrej akwareli).
  // Niższa wartość = ostrzejsze odcięcie i wyraźniejsze detale samego kształtu poszarpanych brzegów.
  float blurRad = 0.8;
  vec4 nL = texture(uPrev, v + vec2(-1,0)*tx*blurRad); rgbSum += nL.rgb * nL.a; aSum += nL.a;
  vec4 nR = texture(uPrev, v + vec2(1,0)*tx*blurRad); rgbSum += nR.rgb * nR.a; aSum += nR.a;
  vec4 nU = texture(uPrev, v + vec2(0,-1)*tx*blurRad); rgbSum += nU.rgb * nU.a; aSum += nU.a;
  vec4 nD = texture(uPrev, v + vec2(0,1)*tx*blurRad); rgbSum += nD.rgb * nD.a; aSum += nD.a;
  
  vec4 state = center; // preserve exact center alpha
  state.rgb = aSum > 0.001 ? (rgbSum / aSum) : center.rgb;
  
  // 2. Ridged Multifractal Noise for Sharp, Chaotic Edges
  // [PARAMETR] freq: Skala i częstotliwość detali. 
  // Wyższa (np. 10.0) = bardzo drobne, cienkie, poszarpane mikro-pęknięcia (wąskie kapilary). 
  // Niższa (np. 3.0) = gigantyczne, masywne i grube ramiona fraktali rozchodzące się po ekranie.
  float freq = 6.0; 
  float n1 = 1.0 - abs(snoise(v * freq - t * 0.15));
  float n2 = 1.0 - abs(snoise(v * freq * 2.5 + t * 0.2));
  float n3 = 1.0 - abs(snoise(v * freq * 6.0 - t * 0.25));
  float n4 = 1.0 - abs(snoise(v * freq * 15.0 + t * 0.3));
  
  // Combine octaves into a single highly detailed fractal ridge [0, 1]
  float ridge = (n1 + n2 * 0.5 + n3 * 0.25 + n4 * 0.125) / 1.875; 
  // [PARAMETR] Kontrast (pow): Decyduje o ostrości "wystrzałów" macek z obłoku.
  // Wyższa potęga (np. 5.0) = macki są jak cieniutkie błyskawice wyrzucane poza główny obszar.
  // Niższa potęga (np. 2.0) = grubsze, bardziej zaokrąglone wżery, chmura szybciej "wypełnia" braki.
  ridge = pow(ridge, 3.5);
  
  // 3. Solid Dilation with Fractal Flares
  float maxAlpha = state.a;
  vec3 maxColor = state.rgb;
  
  vec2 offsets[8] = vec2[](
    vec2(-1,0), vec2(1,0), vec2(0,-1), vec2(0,1),
    vec2(-0.7,-0.7), vec2(0.7,-0.7), vec2(-0.7,0.7), vec2(0.7,0.7)
  );
  
  // [PARAMETR] spreadRadius: Główny silnik wielkości efektu! Składa się z dwóch liczb:
  // [0.2] Wartość bazowa: Gwarantuje bardzo powolne, równomierne wypełnianie dziur od środka (żeby chmura była pełna).
  // [1.8] Mnożnik fraktalny (ridge multiplier): Jak daleko w klatce mogą wyskoczyć ostre macki.
  // * UWAGA: Zmniejszenie sumy tych liczb pomniejszy MAKSYMALNY obszar jaki zajmie tusz. 
  // * Zmniejszenie samego bazowego "0.2" mocno zwiększa wizualną nieregularność (chmura rośnie głównie wąsami).
  float spreadRadius = 0.2 + 1.8 * ridge; 
  
  for(int i=0; i<8; i++){
      vec4 neighbor = texture(uPrev, v + offsets[i] * tx * spreadRadius);
      if (neighbor.a > maxAlpha) {
          maxAlpha = neighbor.a;
          maxColor = neighbor.rgb;
      }
  }
  
  // [PARAMETR] bleedAmount: Agresywność pochłaniania krawędzi (jak mocno pcha własny kolor i gęstość).
  float bleedAmount = 0.85;
  
  if (maxAlpha > state.a) {
      if (state.a < 0.01) {
          state.rgb = maxColor;
      } else {
          state.rgb = mix(state.rgb, maxColor, bleedAmount);
      }
      state.a = mix(state.a, maxAlpha, bleedAmount);
  }
  
  // 4. Fade Out gracefully
  // [PARAMETR] Czas życia/Znikanie: Wartość 0.21 odjęta od Alphy co sekundę (uDt).
  // Zwiększenie np. do 0.28 sprawi, że cały tusz zniknie szybciej z ekranu, uniemożliwiając mu nadmierne rozrośnięcie się.
  state.a -= 0.21 * uDt; 
  state.a = clamp(state.a, 0.0, 1.0);
  
  // 5. Add Trail Input
  vec4 tr = texture(uTrail, v);
  if(tr.a > 0.01) {
      // Pobieramy barwę z uHue, więc nie ma już błędu interpolacji tęczy na krawędziach!
      // Hue jest teraz czystą, jedną liczbą matematyczną podawaną z JavaScriptu do całej klatki.
      vec3 ink = hsl(uHue, 0.95, 0.72); 
      
      // [PARAMETR] Mieszanie kolorów (Color Blending):
      // Pełne nadpisywanie nowym kolorem. Teraz nowa farba jest w 100% solidna
      // i ma zawsze ściśle jeden mocny odcień na dane uderzenie pędzla.
      state.rgb = mix(state.rgb, ink, tr.a);
      state.a = max(state.a, tr.a);
  }
  
  o = state;
}`

const DISP = `#version 300 es
precision highp float;
uniform sampler2D uTex;
in vec2 v;
out vec4 o;
void main(){ 
  vec4 s = texture(uTex, v);
  // [PARAMETR] smoothstep(min, max): Funkcja odcinająca.
  float alpha = smoothstep(0.0, 0.4, s.a);
  // Tło to #FAF8F2 (250, 248, 242) -> w przybliżeniu vec3(0.98, 0.97, 0.95)
  o = vec4(mix(vec3(0.98, 0.97, 0.95), s.rgb, alpha), 1.0); 
}`

export default function InkFluid() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cvs = ref.current
    if (!cvs) return
    const gl = cvs.getContext('webgl2', {
      alpha: true, antialias: false, depth: false, stencil: false,
      premultipliedAlpha: false, preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    })
    if (!gl) return
    const hasFloat = !!gl.getExtension('EXT_color_buffer_float')

    const sh = (t: number, s: string) => {
      const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o)
      if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) console.error('GLSL:', gl.getShaderInfoLog(o))
      return o
    }
    const pg = (vs: WebGLShader, fs: WebGLShader) => {
      const p = gl.createProgram()!; gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p)
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error('Link:', gl.getProgramInfoLog(p))
      return p
    }
    const vert = sh(gl.VERTEX_SHADER, VERT)
    const simP = pg(vert, sh(gl.FRAGMENT_SHADER, SIM))
    const dspP = pg(vert, sh(gl.FRAGMENT_SHADER, DISP))

    const loc = {
      sPrev: gl.getUniformLocation(simP, 'uPrev'), sTrail: gl.getUniformLocation(simP, 'uTrail'),
      sTime: gl.getUniformLocation(simP, 'uTime'), sDt: gl.getUniformLocation(simP, 'uDt'),
      sRes: gl.getUniformLocation(simP, 'uRes'), sHue: gl.getUniformLocation(simP, 'uHue'),
      dTex: gl.getUniformLocation(dspP, 'uTex'),
    }

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const drawQ = (p: WebGLProgram) => {
      const a = gl.getAttribLocation(p, 'a'); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    let W = 0, H = 0    // Canvas Display Size
    let fW = 0, fH = 0  // FBO Simulation Size

    type F = { fb: WebGLFramebuffer; tx: WebGLTexture }
    let fbs: F[] = []

    const mkFB = (w: number, h: number): F => {
      const tx = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, tx)
      if (hasFloat) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.FLOAT, null)
      else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const f = gl.createFramebuffer()!; gl.bindFramebuffer(gl.FRAMEBUFFER, f)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tx, 0)
      gl.clearColor(1, 1, 1, 0); gl.clear(gl.COLOR_BUFFER_BIT)
      return { fb: f, tx }
    }

    const tc = document.createElement('canvas'), ctx = tc.getContext('2d')!
    const tTex = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, tTex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 1.5)
      const nw = Math.round(cvs.clientWidth * dpr), nh = Math.round(cvs.clientHeight * dpr)
      if (nw === W && nh === H) return

      W = nw; H = nh;
      cvs.width = W; cvs.height = H;

      if (W !== fW || H !== fH) {
        fW = W; fH = H;

        const TRAIL_MAX_WIDTH = 512;
        const aspect = W / H;
        tc.width = TRAIL_MAX_WIDTH;
        tc.height = Math.round(TRAIL_MAX_WIDTH / aspect);

        fbs.forEach(f => { gl.deleteFramebuffer(f.fb); gl.deleteTexture(f.tx) })
        fbs = [mkFB(fW, fH), mkFB(fW, fH)]
      }
    }

    const brImg = new Image(); let brOK = false
    brImg.crossOrigin = 'anonymous'; brImg.onload = () => { brOK = true }
    brImg.src = '/textureBrush.png'
    const sc = document.createElement('canvas'), sctx = sc.getContext('2d')!

    function stamp(x: number, y: number, size: number, alpha: number, rot: number) {
      const bw = brOK ? (brImg.naturalWidth || 128) : 128
      const bh = brOK ? (brImg.naturalHeight || 128) : 128
      sc.width = bw; sc.height = bh; sctx.clearRect(0, 0, bw, bh)
      if (brOK) { sctx.drawImage(brImg, 0, 0, bw, bh) }
      else {
        const g = sctx.createRadialGradient(bw / 2, bh / 2, 0, bw / 2, bh / 2, bw / 2)
        g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.3, 'rgba(255,255,255,0.7)')
        g.addColorStop(1, 'rgba(255,255,255,0)'); sctx.fillStyle = g; sctx.fillRect(0, 0, bw, bh)
      }
      ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y); ctx.rotate(rot)
      ctx.drawImage(sc, -size / 2, -size / 2, size, size); ctx.restore()
    }

    interface Pt { x: number; y: number }
    const pts: Pt[] = []
    let lx = -1, ly = -1, totalDist = 0

    const dpr = () => Math.min(devicePixelRatio, 1.5)
    const dev = (cx: number, cy: number) => {
      const r = cvs.getBoundingClientRect()
      return { x: (cx - r.left) * dpr(), y: (cy - r.top) * dpr() }
    }

    // [PARAMETR] getHue: Funkcja kontrolująca ewolucję bazy koloru zależnie od przejechanego dystansu przez kursor
    const getHue = () => {
      // Bardzo mocno spowolnione przejście (0.00002 zamiast 0.00015).
      // Dzięki temu pojedyncze, nawet długie pociągnięcie pędzla będzie miało JEDEN solidny kolor.
      // Kolor będzie ewoluował bardzo powoli przy kolejnych ruchach.
      const dist = totalDist * 0.000075;
      const cycle = dist % 2.0;
      const tri = cycle > 1.0 ? 2.0 - cycle : cycle; // Odwraca przebieg przy krawędziach, żeby paleta odbijała jak ping-pong.

      // Definicja samego spektrum kolorów w HSL (zakres 0.0 do 1.0):
      // Przywróciliśmy pełne spektrum, w tym odcienie zieleni i żółci.
      // Ponieważ w shaderze podbiliśmy mocno Jasność i Nasycenie, te kolory będą 
      // teraz świecące i neonowe, a nie "palone" czy ciemne.
      return tri;
    }

    const lerp = (x0: number, y0: number, x1: number, y1: number) => {
      const d = Math.hypot(x1 - x0, y1 - y0); totalDist += d
      const scaleX = tc.width / W;
      const step = Math.max(1, Math.min(tc.width, tc.height) * 0.01)
      const n = Math.max(1, Math.ceil(d * scaleX / step))
      for (let i = 0; i <= n; i++) {
        const t = i / n
        pts.push({ x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t })
      }
    }

    const onMove = (e: MouseEvent) => {
      const p = dev(e.clientX, e.clientY)
      if (lx >= 0) lerp(lx, ly, p.x, p.y); else pts.push({ ...p })
      lx = p.x; ly = p.y
    }
    const onDown = (e: MouseEvent) => { const p = dev(e.clientX, e.clientY); lx = p.x; ly = p.y; pts.push({ ...p }) }
    const onUp = () => { lx = -1; ly = -1 }
    const onTM = (e: TouchEvent) => {
      const p = dev(e.touches[0].clientX, e.touches[0].clientY)
      if (lx >= 0) lerp(lx, ly, p.x, p.y); else pts.push({ ...p })
      lx = p.x; ly = p.y
    }
    const onTS = (e: TouchEvent) => { const p = dev(e.touches[0].clientX, e.touches[0].clientY); lx = p.x; ly = p.y; pts.push({ ...p }) }

    window.addEventListener('mousemove', onMove); 
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTM, { passive: true })
    window.addEventListener('touchstart', onTS, { passive: true })
    window.addEventListener('touchend', onUp)

    let pt2 = 0, pp = 0, raf = 0
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const t = now * 0.001
      const dt = pt2 === 0 ? 0.016 : Math.min(t - pt2, 0.1)
      pt2 = t

      resize(); if (!fbs.length) return

      ctx.clearRect(0, 0, tc.width, tc.height)

      // [PARAMETR] tipScreenSize: Wielkość "stempla" początkowego używanego jako wejście śladu, wyrażona ułamkowo (0.05 = 5% krótszego boku ekranu).
      // Im cieńsza wartość (np. 0.02), tym cieńsza linia bazowa, a chmura w mniejszym stopniu ogarnie ekran po napuchnięciu.
      const tipScreenSize = Math.min(W, H) * 0.05
      const scaleToTc = tc.width / W
      const tcTipSize = tipScreenSize * scaleToTc

      for (const p of pts) {
        const sz = tcTipSize * (0.8 + Math.random() * 0.4)
        const fx = p.x * scaleToTc
        const fy = p.y * (tc.height / H)
        stamp(fx, fy, sz, 0.8 + Math.random() * 0.2, Math.random() * Math.PI * 2)
      }
      pts.length = 0

      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tTex)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc)

      const src = pp, dst = 1 - pp
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbs[dst].fb); gl.viewport(0, 0, fW, fH)
      gl.useProgram(simP); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, fbs[src].tx)
      gl.uniform1i(loc.sPrev, 0); gl.uniform1i(loc.sTrail, 1)
      gl.uniform1f(loc.sTime, t); gl.uniform1f(loc.sDt, dt); gl.uniform2f(loc.sRes, fW, fH)
      gl.uniform1f(loc.sHue, getHue())
      drawQ(simP)

      gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, H)
      gl.useProgram(dspP); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, fbs[dst].tx)
      gl.uniform1i(loc.dTex, 0); drawQ(dspP)
      pp = dst
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove); window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp); window.removeEventListener('touchmove', onTM)
      window.removeEventListener('touchstart', onTS); window.removeEventListener('touchend', onUp)
      fbs.forEach(f => { gl.deleteFramebuffer(f.fb); gl.deleteTexture(f.tx) })
      gl.deleteTexture(tTex)
    }
  }, [])

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', cursor: 'default' }} />
}
