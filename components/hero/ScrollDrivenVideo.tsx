'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextOverlay } from './TextOverlay';
import { HERO_BLOCKS } from './heroContent';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PART_DURATION_FALLBACK = 15;
const SEEK_THRESHOLD = 0.025;
const TRANSITION_WINDOW = 0.005;

const VIDEO_URLS = [
  '/videos/hero-part-1.mp4',
  '/videos/hero-part-2.mp4',
] as const;

function computeVisibleIndex(progress: number): number | null {
  if (progress <= 0) return 0;
  if (progress >= 1) return HERO_BLOCKS.length - 1;
  const local = (progress * 10) % 1;
  if (local < TRANSITION_WINDOW || local > 1 - TRANSITION_WINDOW) return null;
  return Math.min(HERO_BLOCKS.length - 1, Math.floor(progress * 10));
}

async function fetchAsBlob(
  url: string,
  onProgress?: (loaded: number, total: number) => void,
): Promise<Blob> {
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  if (!res.body) return res.blob();
  const total = Number(res.headers.get('Content-Length')) || 0;
  const reader = res.body.getReader();
  const chunks: BlobPart[] = [];
  let loaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    loaded += value.length;
    onProgress?.(loaded, total);
  }
  return new Blob(chunks, { type: 'video/mp4' });
}

export function ScrollDrivenVideo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const lastIndexRef = useRef<number | null>(0);
  const rafRef = useRef<number | null>(null);
  const blobUrlsRef = useRef<string[]>([]);

  const [visibleIndex, setVisibleIndex] = useState<number | null>(0);
  const [videosReady, setVideosReady] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [activePart, setActivePart] = useState<1 | 2>(1);

  useEffect(() => {
    let cancelled = false;
    const totals = [0, 0];
    const loadeds = [0, 0];

    const updateProgress = () => {
      const total = totals[0] + totals[1];
      const loaded = loadeds[0] + loadeds[1];
      if (total > 0) setDownloadProgress(Math.min(1, loaded / total));
    };

    Promise.all(
      VIDEO_URLS.map((url, idx) =>
        fetchAsBlob(url, (loaded, total) => {
          loadeds[idx] = loaded;
          totals[idx] = total;
          updateProgress();
        }),
      ),
    )
      .then(async (blobs) => {
        if (cancelled) return;
        const urls = blobs.map((b) => URL.createObjectURL(b));
        blobUrlsRef.current = urls;
        setDownloadProgress(1);

        const v1 = video1Ref.current;
        const v2 = video2Ref.current;
        if (v1) v1.src = urls[0];
        if (v2) v2.src = urls[1];

        const waitForMeta = (v: HTMLVideoElement | null) =>
          new Promise<void>((resolve) => {
            if (!v) return resolve();
            if (v.readyState >= 1) return resolve();
            v.addEventListener('loadedmetadata', () => resolve(), { once: true });
          });

        await Promise.all([waitForMeta(v1), waitForMeta(v2)]);
        if (cancelled) return;

        try {
          if (v1 && v2) {
            await Promise.allSettled([v1.play(), v2.play()]);
            v1.pause();
            v2.pause();
            v1.currentTime = 0;
            v2.currentTime = 0;
          }
        } catch {}

        setVideosReady(true);
      })
      .catch((err) => {
        if (!cancelled) {
          // eslint-disable-next-line no-console
          console.error('Hero video preload failed', err);
          setVideosReady(true);
        }
      });

    return () => {
      cancelled = true;
      blobUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      blobUrlsRef.current = [];
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!videosReady) return;

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
        if (
          v1 &&
          !v1.seeking &&
          Math.abs(v1.currentTime - t) > SEEK_THRESHOLD
        ) {
          try {
            v1.currentTime = Math.min(t, d1 - 0.05);
          } catch {}
        }
        setActivePart((prev) => (prev === 1 ? prev : 1));
      } else {
        if (v2 && !v2.seeking) {
          const t2 = Math.min(t - d1, d2 - 0.05);
          if (Math.abs(v2.currentTime - t2) > SEEK_THRESHOLD) {
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

      const idx = computeVisibleIndex(next);
      if (idx !== lastIndexRef.current) {
        lastIndexRef.current = idx;
        setVisibleIndex(idx);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      st.kill();
    };
  }, [videosReady]);

  const downloadPct = Math.round(downloadProgress * 100);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '1000vh' }}>
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-era-dark"
      >
        <video
          ref={video1Ref}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: activePart === 1 && videosReady ? 1 : 0, willChange: 'opacity' }}
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
          style={{ opacity: activePart === 2 && videosReady ? 1 : 0, willChange: 'opacity' }}
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

        {!videosReady && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="text-center w-[280px] max-w-[80vw]">
              <span className="block text-era-gold font-semibold uppercase tracking-[0.3em] text-xs">
                — ERA Coffee —
              </span>
              <p className="mt-4 text-white/90 text-base font-medium">
                Подготовка анимации…
              </p>
              <div className="mt-5 h-1 rounded-full bg-white/15 overflow-hidden">
                <div
                  className="h-full bg-era-gold transition-[width] duration-200 ease-out"
                  style={{ width: `${downloadPct}%` }}
                />
              </div>
              <p className="mt-2 text-white/55 text-xs tabular-nums">
                {downloadPct}%
              </p>
            </div>
          </div>
        )}

        <TextOverlay visibleIndex={videosReady ? visibleIndex : null} />

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
