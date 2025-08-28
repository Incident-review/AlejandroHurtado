import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const navLinks = [
  { to: '/', label: 'Home', match: /^\/$/ },
  { to: '/events', label: 'Events', match: /^\/events/ },
  { to: '/discography', label: 'Discography', match: /^\/discography/ },
  { to: '/catalog', label: 'Contact & Booking', match: /^\/catalog/ },
];

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Don't add scroll listener if we're on the home page
    if (isHomePage) {
      setIsTitleVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const scrollThreshold = 5;
      const scrollDelta = 5;
      
      // Always show header when at the top of the page
      if (currentScrollPos < scrollThreshold) {
        setIsTitleVisible(true);
      } else {
        // Only update visibility when scrolling up/down significantly
        if (Math.abs(prevScrollPos - currentScrollPos) > scrollDelta) {
          setIsTitleVisible(isScrollingUp);
        }
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isHomePage]);

  return (
    <Box 
      as="header" 
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={1300}
      w="100%"
      bg="rgba(0, 0, 0, 0.8)"
      color="white"
      boxShadow="xl"
      backdropFilter="blur(10px)"
      transition="transform 0.3s ease-in-out"
      transform={isTitleVisible ? 'translateY(0)' : 'translateY(-50px)'}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
        justify="space-between"
        w="100%"
        h="100%"
        px={{ base: 4, md: 6 }}
        gap={{ base: 3, md: 4 }}
        minW={0}
        py={{ base: 3, md: 2 }}
      >
        {/* Site Title - Only shown on homepage */}
        {isHomePage && (
          <Box
            w="100%"
            textAlign="center"
            py={2}
            borderBottom="1px solid"
            borderColor="whiteAlpha.200"
            transition="all 0.3s ease-in-out"
            transform={isTitleVisible ? 'translateY(0)' : 'translateY(-100%)'}
            opacity={isTitleVisible ? 1 : 0}
            height={isTitleVisible ? 'auto' : '0'}
            overflow="hidden"
            position="relative"
          >
            <Heading 
              as="h1" 
              size={{ base: 'md', md: 'lg' }}
              whiteSpace="nowrap"
              overflow="hidden"
              lineHeight="shorter"
              letterSpacing="wider"
              fontWeight="extrabold"
              textOverflow="ellipsis"
              display="inline-block"
              width="auto"
              maxW="100%"
            >
              Alejandro Hurtado
            </Heading>
          </Box>
        )}

        {/* Navigation - Always visible */}
        <Box 
          w="100%"
          overflowX="auto"
          py={2}
          minH="50px"
          display="flex"
          alignItems="center"
          px={{ base: 2, md: 0 }}
          mx="-8px"
          css={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Stack
            as="nav"
            direction="row"
            spacing={{ base: 2, md: 6 }}
            justify="space-between"
            align="center"
            h="100%"
            w="100%"
            px={{ base: 2, md: 4 }}
          >
            {navLinks.map(link => (
              <RouterLink 
                to={link.to} 
                key={link.to} 
                style={{ 
                  display: 'flex', 
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flex: 1
                }}
              >
                <Box
                  as="span"
                  position="relative"
                  px={{ base: 1, md: 3 }}
                  py={2}
                  mx={{ base: 0, md: 1 }}
                  fontSize={{ base: 'xs', md: 'md' }}
                  fontWeight="medium"
                  color={link.match.test(location.pathname) ? '#faf0c0' : 'whiteAlpha.800'}
                  transition="all 0.2s"
                  _hover={{
                    color: '#faf0c0',
                    '&::after': {
                      width: '100%',
                      opacity: 0.8
                    }
                  }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: link.match.test(location.pathname) ? '100%' : '0%',
                    height: '2px',
                    bg: '#cd853f',
                    transition: 'all 0.3s ease',
                    opacity: link.match.test(location.pathname) ? 0.8 : 0
                  }}
                  _focus={{
                    outline: 'none',
                    color: '#f0d9b5',
                    '&::after': {
                      width: '100%',
                      opacity: 0.8,
                      bg: '#d4a76a'
                    }
                  }}
                  sx={{
                    '&.active': {
                      color: '#f0d9b5',
                      '&::after': {
                        width: '100%',
                        opacity: 0.8,
                        bg: '#d4a76a'
                      }
                    },
                    '&:focus-visible': {
                      outline: 'none',
                      color: '#f0d9b5',
                      '&::after': {
                        width: '100%',
                        opacity: 0.8,
                        bg: '#d4a76a'
                      }
                    }
                  }}
                  className={location.pathname.match(link.match) ? 'active' : ''}
                >
                  {link.label}
                  <Box
                    className="nav-underline"
                    position="absolute"
                    bottom={0}
                    left="50%"
                    transform="translateX(-50%)"
                    w={location.pathname.match(link.match) ? '100%' : '0%'}
                    h="2px"
                    bg="#d4a76a"
                    opacity={location.pathname.match(link.match) ? 1 : 0}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    borderRadius="full"
                  />
                </Box>
              </RouterLink>
            ))}
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
