import { Box, Button, Flex, Heading, Stack, useTheme } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const HEADER_HEIGHT = 64; // Define your header height constant

const Header = () => {
  const theme = useTheme();
  const location = useLocation();
  const navLinks = [
    { to: '/', label: 'Home', match: /^\/$/ },
    { to: '/events', label: 'Events', match: /^\/events/ },
    { to: '/awards', label: 'Awards', match: /^\/awards/ },
    { to: '/catalog', label: 'Contact & Booking', match: /^\/catalog/ },
  ];

  return (
    <Box 
      as="header" 
      sx={{
        ...theme.sectionStyles.header,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        height: 'auto', // allow for column stacking
        minHeight: `${HEADER_HEIGHT}px`,
        '--header-height': `${HEADER_HEIGHT}px`,
        display: 'flex',
        alignItems: 'center',
        py: { base: 2, md: 4 },
        background: 'linear-gradient(90deg, #1a202c 0%, #319795 100%)',
        color: 'white',
        boxShadow: 'md',
      }}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        w="100%"
        h="100%"
        px={{ base: 2, md: 10 }}
        minW={0}
      >
        <Box
          minW={0}
          flexShrink={1}
          w={{ base: '100%', md: 'auto' }}
          mb={{ base: 2, md: 0 }}
          overflow="hidden"
        >
          <Heading 
            as="h1" 
            size={{ base: 'md', md: 'lg' }} 
            w="100%"
            textAlign={{ base: 'center', md: 'left' }}
            lineHeight={{ base: '1.2', md: '1.4' }}
            letterSpacing="wider"
            fontWeight="extrabold"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            The Artist
          </Heading>
        </Box>
        <Box flexGrow={1} minW={0}>
          <Stack
            direction="row"
            spacing={{ base: 1, md: 2 }}
            w="100%"
            justify={{ base: 'center', md: 'flex-end' }}
            align="center"
            flexWrap="nowrap"
            overflowX="auto"
            maxW="100%"
          >
            {navLinks.map(link => (
              <RouterLink to={link.to} key={link.to} style={{ display: 'flex' }}>
                <Button
                  variant={location.pathname.match(link.match) ? 'solid' : 'ghost'}
                  colorScheme={location.pathname.match(link.match) ? 'teal' : 'whiteAlpha'}
                  size={{ base: 'xs', md: 'sm' }}
                  px={{ base: 2, md: 3 }}
                  borderRadius="md"
                  fontWeight={location.pathname.match(link.match) ? 'bold' : 'normal'}
                  bg={location.pathname.match(link.match) ? 'whiteAlpha.300' : 'transparent'}
                  _hover={{ bg: location.pathname.match(link.match) ? 'whiteAlpha.400' : 'whiteAlpha.200' }}
                  transition="all 0.2s"
                  minW="min-content"
                  whiteSpace="nowrap"
                >
                  {link.label}
                </Button>
              </RouterLink>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
