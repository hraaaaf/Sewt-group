"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SectionReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0.6, scale: 0.96, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ amount: 0.2, once: false }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
