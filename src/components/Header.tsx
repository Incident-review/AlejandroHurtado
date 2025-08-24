import { Box, Flex, Heading, Stack, useTheme } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const HEADER_HEIGHT = 64; 

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
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={1300}
      height={`${HEADER_HEIGHT}px`}
      minH={`${HEADER_HEIGHT}px`}
      w="100%"
      sx={{
        '--header-height': `${HEADER_HEIGHT}px`,
        display: 'flex',
        alignItems: 'center',
        py: { base: 2, md: 4 },
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        boxShadow: 'xl',
        backdropFilter: 'blur(10px)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(1px 1px at 10px 20px, rgba(139, 115, 85, 0.06), transparent),
            radial-gradient(1px 1px at 30px 40px, rgba(205, 133, 63, 0.04), transparent),
            radial-gradient(2px 2px at 50px 60px, rgba(184, 134, 11, 0.03), transparent),
            radial-gradient(1px 1px at 70px 80px, rgba(139, 115, 85, 0.04), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px',
          zIndex: 0,
        }
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
            Alejandro Hurtado
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
              <RouterLink to={link.to} key={link.to} style={{ display: 'flex', textDecoration: 'none' }}>
                <Box
                  position="relative"
                  px={{ base: 3, md: 4 }}
                  py={2}
                  mx={1}
                  color="white"
                  fontWeight="medium"
                  fontSize={{ base: 'sm', md: 'md' }}
                  transition="all 0.2s"
                  _hover={{
                    color: '#f0d9b5',
                    '& .nav-underline': {
                      width: '100%',
                      opacity: 1,
                      bg: '#d4a76a'
                    }
                  }}
                  _focus={{
                    outline: 'none',
                    color: '#f0d9b5',
                    '& .nav-underline': {
                      width: '100%',
                      opacity: 1,
                      bg: '#d4a76a'
                    }
                  }}
                  sx={{
                    '&.active': {
                      color: '#f0d9b5',
                      '& .nav-underline': {
                        width: '100%',
                        opacity: 1,
                        bg: '#d4a76a'
                      }
                    },
                    '&:focus-visible': {
                      outline: 'none',
                      color: '#f0d9b5',
                      '& .nav-underline': {
                        width: '100%',
                        opacity: 1,
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
