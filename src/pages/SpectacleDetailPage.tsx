import { useEffect } from 'react';
import { Box, Container, Heading, Text, Image, VStack, HStack, Button, Divider } from '@chakra-ui/react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// This data should ideally be fetched from a service or CMS
import { getSpectacles } from './CatalogPage';
import type { SpectacleImage } from '../components/SpectacleCard';

interface Spectacle {
  id: string;
  title: string;
  description: string;
  price: string;
  gradient: string;
  images: SpectacleImage[];
}

const MotionBox = motion.create(Box);

function SpectacleDetailPage() {
  const { t } = useTranslation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Use translation-aware spectacles
  const spectacles = getSpectacles(t);

  const { slug } = useParams<{ slug: string }>();
  const spectacle = spectacles.find(s =>
    s.id === slug ||
    s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  ) as Spectacle | undefined;

  if (!spectacle) {
    return (
      <Box textAlign="center" py={20}>
        <Text>{t('catalog.spectacleNotFound', 'Spectacle not found')}</Text>
        <Button as={RouterLink} to="/catalog" mt={4} colorScheme="orange">
          {t('catalog.backToCatalog', 'Back to Catalog')}
        </Button>
      </Box>
    );
  }

  const handleBooking = () => {
    const emailSubject = t('catalog.bookingEmailSubject', 'Booking Inquiry: {{title}}', { title: spectacle.title });
    const emailBody = t('catalog.bookingEmailBody', 'Hello,\n\nI am interested in booking the "{{title}}" performance.\n\nPlease provide me with more information about availability and pricing.\n\nBest regards', { title: spectacle.title });
    window.location.href = `mailto:management@guitarrasonline.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <Container maxW="container.lg" py={8} px={{ base: 4, md: 6, lg: 8 }}>
      <Button
        as={RouterLink}
        to="/catalog"
        leftIcon={<FaArrowLeft />}
        variant="ghost"
        colorScheme="orange"
        mb={8}
        pl={0}
      >
        {t('catalog.backToCatalog', 'Back to Catalog')}
      </Button>

      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <VStack spacing={8} align="stretch">
          {/* Hero Section */}
          <Box 
            position="relative" 
            borderRadius="xl" 
            overflow="hidden"
            boxShadow="xl"
            mb={8}
          >
            {spectacle.images && spectacle.images.length > 0 && (
              <Image
                src={spectacle.images[0].url}
                alt={spectacle.images[0].alt || spectacle.title}
                w="100%"
                h={{ base: '50vh', md: '60vh' }}
                objectFit="cover"
              />
            )}
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={8}
              bgGradient="linear(to-t, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)"
            >
              <Heading as="h1" size="2xl" color="white" mb={2}>
                {spectacle.title}
              </Heading>
              <HStack spacing={4} color="whiteAlpha.800">
                <HStack>
                  <FaCalendarAlt />
                  <Text>{t('catalog.duration', 'Duration: 60-90 min')}</Text>
                </HStack>
                <HStack>
                  <FaMapMarkerAlt />
                  <Text>{t('catalog.availability', 'Worldwide')}</Text>
                </HStack>
              </HStack>
            </Box>
          </Box>

          {/* Main Content */}
          <Box
            display={{ md: 'flex' }}
            gap={8}
            alignItems="flex-start"
          >
            {/* Left Column - Description */}
            <Box flex={2} mb={{ base: 8, md: 0 }}>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Heading as="h2" size="lg" mb={4} color="orange.300">
                    {t('catalog.aboutPerformance', 'About the Performance')}
                  </Heading>
                  <Text lineHeight="tall">
                    {spectacle.description}
                  </Text>
                </Box>

                <Divider borderColor="whiteAlpha.200" />

                <Box>
                  <Heading as="h2" size="lg" mb={4} color="orange.300">
                    {t('catalog.program', 'Program')}
                  </Heading>
                  <Text lineHeight="tall">
                    {t('catalog.programDescription', 'Each performance is carefully curated to the venue and audience. The program typically includes a selection of pieces that showcase the full range of {{title}}\'s artistic expression, from intimate solo pieces to dynamic ensemble works.', { title: spectacle.title })}
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Right Column - Booking */}
            <Box 
              flex={1} 
              position={{ base: 'static', md: 'sticky' }}
              top={{ base: 'auto', md: '100px' }}
              bg="rgba(255, 255, 255, 0.03)"
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.1)"
            >
              <VStack spacing={6} align="stretch">
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    {t('catalog.bookingInfo', 'Booking Information')}
                  </Text>
                  <Text color="gray.400" mb={4}>
                    {t('catalog.bookingDescription', 'For booking inquiries and availability, please contact us directly.')}
                  </Text>
                  <VStack spacing={4} align="stretch">
                    <Button 
                      leftIcon={<FaEnvelope />} 
                      colorScheme="orange"
                      onClick={handleBooking}
                      size="lg"
                      w="100%"
                    >
                      {t('catalog.sendBookingRequest', 'Send Booking Request')}
                    </Button>
                    <Button 
                      as="a"
                      href="mailto:management@guitarrasonline.com"
                      variant="outline"
                      colorScheme="orange"
                      size="lg"
                      w="100%"
                    >
                      {t('catalog.emailUs', 'Email Us')}
                    </Button>
                  </VStack>
                </Box>

                <Divider borderColor="whiteAlpha.200" />

                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={4}>
                    {t('catalog.performanceDetails', 'Performance Details')}
                  </Text>
                  <VStack spacing={3} align="stretch">
                    <Box>
                      <Text fontSize="sm" color="gray.400">{t('catalog.durationLabel', 'Duration')}</Text>
                      <Text>{t('catalog.durationValue', '60-90 minutes')}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.400">{t('catalog.technicalRequirements', 'Technical Requirements')}</Text>
                      <Text>{t('catalog.technicalRequirementsValue', 'Available upon request')}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.400">{t('catalog.availabilityLabel', 'Availability')}</Text>
                      <Text>{t('catalog.availabilityValue', 'Worldwide')}</Text>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Box>

          {/* Gallery Section */}
          {spectacle.images && spectacle.images.length > 1 && (
            <Box mt={12}>
              <Heading as="h2" size="lg" mb={6} color="orange.300">
                {t('catalog.gallery', 'Gallery')}
              </Heading>
              <Box
                display="grid"
                gridTemplateColumns={{
                  base: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)'
                }}
                gap={4}
              >
                {spectacle.images.slice(1).map((image, index) => (
                  <Box 
                    key={index} 
                    borderRadius="lg" 
                    overflow="hidden"
                    boxShadow="md"
                    _hover={{ transform: 'translateY(-4px)' }}
                    transition="transform 0.2s"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${spectacle.title} - Image ${index + 1}`}
                      w="100%"
                      h="250px"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default SpectacleDetailPage;
