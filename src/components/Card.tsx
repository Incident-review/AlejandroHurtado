import { Box, Image, Heading, Text, forwardRef, useStyleConfig } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export interface CardProps extends BoxProps {
  title?: string;
  description?: string | ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  imageHeight?: string | number;
  variant?: 'default' | 'event' | 'spectacle';
  children?: ReactNode;
  footer?: ReactNode;
  gradient?: string;
}

const Card = forwardRef<CardProps, 'div'>(({
  title,
  description,
  imageUrl,
  imageAlt,
  imageHeight = '200px',
  variant = 'default',
  children,
  footer,
  gradient,
  ...props
}, ref) => {
  const styles = useStyleConfig('Card', { variant }) as { container: Record<string, unknown> };
  
  // Merge custom border color with styles
  const containerStyles = {
    ...styles.container,
    borderColor: props.borderColor || styles.container.borderColor,
  };

  return (
    <Box
      ref={ref}
      as="article"
      __css={{
        ...containerStyles,
        bg: 'rgba(26, 32, 44, 0.7)',
        backdropFilter: 'blur(10px)',
        border: '1px solid',
        borderColor: containerStyles.borderColor || 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        _hover: {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
          borderColor: containerStyles.borderColor || 'rgba(255, 255, 255, 0.2)',
        },
      }}
      {...props}
    >
      {imageUrl && (
        <Box p={4} pb={2} position="relative">
          <Box
            position="relative"
            borderRadius="md"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.15)"
            bg="rgba(255, 255, 255, 0.05)"
            backdropFilter="blur(5px)"
            _hover={{
              borderColor: 'rgba(255, 255, 255, 0.25)',
              '& > div': {
                transform: 'scale(1.03)'
              },
              '& img': {
                transform: 'scale(1.05)'
              }
            }}
            transition="all 0.3s ease"
          >
            <Box overflow="hidden" position="relative" h={imageHeight} w="100%">
              <Image
                src={imageUrl}
                alt={imageAlt || title || 'Card image'}
                objectFit="cover"
                h="100%"
                w="100%"
                transition="transform 0.5s ease"
                fallbackSrc="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiB2aWV3Qm94PSIwIDAgNDAwIDI1MCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4ODgiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvYWRpbmcgaW1hZ2UuLi48L3RleHQ+PC9zdmc+"
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgGradient="linear(to-b, rgba(0,0,0,0.1), rgba(0,0,0,0.3))"
                pointerEvents="none"
                transition="all 0.3s ease"
                _groupHover={{
                  bgGradient: "linear(to-b, rgba(0,0,0,0.2), rgba(0,0,0,0.4))"
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
      
      <Box p={4} pt={imageUrl ? 2 : 4} flex="1" position="relative" zIndex="1">
        {title && (
          <Heading as="h3" variant="cardTitle" mb={2}>
            {title}
          </Heading>
        )}
        {description && (
          <Text color="text.secondary" mb={4}>
            {description}
          </Text>
        )}
        {children}
      </Box>
      
      {footer && (
        <Box p={4} pt={0} borderTop="1px solid" borderColor="whiteAlpha.100">
          {footer}
        </Box>
      )}
    </Box>
  );
});

Card.displayName = 'Card';

export default Card;
