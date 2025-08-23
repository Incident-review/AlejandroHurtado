import { Box, Heading, Text, Stack, Divider } from '@chakra-ui/react';

const spectacles = [
  // Example spectacles, replace or expand as needed
  { title: 'Classical Recital', description: 'A journey through timeless classics.' },
  { title: 'Jazz Night', description: 'Smooth and energetic jazz performances.' },
  { title: 'Modern Fusion', description: 'A blend of contemporary and traditional sounds.' },
];

const CatalogPage = () => (
  <Box maxW="3xl" mx="auto" py={8} px={4}>
    <Heading as="h1" size="xl" mb={4} textAlign="center">Contact & Booking</Heading>
    <Box mb={8} p={4} borderWidth={1} borderRadius="lg" bg="gray.50" textAlign="center">
      <Text fontSize="lg" fontWeight="bold">Email: artist@email.com</Text>
      <Text fontSize="lg">Phone: +1 234 567 8901</Text>
      <Text fontSize="md" color="gray.600" mt={2}>For bookings and inquiries, please reach out via email or phone.</Text>
    </Box>
    <Divider my={6} />
    <Heading as="h2" size="lg" mb={4} textAlign="center">Spectacle Catalog</Heading>
    <Stack spacing={6}>
      {spectacles.map((spec, idx) => (
        <Box key={idx} p={4} borderWidth={1} borderRadius="md" bg="white" boxShadow="sm">
          <Heading as="h3" size="md" mb={2}>{spec.title}</Heading>
          <Text color="gray.700">{spec.description}</Text>
        </Box>
      ))}
    </Stack>
  </Box>
);

export default CatalogPage;
