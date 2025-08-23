import { Box, Heading, Text, VStack, Image, Badge, Button, Icon, useStyleConfig } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { events } from '../data/data';
import { FaTrophy, FaArrowLeft } from 'react-icons/fa';
import { motion as framerMotion } from 'framer-motion';

const MotionBox = framerMotion.create(Box);
const MotionBadge = framerMotion.create(Badge);

const getAwardShowcaseData = (awardName: string) => {
  return events.filter(event => event.awards.some(a => a.name === awardName));
};

const AwardShowcasePage = () => {
  const { awardName } = useParams<{ awardName: string }>();
  const navigate = useNavigate();
  const decodedAwardName = decodeURIComponent(awardName || '');
  const awardEvents = getAwardShowcaseData(decodedAwardName);
  const heroStyles = useStyleConfig('Box', { layerStyle: 'awardHeroGlass' });
  const trophyStyles = useStyleConfig('Box', { layerStyle: 'awardTrophyGlass' });
  const badgeStyles = useStyleConfig('Badge', { layerStyle: 'awardBadgeGlass' });
  const cardStyles = useStyleConfig('Box', { layerStyle: 'awardCardGlass' });
  const pageBgStyles = useStyleConfig('Box', { layerStyle: 'awardShowcaseBg' });
  const cardImageStyles = useStyleConfig('Box', { layerStyle: 'awardCardImageWrapper' });
  const eventHeadingStyles = useStyleConfig('Box', { layerStyle: 'awardEventHeading' });
  const eventMetaStyles = useStyleConfig('Box', { layerStyle: 'awardEventMeta' });
  const eventDescStyles = useStyleConfig('Box', { layerStyle: 'awardEventDesc' });

  if (!awardEvents.length) {
    return (
      <Box py={24} textAlign="center" minH="60vh" display="flex" flexDir="column" alignItems="center" justifyContent="center">
        <Heading size="2xl" color="gray.700" mb={4} fontWeight="semibold">Award Not Found</Heading>
        <Text color="gray.500" fontSize="lg">No events found for this award.</Text>
        <Button mt={10} colorScheme="teal" size="lg" leftIcon={<FaArrowLeft />} onClick={() => navigate('/awards')}>
          All Awards
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={pageBgStyles}>
      <VStack gap={12} align="stretch" maxW="container.md" mx="auto" py={{ base: 10, md: 20 }}>
        {/* Hero Section */}
        <MotionBox
          sx={heroStyles}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {/* Subtle Trophy BG */}
          <Box sx={trophyStyles}>
            <Icon as={FaTrophy} w={{ base: 44, md: 60 }} h={{ base: 44, md: 60 }} color="yellow.300" />
          </Box>
          {/* Award Badge */}
          <MotionBadge
            sx={badgeStyles}
            as={framerMotion.div}
            animate={{
              boxShadow: [
                '0 2px 16px 0 rgba(255, 193, 7, 0.18)',
                '0 4px 32px 4px rgba(255, 193, 7, 0.28)',
                '0 2px 16px 0 rgba(255, 193, 7, 0.18)',
              ],
            }}
            transition={{ repeat: Infinity, repeatType: 'loop', duration: 3.2, ease: 'easeInOut' }}
          >
            <Icon as={FaTrophy} mr={3} color="yellow.500" /> {decodedAwardName}
          </MotionBadge>
          <Heading
            as="h1"
            size="2xl"
            fontWeight="extrabold"
            letterSpacing="-0.02em"
            mb={2}
            zIndex={1}
            lineHeight={1.1}
          >
            {decodedAwardName}
          </Heading>
          <Text fontSize={{ base: 'lg', sm: 'xl' }} zIndex={1} fontWeight={500}>
            Showcase of all events where this award was received
          </Text>
        </MotionBox>
        {/* All Awards Button */}
        <Button alignSelf="center" colorScheme="teal" size="lg" variant="solid" onClick={() => navigate('/awards')} mb={2} px={8} py={6} fontWeight={600} fontSize="lg" boxShadow="0 2px 12px 0 rgba(0,0,0,0.08)">
          <Icon as={FaArrowLeft} mr={2} /> All Awards
        </Button>
        {/* Event Cards */}
        <VStack gap={8} align="stretch">
          {awardEvents.map((event, idx) => (
            <MotionBox
              key={event.eventNumber}
              sx={cardStyles}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + idx * 0.12, duration: 0.7, type: 'spring' }}
            >
              <Heading as="h2" sx={eventHeadingStyles}>{event.eventName}</Heading>
              <Text sx={eventMetaStyles}>
                {event.date} &mdash; {event.location.city}, {event.location.country}
              </Text>
              {event.image && (
                <Box sx={cardImageStyles}>
                  <Image
                    src={event.image}
                    alt={event.eventName}
                    w="100%"
                    maxH={{ base: '160px', sm: '220px', md: '260px' }}
                    objectFit="cover"
                  />
                </Box>
              )}
              <Text sx={eventDescStyles}>{event.description}</Text>
            </MotionBox>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default AwardShowcasePage;
