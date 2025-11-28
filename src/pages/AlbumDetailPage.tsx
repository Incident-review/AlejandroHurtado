import { Box, Container, Heading, Text, Image, VStack, HStack, Link, Icon } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaSpotify, FaApple, FaDeezer, FaShoppingCart } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Album type
type Album = {
  slug: string;
  imageUrl: string;
  spotifyUrl: string;
  appleMusicUrl: string;
  deezerUrl?: string;
  purchaseUrl?: string;
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
    spotifyUrl: 'https://open.spotify.com/intl-es/album/724s9QHvml2PuuHAKSGGPj?si=Wpr7PjhzRWigpaFj0D0NCQ',
    appleMusicUrl: 'https://music.apple.com/es/album/tamiz/1696107483',
    deezerUrl: 'https://www.deezer.com/es/album/326614797',
    purchaseUrl: 'https://www.elflamencovive.com/spanish/alejandro-hurtado-tamiz-cd.html',
  },
  {
    slug: 'maestros-del-arte-clasico-flamenco',
    imageUrl: '/images/discography/portada-maestros.jpeg',
    spotifyUrl: 'https://open.spotify.com/intl-es/album/0DEiTTgDBrNTcKzJGoKqiw?si=2cmd9zNESTCiQhJaZ1zeTg',
    appleMusicUrl: 'https://music.apple.com/es/album/maestros-del-arte-cl%C3%A1sico-flamenco/1629017454',
    deezerUrl: 'https://www.deezer.com/es/album/326614797',
    purchaseUrl: 'https://www.elflamencovive.com/spanish/alejandro-hurtado-maestros-del-arte-clasico-flamenco-cd.html',
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
              
              <VStack spacing={4} w="100%">
                <HStack spacing={6} justify="center" w="100%" py={2}>
                  <Link href={album.spotifyUrl} isExternal _hover={{ textDecoration: 'none' }} title="Listen on Spotify">
                    <Icon as={FaSpotify} w={8} h={8} transition="all 0.2s" _hover={{ color: 'green.400' }} />
                  </Link>
                  <Link href={album.appleMusicUrl} isExternal _hover={{ textDecoration: 'none' }} title="Listen on Apple Music">
                    <Icon as={FaApple} w={8} h={8} transition="all 0.2s" _hover={{ color: 'red.400' }} />
                  </Link>
                  {album.deezerUrl && (
                    <Link href={album.deezerUrl} isExternal _hover={{ textDecoration: 'none' }} title="Listen on Deezer">
                      <Icon as={FaDeezer} w={8} h={8} transition="all 0.2s" _hover={{ color: 'blue.400' }} />
                    </Link>
                  )}
                </HStack>
                {album.purchaseUrl && (
                  <Link 
                    href={album.purchaseUrl} 
                    isExternal 
                    display="inline-flex" 
                    alignItems="center" 
                    bg="white" 
                    color="black" 
                    px={4} 
                    py={2} 
                    borderRadius="md" 
                    fontWeight="medium"
                    _hover={{ 
                      textDecoration: 'none',
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    transition="all 0.2s"
                  >
                    <Icon as={FaShoppingCart} mr={2} />
                    {t('albums.buyNow', 'Buy Now')}
                  </Link>
                )}
              </VStack>
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
