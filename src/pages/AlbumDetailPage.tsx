import { Box, Container, Heading, Text, Image, VStack, HStack, Link, Icon } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaSpotify, FaApple } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Album type
type Album = {
  slug: string;
  imageUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
};

// Function to get album data
const getAlbums = (): Album[] => [
  {
    slug: 'el-primer-llanto',
    imageUrl: '/images/discography/portada-primer-llanto.jpg',
    spotifyUrl: 'https://open.spotify.com/album/3f6rzCyuCXylIkOQIqbWcl?si=R93CYCAETbW4PY_g0EMogQ',
    appleMusicUrl: '#',
  },
  {
    slug: 'tamiz',
    imageUrl: '/images/discography/portada-tamiz.jpeg',
    spotifyUrl: 'https://open.spotify.com/album/724s9QHvml2PuuHAKSGGPj?si=Ag3aOe6cRAWWriqgIMlR7A',
    appleMusicUrl: '#',
  },
  {
    slug: 'maestros-del-arte-clasico-flamenco',
    imageUrl: '/images/discography/portada-maestros.jpeg',
    spotifyUrl: 'https://open.spotify.com/album/0DEiTTgDBrNTcKzJGoKqiw?si=k8y0OC2QTD-4zBWD0zVnOg',
    appleMusicUrl: '#',
  },
];

const AlbumDetailPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const albums = getAlbums();
  const album = albums.find(a => a.slug === slug);

  if (!album) {
    return <Box>{t('albums.albumNotFound', 'Album not found')}</Box>;
  }

  // Get album details from translations
  const albumKey = album.slug; // Keep the original hyphenated slug
  const title = t(`albums.${albumKey}.title`, album.slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' '));
  const year = t(`albums.${albumKey}.year`, '');
  const description = t(`albums.${albumKey}.description`, '');
  
  return (
    <Box bg="black" color="white" minH="100vh">
      <Container maxW="container.lg" py={{ base: 6, md: 12 }}>
        <VStack spacing={{ base: 6, md: 10 }} align="stretch">
          <VStack spacing={{ base: 6, md: 10 }} align="center">
            <Image 
              src={album.imageUrl} 
              alt={title} 
              borderRadius="lg" 
              w={{ base: '100%', md: '400px' }} 
              h={{ base: 'auto', md: '400px' }} 
              objectFit="cover" 
              shadow="2xl" 
              aspectRatio="1"
            />
            <VStack align="center" spacing={4} maxW="3xl" mx="auto">
              <Heading 
                as="h1" 
                size="2xl" 
                textAlign="center"
                letterSpacing="tight"
                fontWeight="bold"
              >
                {title}
              </Heading>
              {year && (
                <Text 
                  fontSize="xl" 
                  color="gray.400"
                  textAlign="center"
                >
                  {year}
                </Text>
              )}
              
              <HStack 
                spacing={6} 
                justify="center"
                w="100%"
                py={4}
              >
                <Link href={album.spotifyUrl} isExternal _hover={{ textDecoration: 'none' }}>
                  <Icon as={FaSpotify} w={8} h={8} transition="all 0.2s" _hover={{ color: 'green.400' }} />
                </Link>
                <Link href={album.appleMusicUrl} isExternal _hover={{ textDecoration: 'none' }}>
                  <Icon as={FaApple} w={8} h={8} transition="all 0.2s" _hover={{ color: 'red.400' }} />
                </Link>
              </HStack>
            </VStack>
          </VStack>

          {description && (
            <Box 
              bg="rgba(255, 255, 255, 0.05)" 
              p={{ base: 6, md: 8 }}
              borderRadius="lg"
              maxW="4xl"
              mx="auto"
              w="100%"
            >
              <VStack spacing={6} align="stretch">
                <Heading 
                  as="h2" 
                  size="lg" 
                  textAlign="center"
                  letterSpacing="tight"
                  color="gray.300"
                >
                  {t('albums.aboutAlbum', 'About the Album')}
                </Heading>
                <Text
                  color="gray.200"
                  lineHeight="tall"
                  letterSpacing="wide"
                  fontSize={{ base: 'md', md: 'lg' }}
                  whiteSpace="pre-line"
                >
                  {description}
                </Text>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default AlbumDetailPage;
