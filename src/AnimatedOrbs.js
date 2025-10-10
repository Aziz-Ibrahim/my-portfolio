import React from 'react';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const hexToRgba = (hex, a = 1) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export default function AnimatedOrbs({ count = 120 }) {
    const theme = useMantineTheme();
    const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
    const isSmall = useMediaQuery('(max-width: 640px)');

    // smaller count on tiny screens
    const actualCount = isSmall ? Math.max(6, Math.floor(count / 2)) : count;

    const palette = React.useMemo(() => {
        const m = theme.colors['mocha-mousse'] || ['#644D45'];
        const c = theme.colors['cream-accent'] || ['#F5F5DC'];
        return [
            `radial-gradient(circle at 30% 30%, ${hexToRgba(m[6] || m[0], 0.95)} 0%, ${hexToRgba(c[2] || c[0], 0.18)} 80%)`,
            `radial-gradient(circle at 70% 40%, ${hexToRgba(c[4] || c[0], 0.92)} 0%, ${hexToRgba(m[5] || m[0], 0.12)} 80%)`,
            `radial-gradient(circle at 40% 70%, ${hexToRgba(m[7] || m[0], 0.92)} 0%, ${hexToRgba(c[3] || c[0], 0.12)} 80%)`,
            `radial-gradient(circle at 60% 60%, ${hexToRgba(c[5] || c[0], 0.88)} 0%, ${hexToRgba(m[6] || m[0], 0.18)} 80%)`,
            `radial-gradient(circle at 50% 50%, ${hexToRgba(m[4] || m[0], 0.90)} 0%, ${hexToRgba(c[4] || c[0], 0.22)} 80%)`,
            `radial-gradient(circle at 30% 70%, ${hexToRgba(c[3] || c[0], 0.88)} 0%, ${hexToRgba(m[5] || m[0], 0.18)} 80%)`,
            `radial-gradient(circle at 70% 30%, ${hexToRgba(m[5] || m[0], 0.92)} 0%, ${hexToRgba(c[2] || c[0], 0.22)} 80%)`,
        ];
    }, [theme]);

    const orbs = React.useMemo(() => {
        return Array.from({ length: actualCount }).map(() => {
            // smaller sizes and more variety
            const size = Math.round(10 + Math.random() * 30);
            const left = `${Math.round(Math.random() * 100)}%`;
            const top = `${Math.round(Math.random() * 100)}%`;
            const dur = (8 + Math.random() * 16).toFixed(1); // 8 - 24s
            const delay = (Math.random() * -8).toFixed(2);
            const tx = Math.round((Math.random() - 0.5) * 140); // horizontal drift
            const ty = Math.round((Math.random() - 0.5) * 80);  // vertical drift
            const blur = 3 + Math.round(Math.random() * 9);
            const color = palette[Math.floor(Math.random() * palette.length)];
            const opacity = 0.25 + Math.random() * 0.5;
            return { size, left, top, dur, delay, tx, ty, blur, color, opacity };
        });
    }, [actualCount, palette]);

    if (prefersReduced) return null;

    return (
        <div className="animated-orbs" aria-hidden>
            <style>{`
                .animated-orbs { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
                .animated-orbs .orb {
                    position: absolute;
                    border-radius: 50%;
                    mix-blend-mode: screen;
                    will-change: transform, opacity, filter;
                    transform: translate3d(0,0,0);
                    transition: opacity 300ms linear;
                    filter: blur(8px);
                }
                @keyframes orb-float {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    25% { transform: translate3d(calc(var(--tx) * 0.25), calc(var(--ty) * 0.25), 0) scale(1.02); }
                    50% { transform: translate3d(var(--tx), calc(var(--ty) * 0.6), 0) scale(1.06); }
                    75% { transform: translate3d(calc(var(--tx) * 0.5), calc(var(--ty) * 0.35), 0) scale(1.03); }
                    100% { transform: translate3d(0, 0, 0) scale(1); }
                }
                @keyframes orb-pulse {
                    0% { opacity: 0.95; }
                    50% { opacity: 0.55; }
                    100% { opacity: 0.95; }
                }
                /* reduce intensity on small screens */
                @media (max-width: 640px) {
                    .animated-orbs .orb { filter: blur(10px); opacity: 0.28; }
                }
            `}</style>

            {orbs.map((o, idx) => (
                <div
                    key={idx}
                    className="orb"
                    style={{
                        left: o.left,
                        top: o.top,
                        width: o.size,
                        height: o.size,
                        background: o.color,
                        opacity: o.opacity,
                        filter: `blur(${o.blur}px)`,
                        transform: 'translate3d(0,0,0)',
                        animation: `orb-float ${o.dur}s ease-in-out ${o.delay}s infinite, orb-pulse ${Math.max(4, o.dur/2)}s ease-in-out ${o.delay}s infinite`,
                        // expose custom translation values for the keyframes
                        '--tx': `${o.tx}px`,
                        '--ty': `${o.ty}px`,
                    }}
                />
            ))}
        </div>
    );
}
