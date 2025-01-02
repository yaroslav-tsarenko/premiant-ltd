"use client";

import React, { useEffect } from 'react';

const LenisScriptLoader: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/gh/studio-freight/lenis@0.2.28/bundled/lenis.js";
        script.async = true;
        script.onload = () => {
            const lenis = new (window as any).Lenis({
                duration: 1.7,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });

            lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
                console.log({ scroll, limit, velocity, direction, progress });
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);
        };
        document.body.appendChild(script);
    }, []);

    return null;
};

export default LenisScriptLoader;