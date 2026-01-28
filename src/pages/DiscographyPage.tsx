import { Box, Container, Heading, VStack, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Album data type
type Album = {
  slug: string;
  title: string;
  imageUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
};

// Function to get albums with translations
const getAlbums = (t: (key: string, defaultValue: string) => string): Album[] => [
  {
    slug: 'el-primer-llanto',
    title: t('discography.albums.elPrimerLlanto.title', 'El Primer Llanto'),
    imageUrl: '/images/discography/portada-primer-llanto.webp',
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },
  {
    slug: 'tamiz',
    title: t('discography.albums.tamiz.title', 'Tamiz'),
    imageUrl: '/images/discography/portada-tamiz.webp',
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },
  {
    slug: 'maestros-del-arte-clasico-flamenco',
    title: t('discography.albums.maestros.title', 'Maestros del Arte Clásico Flamenco'),
    imageUrl: '/images/discography/portada-maestros.webp',
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },
];

const DiscographyPage = () => {
  const { t } = useTranslation();
  const albums = getAlbums(t);

  // Helper function to get album title
  const getAlbumTitle = (slug: string) => {
    const baseKey = `albums.${slug.replace(/-/g, '.')}.title`;
    return t(baseKey, { defaultValue: slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1) 
    ).join(' ') });
  };

  // Helper function to get album year
  const getAlbumYear = (slug: string) => {
    const baseKey = `albums.${slug.replace(/-/g, '.')}.year`;
    return t(baseKey, { defaultValue: '' });
  };
  return (
    <Container maxW="container.xl" py={10} bg="transparent">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {albums.map((album, index) => {
          const albumTitle = getAlbumTitle(album.slug);
          const albumYear = getAlbumYear(album.slug);
          
          return (
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
              height="300px"
            >
              <Image 
                src={album.imageUrl} 
                alt={albumTitle} 
                objectFit="cover" 
                w="100%" 
                h="100%"
                loading="lazy"
                decoding="async"
                htmlWidth={800}
                htmlHeight={600}
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
                <Heading as="h3" size="md">{albumTitle}</Heading>
                {albumYear && <Text fontSize="lg" opacity={0.8}>{albumYear}</Text>}
              </VStack>
            </Box>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default DiscographyPage;
