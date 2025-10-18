import { useEffect, useRef, useState } from 'react';
import styles from '../styles/legion.module.css';

// Optional: declare the fonts you plan to load via @fontsource in src/main.tsx
const FONT_DISPLAY = "'Italiana', serif";
const FONT_BODY = "'Aboreto', cursive";

type Tool = {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  toolUrl: string;
  imageUrl: string;
};

const tradingTools: Tool[] = [
  {
    id: 'quantum-trader',
    name: 'Quantum Trader',
    description: 'Advanced algorithmic trading platform',
    previewUrl: 'https://quantum-trader-preview.com',
    toolUrl: 'https://quantum-trader.com',
    imageUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'neural-analyzer',
    name: 'Neural Analyzer',
    description: 'AI-powered market analysis',
    previewUrl: 'https://neural-analyzer-preview.com',
    toolUrl: 'https://neural-analyzer.com',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'crystal-ball',
    name: 'Crystal Ball',
    description: 'Predictive analytics suite',
    previewUrl: 'https://crystal-ball-preview.com',
    toolUrl: 'https://crystal-ball.com',
    imageUrl:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'golden-ratio',
    name: 'Golden Ratio',
    description: 'Fibonacci-based trading strategies',
    previewUrl: 'https://golden-ratio-preview.com',
    toolUrl: 'https://golden-ratio.com',
    imageUrl:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'phoenix-trader',
    name: 'Phoenix Trader',
    description: 'Risk management & recovery',
    previewUrl: 'https://phoenix-trader-preview.com',
    toolUrl: 'https://phoenix-trader.com',
    imageUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 'oracle-suite',
    name: 'Oracle Suite',
    description: 'Comprehensive market insights',
    previewUrl: 'https://oracle-suite-preview.com',
    toolUrl: 'https://oracle-suite.com',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
  },
];

export default function Legion() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isToolInterfaceOpen, setIsToolInterfaceOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<'hero' | 'strategies'>('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const strategiesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 350);
    return () => clearTimeout(t);
  }, []);

  function debounce<T extends (...args: any[]) => void>(fn: T, ms: number) {
    let timer: number;
    return (...args: Parameters<T>) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => fn(...args), ms);
    };
  }

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      setCurrentSection(scrollY < heroHeight * 0.5 ? 'hero' : 'strategies');
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronized IO animations
  useEffect(() => {
    const animationTimers = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        const entering: Element[] = [];
        const leaving: Element[] = [];

        entries.forEach((entry) => {
          if (entry.isIntersecting) entering.push(entry.target);
          else leaving.push(entry.target);
        });

        leaving.forEach((el) => {
          const t = animationTimers.get(el);
          if (t) {
            clearTimeout(t);
            animationTimers.delete(el);
          }
          el.classList.remove(styles['animate-in']);
        });

        if (entering.length > 0) {
          entering.forEach((el) => {
            const t = animationTimers.get(el);
            if (t) {
              clearTimeout(t);
              animationTimers.delete(el);
            }
            el.classList.remove(styles['animate-in']);
          });

          // force reflow
          (entering[0] as HTMLElement).offsetHeight;

          requestAnimationFrame(() => {
            entering.forEach((el) => el.classList.add(styles['animate-in']));
          });
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const q = document.querySelectorAll(`.${styles['section-title']},
      .${styles['section-subtitle']},
      .${styles['scroll-animate']},
      .${styles['scroll-transition']},
      .${styles['fade-in']},
      .${styles['scale-in']},
      .${styles['slide-up']},
      .${styles['stagger-item']},
      .${styles['section-transition']},
      .${styles['text-reveal']},
      .${styles['tool-card']},
      .${styles['gallery-item']},
      .${styles['nav-button']}`);

    q.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Gallery drag/scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setDataset = (key: string, val: string) => {
      (track as any).dataset[key] = val;
    };
    const getDataset = (key: string, fallback = '0') =>
      ((track as any).dataset?.[key] as string | undefined) ?? fallback;

    const onDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      setDataset('mouseDownAt', String(clientX));
      dragStartX.current = clientX;
      isDragging.current = false;
    };
    const onUp = () => {
      setDataset('mouseDownAt', '0');
      setDataset('prevPercentage', getDataset('percentage', '0'));
      dragStartX.current = null;
      setTimeout(() => (isDragging.current = false), 0);
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (getDataset('mouseDownAt') === '0') return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

      if (dragStartX.current !== null && Math.abs(clientX - dragStartX.current) > 8) {
        isDragging.current = true;
      }

      const mouseDelta = parseFloat(getDataset('mouseDownAt')) - clientX;
      const maxDelta = window.innerWidth / 2;
      const percentage = (mouseDelta / maxDelta) * -100;
      const nextUnconstrained = parseFloat(getDataset('prevPercentage')) + percentage;
      const next = Math.max(Math.min(nextUnconstrained, 0), -100);

      setDataset('percentage', String(next));

      track.animate({ transform: `translate(${next}%, -50%)` }, { duration: 1200, fill: 'forwards' });
      for (const image of track.getElementsByClassName('image')) {
        (image as HTMLElement).animate(
          { objectPosition: `${100 + next}% center` },
          { duration: 1200, fill: 'forwards' }
        );
      }
    };

    const onWheel = (e: WheelEvent) => {
      const rect = track.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;

      e.preventDefault();
      const scrollSpeed = 0.15;
      const delta = e.deltaX || e.deltaY;
      const current = parseFloat(getDataset('percentage', '0'));
      const next = Math.max(Math.min(current - delta * scrollSpeed, 0), -100);
      setDataset('percentage', String(next));
      setDataset('prevPercentage', String(next));

      track.animate({ transform: `translate(${next}%, -50%)` }, { duration: 1200, fill: 'forwards' });
      for (const image of track.getElementsByClassName('image')) {
        (image as HTMLElement).animate(
          { objectPosition: `${100 + next}% center` },
          { duration: 1200, fill: 'forwards' }
        );
      }
    };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchend', onUp, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  const handleBack = () => {
    setIsToolInterfaceOpen(false);
    setTimeout(() => setActiveTool(null), 800);
  };

  const scrollToSection = (section: 'hero' | 'strategies') => {
    const restore = () => setTimeout(() => (document.documentElement.style.scrollBehavior = 'auto'), 1000);
    document.documentElement.style.scrollBehavior = 'smooth';

    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      restore();
      return;
    }

    if (section === 'strategies' && sectionTitleRef.current) {
      const navOffset = 85;
      const rect = sectionTitleRef.current.getBoundingClientRect();
      const absoluteTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
      const targetTop = Math.max(absoluteTop - navOffset, 0);
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      restore();
    }
  };

  const activeToolData = activeTool ? tradingTools.find((t) => t.id === activeTool) : null;

  return (
    <div className={styles['legion-container']} style={{ fontFamily: FONT_BODY }}>
      {/* Animated Background */}
      <div className={styles['animated-bg']} />

      {/* Particles */}
      <div className={styles['particles']}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles['particle']}
            style={
              {
                ['--delay' as any]: `${i * 0.1}s`,
                ['--duration' as any]: `${2 + Math.random() * 3}s`,
                ['--x' as any]: `${Math.random() * 100}%`,
                ['--y' as any]: `${Math.random() * 100}%`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Sticky Nav */}
      <nav
        className={`${styles['sticky-nav']} ${isLoaded ? styles['nav-load-in'] : ''} ${styles['nav-visible']}`}
        style={{
          position: 'fixed',
          inset: '0 0 auto 0',
          zIndex: 1000,
          background: 'rgba(44, 24, 16, 0.95)',
          backdropFilter: 'blur(15px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 80,
          padding: '0 40px',
          borderBottom: '1px solid rgba(205, 133, 63, 0.4)',
          boxShadow: '0 4px 20px rgba(0,0,0,.3)',
          transition: 'all .4s cubic-bezier(.25,.46,.45,.94)',
        }}
      >
        {/* Left */}
        <div className={`${styles['nav-left']} ${isLoaded ? styles['nav-left-load-in'] : ''}`} style={{ display: 'flex', gap: 32 }}>
          <button
            onClick={() => scrollToSection('hero')}
            className={`${styles['nav-button']}`}
            style={{
              background: 'none',
              border: 'none',
              color: currentSection === 'hero' ? '#b08d57' : '#e6d7c3',
              fontSize: 16,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              padding: '12px 20px',
              borderRadius: 6,
              transition: 'all .3s ease',
              fontFamily: FONT_BODY,
            }}
          >
            Home
          </button>
        </div>

        {/* Center */}
        <div className={`${styles['nav-center']} ${isLoaded ? styles['nav-center-load-in'] : ''}`} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', display: 'flex', gap: 12 }}>
          <span
            className={`${styles['logo-shine']} ${isLoaded ? styles['logo-load-in'] : ''}`}
            style={{ fontSize: '2.2rem', cursor: 'pointer', color: '#CEAD41', fontFamily: FONT_DISPLAY }}
            onClick={() => window.open('/', '_blank')}
          >
            InvestorOS
          </span>
          <span
            className={styles['nav-separator-animated']}
            aria-hidden="true"
            style={{ display: 'inline-block', margin: '0 18px', height: '2.1rem', width: 2, background: 'linear-gradient(180deg,#b08d57 0%,#d2b48c 100%)', borderRadius: 2, opacity: 0.85 }}
          />
          <span
            className={`${styles['logo-shine']} ${isLoaded ? styles['logo-load-in'] : ''}`}
            style={{ fontSize: '2.2rem', cursor: 'pointer', fontFamily: FONT_BODY, color: '#e6d7c3' }}
            onClick={() => scrollToSection('hero')}
          >
            Legion
          </span>
        </div>

        {/* Right */}
        <div className={`${styles['nav-right']} ${isLoaded ? styles['nav-right-load-in'] : ''}`} style={{ display: 'flex', gap: 32 }}>
          <button
            onClick={() => scrollToSection('strategies')}
            className={`${styles['nav-button']}`}
            style={{
              background: 'none',
              border: 'none',
              color: currentSection === 'strategies' ? '#b08d57' : '#e6d7c3',
              fontSize: 16,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              padding: '12px 20px',
              borderRadius: 6,
              transition: 'all .3s ease',
              fontFamily: FONT_BODY,
            }}
          >
            Strategies
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className={styles['content-wrapper']}>
        {/* Hero */}
        <section ref={heroRef} className={`${styles['hero-section']} ${isLoaded ? styles['hero-load-in'] : ''}`}>
          <h1
            className={`${styles['hero-title']} ${styles['title-shine']}`}
            style={{ fontSize: 125, letterSpacing: '0.1em', margin: 0, color: '#b08d57', fontWeight: 400, fontFamily: FONT_BODY }}
          >
            Legion
          </h1>
          <p
            className={`${styles['hero-subtitle']} ${styles['tagline-shine']}`}
            style={{ fontSize: 25, color: '#e6d7c3', marginTop: 18, marginBottom: 40, letterSpacing: '0.12em', fontFamily: FONT_BODY }}
          >
            A Suite of Quantitative Strategies
          </p>

          {/* Scroll Indicator */}
          <div className={`${styles['scroll-indicator']} ${isLoaded ? styles['button-load-in'] : ''}`}>
            <div className={styles['scroll-arrow']} />
          </div>
        </section>

        {/* Strategies */}
        <section ref={strategiesRef} className={styles['strategies-section']}>
          <h2 ref={sectionTitleRef} className={`${styles['section-title']} ${styles['title-shine']}`} style={{ fontFamily: FONT_BODY }}>
            Quantitative Strategies
          </h2>
          <p className={`${styles['section-subtitle']} ${styles['tagline-shine']}`} style={{ fontFamily: FONT_BODY }}>
            Explore our comprehensive suite of advanced trading tools and algorithms
          </p>

          {/* Gallery */}
          <div className={styles['gallery-container']}>
            <div id="image-track" ref={trackRef} data-mouse-down-at="0" data-prev-percentage="0">
              {/* First image opens analyzer */}
              <div
                className="image"
                onClick={() => window.open('/demand-zone-analyzer', '_blank')}
                style={{
                  width: 400,
                  height: 560,
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 18,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all .3s ease',
                  marginRight: 12,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(205,133,63,.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(44, 24, 16, 0.9))',
                    padding: 24,
                    color: '#b08d57',
                    fontFamily: FONT_DISPLAY,
                    fontSize: 24,
                    fontWeight: 400,
                    textAlign: 'center',
                    letterSpacing: '0.1em',
                  }}
                >
                  Demand Zone Analyzer
                </div>

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(205,133,63,0.1)',
                    opacity: 0,
                    transition: 'opacity .3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#b08d57',
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '0';
                  }}
                >
                  Click to Open Tool
                </div>
              </div>

              {/* Remaining gallery images (use <img />) */}
              <img className="image" src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="Gallery 3" width={400} height={560} draggable={false} />
              <img className="image" src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="Gallery 4" width={400} height={560} draggable={false} />
              <img className="image" src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="Gallery 5" width={400} height={560} draggable={false} />
              <img className="image" src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2134&q=80" alt="Gallery 6" width={400} height={560} draggable={false} />
              <img className="image" src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1759&q=80" alt="Gallery 7" width={400} height={560} draggable={false} />
              <img className="image" src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" alt="Gallery 8" width={400} height={560} draggable={false} />
            </div>
          </div>
        </section>
      </div>

      {/* Tool Interface (if you later wire tool cards to open) */}
      {isToolInterfaceOpen && activeToolData && (
        <div className={`${styles['tool-interface']} ${isToolInterfaceOpen ? styles.active : ''}`}>
          <div className={styles['tool-header']}>
            <button className={styles['back-button']} onClick={handleBack}>
              <div className={styles['back-arrow']} />
              Back to Gallery
            </button>
            <div className={styles['tool-title']} style={{ fontFamily: FONT_BODY }}>{activeToolData.name}</div>
          </div>
          <div className={styles['tool-content']}>
            <iframe
              src={activeToolData.toolUrl}
              style={{ width: '100%', height: '100%', border: 'none', background: '#2c1810', color: '#a67c52' }}
              title={activeToolData.name}
            />
          </div>
        </div>
      )}

      {/* Inline styles that were previously <style jsx global> */}
      <style>{`
        body { margin:0; padding:0; font-family:${FONT_BODY}; background:#2c1810; overflow-x:hidden; }
        * { box-sizing: border-box; }
        #image-track {
          display:flex;
          gap:4vmin;
          position:absolute;
          left:50%;
          top:50%;
          transform: translate(0%, -50%);
          user-select:none;
        }
        #image-track > .image {
          width:40vmin;
          height:56vmin;
          object-fit:cover;
          object-position:100% center;
        }
      `}</style>
    </div>
  );
}
