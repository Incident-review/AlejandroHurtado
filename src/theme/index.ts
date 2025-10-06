import { defineStyle, defineStyleConfig, extendTheme, type ThemeConfig } from '@chakra-ui/react';

// Color palette - Consolidated from both theme files
const colors = {
  // Brand colors from the original theme with warm wood tones
  brand: {
    900: '#2d1810', // Dark ebony wood
    800: '#4a2d1a', // Mahogany dark
    700: '#6b4c2e', // Rosewood medium
    600: '#8b6b3a', // Cedar warm brown
    500: '#a88a4a', // Oak golden brown
    400: '#c4a85a', // Pine golden
    300: '#d4af37', // Classic gold for strings
    200: '#e0c66a', // Light gold for details
    100: '#f0d680', // Very light gold for text
    50: '#faf0c0', // Very light gold for backgrounds
  },
  // Accent colors with warm, earthy tones
  accent: {
    primary: '#8b7355', // Elegant mahogany gold
    primaryHover: '#a0856b', // Lighter mahogany for hover
    secondary: '#6b4423', // Elegant saddle brown
    strings: '#d4af37', // Classic gold for strings
    fretboard: '#2d1810', // Dark fingerboard
    gold: '#b8860b', // Elegant dark gold
    copper: '#cd7f32', // Elegant copper
    bronze: '#cd853f', // Elegant bronze
    cream: '#f5f5dc', // Elegant cream for text
    ivory: '#fffff0', // Ivory for light backgrounds
    warm: '#f4e4bc', // Warm beige
    sand: '#f4d03f', // Golden sand
    success: '#8b8b3d', // Muted olive green for success states
    info: '#8b7355', // Reuse primary color for info
    warning: '#d4af37', // Gold for warnings
    error: '#8b3d3d', // Muted red for errors
  },
  // Text colors with better contrast
  text: {
    primary: '#faf0c0', // Light gold for primary text
    secondary: '#f0d680', // Slightly darker gold for secondary text
    accent: '#cd853f', // Bronze for accent text
    muted: '#a0aec0', // Muted text for less important info
  },
  // Border colors
  border: {
    light: 'rgba(139, 115, 85, 0.6)', // Light wood tone border
    hover: 'rgba(205, 133, 63, 0.8)', // Warmer border on hover
  },
  // Card styles
  card: {
    bg: 'rgba(20, 10, 5, 0.2)', // Semi-transparent dark background
    hoverBg: 'rgba(30, 15, 5, 0.3)', // Slightly lighter on hover
    border: '1px solid rgba(139, 115, 85, 0.2)', // Subtle border
    hoverBorder: '1px solid rgba(205, 133, 63, 0.4)', // Warmer border on hover
  },
  // Gradients
  gradients: {
    awardHero: 'linear(to-r, accent.cream 0%, accent.bronze 40%, accent.primary 100%)',
    guitarBody: 'linear(135deg, brand.800 0%, brand.600 50%, accent.primary 100%)',
  },
};

// Typography - Using elegant serif for headings and clean sans for body
const fonts = {
  heading: '"Playfair Display", serif',
  body: '"Open Sans", sans-serif',
  mono: '"JetBrains Mono", monospace',
};

// Component styles using defineStyle for better TypeScript support
const buttonBaseStyle = defineStyle({
  fontWeight: 'bold',
  borderRadius: 'full',
  _hover: {
    transform: 'translateY(-1px)',
    boxShadow: 'lg',
  },
  _active: {
    transform: 'translateY(0)',
  },
});

const buttonVariants = {
  solid: defineStyle({
    bg: 'accent.primary',
    color: 'white',
    _hover: {
      bg: 'accent.primaryHover',
    },
  }),
  outline: defineStyle({
    borderColor: 'accent.primary',
    color: 'accent.primary',
    _hover: {
      bg: 'rgba(139, 115, 85, 0.1)',
    },
  }),
  ghost: defineStyle({
    _hover: {
      bg: 'rgba(139, 115, 85, 0.1)',
    },
  }),
};

const cardBaseStyle = defineStyle({
  bg: 'brand.800',
  borderRadius: 'lg',
  overflow: 'hidden',
  boxShadow: 'lg',
  transition: 'all 0.3s ease',
  _hover: {
    transform: 'translateY(-4px)',
    boxShadow: 'xl',
  },
});

const cardVariants = {
  event: defineStyle({
    borderLeft: '4px solid',
    borderLeftColor: 'accent.primary',
  }),
  spectacle: defineStyle({
    borderRadius: 'xl',
    overflow: 'hidden',
  }),
};

// Component configurations
const components = {
  Button: defineStyleConfig({
    baseStyle: buttonBaseStyle,
    variants: buttonVariants,
    defaultProps: {
      variant: 'solid',
    },
  }),
  Card: defineStyleConfig({
    baseStyle: cardBaseStyle,
    variants: cardVariants,
  }),
  Text: defineStyleConfig({
    variants: {
      cardTitle: {
        fontSize: 'xl',
        fontWeight: 'bold',
        color: 'text.primary',
      },
      cardDate: {
        color: 'text.accent',
        fontWeight: 'medium',
      },
    },
  }),
};

// Global styles
const styles = {
  global: {
    'html, body': {
      bg: 'brand.900',
      color: 'text.primary',
      lineHeight: 'tall',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: 'bold',
      color: 'text.primary',
    },
    a: {
      color: 'accent.primary',
      _hover: {
        textDecoration: 'underline',
      },
    },
    '::selection': {
      bg: 'accent.primary',
      color: 'white',
    },
  },
};

// Theme configuration
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  cssVarPrefix: 'chakra',
};

// Extend the theme with all configurations
const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
  // Additional theme extensions can be added here
});

export default theme;
