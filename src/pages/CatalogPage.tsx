import { Box, Heading, Text, SimpleGrid, VStack, Button, useBreakpointValue, Link as ChakraLink } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SpectacleCard from '../components/SpectacleCard';
import type { SpectacleImage } from '../components/SpectacleCard';

const MotionBox = motion.create(Box);

interface Spectacle {
  id: string;
  title: string;
  description: string;
  price: string;
  gradient: string;
  images: SpectacleImage[];
}

// Translation-aware function to get spectacles data
export const getSpectacles = (t: any): Spectacle[] => [
  {
    id: 'devenir',
    title: t('catalog.spectacles.devenir.title', 'Devenir'),
    description: t('catalog.spectacles.devenir.description', 'A dialogue between the guitar and the dance, where the guitar intertwines the deepest flamenco with classical discipline, paving the way for new aesthetics, while the dance reveals what the music suggests.'),
    price: t('catalog.contactForPricing', 'Contact for pricing'),
    gradient: 'linear-gradient(135deg, rgba(199, 144, 129, 0.2), rgba(223, 165, 121, 0.2))',
    images: [
      { url: '/images/Devenir1.jpeg', alt: t('catalog.spectacles.devenir.image1Alt', 'Classical guitar performance') },
      { url: '/images/Devenir2.jpg', alt: t('catalog.spectacles.devenir.image2Alt', 'Concert hall performance') },
    ]
  },
  {
    id: 'el-primer-llanto',
    title: t('catalog.spectacles.elPrimerLlanto.title', 'El primer llanto'),
    description: t('catalog.spectacles.elPrimerLlanto.description', 'Presentation of his latest album, featuring his most recent compositions, which showcase his multiple facets that make him a unique and different musician.'),
    price: t('catalog.contactForPricing', 'Contact for pricing'),
    gradient: 'linear-gradient(135deg, rgba(139, 115, 85, 0.2), rgba(205, 133, 63, 0.2))',
    images: [
      { url: '/images/ElPrimerLlanto1.JPG', alt: t('catalog.spectacles.elPrimerLlanto.image1Alt', 'Jazz quartet performance') },
      { url: '/images/ElPrimerLlanto2.JPG', alt: t('catalog.spectacles.elPrimerLlanto.image2Alt', 'Jazz club atmosphere') },
    ]
  },
  {
    id: 'exodo',
    title: t('catalog.spectacles.exodo.title', 'Éxodo'),
    description: t('catalog.spectacles.exodo.description', 'Alejandro shows us here the music that the great guitar masters performed beyond our borders. This concert is a testament to the courage and resilience of those who kept the flame of flamenco alive abroad.'),
    price: t('catalog.contactForPricing', 'Contact for pricing'),
    gradient: 'linear-gradient(135deg, rgba(184, 134, 11, 0.2), rgba(218, 165, 32, 0.2))',
    images: [
      { url: '/images/Exodo1.jpg', alt: t('catalog.spectacles.exodo.image1Alt', 'Fusion band performance') },
      { url: '/images/Exodo2.jpg', alt: t('catalog.spectacles.exodo.image2Alt', 'Modern concert setup') },
    ]
  },
  {
    id: 'maestros-del-arte-clasico-flamenco',
    title: t('catalog.spectacles.maestrosDelArte.title', 'Maestros del Arte Clásico Flamenco'),
    description: t('catalog.spectacles.maestrosDelArte.description', 'A unique blend of contemporary and traditional sounds, creating an innovative musical experience. Great for modern venues and cultural events.'),
    price: t('catalog.contactForPricing', 'Contact for pricing'),
    gradient: 'linear-gradient(135deg, rgba(184, 134, 11, 0.2), rgba(218, 165, 32, 0.2))',
    images: [
      { url: '/images/MaestrosDelArteClasicoFlamenco1.jpg', alt: t('catalog.spectacles.maestrosDelArte.image1Alt', 'Fusion band performance') },
      { url: '/images/MaestrosDelArteClasicoFlamenco2.jpeg', alt: t('catalog.spectacles.maestrosDelArte.image2Alt', 'Modern concert setup') },
    ]
  },

];

import { useMemo } from 'react';

function CatalogPage() {
  const { t } = useTranslation();
  
  const spectacles = useMemo(() => getSpectacles(t), [t]);

  const handleBooking = (spectacle: typeof spectacles[0]) => {
    const emailSubject = t('catalog.bookingEmailSubject', 'Booking Inquiry: {{title}}', { title: spectacle.title });
    const emailBody = t('catalog.bookingEmailBody', 'Hello,\n\nI am interested in booking the "{{title}}" performance.\n\nPlease provide me with more information about availability and pricing.\n\nBest regards', { title: spectacle.title });

    const mailtoLink = `mailto:management@guitarrasonline.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 }) || 3;

  return (
    <Box maxW="7xl" mx="auto" py={8} px={{ base: 4, md: 6, lg: 8 }} minH="100vh">
      <VStack spacing={8} mb={{ base: 8, md: 16 }}>
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading 
            as="h1" 
            size="2xl" 
            textAlign="center"
            bgGradient="linear(to-r, #8b7355, #cd853f)"
            bgClip="text"
            letterSpacing="tight"
            mb={6}
            lineHeight="tall"
          >
            {t('catalog.title', 'Spectacle Catalog')}
          </Heading>
          <Text 
            textAlign="center" 
            maxW="2xl" 
            mx="auto" 
            color="gray.300"
            fontSize="lg"
            mb={8}
          >
            {t('catalog.subtitle', 'Explore our diverse range of musical performances. Each show is a unique experience, carefully crafted to captivate and inspire your audience.')}
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          w="100%"
          maxW="4xl"
        >
          <Box 
            p={6} 
            borderRadius="xl" 
            bg="rgba(255, 255, 255, 0.03)"
            backdropFilter="blur(10px)"
            boxShadow="xl"
            textAlign="center"
            border="1px solid"
            borderColor="rgba(139, 115, 85, 0.2)"
            _hover={{
              borderColor: 'rgba(205, 133, 63, 0.4)',
              bg: 'rgba(30, 15, 5, 0.1)'
            }}
            transition="all 0.3s ease"
          >
            <VStack spacing={3}>
              <Text fontSize="xl" fontWeight="bold" color="#f5f5dc">
                {t('catalog.contactEmail', 'management@guitarrasonline.com')}
              </Text>
              <Text fontSize="xl" color="#f5f5dc">{t('catalog.contactPhone', '+34 605 671 785')}</Text>
              <Text fontSize="md" color="gray.400" mt={2}>
                {t('catalog.contactInfo', 'For bookings and inquiries, please don\'t hesitate to reach out.')}
              </Text>
              <Button
                as="a"
                href="mailto:management@guitarrasonline.com"
                mt={4}
                size="md"
                colorScheme="orange"
                variant="outline"
                _hover={{
                  bg: 'rgba(205, 133, 63, 0.1)',
                  transform: 'translateY(-2px)'
                }}
              >
                {t('catalog.sendEmail', 'Send an Email')}
              </Button>
            </VStack>
          </Box>
        </MotionBox>
      </VStack>

      <SimpleGrid 
        columns={columns} 
        spacing={{ base: 16, md: 8 }}
        position="relative"
        pb={20}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(205, 133, 63, 0.05) 0%, transparent 70%)',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      >
        {spectacles.map((spec, idx) => (
          <MotionBox
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Box 
              display="flex" 
              flexDirection="column" 
              h="100%"
              position="relative"
              pb={2}
              paddingTop={12}
            >
              <ChakraLink 
                as={RouterLink} 
                to={`/catalog/${spec.id}`}
                _hover={{ textDecoration: 'none' }}
              >
                <SpectacleCard 
                  title={spec.title}
                  description={spec.description}
                  price={spec.price}
                  images={spec.images}
                  gradient={spec.gradient}
                  flex={1}
                />
              </ChakraLink>
              <Box 
                position={{ base: 'absolute', md: 'static' }}
                bottom={{ base: -12, md: 0 }}
                left={0}
                right={0}
                px={{ base: 4, md: 0 }}
                zIndex={2}
                mt={{ base: 0, md: 4 }}
              >
                <Button
                  onClick={() => handleBooking(spec)}
                  size="md"
                  colorScheme="orange"
                  variant="outline"
                  w="100%"
                  _hover={{
                    bg: 'rgba(205, 133, 63, 0.1)',
                    transform: 'translateY(-2px)'
                  }}
                >
                  {t('catalog.bookButton', 'Book {{title}}', { title: spec.title })}
                </Button>
              </Box>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CatalogPage;
