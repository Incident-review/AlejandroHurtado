import { Box, Container, Heading, VStack, Text, Image, SimpleGrid } from '@chakra-ui/react';

// Placeholder data for albums
import { Link as RouterLink } from 'react-router-dom';

// Album data
const albums = [
  {
    title: 'El Primer Llanto',
    slug: 'el-primer-llanto',
    year: 2025,
    imageUrl: '/images/discography/portada-primer-llanto.jpg',
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },
  {
    title: 'Tamiz',
    slug: 'tamiz',
    year: 2023,
    imageUrl: '/images/discography/portada-tamiz.jpeg',
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },
  {
    title: 'Maestros Del Arte Clasico Flamenco',
    slug: 'maestros-del-arte-clasico-flamenco',
    year: 2022,
    imageUrl: '/images/discography/portada-maestros.jpeg',
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },

];

const DiscographyPage = () => {
  return (
    <Container maxW="container.xl" py={10} bg="transparent">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {albums.map((album, index) => (
          <Box
            key={index}
            as={RouterLink}
            to={`/discography/${album.slug}`}
            position="relative"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            transition="all 0.3s ease-in-out"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: '2xl',
            }}
            height="300px" // Set a fixed height for uniform card size
          >
            <Image 
              src={album.imageUrl} 
              alt={album.title} 
              objectFit="cover" 
              w="100%" 
              h="100%"
              fallbackSrc="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4ODgiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcgYWxidW0gY292ZXIuLi48L3RleHQ+PC9zdmc+"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4ODgiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
              }}
            />
            <VStack
              position="absolute"
              bottom="0"
              left="0"
              right="0"
              p={4}
              align="start"
              spacing={1}
              bgGradient="linear(to-t, blackAlpha.800, transparent)"
              color="white"
            >
              <Heading as="h3" size="md">{album.title}</Heading>
              <Text fontSize="lg" opacity={0.8}>{album.year}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default DiscographyPage;
