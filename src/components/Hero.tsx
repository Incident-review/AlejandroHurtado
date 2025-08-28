import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import heroImage from '/public/images/imgAlejandro1.webp';
import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Constants
const QUOTE_DISPLAY_DURATION = 10000; // 10 seconds



// Types
type Quote = {
  text: string;
  author: string;
};

// Data
const QUOTES: Quote[] = [
  { text: 'Alejandro Hurtado Está llamado a ocupar un lugar de privilegio en el mundo de la guitarra flamenca.', author: 'Antonio Fernández Díaz, "Fosforito"' },
  { text: 'Como todos los grandes intérpretes, Alejandro Hurtado nos hace redescubrir composiciones de las que creíamos saberlo todo.', author: 'Claude Worms' },
  { text: 'Alejandro confirmó que es el futuro inminente y un guitarrista más efectivo de lo habitual.', author: 'Manuel Martín Martín' },
  { text: 'El alicantino es un tocaor de una calidad superior, de una dicción perfecta.', author: 'Alejandro Medina' },
];

const Hero = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Handle quote rotation
  const nextQuote = useCallback(() => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % QUOTES.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextQuote, QUOTE_DISPLAY_DURATION);
    return () => clearInterval(interval);
  }, [nextQuote]);

  return (
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
          top={{ base: '68%', md: '70%' }}
          left="50%"
          transform="translateX(-50%)"
          w="100%" 
          maxW={{ base: '90%', md: '80%' }}
          textAlign="center"
          p={{ base: 3, md: 4 }}
          borderRadius="2xl"
          backdropFilter="blur(15px)"
          border="1px solid"
          borderColor="rgba(139, 115, 85, 0.6)"
          boxShadow="2xl"
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
            color="#faf0c0" 
            fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
            lineHeight="1.4"
            fontWeight="medium"
            mb={2}
            px={2}
          >
            "{QUOTES[currentQuoteIndex].text}"
          </Text>
          <Text 
            color="#cd853f" 
            fontWeight="medium" 
            fontSize={{ base: 'xs', md: 'sm' }}
            fontStyle="italic"
          >
            - {QUOTES[currentQuoteIndex].author}
          </Text>
        </Box>

        {/* Catalog Button - positioned absolutely */}
        <Button
          as={RouterLink}
          to="/catalog"
          size={{ base: 'sm', md: 'md' }}
          colorScheme="yellow"
          variant="solid"
          borderRadius="full"
          boxShadow="xl"
          bg="rgba(139, 115, 85, 0.9)"
          color="#faf0c0"
          fontWeight="semibold"
          _hover={{ 
            bg: 'rgba(139, 115, 85, 0.9)'
          }}
          _active={{
            bg: 'rgba(139, 115, 85, 0.9)'
          }}
          border="2px solid"
          borderColor="#cd853f"
          backdropFilter="blur(10px)"
          fontSize={{ base: 'sm', md: 'md' }}
          px={{ base: 6, md: 8 }}
          py={{ base: 1, md: 2 }}
          position="absolute"
          left="50%"
          bottom={{ base: '15%', md: '15%' }}
          transform="translateX(-50%)"
          transition="none"
        >
          Catalog & Contact
        </Button>
      </Box>
    </Flex>
  );
};

export default Hero;
