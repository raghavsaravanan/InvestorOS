import React, { useState, useEffect, useRef } from 'react';
import { Italiana, Aboreto } from 'next/font/google';
import styles from '../src/styles/index.module.css';
import Navbar from '../components/Navbar';

const aboreto = Aboreto({ weight: '400', subsets: ['latin'], display: 'swap' });
const italiana = Italiana({ weight: '400', subsets: ['latin'], display: 'swap' });

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const legionRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Simple scroll handler for navigation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsNavVisible(scrollY < 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (typeof window === 'undefined' || !ref.current) return;
    const element = ref.current;
    const navOffset = 80;
    const rect = element.getBoundingClientRect();
    const absoluteTop = rect.top + (window.pageYOffset || document.documentElement.scrollTop || 0);
    const targetTop = Math.max(absoluteTop - navOffset, 0);

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
    
    // Trigger animations after a short delay to allow scroll to complete
    setTimeout(() => {
      const animatedElements = element.querySelectorAll(`.${styles['scroll-animate']}, .${styles['scroll-transition']}, .${styles['fade-in']}, .${styles['scale-in']}, .${styles['slide-up']}, .${styles['stagger-item']}, .${styles['section-transition']}, .${styles['text-reveal']}, .scroll-card, .about-stat`);
      animatedElements.forEach((el) => {
        el.classList.remove(styles['animate-in']);
        el.classList.remove(styles['scroll-animate']);
        el.classList.remove(styles['scroll-transition']);
        el.classList.remove(styles['fade-in']);
        el.classList.remove(styles['scale-in']);
        el.classList.remove(styles['slide-up']);
        el.classList.remove(styles['stagger-item']);
        el.classList.remove(styles['section-transition']);
        el.classList.remove(styles['text-reveal']);
        requestAnimationFrame(() => {
          el.classList.add(styles['animate-in']);
          el.classList.add(styles['scroll-animate']);
          el.classList.add(styles['scroll-transition']);
          el.classList.add(styles['fade-in']);
          el.classList.add(styles['scale-in']);
          el.classList.add(styles['slide-up']);
          el.classList.add(styles['stagger-item']);
          el.classList.add(styles['section-transition']);
          el.classList.add(styles['text-reveal']);
        });
      });
    }, 300);
  };

  /**
   * Scrolls to the top of the page and triggers hero section animations
   * 
   * Provides smooth navigation to the top of the page while ensuring
   * the hero section animations are properly triggered for a seamless
   * user experience.
   */
  const scrollToTop = () => {
    // Trigger hero section animations immediately
    const heroSection = document.querySelector(`.${styles['hero-load-in']}`);
    if (heroSection) {
      heroSection.classList.remove(styles['hero-load-in']);
      (heroSection as HTMLElement).offsetHeight;
      heroSection.classList.add(styles['hero-load-in']);
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  /**
   * Enhanced Intersection Observer with synchronized animations
   * 
   * Creates a unified animation system that triggers all visible elements
   * simultaneously when they enter the viewport, providing a smooth,
   * synchronized scrolling experience.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Track animation timers to prevent conflicts
    const animationTimers = new Map<Element, NodeJS.Timeout>();
    let isNavigating = false;
    let observer: IntersectionObserver;
    
    // Creates and configures the Intersection Observer for synchronized animations
    const createObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          // Skip observer during navigation to prevent conflicts
          if (isNavigating) return;
          
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
      .${styles['scroll-animate']}, 
      .${styles['scroll-transition']}, 
      .${styles['fade-in']}, 
      .${styles['scale-in']}, 
      .${styles['slide-up']}, 
      .${styles['stagger-item']}, 
      .${styles['section-transition']}, 
      .${styles['text-reveal']}, 
      .scroll-card, 
      .about-stat,
      .${styles['oracle-card']},
      .${styles['legion-card']},
      .${styles['sentinel-card']},
      .${styles['feature-action-btn']}
    `);
    
    elements.forEach((el) => observer.observe(el));

    // Expose navigation flag to global scope for button clicks
    (window as any).isNavigating = () => {
      isNavigating = true;
      // Disconnect observer during navigation
      if (observer) {
        observer.disconnect();
      }
      setTimeout(() => {
        isNavigating = false;
        // Reconnect observer after navigation
        createObserver();
        elements.forEach((el) => observer.observe(el));
      }, 2000); // Allow 2 seconds for navigation animations
    };

    return () => {
      if (observer) {
        observer.disconnect();
      }
      // Clear any remaining timers
      animationTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  /**
   * Navigation visibility logic - hide when scrolling down, show on hover at top
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let isHoveringTop = false;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Always show nav when at top of page
      if (scrollY <= 100) {
        setIsNavVisible(true);
      } else {
        // Hide nav when scrolled down, unless hovering at top
        setIsNavVisible(isHoveringTop);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const scrollY = window.scrollY;
      
      // Check if mouse is in top 80px area
      if (e.clientY <= 80 && scrollY > 100) {
        isHoveringTop = true;
        setIsNavVisible(true);
      } else if (scrollY > 100) {
        isHoveringTop = false;
        setIsNavVisible(false);
      }
    };

    const handleMouseLeave = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        isHoveringTop = false;
        setIsNavVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  /**
   * Unified opening animation - synchronized timing with premium feel
   * 
   * Triggers the initial page load animations with carefully timed
   * delays to create a premium, synchronized user experience.
   */
  useEffect(() => {
    // Trigger all opening animations with deliberate timing
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200); // Slightly longer delay for more deliberate feel

    return () => {
      clearTimeout(timer);
    };
  }, []);

  /**
   * Enhanced scroll spy for navigation with smooth transitions
   * 
   * Monitors scroll position to update active navigation state and
   * provides smooth transitions between different page sections.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Check if we're at the very top (home section)
      if (scrollPosition < 200) {
        setActiveSection('home');
        return;
      }

      const sections = [
        { id: 'features', ref: featuresRef },
        { id: 'about', ref: aboutRef },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref?.current) {
          const element = section.ref.current;
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      
      // If we're not in any specific section, default to home
      setActiveSection('home');
    };

    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className={aboreto.className} style={{ 
      background: 'linear-gradient(135deg, #261E1E 0%, #1f1818 50%, #261E1E 100%)', 
      minHeight: '100vh', 
      width: '100vw',
      margin: 0,
      padding: 0,
      left: 0,
      position: 'relative',
      overflow: 'hidden',
      cursor: 'default',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }}>
      <Navbar  />
      {/* Enhanced Sticky Navigation */}
      <nav 
        className={`${styles['sticky-nav']} ${isLoaded ? styles['nav-load-in'] : ''} ${isNavVisible ? styles['nav-visible'] : styles['nav-hidden']}`} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(38,30,30,0.95)',
          backdropFilter: 'blur(15px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 80,
          padding: '0 40px',
          borderBottom: '1px solid rgba(206, 173, 65, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: isNavVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: isNavVisible ? 1 : 0,
        }}
      >
        {/* Left Menu Items */}
        <div className={`${styles['nav-left']} ${isLoaded ? styles['nav-left-load-in'] : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button 
            onClick={() => scrollToSection(featuresRef)} 
            className={`${styles['nav-button']} ${isLoaded ? styles['nav-btn-1-load-in'] : ''}`}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeSection === 'features' ? '#CEAD41' : '#d3c6a6', 
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
            Features
          </button>
          <button 
            onClick={() => scrollToSection(aboutRef)} 
            className={`${styles['nav-button']} ${isLoaded ? styles['nav-btn-2-load-in'] : ''}`}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeSection === 'about' ? '#CEAD41' : '#d3c6a6', 
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
            About
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
          }}
          onClick={scrollToTop}
        >
          <span
            className={`${styles['logo-shine']} ${italiana.className} ${isLoaded ? styles['logo-load-in'] : ''}`}
            style={{
              fontSize: 42,
              cursor: 'pointer',
            }}
          >
            InvestorOS
          </span>
        </div>

        {/* Right Menu Items */}
        <div className={`${styles['nav-right']} ${isLoaded ? styles['nav-right-load-in'] : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        </div>
      </nav>

      {/* Navigation Hover Area - appears when nav is hidden */}
      {!isNavVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '80px',
            zIndex: 999,
            cursor: 'pointer',
            background: 'transparent',
          }}
          onMouseEnter={() => setIsNavVisible(true)}
        />
      )}

      {/* Hero Section */}
      <section className={`${styles['section-transition']} ${styles['home-animate-in']} ${isLoaded ? styles['hero-load-in'] : ''}`} style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 80 }}>
        <h1 className={`${styles['title-shine']} ${styles['text-reveal']} ${isLoaded ? styles['title-load-in'] : ''}`} style={{ fontSize: 125, letterSpacing: '0.1em', margin: 0, color: '#CEAD41', fontWeight: 400, fontFamily: 'Italiana, serif' }}>InvestorOS</h1>
        <div className={`${styles['tagline-shine']} ${styles['text-reveal']} ${isLoaded ? styles['tagline-load-in'] : ''}`} style={{ fontSize: 25, color: '#d3c6a6', marginTop: 18, marginBottom: 40, letterSpacing: '0.12em', fontFamily: 'Aboreto, serif' }}>
          Intelligence for Every Decision
        </div>
        <button
          onClick={() => scrollToSection(featuresRef)}
          className={styles['liquid-scroll']}
          style={{
            background: 'none',
            border: '2px solid #CEAD41',
            color: '#CEAD41',
            fontSize: 25,
            letterSpacing: '0.12em',
            borderRadius: 8,
            padding: '14px 48px',
            cursor: 'pointer',
            marginTop: 32,
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'Aboreto, serif',
          }}
        >
          Explore Features
        </button>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className={styles['section-transition']}
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#261E1E',
          textAlign: 'center',
          padding: 0,
        }}
      >
        <h2 className={`${styles['title-shine']} ${styles['text-reveal']}`} style={{ fontSize: 'clamp(41px, 5.5vw, 53px)', color: '#CEAD41', marginBottom: 48, letterSpacing: '0.1em', fontFamily: 'Italiana, serif', fontWeight: 400 }}>Features</h2>
        <div className={styles['features-row']} style={{ marginTop: 0 }}>
          {/* ORACLE Card */}
          <div className={`${styles['stagger-item']} ${styles['scroll-card']}`} style={{ 
            flex: 1, 
            textAlign: 'center', 
            color: '#d3c6a6', 
            padding: '40px 24px',
            background: 'linear-gradient(135deg, rgba(38, 30, 30, 0.95) 0%, rgba(206, 173, 65, 0.08) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(206, 173, 65, 0.15)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '420px',
            display: 'grid',
            gridTemplateRows: 'auto auto auto auto',
            alignItems: 'center',
            gap: '20px',
            transformStyle: 'preserve-3d',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)'
          }}
          onMouseOver={e => {
            const target = e.target as HTMLElement;
            if (!target.closest('.feature-action-btn')) {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(206, 173, 65, 0.3), 0 0 20px rgba(206, 173, 65, 0.1)';
              e.currentTarget.style.border = '1px solid rgba(206, 173, 65, 0.3)';
            }
          }}
          onMouseOut={e => {
            const target = e.target as HTMLElement;
            if (!target.closest('.feature-action-btn')) {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)';
              e.currentTarget.style.border = '1px solid rgba(206, 173, 65, 0.15)';
            }
          }}>
            <div className={styles['title-shine']} style={{ color: '#CEAD41', fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '0.15em' }}>ORACLE</div>
            <div className={styles['feature-tagline-shine']} style={{ fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '0.12em', maxWidth: 320, textAlign: 'center', wordBreak: 'break-word' }}>
              AN INTELLIGENT ASSISTANT<br />FOR ALL YOUR DECISIONS
            </div>
            <div style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '0.10em', color: '#d3c6a6', lineHeight: '1.6', maxWidth: 320 }}>
              AI-DRIVEN MARKET ANALYSIS THAT DISTILLS COMPLEX DATA INTO CLEAR, ACTIONABLE INSIGHTS—DELIVERED IN REAL TIME
            </div>
            <button className={styles['feature-action-btn']} disabled style={{ 
              width: 'auto', 
              minWidth: '220px',
              padding: '18px 38px',
              justifySelf: 'center',
              background: 'transparent',
              border: '1.5px solid rgba(206, 173, 65, 0.4)',
              borderRadius: '0px',
              color: '#CEAD41',
              fontSize: '21px',
              letterSpacing: '0.18em',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              fontFamily: 'Aboreto, serif',
              textTransform: 'uppercase',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'rgba(206, 173, 65, 0.07)';
              e.currentTarget.style.border = '1.5px solid rgba(206, 173, 65, 0.7)';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(206, 173, 65, 0.18)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.border = '1.5px solid rgba(206, 173, 65, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <span style={{ whiteSpace: 'nowrap', position: 'relative', zIndex: 2 }}>COMING SOON</span>
            </button>
          </div>

          {/* LEGION Card */}
          <div ref={legionRef} className={`${styles['stagger-item']} ${styles['scroll-card']}`} style={{ 
            flex: 1, 
            textAlign: 'center', 
            color: '#d3c6a6', 
            padding: '40px 24px',
            background: 'linear-gradient(135deg, rgba(38, 30, 30, 0.95) 0%, rgba(206, 173, 65, 0.08) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(206, 173, 65, 0.15)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '420px',
            display: 'grid',
            gridTemplateRows: 'auto auto auto auto',
            alignItems: 'center',
            gap: '20px',
            transformStyle: 'preserve-3d',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)'
          }}
          onMouseOver={e => {
            const target = e.target as HTMLElement;
            if (!target.closest('.feature-action-btn')) {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(206, 173, 65, 0.3), 0 0 20px rgba(206, 173, 65, 0.1)';
              e.currentTarget.style.border = '1px solid rgba(206, 173, 65, 0.3)';
            }
          }}
          onMouseOut={e => {
            const target = e.target as HTMLElement;
            if (!target.closest('.feature-action-btn')) {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)';
              e.currentTarget.style.border = '1px solid rgba(206, 173, 65, 0.15)';
            }
          }}>
            <div className={styles['title-shine']} style={{ color: '#CEAD41', fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '0.15em' }}>LEGION</div>
            <div className={styles['feature-tagline-shine']} style={{ fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '0.12em', maxWidth: 320, textAlign: 'center', wordBreak: 'break-word' }}>
              A SUITE OF QUANTITATIVE<br />TRADING SYSTEMS
            </div>
            <div style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '0.10em', color: '#d3c6a6', lineHeight: '1.6', maxWidth: 320 }}>
              ENHANCE YOUR TRADING DECISIONS WITH A CURATED COLLECTION OF ALGORITHMIC STRATEGIES—DESIGNED TO HELP YOU TRADE WITH CONFIDENCE
            </div>
            <a
              href="/legion"
              target="_blank"
              rel="noopener noreferrer"
              className={styles['feature-action-btn']}
              style={{ 
                width: 'auto', 
                minWidth: '220px',
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '18px 38px',
                justifySelf: 'center',
                background: 'transparent',
                border: '1.5px solid rgba(206, 173, 65, 0.4)',
                borderRadius: '0px',
                color: '#CEAD41',
                fontSize: '21px',
                letterSpacing: '0.18em',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fontFamily: 'Aboreto, serif',
                textTransform: 'uppercase',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(206, 173, 65, 0.07)';
                e.currentTarget.style.border = '1.5px solid rgba(206, 173, 65, 0.7)';
                e.currentTarget.style.boxShadow = '0 0 24px rgba(206, 173, 65, 0.18)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.border = '1.5px solid rgba(206, 173, 65, 0.4)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ whiteSpace: 'nowrap', position: 'relative', zIndex: 2 }}>LAUNCH</span>
            </a>
          </div>

          {/* SENTINEL Card */}
          <div className={`${styles['stagger-item']} ${styles['scroll-card']}`} style={{ 
            flex: 1, 
            textAlign: 'center', 
            color: '#d3c6a6', 
            padding: '40px 24px',
            background: 'linear-gradient(135deg, rgba(38, 30, 30, 0.95) 0%, rgba(206, 173, 65, 0.08) 100%)',
            borderRadius: '24px',
            border: '1px solid rgba(206, 173, 65, 0.15)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '420px',
            display: 'grid',
            gridTemplateRows: 'auto auto auto auto',
            alignItems: 'center',
            gap: '20px',
            transformStyle: 'preserve-3d',
            transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)'
          }}
          onMouseOver={e => {
            const target = e.target as HTMLElement;
            if (!target.closest('.feature-action-btn')) {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(206, 173, 65, 0.3), 0 0 20px rgba(206, 173, 65, 0.1)';
              e.currentTarget.style.border = '1px solid rgba(206, 173, 65, 0.3)';
            }
          }}
          onMouseOut={e => {
            const target = e.target as HTMLElement;
            if (!target.closest('.feature-action-btn')) {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)';
              e.currentTarget.style.border = '1px solid rgba(206, 173, 65, 0.15)';
            }
          }}>
            <div className={styles['title-shine']} style={{ color: '#CEAD41', fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '0.15em' }}>SENTINEL</div>
            <div className={styles['feature-tagline-shine']} style={{ fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '0.12em', maxWidth: 320, textAlign: 'center', wordBreak: 'break-word' }}>
              INTELLIGENT OVERSIGHT FOR<br />EVERY POSITION
            </div>
            <div style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '0.10em', color: '#d3c6a6', lineHeight: '1.6', maxWidth: 320 }}>
              REAL-TIME PORTFOLIO MONITORING, RISK ANALYSIS, AND INTELLIGENT GUIDANCE TO HELP OPTIMIZE EVERY POSITION
            </div>
            <button className={styles['feature-action-btn']} disabled style={{ 
              width: 'auto', 
              minWidth: '220px',
              padding: '18px 38px',
              justifySelf: 'center',
              background: 'transparent',
              border: '1.5px solid rgba(206, 173, 65, 0.4)',
              borderRadius: '0px',
              color: '#CEAD41',
              fontSize: '21px',
              letterSpacing: '0.18em',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              fontFamily: 'Aboreto, serif',
              textTransform: 'uppercase',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'rgba(206, 173, 65, 0.07)';
              e.currentTarget.style.border = '1.5px solid rgba(206, 173, 65, 0.7)';
              e.currentTarget.style.boxShadow = '0 0 24px rgba(206, 173, 65, 0.18)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.border = '1.5px solid rgba(206, 173, 65, 0.4)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <span style={{ whiteSpace: 'nowrap', position: 'relative', zIndex: 2 }}>COMING SOON</span>
            </button>
          </div>
        </div>
      </section>

      {/* About/Stats Section */}
      <section
        ref={aboutRef}
        className={styles['section-transition']}
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1E1A15 0%, #261E1E 50%, #1E1A15 100%)',
          textAlign: 'center',
          padding: '60px 20px',
          position: 'relative',
          overflow: 'hidden',
          opacity: 1,
          visibility: 'visible'
        }}
      >
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(206, 173, 65, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(206, 173, 65, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <h2 className={`${styles['title-shine']} ${styles['text-reveal']}`} style={{ 
          fontSize: 'clamp(42px, 5.5vw, 56px)', 
          color: '#CEAD41', 
          marginBottom: 32, 
          letterSpacing: '0.08em', 
          fontFamily: 'Italiana, serif', 
          fontWeight: 400,
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}>
          Democratizing Wall Street
        </h2>
        
        <div className={styles['text-reveal']} style={{ 
          maxWidth: 800, 
          margin: '0 auto 48px auto', 
          padding: '0 24px',
          position: 'relative',
          zIndex: 2
        }}>
          <p style={{ 
            fontSize: 'clamp(18px, 2.2vw, 20px)', 
            color: '#d3c6a6', 
            lineHeight: 1.7, 
            letterSpacing: '0.02em', 
            marginBottom: 24,
            textAlign: 'center',
            fontWeight: 400
          }}>
            InvestorOS represents the convergence of institutional-grade technology and individual empowerment. 
            We believe that advanced financial intelligence should be accessible to every investor.
          </p>
          <p style={{ 
            fontSize: 'clamp(16px, 2vw, 18px)', 
            color: '#d3c6a6', 
            lineHeight: 1.6, 
            letterSpacing: '0.02em',
            marginBottom: 0,
            textAlign: 'center',
            fontWeight: 400
          }}>
            Our platform transforms complex market data into actionable insights, delivering the tools that were once exclusive to Wall Street.
          </p>
        </div>
        


        {/* Flow Description */}
        <div className={styles['text-reveal']} style={{ 
          marginTop: 48, 
          maxWidth: 800, 
          padding: '0 24px',
          position: 'relative',
          zIndex: 2
        }}>
          <p style={{ 
            fontSize: 'clamp(17px, 2.1vw, 19px)', 
            color: '#d3c6a6', 
            lineHeight: 1.7, 
            letterSpacing: '0.02em', 
            marginBottom: 20,
            textAlign: 'center',
            fontWeight: 400
          }}>
            Each component seamlessly integrates with the others, creating a unified ecosystem where 
            <span style={{ color: '#CEAD41', fontWeight: 600 }}> Oracle&apos;s intelligence</span> drives 
            <span style={{ color: '#CEAD41', fontWeight: 600 }}> Legion&apos;s strategies</span>, while 
            <span style={{ color: '#CEAD41', fontWeight: 600 }}> Sentinel&apos;s oversight</span> ensures optimal execution.
          </p>
          <p style={{ 
            fontSize: 'clamp(15px, 1.9vw, 17px)', 
            color: '#d3c6a6', 
            lineHeight: 1.6, 
            letterSpacing: '0.02em',
            textAlign: 'center',
            marginBottom: 0,
            fontWeight: 400
          }}>
            This interconnected architecture delivers institutional-grade capabilities through an intuitive, 
            accessible platform designed for the modern investor.
          </p>
        </div>
      </section>

    </div>
  );
} 