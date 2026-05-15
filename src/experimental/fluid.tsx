'use client'

import { useEffect, useRef } from 'react'

const VERT = `#version 300 es
in vec2 a;
out vec2 v;
void main(){ v=a*.5+.5; gl_Position=vec4(a,0,1); }`

const SIM = `#version 300 es
precision highp float;
uniform sampler2D uPrev;
uniform sampler2D uTrail;
uniform float uTime;
uniform float uDt;
uniform vec2  uRes;
in  vec2 v;
out vec4 o;

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
  vec2 tx=1./uRes;
  float t=uTime*0.04;
  float nw=snoise(v*5.+t)*0.08;

  /* ── Core: smooth 3x3 blur (V2 behavior) ── */
  vec3 core=vec3(0.); float cw=0.;
  for(int i=-1;i<=1;i++){
    for(int j=-1;j<=1;j++){
      float w=(i==0&&j==0)?4.:((abs(i)+abs(j)==1)?2.:1.);
      core+=texture(uPrev,v+vec2(float(i),float(j))*tx*2.0).rgb*w;
      cw+=w;
    }
  }
  core/=cw;

  /* ── Snowflake arms: 6 directions at 60° intervals ──
     Reaches further each step → crystalline expansion.
     Sub-branches at ±30° from each arm → fractal detail. */
  vec3 arms=vec3(0.); float aw=0.;
  float armR=5.0;
  for(int a=0;a<6;a++){
    float angle=float(a)*1.0472+nw;
    vec2 dir=vec2(cos(angle),sin(angle));

    /* main branch: 3 reach levels */
    vec3 s1=texture(uPrev,v+dir*tx*armR).rgb;
    arms+=s1*2.5; aw+=2.5;
    vec3 s2=texture(uPrev,v+dir*tx*armR*2.5).rgb;
    arms+=s2*1.2; aw+=1.2;
    vec3 s3=texture(uPrev,v+dir*tx*armR*4.5).rgb;
    arms+=s3*0.5; aw+=0.5;

    /* sub-branches at ±30° from step 2 */
    float sa1=angle+0.52, sa2=angle-0.52;
    vec2 sd1=vec2(cos(sa1),sin(sa1)), sd2=vec2(cos(sa2),sin(sa2));
    vec2 bp=dir*tx*armR*2.0;
    arms+=texture(uPrev,v+bp+sd1*tx*armR*1.5).rgb*0.6; aw+=0.6;
    arms+=texture(uPrev,v+bp+sd2*tx*armR*1.5).rgb*0.6; aw+=0.6;
  }
  arms/=aw;

  /* blend: mostly smooth core + snowflake structure */
  vec3 prev=mix(core, arms, 0.3);

  /* ── Fade toward white ── */
  prev=mix(prev, vec3(1.), 0.75*uDt);

  /* ── Trail input ── */
  vec4 tr=texture(uTrail,v);
  if(tr.a>0.005){
    vec3 ink=hsl(tr.r, 0.60, 0.60);
    prev=mix(prev,ink,tr.a);
  }

  o=vec4(prev,1.);
}`

const DISP = `#version 300 es
precision highp float;
uniform sampler2D u;
in vec2 v;
out vec4 o;
void main(){ o=texture(u,v); }`

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
            sRes: gl.getUniformLocation(simP, 'uRes'), dTex: gl.getUniformLocation(dspP, 'u'),
        }
        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
        const drawQ = (p: WebGLProgram) => {
            const a = gl.getAttribLocation(p, 'a'); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
            gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0)
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }

        let W = 0, H = 0
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
            gl.clearColor(1, 1, 1, 1); gl.clear(gl.COLOR_BUFFER_BIT)
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
            W = nw; H = nh; cvs.width = W; cvs.height = H; tc.width = W; tc.height = H
            fbs.forEach(f => { gl.deleteFramebuffer(f.fb); gl.deleteTexture(f.tx) })
            fbs = [mkFB(W, H), mkFB(W, H)]
        }

        const brImg = new Image(); let brOK = false
        brImg.crossOrigin = 'anonymous'; brImg.onload = () => { brOK = true }
        brImg.src = '/textureBrush.png'
        const sc = document.createElement('canvas'), sctx = sc.getContext('2d')!

        function stamp(x: number, y: number, size: number, hue: number, alpha: number, rot: number) {
            const bw = brOK ? (brImg.naturalWidth || 128) : 128
            const bh = brOK ? (brImg.naturalHeight || 128) : 128
            sc.width = bw; sc.height = bh; sctx.clearRect(0, 0, bw, bh)
            if (brOK) { sctx.drawImage(brImg, 0, 0, bw, bh) }
            else {
                const g = sctx.createRadialGradient(bw / 2, bh / 2, 0, bw / 2, bh / 2, bw / 2)
                g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.4, 'rgba(255,255,255,0.7)')
                g.addColorStop(1, 'rgba(255,255,255,0)'); sctx.fillStyle = g; sctx.fillRect(0, 0, bw, bh)
            }
            sctx.globalCompositeOperation = 'source-in'
            sctx.fillStyle = `rgb(${Math.round(hue * 255)},0,0)`
            sctx.fillRect(0, 0, bw, bh); sctx.globalCompositeOperation = 'source-over'
            ctx.save(); ctx.globalAlpha = alpha; ctx.translate(x, y); ctx.rotate(rot)
            ctx.drawImage(sc, -size / 2, -size / 2, size, size); ctx.restore()
        }

        /* ── cursor with cumulative distance → hue red→purple ── */
        interface Pt { x: number; y: number; hue: number }
        const pts: Pt[] = []
        let lx = -1, ly = -1, totalDist = 0

        const dpr = () => Math.min(devicePixelRatio, 1.5)
        const dev = (cx: number, cy: number) => {
            const r = cvs.getBoundingClientRect()
            return { x: (cx - r.left) * dpr(), y: (cy - r.top) * dpr() }
        }
        const getHue = () => (totalDist * 0.00012) % 0.78

        const lerp = (x0: number, y0: number, x1: number, y1: number) => {
            const d = Math.hypot(x1 - x0, y1 - y0); totalDist += d
            const step = Math.max(3, Math.min(W, H) * 0.004)
            const n = Math.max(1, Math.ceil(d / step))
            for (let i = 0; i <= n; i++) {
                const t = i / n
                pts.push({ x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t, hue: getHue() })
            }
        }

        const onMove = (e: MouseEvent) => {
            const p = dev(e.clientX, e.clientY)
            if (lx >= 0) lerp(lx, ly, p.x, p.y); else pts.push({ ...p, hue: getHue() })
            lx = p.x; ly = p.y
        }
        const onDown = (e: MouseEvent) => { const p = dev(e.clientX, e.clientY); lx = p.x; ly = p.y; pts.push({ ...p, hue: getHue() }) }
        const onUp = () => { lx = -1; ly = -1 }
        const onTM = (e: TouchEvent) => {
            e.preventDefault(); const p = dev(e.touches[0].clientX, e.touches[0].clientY)
            if (lx >= 0) lerp(lx, ly, p.x, p.y); else pts.push({ ...p, hue: getHue() })
            lx = p.x; ly = p.y
        }
        const onTS = (e: TouchEvent) => { const p = dev(e.touches[0].clientX, e.touches[0].clientY); lx = p.x; ly = p.y; pts.push({ ...p, hue: getHue() }) }

        cvs.addEventListener('mousemove', onMove); cvs.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup', onUp)
        cvs.addEventListener('touchmove', onTM, { passive: false })
        cvs.addEventListener('touchstart', onTS, { passive: false })
        cvs.addEventListener('touchend', onUp)

        let pt2 = 0, pp = 0, raf = 0
        const frame = (now: number) => {
            raf = requestAnimationFrame(frame)
            const t = now * 0.001, dt = Math.min(t - (pt2 || t), 0.1); pt2 = t
            resize(); if (!fbs.length) return

            ctx.clearRect(0, 0, W, H)
            const tipSize = Math.min(W, H) * 0.04
            for (const p of pts) {
                const sz = tipSize * (0.7 + Math.random() * 0.6)
                stamp(p.x, p.y, sz, p.hue, 0.45 + Math.random() * 0.35, Math.random() * Math.PI * 2)
            }
            pts.length = 0

            gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tTex)
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, tc)

            const src = pp, dst = 1 - pp
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbs[dst].fb); gl.viewport(0, 0, W, H)
            gl.useProgram(simP); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, fbs[src].tx)
            gl.uniform1i(loc.sPrev, 0); gl.uniform1i(loc.sTrail, 1)
            gl.uniform1f(loc.sTime, t); gl.uniform1f(loc.sDt, dt); gl.uniform2f(loc.sRes, W, H)
            drawQ(simP)

            gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, W, H)
            gl.useProgram(dspP); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, fbs[dst].tx)
            gl.uniform1i(loc.dTex, 0); drawQ(dspP)
            pp = dst
        }
        raf = requestAnimationFrame(frame)

        return () => {
            cancelAnimationFrame(raf)
            cvs.removeEventListener('mousemove', onMove); cvs.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup', onUp); cvs.removeEventListener('touchmove', onTM)
            cvs.removeEventListener('touchstart', onTS); cvs.removeEventListener('touchend', onUp)
            fbs.forEach(f => { gl.deleteFramebuffer(f.fb); gl.deleteTexture(f.tx) })
            gl.deleteTexture(tTex)
        }
    }, [])

    return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', cursor: 'crosshair' }} />
}
