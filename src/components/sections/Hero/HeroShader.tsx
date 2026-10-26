"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const VERT = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

// Procedural mesh gradient — 4 sources solaires en orbites lentes,
// blending ambré/forêt/ivoire, noise grain, distorsion souris.
const FRAG = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_isLight;

// Palette aligned brand SEWT
const vec3 IVORY    = vec3(0.965, 0.957, 0.933);
const vec3 SAND     = vec3(0.926, 0.910, 0.863);
const vec3 AMBER    = vec3(0.910, 0.651, 0.212);
const vec3 FOREST   = vec3(0.122, 0.373, 0.227);
const vec3 CARBON   = vec3(0.039, 0.051, 0.047);
const vec3 NIGHT    = vec3(0.067, 0.086, 0.078);

// Hash for noise
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Smooth radial falloff
float source(vec2 uv, vec2 center, float radius, float falloff) {
  float d = length(uv - center);
  return pow(smoothstep(radius, 0.0, d), falloff);
}

void main() {
  vec2 uv = v_uv;
  vec2 aspectUv = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0) + 0.5;

  float t = u_time * 0.08;

  // 4 sources lumineuses en orbites lentes
  vec2 c1 = vec2(0.30 + 0.18 * sin(t * 0.7),       0.35 + 0.12 * cos(t * 0.5));
  vec2 c2 = vec2(0.72 + 0.15 * cos(t * 0.9 + 1.0), 0.28 + 0.14 * sin(t * 0.6 + 2.0));
  vec2 c3 = vec2(0.55 + 0.20 * sin(t * 0.4 + 3.0), 0.78 + 0.10 * cos(t * 0.8 + 1.5));
  vec2 c4 = vec2(0.18 + 0.14 * cos(t * 0.6 + 2.5), 0.72 + 0.13 * sin(t * 0.7 + 0.5));

  // Influence souris (gentle heat displacement)
  vec2 mouseInfl = (u_mouse - 0.5) * 0.12;
  c1 += mouseInfl * 0.4;
  c2 += mouseInfl * 0.6;

  float s1 = source(aspectUv, c1, 0.55, 1.4);
  float s2 = source(aspectUv, c2, 0.50, 1.6);
  float s3 = source(aspectUv, c3, 0.45, 1.5);
  float s4 = source(aspectUv, c4, 0.40, 1.7);

  // Base color according to theme
  vec3 base = mix(IVORY, NIGHT, u_isLight < 0.5 ? 1.0 : 0.0);
  vec3 muted = mix(SAND, CARBON, u_isLight < 0.5 ? 1.0 : 0.0);

  // Mix layers
  vec3 col = base;
  col = mix(col, AMBER, s1 * 0.32);
  col = mix(col, FOREST * (u_isLight > 0.5 ? 1.0 : 1.6), s2 * 0.18);
  col = mix(col, AMBER * 1.05, s3 * 0.22);
  col = mix(col, muted, s4 * 0.45);

  // Subtle noise grain (paper-like in light, scan-line in dark)
  float n = noise(uv * 240.0 + u_time * 0.5);
  col += (n - 0.5) * 0.015;

  // Vignette
  float v = smoothstep(1.2, 0.4, length((uv - 0.5) * vec2(1.6, 1.2)));
  col *= 0.85 + v * 0.15;

  outColor = vec4(col, 1.0);
}`;

interface HeroShaderProps {
  className?: string;
}

export function HeroShader({ className }: HeroShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) {
      // WebGL2 non disponible — fail silencieux, le bg fallback CSS prend le relais
      return;
    }

    const compileShader = (src: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(VERT, gl.VERTEX_SHADER);
    const fs = compileShader(FRAG, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIsLight = gl.getUniformLocation(program, "u_isLight");

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const t = (now - start) * 0.001;
      // Lerp souris
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      const isLight = document.documentElement.classList.contains("dark") ? 0 : 1;

      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIsLight, isLight);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      style={{ mixBlendMode: "normal" }}
    />
  );
}
