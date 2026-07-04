import { useEffect, useRef, useState } from 'react';

const IMAGES = [
  {
    src: '/kiit-images/kiit1.jpg',
    label: 'KIIT University',
  },
  {
    src: '/kiit-images/kiit2.png',
    label: 'I ❤️ KIIT',
  },
  {
    src: '/kiit-images/kiit3.png',
    label: 'KIIT Logo',
  },
  {
    src: '/kiit-images/kiit4.jpg',
    label: 'Campus Aerial View',
  },
];

const RADIUS = 220;   // px — distance from center to card face
const CARD_W = 200;   // card width
const CARD_H = 140;   // card height
const AUTO_SPEED = 0.4; // degrees per frame

export default function Gallery3D() {
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const rafRef = useRef(null);
  const containerRef = useRef(null);
  const count = IMAGES.length;

  // Auto-rotate
  useEffect(() => {
    if (!dragging) {
      rafRef.current = requestAnimationFrame(function tick() {
        setAngle(a => a + AUTO_SPEED);
        rafRef.current = requestAnimationFrame(tick);
      });
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [dragging]);

  // Update active card based on angle
  useEffect(() => {
    const step = 360 / count;
    const normalized = ((angle % 360) + 360) % 360;
    const idx = Math.round(normalized / step) % count;
    setActiveIdx(idx);
  }, [angle, count]);

  const handlePointerDown = (e) => {
    setDragging(true);
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragStartAngle.current = angle;
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const delta = (x - dragStartX.current) * 0.4;
    setAngle(dragStartAngle.current - delta);
  };

  const handlePointerUp = () => setDragging(false);

  const cards = IMAGES.map((img, i) => {
    const cardAngle = (360 / count) * i;
    const rotY = cardAngle - angle;
    const rad = (rotY * Math.PI) / 180;
    const z = Math.cos(rad);           // -1 to 1 (depth)
    const scale = 0.65 + 0.35 * ((z + 1) / 2);
    const opacity = 0.35 + 0.65 * ((z + 1) / 2);
    const brightness = 0.5 + 0.5 * ((z + 1) / 2);
    const x = Math.sin(rad) * RADIUS;
    const zTrans = z * RADIUS;
    const isActive = i === activeIdx;

    return {
      img,
      i,
      rotY,
      scale,
      opacity,
      brightness,
      x,
      zTrans,
      isActive,
      z,
    };
  });

  // Sort by z so front cards render on top
  const sorted = [...cards].sort((a, b) => a.z - b.z);

  return (
    <div
      className="gallery3d-root select-none"
      style={{ width: '100%', maxWidth: 520, margin: '0 auto', position: 'relative' }}
    >
      {/* Scene container */}
      <div
        ref={containerRef}
        className="gallery3d-scene"
        style={{
          width: CARD_W + RADIUS * 2 + 40,
          height: CARD_H + 80,
          margin: '0 auto',
          position: 'relative',
          perspective: '900px',
          cursor: dragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={e => handlePointerDown(e.touches[0])}
        onTouchMove={e => handlePointerMove(e.touches[0])}
        onTouchEnd={handlePointerUp}
      >
        {/* Ground reflection glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: 40,
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.2) 0%, transparent 70%)',
            filter: 'blur(6px)',
            pointerEvents: 'none',
          }}
        />

        {/* Cards */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transformStyle: 'preserve-3d',
          }}
        >
          {sorted.map(({ img, i, x, zTrans, scale, opacity, brightness, isActive, rotY }) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: CARD_W,
                height: CARD_H,
                transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${zTrans}px) scale(${scale})`,
                transition: dragging ? 'none' : 'transform 0.05s linear',
                opacity,
                filter: `brightness(${brightness}) drop-shadow(0 ${isActive ? 20 : 8}px ${isActive ? 40 : 16}px rgba(16,185,129,${isActive ? 0.4 : 0.1}))`,
                zIndex: Math.round((zTrans + RADIUS) * 10),
                borderRadius: 16,
                overflow: 'hidden',
                border: isActive
                  ? '2px solid rgba(16,185,129,0.9)'
                  : '2px solid rgba(255,255,255,0.1)',
                boxShadow: isActive
                  ? '0 0 32px 4px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.15)'
                  : 'none',
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                  display: 'block',
                }}
                draggable={false}
              />
              {/* Label overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                  padding: '18px 10px 8px',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textAlign: 'center',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {img.label}
              </div>

              {/* Glass shimmer on active */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
        {IMAGES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to image ${i + 1}`}
            onClick={() => setAngle(-(360 / count) * i)}
            style={{
              width: i === activeIdx ? 22 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              background: i === activeIdx
                ? '#10b981'
                : 'rgba(16,185,129,0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Drag hint */}
      <p
        style={{
          textAlign: 'center',
          marginTop: 10,
          fontSize: 11,
          color: 'rgba(156,163,175,0.7)',
          letterSpacing: '0.05em',
        }}
      >
        ← drag to spin →
      </p>
    </div>
  );
}
