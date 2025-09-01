// Centralized theme configuration (Updated)
export const theme = {
  colors: {
    primary: {
      light: 'from-blue-400 to-indigo-500',   // Fresh + calm
      dark: 'from-blue-600 to-indigo-700'
    },
    secondary: {
      light: 'from-emerald-400 to-teal-400',  // Growth + energy
      dark: 'from-emerald-600 to-teal-600'
    },
    background: {
      light: 'bg-gradient-to-br from-blue-50 to-indigo-50', 
      dark: 'bg-gradient-to-br from-gray-900 to-indigo-900'
    },
    card: {
      light: 'bg-white/80 backdrop-blur-md shadow-md',
      dark: 'bg-gray-800/80 backdrop-blur-md shadow-lg'
    },
    text: {
      primary: {
        light: 'text-gray-900',
        dark: 'text-gray-100'
      },
      secondary: {
        light: 'text-gray-600',
        dark: 'text-gray-400'
      },
      highlight: {
        light: 'text-amber-600', // For deadlines/important tasks
        dark: 'text-amber-400'
      }
    },
    border: {
      light: 'border-gray-200',
      dark: 'border-gray-700'
    }
  },

  // Predefined category colors (for DSA, Core Subjects, Aptitude, etc.)
  categoryColors: [
    'bg-blue-500',     // DSA
    'bg-indigo-500',   // Core CS
    'bg-emerald-500',  // Aptitude/Quants
    'bg-amber-500',    // Deadlines
    'bg-rose-500',     // High-priority
    'bg-purple-500',   // Revision
    'bg-cyan-500',     // Projects
    'bg-teal-500',     // Group Study / Notes
    'bg-orange-500',   // Mock Interviews
    'bg-pink-500',     // Soft Skills
    'bg-lime-500',     // Extra Reading
    'bg-sky-500'       // Misc
  ],

  // Animation durations
  animations: {
    fast: 'duration-150 ease-in',
    normal: 'duration-200 ease-in-out',
    slow: 'duration-300 ease-out'
  },

  // Shadows (slightly deeper for focus)
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl shadow-indigo-200/40'
  },

  // Border radius (softer UI)
  radius: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-2xl',
    full: 'rounded-full'
  }
};

// Helper functions for theme
export const getThemeClass = (isDark, lightClass, darkClass) => {
  return isDark ? darkClass : lightClass;
};

export const getCardTheme = (isDark) => {
  return isDark ? theme.colors.card.dark : theme.colors.card.light;
};

export const getTextTheme = (isDark, type = 'primary') => {
  return isDark ? theme.colors.text[type].dark : theme.colors.text[type].light;
};

export const getBorderTheme = (isDark) => {
  return isDark ? theme.colors.border.dark : theme.colors.border.light;
};

export default theme;
