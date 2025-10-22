import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/index.module.css';
import Navbar from '../components/Navbar';

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
  
    const onScroll = () => {
      const y = window.scrollY;
      // show near top or when scrolling up
      setIsNavVisible(y < 80 || y < lastY);
      lastY = y;
    };
  
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

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

      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingElements: Element[] = [];

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingElements.push(entry.target);
          } else {
            entry.target.classList.remove(styles['animate-in']);
          }
        });

        if (intersectingElements.length > 0) {
          intersectingElements.forEach((element) => {
            element.classList.remove(styles['animate-in']);
          });

          (intersectingElements[0] as HTMLElement).offsetHeight;

          requestAnimationFrame(() => {
            intersectingElements.forEach((element) => {
              element.classList.add(styles['animate-in']);
            });
          });
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll(
      `.${styles['scroll-animate']}, .${styles['scroll-transition']}, .${styles['fade-in']}, .${styles['scale-in']}, .${styles['slide-up']}, .${styles['stagger-item']}, .${styles['section-transition']}, .${styles['text-reveal']}, .scroll-card, .about-stat`
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const element = ref.current;
    const navOffset = 80;
    const rect = element.getBoundingClientRect();
    const absoluteTop = rect.top + window.pageYOffset;
    const targetTop = Math.max(absoluteTop - navOffset, 0);

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #261E1E 0%, #1f1818 50%, #261E1E 100%)',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Navbar />
      
      <nav
  className={`${styles['sticky-nav']} ${isLoaded ? styles['nav-load-in'] : ''}`}
  style={{
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 1000,
    background: 'rgba(38,30,30,0.95)',
    backdropFilter: 'blur(15px)',
    height: 80,
    padding: '0 40px',
    borderBottom: '1px solid rgba(206, 173, 65, 0.2)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    transition: 'transform 300ms ease',
    transform: isNavVisible ? 'translateY(0)' : 'translateY(-100%)',
  }}
>

        <div className={`${styles['nav-left']} ${isLoaded ? styles['nav-left-load-in'] : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button
            onClick={() => scrollToSection(featuresRef)}
            className={`${styles['nav-but ton']}`}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'features' ? '#CEAD41' : '#d3c6a6',
              fontSize: 16,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              padding: '12px 20px',
              borderRadius: '6px',
              fontWeight: 500,
              fontFamily: 'Aboreto, serif',
            }}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection(aboutRef)}
            className={`${styles['nav-button']}`}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'about' ? '#CEAD41' : '#d3c6a6',
              fontSize: 16,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              padding: '12px 20px',
              borderRadius: '6px',
              fontWeight: 500,
              fontFamily: 'Aboreto, serif',
            }}
          >
            About
          </button>
        </div>

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
            className={`${styles['logo-shine']} ${isLoaded ? styles['logo-load-in'] : ''}`}
            style={{
              fontSize: 42,
              fontFamily: 'Italiana, serif',
              cursor: 'pointer',
            }}
          >
            InvestorOS
          </span>
        </div>

        <div className={`${styles['nav-right']} ${isLoaded ? styles['nav-right-load-in'] : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}></div>
      </nav>

      

      <section
        className={`${styles['section-transition']} ${styles['home-animate-in']} ${isLoaded ? styles['hero-load-in'] : ''}`}
        style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: 80 }}
      >
        <h1 className={`${styles['title-shine']} ${styles['text-reveal']} ${isLoaded ? styles['title-load-in'] : ''}`} style={{ fontSize: 125, letterSpacing: '0.1em', margin: 0, color: '#CEAD41', fontWeight: 400, fontFamily: 'Italiana, serif' }}>
          InvestorOS
        </h1>
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
        <h2 className={`${styles['title-shine']} ${styles['text-reveal']}`} style={{ fontSize: 'clamp(41px, 5.5vw, 53px)', color: '#CEAD41', marginBottom: 48, letterSpacing: '0.1em', fontFamily: 'Italiana, serif', fontWeight: 400 }}>
          Features
        </h2>
        <div className={styles['features-row']} style={{ marginTop: 0 }}>
          <div
            className={`${styles['stagger-item']} ${styles['scroll-card']}`}
            style={{
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
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)',
            }}
          >
            <div className={styles['title-shine']} style={{ color: '#CEAD41', fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '0.15em' }}>
              ORACLE
            </div>
            <div className={styles['feature-tagline-shine']} style={{ fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '0.12em', maxWidth: 320, textAlign: 'center', wordBreak: 'break-word' }}>
              AN INTELLIGENT ASSISTANT
              <br />
              FOR ALL YOUR DECISIONS
            </div>
            <div style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '0.10em', color: '#d3c6a6', lineHeight: '1.6', maxWidth: 320 }}>
              AI-DRIVEN MARKET ANALYSIS THAT DISTILLS COMPLEX DATA INTO CLEAR, ACTIONABLE INSIGHTS—DELIVERED IN REAL TIME
            </div>
            <button
              disabled
              style={{
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
                cursor: 'not-allowed',
                fontFamily: 'Aboreto, serif',
                textTransform: 'uppercase',
              }}
            >
              COMING SOON
            </button>
          </div>

          <div
            className={`${styles['stagger-item']} ${styles['scroll-card']}`}
            style={{
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
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)',
            }}
          >
            <div className={styles['title-shine']} style={{ color: '#CEAD41', fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '0.15em' }}>
              LEGION
            </div>
            <div className={styles['feature-tagline-shine']} style={{ fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '0.12em', maxWidth: 320, textAlign: 'center', wordBreak: 'break-word' }}>
              A SUITE OF QUANTITATIVE
              <br />
              TRADING SYSTEMS
            </div>
            <div style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '0.10em', color: '#d3c6a6', lineHeight: '1.6', maxWidth: 320 }}>
              ENHANCE YOUR TRADING DECISIONS WITH A CURATED COLLECTION OF ALGORITHMIC STRATEGIES—DESIGNED TO HELP YOU TRADE WITH CONFIDENCE
            </div>
            <Link
              to="/legion"
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
                fontFamily: 'Aboreto, serif',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              LAUNCH
            </Link>
          </div>

          <div
            className={`${styles['stagger-item']} ${styles['scroll-card']}`}
            style={{
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
              transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(206, 173, 65, 0.1)',
            }}
          >
            <div className={styles['title-shine']} style={{ color: '#CEAD41', fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '0.15em' }}>
              SENTINEL
            </div>
            <div className={styles['feature-tagline-shine']} style={{ fontSize: 'clamp(16px, 2vw, 20px)', letterSpacing: '0.12em', maxWidth: 320, textAlign: 'center', wordBreak: 'break-word' }}>
              INTELLIGENT OVERSIGHT FOR
              <br />
              EVERY POSITION
            </div>
            <div style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', letterSpacing: '0.10em', color: '#d3c6a6', lineHeight: '1.6', maxWidth: 320 }}>
              REAL-TIME PORTFOLIO MONITORING, RISK ANALYSIS, AND INTELLIGENT GUIDANCE TO HELP OPTIMIZE EVERY POSITION
            </div>
            <button
              disabled
              style={{
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
                cursor: 'not-allowed',
                fontFamily: 'Aboreto, serif',
                textTransform: 'uppercase',
              }}
            >
              COMING SOON
            </button>
          </div>
        </div>
      </section>

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
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(206, 173, 65, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(206, 173, 65, 0.03) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        <h2
          className={`${styles['title-shine']} ${styles['text-reveal']}`}
          style={{
            fontSize: 'clamp(42px, 5.5vw, 56px)',
            color: '#CEAD41',
            marginBottom: 32,
            letterSpacing: '0.08em',
            fontFamily: 'Italiana, serif',
            fontWeight: 400,
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
          }}
        >
          Democratizing Wall Street
        </h2>

        <div className={styles['text-reveal']} style={{ maxWidth: 800, margin: '0 auto 48px auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: 'clamp(18px, 2.2vw, 20px)', color: '#d3c6a6', lineHeight: 1.7, letterSpacing: '0.02em', marginBottom: 24, textAlign: 'center', fontWeight: 400 }}>
            InvestorOS represents the convergence of institutional-grade technology and individual empowerment. We believe that advanced financial intelligence should be accessible to every investor.
          </p>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: '#d3c6a6', lineHeight: 1.6, letterSpacing: '0.02em', marginBottom: 0, textAlign: 'center', fontWeight: 400 }}>
            Our platform transforms complex market data into actionable insights, delivering the tools that were once exclusive to Wall Street.
          </p>
        </div>

        <div className={styles['text-reveal']} style={{ marginTop: 48, maxWidth: 800, padding: '0 24px', position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: 'clamp(17px, 2.1vw, 19px)', color: '#d3c6a6', lineHeight: 1.7, letterSpacing: '0.02em', marginBottom: 20, textAlign: 'center', fontWeight: 400 }}>
            Each component seamlessly integrates with the others, creating a unified ecosystem where <span style={{ color: '#CEAD41', fontWeight: 600 }}>Oracle's intelligence</span> drives{' '}
            <span style={{ color: '#CEAD41', fontWeight: 600 }}>Legion's strategies</span>, while <span style={{ color: '#CEAD41', fontWeight: 600 }}>Sentinel's oversight</span> ensures optimal execution.
          </p>
          <p style={{ fontSize: 'clamp(15px, 1.9vw, 17px)', color: '#d3c6a6', lineHeight: 1.6, letterSpacing: '0.02em', textAlign: 'center', marginBottom: 0, fontWeight: 400 }}>
            This interconnected architecture delivers institutional-grade capabilities through an intuitive, accessible platform designed for the modern investor.
          </p>
        </div>
      </section>
    </div>
  );
}
