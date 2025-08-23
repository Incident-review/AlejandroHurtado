import { Box, Button, Flex, Heading, Image, Text, useTheme } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { useEffect, useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Constants
const QUOTE_DISPLAY_DURATION = 5000; // 5 seconds
// Animation duration is handled by the CSS animation

// Animation
const fadeInOut = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { opacity: 0; }
`;

// Types
type Quote = {
  text: string;
  author: string;
};

// Data
const QUOTES: Quote[] = [
  { text: 'Music is the shorthand of emotion.', author: 'Leo Tolstoy' },
  { text: 'Where words fail, music speaks.', author: 'Hans Christian Andersen' },
  { text: 'Life seems to go on without effort when I am filled with music.', author: 'George Eliot' },
];

const Hero = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const theme = useTheme();

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
      align="center"
      justify="center"
      sx={theme.sectionStyles.hero}
    >
      <Box flex="1" p={4} position="relative">
        <Image
          src="https://placehold.co/1920x1080/1A202C/FFFFFF?text=Hero+Image"
          alt="Artist performing"
          layerStyle="heroImage"
        />
        <Button
          as={RouterLink}
          to="/catalog"
          size="sm"
          colorScheme="teal"
          variant="solid"
          position="absolute"
          bottom={{ base: 2, md: 4 }}
          right={{ base: 2, md: 4 }}
          borderRadius="full"
          boxShadow="md"
          _hover={{ bg: 'teal.600' }}
        >
          Catalog & Contact
        </Button>
      </Box>
      <Box flex="1" p={4} overflow="hidden" h="150px">
        <Box
          key={currentQuoteIndex}
          animation={`${fadeInOut} 5s ease-in-out forwards`}
        >
          <Heading as="h2" textStyle="heroHeading">
            "{QUOTES[currentQuoteIndex].text}"
          </Heading>
          <Text textStyle="heroQuoteAuthor">
            - {QUOTES[currentQuoteIndex].author}
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Hero;
