import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import heroImage from '/images/imgAlejandro1.webp';
import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Constants
const QUOTE_DISPLAY_DURATION = 10000; // 10 seconds

const Hero = () => {
  const { t } = useTranslation();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  // Get quotes based on current language
  const quotes = [
    { text: t('hero.quotes.quote1.text'), author: t('hero.quotes.quote1.author') },
    { text: t('hero.quotes.quote2.text'), author: t('hero.quotes.quote2.author') },
    { text: t('hero.quotes.quote3.text'), author: t('hero.quotes.quote3.author') },
    { text: t('hero.quotes.quote4.text'), author: t('hero.quotes.quote4.author') },
  ];

  // Handle quote rotation
  const nextQuote = useCallback(() => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  }, [quotes.length]);

  useEffect(() => {
    const interval = setInterval(nextQuote, QUOTE_DISPLAY_DURATION);
    return () => clearInterval(interval);
  }, [nextQuote]);

  return (
    <>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
        `}
      />
      <Flex
        direction={{ base: 'column', md: 'row' }}
      align="flex-start"
      justify="flex-start"
      minH="auto"
      position="relative"
      overflow="hidden"
      h={`calc(100vh - var(--header-height, 64px))`}
      bg="transparent"
      sx={{
        background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1b0f 20%, #4a2d1a 35%, #6b4c2e 50%, #8b6b3a 65%, #a88a4a 80%, #c4a85a 90%, #e0c66a 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(139, 115, 85, 0.08), transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(205, 133, 63, 0.06), transparent 60%),
            radial-gradient(circle at 40% 80%, rgba(184, 134, 11, 0.04), transparent 55%)
          `,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(2px 2px at 20px 30px, rgba(139, 115, 85, 0.05), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(205, 133, 63, 0.04), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(184, 134, 11, 0.03), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(139, 115, 85, 0.02), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(205, 133, 63, 0.03), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          zIndex: 0,
        }
      }}
    >
      {/* Imagen principal que ocupa casi toda la pantalla */}
      <Box 
        position="relative"
        w="100%"
        h="100%"
        zIndex={1}
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="-20%"
          left={0}
          right={0}
          bottom={0}
        >
          <Image
            src={heroImage}
            alt="Artist performing"
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="center 30%"
          />
        </Box>
        {/* Overlay sutil para mejorar legibilidad */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(26, 15, 10, 0.2)"
          zIndex={2}
        />
      </Box>

      {/* Main content container */}
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={3}>
        <Box 
          position="absolute"
          top={{ base: '50%', md: '55%' }}
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%" 
          maxW={{ base: '90%', md: '80%' }}
          textAlign="center"
          p={{ base: 4, md: 6 }}
          borderRadius="2xl"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="rgba(205, 170, 125, 0.4)"
          bg="rgba(30, 20, 10, 0.7)"
          boxShadow="dark-lg"
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.1) 0%, rgba(205, 133, 63, 0.05) 100%)',
              borderRadius: 'inherit',
              zIndex: -1,
            }
          }}
        >
          <Text 
            as="blockquote"
            color="#ffffff" 
            fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
            lineHeight="1.6"
            fontFamily="'Cormorant Garamond', serif"
            fontWeight={400}
            fontStyle="italic"
            mb={4}
            px={2}
            textShadow="0 2px 4px rgba(0,0,0,0.5)"
          >
            "{quotes[currentQuoteIndex].text}"
          </Text>
          <Text 
            color="#f8e5b5" 
            fontFamily="'Cormorant Garamond', serif"
            fontWeight={600}
            fontSize={{ base: 'md', md: 'lg' }}
            fontStyle="normal"
            letterSpacing="0.05em"
            textTransform="uppercase"
            textShadow="0 1px 2px rgba(0,0,0,0.5)"
          >
            - {quotes[currentQuoteIndex].author}
          </Text>
        </Box>

        {/* Catalog Button - positioned absolutely */}
        <Button
          as={RouterLink}
          to="/catalog"
          size={{ base: 'md', md: 'lg' }}
          colorScheme="yellow"
          variant="solid"
          borderRadius="full"
          boxShadow="xl"
          bg="rgba(139, 115, 85, 0.9)"
          color="#faf0c0"
          fontWeight="semibold"
          border="2px solid"
          borderColor="#cd853f"
          backdropFilter="blur(10px)"
          fontSize={{ base: 'md', md: 'lg' }}
          px={{ base: 8, md: 10 }}
          py={{ base: 6, md: 2 }}
          position="absolute"
          left="50%"
          bottom={{ base: '20%', md: '20%' }}
          transform="translateX(-50%)"
          _hover={{
            transform: 'translateX(-50%)',
            boxShadow: 'xl',
            bg: 'rgba(139, 115, 85, 0.9)'
          }}
          _active={{
            transform: 'translateX(-50%)',
            boxShadow: 'xl',
            bg: 'rgba(139, 115, 85, 0.9)'
          }}
        >
          {t('hero.catalogButton')}
        </Button>
      </Box>
    </Flex>
    </>
  );
};

export default Hero;
