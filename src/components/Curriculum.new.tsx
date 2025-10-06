import { Box, Container, Divider, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useRef } from 'react';

type ContentSection = 
  | {
      type: 'text';
      content: string;
      align: 'left' | 'center' | 'right';
    }
  | {
      type: 'image';
      src: string;
      caption?: string;
      align: 'left' | 'center' | 'right';
    }
  | {
      type: 'quote';
      content: string;
      author?: string;
      align: 'left' | 'center' | 'right';
    };

const Curriculum = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Content structure - this would come from your CMS or data source
  const contentSections: ContentSection[] = [
    {
      type: 'text',
      content: 'Born into a family of musicians, my journey with the guitar began at the tender age of five. The rich, warm tones of the classical guitar captivated me from the first moment my fingers touched the strings.',
      align: 'left'
    },
    {
      type: 'image',
      src: '/images/Devenir1.jpeg',
      caption: 'Early years of musical exploration',
      align: 'right'
    },
    {
      type: 'quote',
      content: 'Music is the divine way to tell beautiful, poetic things to the heart.',
      author: 'Pablo Casals',
      align: 'center'
    },
  ];

  const renderContent = (section: ContentSection, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <Text 
            key={index}
            fontSize={{ base: 'md', md: 'lg' }}
            lineHeight="tall"
            color="gray.700"
            textAlign={section.align}
            maxW={{ base: '100%', md: section.align === 'center' ? '800px' : '600px' }}
            mx={section.align === 'center' ? 'auto' : section.align === 'right' ? '0' : 'auto'}
            ml={section.align === 'left' ? 0 : 'auto'}
            mr={section.align === 'right' ? 0 : 'auto'}
            px={4}
            py={8}
          >
            {section.content}
          </Text>
        );
      
      case 'image':
        return (
          <Box 
            key={index}
            maxW={{ base: '100%', md: '600px' }}
            mx={section.align === 'center' ? 'auto' : section.align === 'right' ? '0' : 'auto'}
            ml={section.align === 'left' ? 0 : 'auto'}
            mr={section.align === 'right' ? 0 : 'auto'}
            px={4}
            py={8}
          >
            <Box
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              overflow="hidden"
              boxShadow="sm"
              _hover={{
                boxShadow: 'lg',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }}
            >
              <Image 
                src={section.src} 
                alt={section.caption || 'Musical performance'}
                width="100%"
                height="auto"
                objectFit="cover"
              />
              {section.caption && (
                <Text 
                  fontSize="sm" 
                  color="gray.600" 
                  textAlign="center" 
                  py={2}
                  fontStyle="italic"
                >
                  {section.caption}
                </Text>
              )}
            </Box>
          </Box>
        );
      
      case 'quote':
        return (
          <Box 
            key={index}
            maxW={{ base: '100%', md: '800px' }}
            mx="auto"
            px={4}
            py={12}
          >
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontStyle="italic"
              textAlign="center"
              color="gray.800"
              position="relative"
              _before={{
                content: '"\\201C"',
                position: 'absolute',
                left: { base: '0', md: '-20px' },
                top: { base: '-25px', md: '-10px' },
                fontSize: '4rem',
                color: 'gray.300',
                fontFamily: 'serif',
                lineHeight: '1',
              }}
              _after={{
                content: '"\\201D"',
                position: 'absolute',
                right: { base: '0', md: '-20px' },
                bottom: { base: '-50px', md: '-40px' },
                fontSize: '4rem',
                color: 'gray.300',
                fontFamily: 'serif',
                lineHeight: '1',
              }}
              px={8}
              py={4}
            >
              {section.content}
              {section.author && (
                <Text 
                  as="cite" 
                  display="block" 
                  mt={4} 
                  fontSize="md"
                  color="gray.600"
                  fontWeight="medium"
                  fontStyle="normal"
                >
                  — {section.author}
                </Text>
              )}
            </Text>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box 
      as="section" 
      position="relative" 
      minH="100vh" 
      bg="#f8f5f0"
      ref={containerRef}
      py={8}
    >
      <Container maxW="container.xl" position="relative" zIndex="1">
        <VStack spacing={4} mb={16} pt={8}>
          <Heading 
            as="h1" 
            fontSize={{ base: '2.5rem', sm: '3.5rem', md: '4rem' }}
            fontFamily="heading"
            fontWeight="800"
            color="gray.900"
            letterSpacing="tight"
            textAlign="center"
          >
            Curriculum Vitae
          </Heading>
          <Divider borderColor="gray.300" w="200px" />
          <Text 
            fontSize="lg" 
            color="gray.600"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            The Musical Journey
          </Text>
        </VStack>

        <VStack spacing={0} align="stretch">
          {contentSections.map((section, index) => (
            <Box key={index} py={4}>
              {renderContent(section, index)}
              {index < contentSections.length - 1 && (
                <Divider borderColor="gray.200" my={8} />
              )}
            </Box>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default Curriculum;
