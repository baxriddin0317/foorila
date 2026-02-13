"use client"
import React, { useEffect, useRef } from 'react';

const DonutAnimation: React.FC = () => {
  const asciiRef = useRef<HTMLPreElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    let A = 1;
    let B = 1;

    const animate = () => {
      // ASCII Animation
      if (asciiRef.current) {
        const b: string[] = [];
        const z: number[] = [];
        // Slow down rotation a bit
        A += 0.03;
        B += 0.015;

        const cA = Math.cos(A);
        const sA = Math.sin(A);
        const cB = Math.cos(B);
        const sB = Math.sin(B);

        for (let k = 0; k < 1760; k++) {
          b[k] = k % 80 === 79 ? '\n' : ' ';
          z[k] = 0;
        }

        for (let j = 0; j < 6.28; j += 0.07) {
          const ct = Math.cos(j);
          const st = Math.sin(j);
          
          for (let i = 0; i < 6.28; i += 0.02) {
            const sp = Math.sin(i);
            const cp = Math.cos(i);
            const h = ct + 2;
            const D = 1 / (sp * h * sA + st * cA + 5);
            const t = sp * h * cA - st * sA;

            const x = Math.floor(40 + 30 * D * (cp * h * cB - t * sB));
            const y = Math.floor(12 + 15 * D * (cp * h * sB + t * cB));
            const o = x + 80 * y;
            const N = Math.floor(
              8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB)
            );

            if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
              z[o] = D;
              b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
            }
          }
        }

        asciiRef.current.textContent = b.join('');
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className='flex justify-center font-mono border-t border-brand-border p-1' style={{fontFamily: "monospace"}}>
      <div>
        <pre className='text-black dark:text-white text-[10px] leading-2.5' ref={asciiRef}></pre>
      </div>
    </div>
  );
};

export default DonutAnimation;