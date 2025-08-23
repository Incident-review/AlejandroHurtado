import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { extendTheme } from '@chakra-ui/theme-utils';

// Define base styles for components
const buttonBaseStyle = defineStyle({
  fontWeight: 'bold',
  borderRadius: 'full',
});

const buttonVariants = {
  solid: defineStyle({
    bg: 'accent.primary',
    color: 'white',
    _hover: {
      bg: 'blue.600',
    },
  }),
  outline: defineStyle({
    borderColor: 'accent.primary',
    color: 'accent.primary',
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
  '& .card-header': {
    p: 4,
    pb: 2,
  },
  '& .card-body': {
    p: 4,
    pt: 2,
  },
  '& .card-footer': {
    p: 4,
    pt: 0,
  },
});

const cardVariants = {
  event: defineStyle({
    h: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .card-body': {
      flex: '1',
    },
  }),
};

// Header, Hero, and Statistics
const headerBaseStyle = defineStyle({
  bg: 'brand.800',
  color: 'white',
  py: 4,
  px: 8,
});

const heroImageStyle = {
  borderRadius: 'md',
  boxShadow: 'lg',
  w: '100%',
  h: 'auto',
  objectFit: 'cover',
};

const heroSectionStyle = {
  bg: 'brand.900',
  minH: '80vh',
  p: 8,
};

const heroHeadingStyle = {
  fontStyle: 'italic',
  fontSize: { base: '2xl', md: '4xl' },
  mb: 4,
  textAlign: 'left',
};

const heroQuoteAuthorStyle = {
  fontSize: 'lg',
  mt: 4,
  textAlign: 'right',
};

const headerNavButton = defineStyle({
  variant: 'ghost',
  color: 'white',
  mx: 2,
  fontWeight: 'normal',
  _hover: { textDecoration: 'underline', bg: 'transparent' },
  _focus: { boxShadow: 'none' },
});

const statisticsSectionStyle = {
  bg: 'brand.800',
  p: 8,
};

const awardsBadgeStyle = {
  px: 4,
  py: 2,
  borderRadius: 'full',
  colorScheme: 'yellow',
  fontSize: 'md',
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

const eventCardStyle = {
  bg: 'brand.800',
  borderRadius: 'lg',
  overflow: 'hidden',
  boxShadow: 'lg',
  transition: 'all 0.3s ease',
  _hover: {
    transform: 'translateY(-4px)',
    boxShadow: 'xl',
  },
  display: 'flex',
  flexDirection: 'column',
  h: '100%',
};

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    cssVarPrefix: 'chakra',
  },
  colors: {
    brand: {
      900: '#1a202c',
      800: '#2d3748',
      700: '#4a5568',
      600: '#718096',
      500: '#a0aec0',
      400: '#cbd5e0',
      300: '#e2e8f0',
      200: '#edf2f7',
      100: '#f7fafc',
      50: '#ffffff',
    },
    accent: {
      primary: '#3182ce',
      secondary: '#dd6b20',
    },
    gradients: {
      awardHero: 'linear(to-r, yellow.200 0%, yellow.400 40%, orange.200 100%)',
    },
  },
  shadows: {
    awardHero: '0 0 40px 0 rgba(255, 193, 7, 0.25), 0 8px 32px 0 rgba(0,0,0,0.10)',
    awardBadge: '0 0 0 0 rgba(255, 193, 7, 0.5)',
    awardBadgePulse: '0 0 24px 8px rgba(255, 193, 7, 0.35)',
    awardTrophy: '0 0 32px 8px rgba(255, 215, 0, 0.18)',
    awardTrophyGlow: '0 0 48px 16px rgba(255, 215, 0, 0.32)',
    awardCard: '0 0 24px 0 rgba(255, 193, 7, 0.15), 0 4px 16px 0 rgba(0,0,0,0.08)',
  },
  radii: {
    awardHero: '1.5rem',
    awardCard: '1rem',
  },
  layerStyles: {
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: 'xl',
    },
    imageWrapper: {
      position: 'relative',
      pt: '56.25%',
      w: 'full',
      overflow: 'hidden',
    },
    imageCover: {
      position: 'absolute',
      top: 0,
      left: 0,
      w: 'full',
      h: 'full',
      objectFit: 'cover',
    },
    heroImage: heroImageStyle,
    awardsBadge: awardsBadgeStyle,
    eventCard: eventCardStyle,
    awardHero: {
      textAlign: 'center',
      bgGradient: 'gradients.awardHero',
      borderRadius: 'awardHero',
      boxShadow: 'awardHero',
      p: { base: 4, sm: 6, md: 10 },
      mb: 6,
      position: 'relative',
      overflow: 'hidden',
    },
    awardTrophy: {
      position: 'absolute',
      top: -8,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1,
      opacity: 0.3,
      filter: 'blur(1.5px)',
      pointerEvents: 'none',
    },
    awardBadge: {
      colorScheme: 'yellow',
      fontSize: { base: '1em', sm: '1.2em', md: '1.5em' },
      px: { base: 3, sm: 4, md: 6 },
      py: { base: 2, sm: 2.5, md: 3 },
      borderRadius: 'md',
      mb: 4,
      boxShadow: 'awardBadge',
      display: 'inline-flex',
      alignItems: 'center',
      zIndex: 2,
      position: 'relative',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      fontWeight: 700,
    },
    awardCard: {
      p: { base: 3, sm: 4, md: 6 },
      borderWidth: 2,
      borderColor: 'yellow.400',
      borderRadius: 'awardCard',
      boxShadow: 'awardCard',
      bgGradient: 'linear(to-br, white, yellow.50 60%)',
      mb: 4,
      w: '100%',
      position: 'relative',
      _before: {
        content: '""',
        position: 'absolute',
        top: 2,
        right: 2,
        width: '32px',
        height: '32px',
        bg: 'yellow.100',
        borderRadius: '50%',
        opacity: 0.15,
        zIndex: 0,
      },
    },
    awardShowcaseBg: {
      bg: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
      minH: '100vh',
      px: { base: 2, md: 0 },
    },
    awardHeroGlass: {
      textAlign: 'center',
      bg: 'rgba(32,34,37,0.72)',
      boxShadow: '0 12px 48px 0 rgba(0,0,0,0.22), 0 2px 12px 0 rgba(0,0,0,0.10)',
      borderRadius: '2xl',
      backdropFilter: 'blur(28px) saturate(180%)',
      border: '1.5px solid rgba(255,255,255,0.10)',
      position: 'relative',
      px: { base: 6, sm: 12, md: 20 },
      pt: { base: 12, sm: 18, md: 28 },
      pb: { base: 10, sm: 14, md: 20 },
      overflow: 'hidden',
      transition: 'box-shadow 0.3s',
      color: 'white',
    },
    awardTrophyGlass: {
      position: 'absolute',
      top: { base: -14, md: -24 },
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 0,
      opacity: 0.10,
      filter: 'blur(12px) saturate(180%)',
      pointerEvents: 'none',
      transition: 'opacity 0.3s',
    },
    awardBadgeGlass: {
      bgGradient: 'linear(to-r, yellow.100, yellow.300 60%, orange.100)',
      color: 'gray.900',
      fontSize: { base: '1.3em', sm: '1.7em', md: '2.2em' },
      px: { base: 5, sm: 8, md: 10 },
      py: { base: 2.5, sm: 3, md: 3.5 },
      borderRadius: 'xl',
      mb: 5,
      boxShadow: '0 4px 24px 0 rgba(255, 193, 7, 0.16)',
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: 700,
      letterSpacing: '0.045em',
      textTransform: 'uppercase',
      zIndex: 1,
      border: '1.5px solid rgba(255,255,255,0.18)',
      backdropFilter: 'blur(8px) saturate(180%)',
      transition: 'box-shadow 0.3s',
    },
    awardCardGlass: {
      bg: 'rgba(32,34,37,0.82)',
      borderRadius: 'xl',
      boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18), 0 2px 12px 0 rgba(0,0,0,0.10)',
      p: { base: 5, sm: 7, md: 10 },
      position: 'relative',
      overflow: 'hidden',
      border: '1.5px solid rgba(255,255,255,0.10)',
      backdropFilter: 'blur(16px) saturate(180%)',
      transition: 'box-shadow 0.3s',
      color: 'white',
    },
    awardCardImageWrapper: {
      borderRadius: 'md',
      overflow: 'hidden',
      mb: 4,
      boxShadow: '0 1.5px 8px 0 rgba(0,0,0,0.06)',
    },
    awardEventHeading: {
      as: 'h2',
      size: 'lg',
      color: 'yellow.300',
      fontWeight: 'bold',
      mb: 1,
      letterSpacing: '-0.01em',
    },
    awardEventMeta: {
      color: 'gray.300',
      mb: 3,
      fontWeight: 500,
      fontSize: 'md',
    },
    awardEventDesc: {
      fontSize: { base: 'md', sm: 'lg' },
      color: 'gray.100',
      fontWeight: 400,
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'brand.900',
        color: 'brand.100',
        lineHeight: 'tall',
      },
      a: {
        color: 'accent.primary',
        _hover: {
          textDecoration: 'underline',
        },
      },
      ':root': {
        '--header-height': '80px',
        '--timeline-height': '48px',
        '--sticky-offset': 'calc(var(--header-height) + var(--timeline-height))',
      },
    },
  },
  components: {
    Button: defineStyleConfig({
      baseStyle: buttonBaseStyle,
      variants: {
        ...buttonVariants,
        headerNav: headerNavButton,
      },
    }),
    Card: defineStyleConfig({
      baseStyle: cardBaseStyle,
      variants: cardVariants,
    }),
    Container: defineStyleConfig({
      baseStyle: {
        maxW: { base: 'container.xl', '2xl': 'container.2xl' },
        px: { base: 4, md: 6, lg: 8 },
        py: { base: 8, md: 12, lg: 16 },
      },
    }),
  },
  textStyles: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 'shorter',
    },
    sectionTitle: {
      variant: 'heading',
      fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
      bgGradient: 'linear(to-r, brand.100, brand.300)',
      bgClip: 'text',
      mb: 4,
    },
    cardTitle: {
      variant: 'heading',
      fontSize: { base: 'lg', md: 'xl' },
      mb: 2,
    },
    cardDate: {
      color: 'brand.400',
      fontSize: 'sm',
      fontWeight: 'medium',
      textTransform: 'uppercase',
      letterSpacing: 'wider',
      mb: 2,
    },
    heroHeading: heroHeadingStyle,
    heroQuoteAuthor: heroQuoteAuthorStyle,
  },
  sectionStyles: {
    header: headerBaseStyle,
    hero: heroSectionStyle,
    statistics: statisticsSectionStyle,
  },
});

export default theme;
