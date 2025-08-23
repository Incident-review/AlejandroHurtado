import { Box, Image, Heading, Text } from '@chakra-ui/react';
import type { Event } from '../types/events';

const placeholderImg = 'https://placehold.co/400x250/png?text=No+Image';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => (
  <Box layerStyle="eventCard" h="100%" display="flex" flexDirection="column">
    <Box p={4} pb={2}>
      <Image
        src={event.image || placeholderImg}
        fallbackSrc={placeholderImg}
        alt={event.eventName}
        w="100%"
        objectFit="cover"
        borderRadius="md"
        bg="gray.200"
        border="1px solid"
        borderColor="gray.300"
      />
    </Box>
    <Box p={4} pt={2} flex="1">
      <Heading as="h3" textStyle="cardTitle">
        {event.eventName}
      </Heading>
      <Text textStyle="cardDate">
        {new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text fontWeight="bold">{event.location.building}</Text>
      <Text>{`${event.location.city}, ${event.location.country}`}</Text>
      {event.description && <Text mt={4}>{event.description}</Text>}
    </Box>
  </Box>
);

export default EventCard; 