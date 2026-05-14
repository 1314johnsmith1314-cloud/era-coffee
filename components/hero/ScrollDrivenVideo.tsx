'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextOverlay } from './TextOverlay';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PART_DURATION_FALLBACK = 15;

export function ScrollDrivenVideo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const lastEmittedProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const [progress, setProgress] = useState(0);
  const [videosReady, setVideosReady] = useState(false);
  const [activePart, setActivePart] = useState<1 | 2>(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    let loaded1 = false;
    let loaded2 = false;

    const checkReady = () => {
      if (loaded1 && loaded2) {
        setVideosReady(true);
      }
    };

    const onMeta1 = () => {
      loaded1 = true;
      checkReady();
    };
    const onMeta2 = () => {
      loaded2 = true;
      checkReady();
    };

    if (v1.readyState >= 1) {
      onMeta1();
    } else {
      v1.addEventListener('loadedmetadata', onMeta1, { once: true });
    }
    if (v2.readyState >= 1) {
      onMeta2();
    } else {
      v2.addEventListener('loadedmetadata', onMeta2, { once: true });
    }

    const primeVideos = async () => {
      try {
        await Promise.all([v1.play(), v2.play()]);
      } catch {
      } finally {
        v1.pause();
        v2.pause();
        v1.currentTime = 0;
        v2.currentTime = 0;
      }
    };
    primeVideos();

    return () => {
      v1.removeEventListener('loadedmetadata', onMeta1);
      v2.removeEventListener('loadedmetadata', onMeta2);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      const v1 = video1Ref.current;
      const v2 = video2Ref.current;
      v1?.play().catch(() => {});
      const handleEnded = () => {
        setActivePart(2);
        v2?.play().catch(() => {});
      };
      v1?.addEventListener('ended', handleEnded);
      return () => v1?.removeEventListener('ended', handleEnded);
    }

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: false,
      onUpdate: (self) => {
        targetProgressRef.current = self.progress;
      },
    });

    const tick = () => {
      const current = progressRef.current;
      const target = targetProgressRef.current;
      const diff = target - current;
      const next = Math.abs(diff) < 0.0004 ? target : current + diff * 0.18;
      progressRef.current = next;

      const v1 = video1Ref.current;
      const v2 = video2Ref.current;
      const d1 = v1?.duration && Number.isFinite(v1.duration) ? v1.duration : PART_DURATION_FALLBACK;
      const d2 = v2?.duration && Number.isFinite(v2.duration) ? v2.duration : PART_DURATION_FALLBACK;
      const total = d1 + d2;
      const t = next * total;

      if (t < d1) {
        if (v1 && Math.abs(v1.currentTime - t) > 0.04) {
          try {
            v1.currentTime = Math.min(t, d1 - 0.05);
          } catch {}
        }
        setActivePart((prev) => (prev === 1 ? prev : 1));
      } else {
        if (v2) {
          const t2 = Math.min(t - d1, d2 - 0.05);
          if (Math.abs(v2.currentTime - t2) > 0.04) {
            try {
              v2.currentTime = Math.max(0, t2);
            } catch {}
          }
        }
        setActivePart((prev) => (prev === 2 ? prev : 2));
      }

      if (progressBarRef.current) {
        progressBarRef.current.style.height = `${Math.max(0, Math.min(next * 100, 100))}%`;
      }

      if (Math.abs(next - lastEmittedProgressRef.current) > 0.008 || next === target) {
        lastEmittedProgressRef.current = next;
        setProgress(next);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      st.kill();
    };
  }, [videosReady]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '1000vh' }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-era-dark"
      >
        <video
          ref={video1Ref}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: activePart === 1 ? 1 : 0, willChange: 'opacity' }}
          src="/videos/hero-part-1.mp4"
          muted
          playsInline
          {...{ 'webkit-playsinline': 'true' }}
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
          disableRemotePlayback
        />
        <video
          ref={video2Ref}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: activePart === 2 ? 1 : 0, willChange: 'opacity' }}
          src="/videos/hero-part-2.mp4"
          muted
          playsInline
          {...{ 'webkit-playsinline': 'true' }}
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
          disableRemotePlayback
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(26,26,46,0.25) 0%, rgba(26,26,46,0) 30%, rgba(26,26,46,0) 60%, rgba(26,26,46,0.55) 100%)',
          }}
        />

        <TextOverlay progress={progress} />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.3em]">Скролл</span>
          <div className="w-px h-12 bg-white/30 overflow-hidden relative">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 w-full bg-era-gold"
              style={{ height: '0%', willChange: 'height' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
