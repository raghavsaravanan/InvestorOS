import { useEffect, useRef, useState } from 'react';
import { Italiana, Aboreto } from 'next/font/google';
import styles from '../src/styles/legion.module.css';
import Image from 'next/image';

const aboreto = Aboreto({ weight: '400', subsets: ['latin'], display: 'swap' });
const italiana = Italiana({ weight: '400', subsets: ['latin'], display: 'swap' });

const tradingTools = [
  { id: 'quantum-trader', name: 'Quantum Trader', description: 'Advanced algorithmic trading platform', previewUrl: 'https://quantum-trader-preview.com', toolUrl: 'https://quantum-trader.com', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { id: 'neural-analyzer', name: 'Neural Analyzer', description: 'AI-powered market analysis', previewUrl: 'https://neural-analyzer-preview.com', toolUrl: 'https://neural-analyzer.com', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { id: 'crystal-ball', name: 'Crystal Ball', description: 'Predictive analytics suite', previewUrl: 'https://crystal-ball-preview.com', toolUrl: 'https://crystal-ball.com', imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { id: 'golden-ratio', name: 'Golden Ratio', description: 'Fibonacci-based trading strategies', previewUrl: 'https://golden-ratio-preview.com', toolUrl: 'https://golden-ratio.com', imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { id: 'phoenix-trader', name: 'Phoenix Trader', description: 'Risk management & recovery', previewUrl: 'https://phoenix-trader-preview.com', toolUrl: 'https://phoenix-trader.com', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' },
  { id: 'oracle-suite', name: 'Oracle Suite', description: 'Comprehensive market insights', previewUrl: 'https://oracle-suite-preview.com', toolUrl: 'https://oracle-suite.com', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' }
];

export default function Legion() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isToolInterfaceOpen, setIsToolInterfaceOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const strategiesRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  function debounce(fn: (...args: any[]) => void, ms: number) {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  useEffect(() => {
    setIsNavVisible(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = debounce(() => {
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 0;
      if (scrollY < heroHeight * 0.5) {
        setCurrentSection('hero');
      } else {
        setCurrentSection('strategies');
      }
    }, 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const animationTimers = new Map<Element, NodeJS.Timeout>();
    let observer: IntersectionObserver;
    
    // Creates and configures the Intersection Observer for synchronized animations
    const createObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          // Group entries by intersection status
          const intersectingElements: Element[] = [];
          const leavingElements: Element[] = [];
          
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              intersectingElements.push(entry.target);
            } else {
              leavingElements.push(entry.target);
            }
          });
          
          // Handle elements leaving viewport
          leavingElements.forEach((element) => {
            // Clear any existing timer for this element
            if (animationTimers.has(element)) {
              clearTimeout(animationTimers.get(element)!);
              animationTimers.delete(element);
            }
            // Remove animation class to allow re-animation
            element.classList.remove(styles['animate-in']);
          });
          
          // Handle elements entering viewport - synchronize all animations
          if (intersectingElements.length > 0) {
            // Clear any existing timers for these elements
            intersectingElements.forEach((element) => {
              if (animationTimers.has(element)) {
                clearTimeout(animationTimers.get(element)!);
                animationTimers.delete(element);
              }
              // Remove animation class first to ensure clean state
              element.classList.remove(styles['animate-in']);
            });
            
            // Force a reflow to ensure animations reset properly
            (intersectingElements[0] as HTMLElement).offsetHeight;
            
            // Add animation class to ALL elements simultaneously
            requestAnimationFrame(() => {
              intersectingElements.forEach((element) => {
                element.classList.add(styles['animate-in']);
              });
            });
          }
        },
        { 
          threshold: 0.15, // Lower threshold for earlier triggering
          rootMargin: '0px 0px -50px 0px' // Trigger slightly before elements fully enter
        }
      );
    };

    createObserver();
    
    // Observe all animatable elements
    const elements = document.querySelectorAll(`
      .${styles['section-title']}, 
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
      .${styles['nav-button']}
    `);
    
    elements.forEach((el) => observer.observe(el));

    return () => {
      if (observer) {
        observer.disconnect();
      }
      // Clear any remaining timers
      animationTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Gallery drag and scroll functionality for the image track
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const track = trackRef.current;
    if (!track) return;
    // Mouse and touch event handlers for gallery drag
    const handleOnDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      track.dataset.mouseDownAt = clientX.toString();
      dragStartX.current = clientX;
      isDragging.current = false;
    };
    const handleOnUp = () => {
      if (!track) return;
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage || "0";
      dragStartX.current = null;
      setTimeout(() => { isDragging.current = false; }, 0); // reset after click
    };
    const handleOnMove = (e: MouseEvent | TouchEvent) => {
      if (!track || track.dataset.mouseDownAt === "0") return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      if (dragStartX.current !== null && Math.abs(clientX - dragStartX.current) > 8) {
        isDragging.current = true;
      }
      const mouseDelta = parseFloat(track.dataset.mouseDownAt || "0") - clientX;
      const maxDelta = window.innerWidth / 2;
      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage || "0") + percentage;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
      track.dataset.percentage = nextPercentage.toString();
      track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      }, { duration: 1200, fill: "forwards" });
      for (const image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
    };
    // Wheel event for horizontal scrolling
    const handleWheel = (e: WheelEvent) => {
      if (!track) return;
      const trackRect = track.getBoundingClientRect();
      const mouseY = e.clientY;
      if (mouseY >= trackRect.top && mouseY <= trackRect.bottom) {
        e.preventDefault();
        const scrollSpeed = 0.15;
        const delta = e.deltaX || e.deltaY;
        const currentPercentage = parseFloat(track.dataset.percentage || "0");
        const newPercentage = Math.max(Math.min(currentPercentage - (delta * scrollSpeed), 0), -100);
        track.dataset.percentage = newPercentage.toString();
        track.dataset.prevPercentage = newPercentage.toString();
        track.animate({
          transform: `translate(${newPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });
        for (const image of track.getElementsByClassName("image")) {
          image.animate({
            objectPosition: `${100 + newPercentage}% center`
          }, { duration: 1200, fill: "forwards" });
        }
      }
    };
    // Register event listeners
    window.addEventListener('mousedown', handleOnDown);
    window.addEventListener('mouseup', handleOnUp);
    window.addEventListener('mousemove', handleOnMove);
    window.addEventListener('touchstart', handleOnDown);
    window.addEventListener('touchend', handleOnUp);
    window.addEventListener('touchmove', handleOnMove);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('mousedown', handleOnDown);
      window.removeEventListener('mouseup', handleOnUp);
      window.removeEventListener('mousemove', handleOnMove);
      window.removeEventListener('touchstart', handleOnDown);
      window.removeEventListener('touchend', handleOnUp);
      window.removeEventListener('touchmove', handleOnMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Handles closing the tool interface and returning to the gallery
  const handleBack = () => {
    setIsToolInterfaceOpen(false);
    setTimeout(() => {
      setActiveTool(null);
    }, 800);
  };

  // Smoothly scrolls to a section (hero or strategies)
  const scrollToSection = (section: string) => {
    if (typeof window === 'undefined') return;
    const restoreBehavior = () => setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'auto';
    }, 1000);
    document.documentElement.style.scrollBehavior = 'smooth';

    if (section === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      restoreBehavior();
      return;
    }

    if (section === 'strategies' && sectionTitleRef.current) {
      const navOffset = 85;
      const rect = sectionTitleRef.current.getBoundingClientRect();
      const absoluteTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
      const targetTop = Math.max(absoluteTop - navOffset, 0);
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
      restoreBehavior();
    }
  };

  // Find the currently active tool's data
  const activeToolData = activeTool ? tradingTools.find(tool => tool.id === activeTool) : null;

  return (
    <div className={styles['legion-container']}>
      {/* Animated Background */}
      <div className={styles['animated-bg']}></div>

      {/* Particle Effect */}
      <div className={styles['particles']}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles['particle']} style={{
            '--delay': `${i * 0.1}s`,
            '--duration': `${2 + Math.random() * 3}s`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`,
          } as React.CSSProperties}></div>
        ))}
      </div>

      {/* Enhanced Sticky Navigation */}
      <nav 
        className={`${styles['sticky-nav']} ${isLoaded ? styles['nav-load-in'] : ''} ${styles['nav-visible']}`} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(44, 24, 16, 0.95)',
          backdropFilter: 'blur(15px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 80,
          padding: '0 40px',
          borderBottom: '1px solid rgba(205, 133, 63, 0.4)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: 'translateY(0)',
          opacity: 1,
        }}
      >
        {/* Left Menu Items */}
        <div className={`${styles['nav-left']} ${isLoaded ? styles['nav-left-load-in'] : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            onClick={() => scrollToSection('hero')} 
            className={`${styles['nav-button']} ${aboreto.className} ${isLoaded ? styles['nav-btn-1-load-in'] : ''}`}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: currentSection === 'hero' ? '#b08d57' : '#e6d7c3', 
              fontSize: 16, 
              cursor: 'pointer', 
              letterSpacing: '0.1em',
              padding: '12px 20px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              fontWeight: 500,
              fontFamily: 'Aboreto, serif',
              pointerEvents: 'auto',
              userSelect: 'auto',
            }}
          >
            Home
          </button>
        </div>

        {/* Centered Logo */}
        <div 
          className={`${styles['nav-center']} ${isLoaded ? styles['nav-center-load-in'] : ''}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            className={`${styles['logo-shine']} ${italiana.className} ${isLoaded ? styles['logo-load-in'] : ''}`}
            style={{
              fontSize: '2.2rem',
              cursor: 'pointer',
              color: '#CEAD41',
            }}
            onClick={() => window.open('/', '_blank')}
          >
            InvestorOS
          </span>
          <span
            className={styles['nav-separator-animated']}
            aria-hidden="true"
            style={{ display: 'inline-block', margin: '0 18px', height: '2.1rem', width: '2px', background: 'linear-gradient(180deg, #b08d57 0%, #d2b48c 100%)', borderRadius: '2px', opacity: 0.85, verticalAlign: 'middle' }}
          />
          <span
            className={`${styles['logo-shine']} ${aboreto.className} ${isLoaded ? styles['logo-load-in'] : ''}`}
            style={{
              fontSize: '2.2rem',
              cursor: 'pointer',
              fontFamily: 'Aboreto, serif',
            }}
            onClick={() => scrollToSection('hero')}
          >
            Legion
          </span>
        </div>

        {/* Right Menu Items */}
        <div className={`${styles['nav-right']} ${isLoaded ? styles['nav-right-load-in'] : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            onClick={() => scrollToSection('strategies')}
            className={`${styles['nav-button']} ${aboreto.className} ${isLoaded ? styles['nav-btn-2-load-in'] : ''}`}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: currentSection === 'strategies' ? '#b08d57' : '#e6d7c3', 
              fontSize: 16, 
              cursor: 'pointer', 
              letterSpacing: '0.1em',
              padding: '12px 20px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              fontWeight: 500,
              fontFamily: 'Aboreto, serif',
            }}
          >
            Strategies
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className={styles['content-wrapper']}>
        {/* Hero Section */}
        <section ref={heroRef} className={`${styles['hero-section']} ${isLoaded ? styles['hero-load-in'] : ''}`}>
          <h1
            className={`${styles['hero-title']} ${styles['title-shine']} ${aboreto.className} ${isLoaded ? styles['title-load-in'] : ''}`}
            style={{ fontSize: 125, letterSpacing: '0.1em', margin: 0, color: '#b08d57', fontWeight: 400, fontFamily: 'Aboreto, serif' }}
          >
            Legion
          </h1>
          <p
            className={`${styles['hero-subtitle']} ${styles['tagline-shine']} ${aboreto.className} ${isLoaded ? styles['tagline-load-in'] : ''}`}
            style={{ fontSize: 25, color: '#e6d7c3', marginTop: 18, marginBottom: 40, letterSpacing: '0.12em', fontFamily: 'Aboreto, serif' }}
          >
            A Suite of Quantitative Strategies
          </p>
          
          {/* Scroll Indicator */}
          <div className={`${styles['scroll-indicator']} ${isLoaded ? styles['button-load-in'] : ''}`}>
            <div className={styles['scroll-arrow']}></div>
          </div>
        </section>

        {/* Quantitative Strategies Section */}
        <section ref={strategiesRef} className={styles['strategies-section']}>
          <h2 ref={sectionTitleRef} className={`${styles['section-title']} ${styles['title-shine']} ${aboreto.className}`}>
            Quantitative Strategies
          </h2>
          <p className={`${styles['section-subtitle']} ${styles['tagline-shine']} ${aboreto.className}`}
            style={{ fontFamily: 'Aboreto, serif' }}>
            Explore our comprehensive suite of advanced trading tools and algorithms
          </p>



          {/* Gallery Container */}
          <div className={styles['gallery-container']}>
            <div 
              id="image-track" 
              ref={trackRef} 
              data-mouse-down-at="0" 
              data-prev-percentage="0"
            >
              {/* First image - Demand Zone Analyzer */}
              <div 
                className="image" 
                onClick={() => window.open('/demand-zone-analyzer', '_blank')}
                style={{
                  width: 400,
                  height: 560,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '18px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  marginRight: '12px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(205, 133, 63, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Overlay with tool name */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(44, 24, 16, 0.9))',
                  padding: '24px',
                  color: '#b08d57',
                  fontFamily: 'Italiana, serif',
                  fontSize: '24px',
                  fontWeight: '400',
                  textAlign: 'center',
                  letterSpacing: '0.1em'
                }}>
                  Demand Zone Analyzer
                </div>
                
                {/* Hover overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(205, 133, 63, 0.1)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#b08d57',
                  fontSize: '18px',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}>
                  Click to Open Tool
                </div>
              </div>
              {/* Remaining gallery images */}
              <Image className="image" src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Gallery 3" width={400} height={560} draggable={false} />
              <Image className="image" src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Gallery 4" width={400} height={560} draggable={false} />
              <Image className="image" src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Gallery 5" width={400} height={560} draggable={false} />
              <Image className="image" src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80" alt="Gallery 6" width={400} height={560} draggable={false} />
              <Image className="image" src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80" alt="Gallery 7" width={400} height={560} draggable={false} />
              <Image className="image" src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Gallery 8" width={400} height={560} draggable={false} />
            </div>
          </div>
        </section>
      </div>

      {/* Tool Interface */}
      {isToolInterfaceOpen && activeToolData && (
        <div className={`${styles['tool-interface']} ${isToolInterfaceOpen ? styles.active : ''}`}>
          {/* Tool Header */}
          <div className={styles['tool-header']}>
            <button className={styles['back-button']} onClick={handleBack}>
              <div className={styles['back-arrow']}></div>
              Back to Gallery
            </button>
            <div className={`${styles['tool-title']} ${aboreto.className}`}>
              {activeToolData.name}
            </div>
          </div>

          {/* Tool Content */}
          <div className={styles['tool-content']}>
            {/* isLoading state was removed, so this will always render the iframe */}
            <iframe
              src={activeToolData.toolUrl}
              style={{ width: '100%', height: '100%', border: 'none', background: '#2c1810', color: '#a67c52' }}
              title={activeToolData.name}
            />
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Aboreto, serif';
          background: #2c1810;
          overflow-x: hidden;
        }
        
        * {
          box-sizing: border-box;
        }
        
        #image-track {
          display: flex;
          gap: 4vmin;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(0%, -50%);
          user-select: none;
        }
        
        #image-track > .image {
          width: 40vmin;
          height: 56vmin;
          object-fit: cover;
          object-position: 100% center;
        }
      `}</style>
    </div>
  );
}