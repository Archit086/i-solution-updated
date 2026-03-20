/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      colors: {
        brand: {
          teal: '#2BA8A0',    
          dark: '#1D7A74',    
          light: '#E8F7F6',   
        },
        accent: {
          amber: '#F5A623',  
          dark: '#D4881A',    
          soft: '#FEF3DC',   
        },
        pure: { white: '#FFFFFF' },
        off: { white: '#F8F9FA' }, 
        border: { default: '#EEF0F2' },
        text: { dark: '#1A2530', body: '#4A5568', muted: '#718096' },
        success: { green: '#38A169' },
        warning: { amber: '#D97706' },
        danger: { red: '#E53E3E' },
      },
      fontFamily: {
        display: ['"Nunito Sans"', 'sans-serif'], 
        body: ['"Open Sans"', 'sans-serif'],
        mono: ['"Courier Prime"', 'monospace'],
        // Fallbacks for my existing pages so they don't break immediately
        poppins: ['"Nunito Sans"', 'sans-serif'],
        open: ['"Open Sans"', 'sans-serif'],
      },
      boxShadow: {
        cardHover: '0 20px 40px -10px rgba(0,0,0,0.08)',
        deep: '0 4px 20px -2px rgba(0,0,0,0.04)',
        navSticky: '0 4px 24px rgba(26,37,48,0.10)',
        btnGlow: '0 4px 14px rgba(43,168,160,0.3)',
      },
      transitionTimingFunction: {
        'pharma': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        slideGradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseBreath: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        badgePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
        floatPill: {
          '0%, 100%': { transform: 'translateY(0px) rotateY(-5deg)' },
          '50%': { transform: 'translateY(-14px) rotateY(5deg)' },
        },
        floatSatA: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatSatB: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSatC: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        badgeSpringIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUpFade: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        chevronFade: {
          '0%': { opacity: '0', transform: 'translateY(-5px)' },
          '50%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(5px)' },
        },
        burstTopLeft: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(-20px, -20px) scale(0)', opacity: '0' },
        },
        burstTopRight: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(20px, -20px) scale(0)', opacity: '0' },
        },
        burstBottomLeft: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(-20px, 20px) scale(0)', opacity: '0' },
        },
        burstBottomRight: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(20px, 20px) scale(0)', opacity: '0' },
        },
        wobbleIcon: {
          '0%, 100%': { transform: 'rotate(0)' },
          '33%': { transform: 'rotate(-8deg)' },
          '66%': { transform: 'rotate(8deg)' },
        },
        rotateClock: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        layerBump: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-3px)' },
        },
        drawCheck: {
          '0%': { strokeDashoffset: '24' },
          '40%, 100%': { strokeDashoffset: '0' },
        },
        oscillateKey: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' },
        },
        pulseWidth: {
          '0%, 100%': { width: '60%' },
          '50%': { width: '80%' },
        },
        shimmerSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        floatBadge: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        swingFlask: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        starPop: {
          '0%': { transform: 'scale(0)' },
          '80%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        orbit1: {
          '0%, 100%': { transform: 'translate(-10%, -10%)' },
          '33%': { transform: 'translate(10%, 15%)' },
          '66%': { transform: 'translate(-5%, 5%)' },
        },
        orbit2: {
          '0%, 100%': { transform: 'translate(10%, 10%)' },
          '33%': { transform: 'translate(-15%, 5%)' },
          '66%': { transform: 'translate(5%, -15%)' },
        },
        orbit3: {
          '0%, 100%': { transform: 'translate(0, 5%)' },
          '33%': { transform: 'translate(10%, -10%)' },
          '66%': { transform: 'translate(-10%, -5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        slideGradient: 'slideGradient 6s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
        pulseBreath: 'pulseBreath 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        badgePulse: 'badgePulse 1.5s ease-in-out infinite',
        floatPill: 'floatPill 3.5s ease-in-out infinite',
        floatSatA: 'floatSatA 2.8s ease-in-out infinite',
        floatSatB: 'floatSatB 4.1s ease-in-out infinite',
        floatSatC: 'floatSatC 3.3s ease-in-out infinite',
        burstTL: 'burstTopLeft 500ms ease-out forwards',
        burstTR: 'burstTopRight 500ms ease-out forwards',
        burstBL: 'burstBottomLeft 500ms ease-out forwards',
        burstBR: 'burstBottomRight 500ms ease-out forwards',
        wobbleIcon: 'wobbleIcon 400ms ease-in-out',
        rotateClock: 'rotateClock 3s linear infinite',
        layerBump: 'layerBump 1.5s ease-in-out infinite alternate',
        drawCheck: 'drawCheck 2s ease-out infinite',
        oscillateKey: 'oscillateKey 2s ease-in-out infinite',
        pulseWidth: 'pulseWidth 3s ease-in-out infinite',
        shimmerSweep: 'shimmerSweep 2s infinite',
        floatBadge: 'floatBadge 3s ease-in-out infinite',
        swingFlask: 'swingFlask 3s ease-in-out infinite',
        orbit1: 'orbit1 12s ease-in-out infinite',
        orbit2: 'orbit2 18s ease-in-out infinite',
        orbit3: 'orbit3 8s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      }
    },
  },
  plugins: [],
}
