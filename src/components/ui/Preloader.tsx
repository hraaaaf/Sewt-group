"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg"
        >
          <SolarOrb />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SolarOrb() {
  const SIZE = 160;
  const CX = SIZE / 2;

  const rings = [
    { r: 68, sw: 1,   dash: "36 391", dur: "9s",   ccw: false, op: 0.2  },
    { r: 54, sw: 1.5, dash: "68 271", dur: "5s",   ccw: true,  op: 0.45 },
    { r: 40, sw: 2,   dash: "63 188", dur: "3s",   ccw: false, op: 0.7  },
    { r: 26, sw: 2.5, dash: "54 109", dur: "1.9s", ccw: true,  op: 1    },
  ] as const;

  return (
    <>
      <style>{`
        @keyframes _sewt_cw  { to { transform: rotate( 360deg); } }
        @keyframes _sewt_ccw { to { transform: rotate(-360deg); } }
        @keyframes _sewt_pulse {
          0%,100% { transform: scale(1);    opacity: 1;    }
          50%      { transform: scale(1.18); opacity: 0.75; }
        }
        .sewt-ring { transform-box: fill-box; transform-origin: center; }
        .sewt-core { transform-box: fill-box; transform-origin: center; }
      `}</style>

      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        fill="none"
        aria-hidden
      >
        {rings.map(({ r, sw, dash, dur, ccw, op }, i) => (
          <circle
            key={i}
            className="sewt-ring"
            cx={CX}
            cy={CX}
            r={r}
            stroke="#f28e2b"
            strokeWidth={sw}
            strokeDasharray={dash}
            strokeLinecap="round"
            opacity={op}
            style={{
              animation: `${ccw ? "_sewt_ccw" : "_sewt_cw"} ${dur} linear infinite`,
            }}
          />
        ))}

        {/* Noyau pulsant */}
        <circle
          className="sewt-core"
          cx={CX}
          cy={CX}
          r={9}
          fill="#f28e2b"
          style={{ animation: "_sewt_pulse 2.4s ease-in-out infinite" }}
        />
        {/* Reflet interne */}
        <circle cx={CX} cy={CX} r={4} fill="white" opacity={0.25} />
      </svg>
    </>
  );
}
