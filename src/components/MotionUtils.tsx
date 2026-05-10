import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const ScrambleText = ({ text, delay = 0, triggerInView = true }: { text: string; delay?: number; triggerInView?: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const chars = 'X01_#@&%?[]{}<>-=+*^';

  useEffect(() => {
    if (!triggerInView) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerInView]);

  useEffect(() => {
    if (!isInView) return;

    let active = true;
    const timeout = setTimeout(() => {
      if (!active) return;
      let frame = 0;
      const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
      
      for (let i = 0; i < text.length; i++) {
        const from = '';
        const to = text[i];
        const start = Math.floor(Math.random() * 12);
        const end = start + Math.floor(Math.random() * 12) + 6;
        queue.push({ from, to, start, end });
      }

      const update = () => {
        let output = '';
        let complete = 0;
        for (let i = 0, n = queue.length; i < n; i++) {
          let { from, to, start, end, char } = queue[i];
          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = chars[Math.floor(Math.random() * chars.length)];
              queue[i].char = char;
            }
            output += char;
          } else {
            output += from;
          }
        }
        
        setDisplayText(output);
        
        if (complete < queue.length && active) {
          frame++;
          requestAnimationFrame(update);
        }
      };
      
      update();
    }, delay * 1000);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [text, delay, isInView]);

  return <span ref={containerRef}>{displayText || (isInView ? '' : text)}</span>;
};

export const TextReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <span style={{ overflow: 'hidden', display: 'inline-block' }}>
      <motion.span
        style={{ display: 'inline-block' }}
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
};
