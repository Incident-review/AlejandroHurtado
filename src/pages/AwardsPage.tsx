import { Box, Container, Heading, VStack, Text, Icon, SimpleGrid } from '@chakra-ui/react';
import { FaTrophy } from 'react-icons/fa';
import { getUniqueAwards } from '../utils/eventUtils';
import { events } from '../data/data';

const AwardsPage = () => {
  const uniqueAwards = getUniqueAwards(events);

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack gap={8} textAlign="center">
          <Heading as="h1" size="2xl">
            Awards & Recognitions
          </Heading>
          <Text fontSize="xl" maxW="2xl">
            A collection of notable awards and recognitions received over the years, celebrating milestones in the musical journey.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10} py={20}>
          {uniqueAwards.map((award) => (
            <Box
              as="a"
              href={`/awards/${encodeURIComponent(award.name)}`}
              key={award.name}
              bg="brand.700"
              borderRadius="lg"
              p={8}
              transition="box-shadow 0.2s, transform 0.2s"
              _hover={{ boxShadow: 'lg', transform: 'scale(1.03)', textDecoration: 'none' }}
              display="block"
              cursor="pointer"
            >
              <VStack gap={4} align="center">
                <Icon as={FaTrophy} w={10} h={10} color="yellow.400" />
                <Heading size="md">{award.name}</Heading>
                <Text fontSize="lg" color="brand.300">{award.year}</Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AwardsPage;
