import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const FONT_DISPLAY = "'Cinzel', serif"
const FONT_BODY = "'Poppins', sans-serif"

const gold = '#d3b064'          // InvestorOS gold
const goldDeep = '#b08d57'      // darker gold accents
const beige = '#e6d7c3'         // Legion + text
const coffee = 'rgba(44, 24, 16, 0.95)' // background
const border = 'rgba(205, 133, 63, 0.4)'

const HoverLink: React.FC<{
  to: string
  label: string
  active?: boolean
  style?: React.CSSProperties
  uppercase?: boolean
}> = ({ to, label, active, style, uppercase }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        background: 'none',
        border: 'none',
        color: active ? goldDeep : hovered ? gold : beige,
        fontSize: 16,
        cursor: 'pointer',
        letterSpacing: uppercase ? '0.35em' : '0.1em',
        padding: '12px 20px',
        borderRadius: 6,
        fontFamily: FONT_BODY,
        textTransform: uppercase ? 'uppercase' : 'none',
        transition: 'color .25s ease, transform .25s ease, opacity .4s ease',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </Link>
  )
}

const ButtonGhost: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
> = ({ children, style, ...props }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'transparent',
        border: `1px solid ${hovered ? gold : 'rgba(176,141,87,0.6)'}`,
        color: hovered ? gold : beige,
        padding: '8px 16px',
        borderRadius: 8,
        cursor: 'pointer',
        fontFamily: FONT_BODY,
        fontSize: 14,
        transition: 'all .25s ease',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

const ButtonGold: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
> = ({ children, style, ...props }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(90deg,#d9bf7a 0%,#e1c89a 100%)'
          : 'linear-gradient(90deg,#b08d57 0%,#d2b48c 100%)',
        border: 'none',
        color: '#2c1810',
        padding: '8px 18px',
        borderRadius: 8,
        cursor: 'pointer',
        fontFamily: FONT_BODY,
        fontSize: 14,
        fontWeight: 600,
        transition: 'all .25s ease',
        boxShadow: hovered ? '0 6px 20px rgba(0,0,0,.25)' : '0 4px 16px rgba(0,0,0,.2)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
        ...style,
      }}
    >
      {children}
    </button>
  )
}

const Navbar: React.FC = () => {
  const { user, signOut, resetAuth } = useAuth()
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [elevated, setElevated] = useState(false)

  useEffect(() => {
    // gentle load-in
    const t = setTimeout(() => setIsLoaded(true), 30)

    // elevate on scroll for a subtle effect
    const onScroll = () => setElevated(window.scrollY > 6)
    window.addEventListener('scroll', onScroll)
    return () => {
      clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const isActive = (path: string) => location.pathname === path

  const handleSignOut = async () => {
    await signOut()
  }

  const handleReset = () => {
    if (window.confirm('This will clear all your data and sign you out. Are you sure?')) {
      resetAuth()
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        inset: '0 0 auto 0',
        zIndex: 1000,
        background: coffee,
        backdropFilter: 'blur(15px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: elevated ? 78 : 80,
        padding: '0 40px',
        borderBottom: `1px solid ${border}`,
        boxShadow: elevated ? '0 8px 28px rgba(0,0,0,.35)' : '0 4px 20px rgba(0,0,0,.3)',
        transition: 'height .35s cubic-bezier(.25,.46,.45,.94), box-shadow .35s ease, background .35s ease, opacity .5s ease, transform .5s ease',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0px)' : 'translateY(-8px)',
      }}
    >
      {/* Left */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <HoverLink to="/" label="Home" active={isActive('/')} uppercase />
      </div>

      {/* Center */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity .45s ease .1s, transform .45s ease',
        }}
      >
        <span
          style={{
            fontSize: '2.2rem',
            cursor: 'pointer',
            color: gold,
            fontFamily: FONT_DISPLAY,
            letterSpacing: '0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,.35)',
            transition: 'transform .25s ease, filter .25s ease',
            filter: 'drop-shadow(0 0 0 rgba(0,0,0,0))',
          }}
          onMouseEnter={(e) => ((e.currentTarget.style.transform = 'translateY(-1px)'), (e.currentTarget.style.filter = 'drop-shadow(0 4px 20px rgba(211,176,100,.25))'))}
          onMouseLeave={(e) => ((e.currentTarget.style.transform = 'translateY(0)'), (e.currentTarget.style.filter = 'drop-shadow(0 0 0 rgba(0,0,0,0))'))}
          onClick={() => window.open('/', '_blank')}
        >
          InvestorOS
        </span>

        <span
          aria-hidden="true"
          style={{
            margin: '0 18px',
            height: '2.1rem',
            width: 2,
            background: 'linear-gradient(180deg,#b08d57 0%,#d2b48c 100%)',
            borderRadius: 2,
            opacity: 0.85,
          }}
        />

        <span
          style={{
            fontSize: '2.2rem',
            cursor: 'pointer',
            color: beige,
            fontFamily: FONT_BODY,
            letterSpacing: '0.06em',
            textShadow: '0 2px 12px rgba(0,0,0,.35)',
            transition: 'transform .25s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          onClick={() => (window.location.href = '/legion')}
        >
          Legion
        </span>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {user ? (
          <>
            <HoverLink to="/dashboard" label="Dashboard" active={isActive('/dashboard')} />
            <ButtonGhost onClick={handleReset}>Reset</ButtonGhost>
            <ButtonGold onClick={handleSignOut}>Sign Out</ButtonGold>
          </>
        ) : (
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: beige,
              fontFamily: FONT_BODY,
              letterSpacing: '0.1em',
              padding: '10px 14px',
              borderRadius: 6,
              transition: 'opacity .25s ease',
              opacity: 0.9,
            }}
          >
            Strategies
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
