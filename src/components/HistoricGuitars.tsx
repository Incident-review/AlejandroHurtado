import { Box, SimpleGrid, Image, Text, Link, VStack, Heading, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

interface Guitar {
  id: string;
  name: string;
  year: string;
  imageUrl: string;
  description: string;
  videoUrl: string;
}

const guitars: Guitar[] = [
  {
    id: 'montoya-santos-1916',
    name: 'Santos Hernández (Montoya)',
    year: '1916',
    imageUrl: '/images/ElPrimerLlanto.jpeg', // Using existing image as placeholder
    description: 'Built by Santos Hernández in the workshop of Manuel Ramírez, this guitar belonged to Ramón Montoya.',
    videoUrl: 'https://www.youtube.com/watch?v=example1', // Replace with actual video URL
  },
  {
    id: 'huelva-santos-1937',
    name: 'Santos Hernández (Huelva)',
    year: '1937',
    imageUrl: '/images/MaestrosDelArteClasicoFlamenco.jpeg', // Using existing image as placeholder
    description: 'Built by Santos Hernández, this guitar belonged to Manolo de Huelva.',
    videoUrl: 'https://www.youtube.com/watch?v=example2', // Replace with actual video URL
  },
];

const MotionBox = motion(Box);

const HistoricGuitars = () => {
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 1;

  return (
    <Box py={12} px={4}>
      <VStack spacing={8} mb={12}>
        <Heading 
          as="h2" 
          size="2xl" 
          textAlign="center"
          bgGradient="linear(to-r, #8b7355, #cd853f)"
          bgClip="text"
        >
          Historic Guitars
        </Heading>
        <Text 
          fontSize="lg" 
          textAlign="center" 
          maxW="2xl"
          color="gray.300"
        >
          Explore the legendary instruments that have shaped the sound of flamenco guitar
        </Text>
      </VStack>

      <SimpleGrid columns={columns} spacing={8} mx="auto" maxW="1200px">
        {guitars.map((guitar) => (
          <Link 
            as={RouterLink} 
            href={guitar.videoUrl} 
            key={guitar.id}
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              borderRadius="lg"
              overflow="hidden"
              bg="blackAlpha.400"
              position="relative"
              boxShadow="xl"
            >
              <Image
                src={guitar.imageUrl}
                alt={guitar.name}
                w="100%"
                h="300px"
                objectFit="cover"
                transition="transform 0.2s"
              />
              <Box 
                p={6}
                bgGradient="linear(to-t, black, transparent)"
                position="absolute"
                bottom={0}
                left={0}
                right={0}
              >
                <Text 
                  fontSize="xl" 
                  fontWeight="bold"
                  color="white"
                  mb={1}
                >
                  {guitar.name}
                </Text>
                <Text 
                  fontSize="md" 
                  color="gray.300"
                  mb={2}
                >
                  {guitar.year}
                </Text>
                <Text 
                  fontSize="sm" 
                  color="gray.400"
                  noOfLines={2}
                >
                  {guitar.description}
                </Text>
              </Box>
            </MotionBox>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HistoricGuitars;