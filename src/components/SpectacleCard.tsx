import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Card from "./Card";

const placeholderImg = 'https://placehold.co/400x250/png?text=No+Image';

export interface SpectacleImage {
  url: string;
  alt?: string;
}

export interface SpectacleCardProps {
  title: string;
  description: string;
  price: string;
  images: SpectacleImage[];
  gradient?: string;
  flex?: number | string;
}

const SpectacleCard = ({ 
  title, 
  description, 
  price, 
  images, 
  gradient, 
  flex 
}: SpectacleCardProps) => {
  const [currentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex] || { url: placeholderImg, alt: title };

  // The Card component now handles the image display

  return (
    <Card 
      variant="spectacle"
      title={title}
      imageUrl={currentImage.url}
      imageAlt={currentImage.alt || title}
      gradient={gradient}
      flex={flex}
      imageHeight="250px"
    >
      <Box mb={4}>
        <Text as="div" color="#f0d680">
          {description}
        </Text>
      </Box>
      <Box>
        <Text as="div" fontWeight="bold" color="#cd853f">
          {price}
        </Text>
      </Box>
    </Card>
  );
};

export default SpectacleCard;
