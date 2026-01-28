import { Box, Text, HStack, Icon } from '@chakra-ui/react';
import { CalendarIcon, InfoIcon } from '@chakra-ui/icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import type { Event } from '../types/events';
import Card from "./Card";

const eventImageMap: Record<string, string> = {
  'Devenir': 'Devenir1.webp',
  'El Primer Llanto': 'ElPrimerLlanto1.webp',
  'Éxodo': 'Exodo1.webp',
  'Maestros del Arte Clásico Flamenco': 'MaestrosDelArteClasicoFlamenco1.webp',
  'Miradas': 'miradas1.webp'
};

const getRandomImage = () => {
  const images = Object.values(eventImageMap);
  return `/images/${images[Math.floor(Math.random() * images.length)]}`;
};

const getEventImage = (eventTitle: string): string => {
  const match = Object.entries(eventImageMap).find(([key]) => 
    eventTitle.toLowerCase().includes(key.toLowerCase())
  );
  return match ? `/images/${match[1]}` : getRandomImage();
};

interface EventCardProps {
  event: Event;
  variant?: 'event' | 'spectacle' | 'default';
  isPastEvent?: boolean;
}

const EventCard = ({ event, variant = 'event' }: EventCardProps) => {
  const eventDate = new Date(event.startDate);
  const isPastEvent = eventDate < new Date();
  const eventImage = event.media?.imageUrls?.[0] || getEventImage(event.eventName);
  
  return (
    <Card 
      variant={variant}
      title={event.eventName}
      imageUrl={eventImage}
      imageAlt={event.eventName}
      borderColor={isPastEvent ? 'rgba(160, 174, 192, 0.3)' : undefined}
      position="relative"
      opacity={isPastEvent ? 0.7 : 1}
      transition="opacity 0.2s ease-in-out"
      _hover={{
        opacity: isPastEvent ? 0.85 : 1,
        boxShadow: isPastEvent ? 'md' : 'lg'
      }}
      _before={isPastEvent ? {
        content: '"Past Event"',
        position: 'absolute',
        top: 2,
        right: 2,
        bg: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        fontSize: 'xs',
        px: 2,
        py: 1,
        borderRadius: 'md',
        zIndex: 2,
        backdropFilter: 'blur(4px)'
      } : {}}
    >
      <Box mb={4}>
        <HStack spacing={2} mb={3} color="text.accent">
          <Icon as={CalendarIcon} boxSize={4} />
          <Text fontSize="sm">
            {new Date(event.startDate).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </Text>
        </HStack>
        
        <HStack spacing={3} mb={event.description ? 3 : 0}>
          <HStack spacing={2} flexGrow={1}>
            <Icon as={FaMapMarkerAlt} boxSize={4} color="red.400" />
            <Box>
              {event.location.venue && (
                <Text fontWeight="bold" color="text.secondary" fontSize="sm" mb={1}>
                  {event.location.venue}
                </Text>
              )}
              {event.location.building && event.location.building !== event.location.venue && (
                <Text fontWeight="medium" color="text.secondary" fontSize="sm" mb={1}>
                  {event.location.building}
                </Text>
              )}
              <Text color="text.muted" fontSize="sm">
                {[event.location.city, event.location.country].filter(Boolean).join(', ')}
              </Text>
            </Box>
          </HStack>
        </HStack>
        
        {event.description && (
          <HStack spacing={2} mt={3} color="text.secondary">
            <Icon as={InfoIcon} boxSize={4} />
            <Text fontSize="sm" fontStyle="italic">
              {event.description}
            </Text>
          </HStack>
        )}
      </Box>
    </Card>
  );
};

export default EventCard;