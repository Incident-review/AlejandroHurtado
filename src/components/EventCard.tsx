import { Box, Image, Heading, Text } from '@chakra-ui/react';
import type { Event } from '../types/events';

const eventImageMap: Record<string, string> = {
  'Devenir': 'Devenir1.jpeg',
  'El Primer Llanto': 'ElPrimerLlanto1.JPG',
  'Éxodo': 'Exodo1.jpg',
  'Maestros del Arte Clásico Flamenco': 'MaestrosDelArteClasicoFlamenco1.jpg',
  'Miradas': 'miradas1.jpg'
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
}

const EventCard = ({ event }: EventCardProps) => {
  // Use the first image from event.media.imageUrls if available, otherwise use the event name to find a matching image
  const eventImage = event.media?.imageUrls?.[0] || getEventImage(event.eventName);
  
  return (
    <Box 
      layerStyle="eventCard" 
      h="100%" 
      display="flex" 
      flexDirection="column"
      bg="rgba(20, 10, 5, 0.2)"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      border="1px solid"
      borderColor="rgba(139, 115, 85, 0.2)"
      backdropFilter="blur(16px) saturate(180%)"
      position="relative"
      sx={{
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'xl',
        padding: '1px',
        background: 'linear-gradient(135deg, rgba(255,140,0,0.15), rgba(139, 69, 19, 0.1), rgba(0,0,0,0.05))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
        zIndex: -1,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      },
      '&:hover::before': {
        background: 'linear-gradient(135deg, rgba(255,140,0,0.25), rgba(139, 69, 19, 0.2), rgba(0,0,0,0.1))',
      }
      }}
      _hover={{
        transform: 'translateY(-6px) scale(1.01)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
        borderColor: 'rgba(205, 133, 63, 0.4)',
        bg: 'rgba(30, 15, 5, 0.3)'
      }}
    >
      <Box p={4} pb={2} position="relative">
      <Box
        position="relative"
        borderRadius="md"
        overflow="hidden"
        border="1px solid"
        borderColor="rgba(139, 115, 85, 0.6)"
        _hover={{
          borderColor: 'rgba(205, 133, 63, 0.8)',
          '& > div': {
            transform: 'scale(1.05)'
          }
        }}
        transition="all 0.3s ease"
      >
        <Image
          src={eventImage}
          alt={event.eventName}
          objectFit="cover"
          h="200px"
          w="100%"
          borderTopRadius="lg"
          fallbackSrc="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiB2aWV3Qm94PSIwIDAgNDAwIDI1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4ODgiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcgaW1hZ2UuLi48L3RleHQ+PC9zdmc+"
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)"
          pointerEvents="none"
        />
      </Box>
      </Box>
      <Box p={4} pt={2} flex="1" position="relative" zIndex="1">
      <Heading as="h3" textStyle="cardTitle" color="#faf0c0">
        {event.eventName}
      </Heading>
      <Text textStyle="cardDate" color="#cd853f" fontWeight="bold">
        {new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text fontWeight="bold" color="#f0d680">{event.location.building}</Text>
        <Text color="#e0c66a">{`${event.location.city}, ${event.location.country}`}</Text>
        {event.description && <Text mt={4} color="#f0d680">{event.description}</Text>}
      </Box>
    </Box>
  );
};

export default EventCard; 