import { Box, Image, Heading, Text, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

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

const SpectacleCard = ({ title, description, price, images, gradient, flex }: SpectacleCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const showArrows = images.length > 1;
  
  const arrowStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute' as const,
    top: '50%',
    width: '40px',
    height: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    zIndex: 1,
    _hover: {
      bg: 'rgba(0, 0, 0, 0.6)',
    },
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = images[currentImageIndex] || { url: placeholderImg, alt: title };
  const arrowSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box 
      layerStyle="eventCard" 
      h="100%" 
      display="flex" 
      flexDirection="column"
      flex={flex}
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
          background: gradient || 'linear-gradient(135deg, rgba(255,140,0,0.15), rgba(139, 69, 19, 0.1), rgba(0,0,0,0.05))',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: -1,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        },
        '&:hover::before': {
          background: gradient ? 
            gradient.replace('0.15', '0.25').replace('0.1', '0.2') : 
            'linear-gradient(135deg, rgba(255,140,0,0.25), rgba(139, 69, 19, 0.2), rgba(0,0,0,0.1))',
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
          }}
          transition="all 0.3s ease"
        >
          {showArrows && (
            <>
              <IconButton
                aria-label="Previous image"
                icon={<ChevronLeftIcon boxSize={6} />}
                {...arrowStyles}
                left={2}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                size={arrowSize}
              />
              <IconButton
                aria-label="Next image"
                icon={<ChevronRightIcon boxSize={6} />}
                {...arrowStyles}
                right={2}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                size={arrowSize}
              />
              <Box
                position="absolute"
                bottom="10px"
                left="50%"
                transform="translateX(-50%)"
                display="flex"
                gap="6px"
                zIndex={1}
              >
                {images.map((_, index) => (
                  <Box
                    key={index}
                    w="8px"
                    h="8px"
                    borderRadius="full"
                    bg={index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)'}
                    transition="all 0.3s"
                    _hover={{
                      bg: 'white',
                      transform: 'scale(1.2)'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    cursor="pointer"
                  />
                ))}
              </Box>
            </>
          )}
          <Image
            src={currentImage.url}
            fallbackSrc={placeholderImg}
            alt={currentImage.alt || title}
            w="100%"
            h="250px"
            objectFit="cover"
            transition="opacity 0.3s ease"
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
          {title}
        </Heading>
        <Text mt={2} color="#f0d680">{description}</Text>
        <Text mt={4} fontWeight="bold" color="#cd853f">{price}</Text>
      </Box>
    </Box>
  );
};

export default SpectacleCard;
