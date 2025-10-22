import { useEffect, useState, useCallback } from 'react';
import styles from '../styles/legion.module.css';
import { useNavigate } from 'react-router-dom';

// Font fallbacks (replace with your project fonts if you have them)
const FONT_DISPLAY = "'Italiana', serif";
const FONT_BODY = "'Aboreto', cursive";

function Navbar() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const navigate = useNavigate();

  // Smooth scroll to section by id
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Mark as loaded after mount (for load-in animations)
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 0);
    return () => clearTimeout(t);
  }, []);

  // Observe sections to update the active nav item
  useEffect(() => {
    const sectionIds = ['hero', 'strategies'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Use the entry with greatest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setCurrentSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0.3, 0.6, 0.9],
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
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
        <div
          className={`${styles['nav-right']} ${isLoaded ? styles['nav-right-load-in'] : ''}`}
          style={{ display: 'flex', gap: 32 }}
        >
          <button
            onClick={() => navigate('/login')}
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
            Login
          </button>
        </div>

        {/* Center */}
        <div
          className={`${styles['nav-center']} ${isLoaded ? styles['nav-center-load-in'] : ''}`}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            display: 'flex',
            gap: 12,
            alignItems: 'center',
          }}
        >
          <span
            className={`${styles['logo-shine']} ${isLoaded ? styles['logo-load-in'] : ''}`}
            style={{ fontSize: '2.2rem', cursor: 'pointer', color: '#CEAD41', fontFamily: FONT_DISPLAY }}
            onClick={() => (window.location.href = '/')}
          >
            InvestorOS
          </span>
          <span
            className={styles['nav-separator-animated']}
            aria-hidden="true"
            style={{
              display: 'inline-block',
              margin: '0 18px',
              height: '2.1rem',
              width: 2,
              background: 'linear-gradient(180deg,#b08d57 0%,#d2b48c 100%)',
              borderRadius: 2,
              opacity: 0.85,
            }}
          />
          <span
            className={`${styles['logo-shine']} ${isLoaded ? styles['logo-load-in'] : ''}`}
            style={{ fontSize: '2.2rem', cursor: 'pointer', fontFamily: FONT_BODY, color: '#e6d7c3' }}
            onClick={() => navigate('/legion')}
          >
            Legion
          </span>
        </div>

        {/* Right */}
        <div
          className={`${styles['nav-right']} ${isLoaded ? styles['nav-right-load-in'] : ''}`}
          style={{ display: 'flex', gap: 32 }}
        >
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
    </>
  );
}

export default Navbar;
