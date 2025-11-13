import React, { useRef, useCallback, type ReactNode } from 'react';
import { Box, Heading, Text, VStack, Divider, Image } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Format text with proper React elements
  const formatText = (text: string): ReactNode[] => {
    // Split by sentences
    const sentences = text.split(/(?<=[.!?])\s+/);
    
    return sentences.map((sentence, i) => (
      <Text as="span" key={i}>{formatNames(sentence)} </Text>
    ));
  };
  
  // Format names to be highlighted
  const formatNames = (text: string): ReactNode => {
    const parts = text.split(
      /(Alejandro Hurtado|Fosforito|Manolo Sanlúcar|José Antonio Rodríguez|Rafael Riqueni|Paco Serrano|Manolo Franco|Pablo Barón)/g
    );
    
    return parts.map((part, i) => {
      if (/(Alejandro Hurtado|Fosforito|Manolo Sanlúcar|José Antonio Rodríguez|Rafael Riqueni|Paco Serrano|Manolo Franco|Pablo Barón)/.test(part)) {
        return (
          <Text as="strong" key={i} className="highlight">
            {part}
          </Text>
        );
      }
      return part;
    });
  };

  const contentSections: ContentSection[] = [
    {
      type: 'quote',
      content: t('hero.quotes.quote1.text'),
      author: t('hero.quotes.quote1.author'),
      align: 'center'
    },

    {
      type: 'text',
      content: t('curriculum.sections.intro'),
      align: 'left'
    },
    {
      type: 'image',
      src: '/images/conFosforito.jpg',
      caption: t('curriculum.captions.fosforito'),
      align: 'right'
    },
    {
      type: 'text',
      content: t('curriculum.sections.fascination'),
      align: 'left'
    },
    {
      type: 'image',
      src: '/images/conCerreduela.JPG',
      caption: t('curriculum.captions.cerreduela'),
      align: 'left'
    },
    {
      type: 'text',
      content: t('curriculum.sections.earlyTraining'),
      align: 'left'
    },

    {
      type: 'image',
      src: '/images/conManoloSanlucaryPabloBaron.JPG',
      caption: t('curriculum.captions.manoloSanlucar'),
      align: 'left'
    },
    {
      type: 'text',
      content: t('curriculum.sections.higherStudies'),
      align: 'left'
    },
    {
      type: 'image',
      src: '/images/conRiqueni2.png',
      caption: t('curriculum.captions.riqueni'),
      align: 'right'
    },
    {
      type: 'text',
      content: t('curriculum.sections.awards'),
      align: 'left'
    },
    {
      type: 'image',
      src: '/images/conJoseAntonioRodriguez.png',
      caption: t('curriculum.captions.joseAntonio'),
      align: 'left'
    },
    {
      type: 'quote',
      content: t('hero.quotes.quote2.text'),
      author: t('hero.quotes.quote2.author'),
      align: 'center'
    },
    {
      type: 'image',
      src: '/images/conVicenteAmigoAgosto.jpg',
      caption: t('curriculum.captions.vicenteAmigo'),
      align: 'left'
    },
    {
      type: 'text',
      content: t('curriculum.sections.accompanist'),
      align: 'left'
    },
    {
      type: 'image',
      src: '/images/conMayteMartin.jpg',
      caption: t('curriculum.captions.mayteMartin'),
      align: 'left'
    },
    {
      type: 'text',
      content: t('curriculum.sections.performances'),
      align: 'left'
    },
    {
      type: 'image',
      src: '/images/conMiguelPoveda.jpg',
      caption: t('curriculum.captions.miguelPoveda'),
      align: 'left'
    },
    {
      type: 'text',
      content: t('curriculum.sections.discography'),
      align: 'left'
    },
    {
      type: 'image',
      src: '/images/conCanizares.png',
      caption: t('curriculum.captions.canizares'),
      align: 'center'
    },
    {
      type: 'quote',
      content: t('hero.quotes.quote3.text'),
      author: t('hero.quotes.quote3.author'),
      align: 'center'
    },
    {
      type: 'image',
      src: '/images/conSerranito.JPG',
      caption: t('curriculum.captions.serranito'),
      align: 'left'
    },
    {
      type: 'text',
      content: '',
      align: 'left'
    },
  ];


  // Custom separator component for content blocks
  const SectionSeparator = ({ isFirst = false }) => (
    <Box 
      position="relative" 
      py={isFirst ? 0 : 8} 
      my={isFirst ? 0 : 6}
      overflow="hidden"
    >
      {!isFirst && (
        <Box>
          {/* Six guitar strings with fade effect on sides */}
          {[0, 1, 2, 3, 4, 5].map((string) => (
            <Box
              key={string}
              width="100%"
              height="1px"
              position="relative"
              mb={string === 5 ? 0 : 2}
              _before={{
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                height: '1px',
                background: `linear-gradient(
                  90deg, 
                  transparent 0%, 
                  rgba(139,69,19,${0.1 + string * 0.05}) 10%, 
                  rgba(139,69,19,${0.15 + string * 0.06}) 50%, 
                  rgba(139,69,19,${0.1 + string * 0.05}) 90%, 
                  transparent 100%
                )`,
                zIndex: 1
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );

  const renderContent = useCallback((section: ContentSection, index: number) => {
    switch (section.type) {
      case 'text':
        return (
          <Box 
            key={index}
            mx={section.align === 'center' ? 'auto' : section.align === 'right' ? '0' : 'auto'}
            ml={section.align === 'left' ? 0 : 'auto'}
            mr={section.align === 'right' ? 0 : 'auto'}
            px={4}
            py={8}
          >
            <Text 
              fontSize={{ base: 'xl', md: '2xl' }}
              lineHeight="2"
              color="gray.800"
              textAlign={section.align}
              whiteSpace="pre-line"
              mb={8}
              fontFamily="'Crimson Pro', serif"
              letterSpacing="wide"
              sx={{
                '&:first-letter': {
                  float: 'left',
                  fontSize: '3em',
                  lineHeight: '0.8',
                  margin: '0.1em 0.1em 0 0',
                  color: 'inherit',
                  fontFamily: 'Playfair Display, serif',
                },
                '& em': {
                  fontStyle: 'italic',
                  color: '#5D4037',
                  textDecoration: 'underline',
                  textUnderlineOffset: '0.2em',
                },
                '& strong': {
                  fontWeight: 'bold',
                  color: '#4A4A4A',
                  letterSpacing: '0.05em',
                },
              }}
            >
              {formatText(section.content)}
            </Text>
          </Box>
        );
      
      case 'image':
        return (
          <Box 
            key={index}
            maxW={{ base: '100%', md: '700px' }}
            mx={section.align === 'center' ? 'auto' : section.align === 'right' ? '0' : 'auto'}
            ml={section.align === 'left' ? 0 : 'auto'}
            mr={section.align === 'right' ? 0 : 'auto'}
            px={4}
            py={8}
          >
            <Box
              borderWidth="2px"
              borderColor="gray.300"
              borderRadius="md"
              overflow="hidden"
              boxShadow="lg"
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: '5px',
                left: '5px',
                right: '5px',
                bottom: '5px',
                border: '1px solid',
                borderColor: 'rgba(255,255,255,0.5)',
                pointerEvents: 'none',
                zIndex: 1,
                borderRadius: 'md',
              }}
              _hover={{
                boxShadow: '2xl',
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease-in-out',
                '& img': {
                  transform: 'scale(1.03)',
                }
              }}
            >
              <Image 
                src={section.src} 
                alt={section.caption || 'Musical performance'}
                width="100%"
                height="auto"
                style={{ 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease-in-out'
                }}
              />
              {section.caption && (
                <Box 
                  bg="rgba(0,0,0,0.7)" 
                  color="white" 
                  p={3}
                  position="relative"
                  zIndex={2}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    bg: 'red.600',
                  }}
                >
                  <Text 
                    fontSize="sm" 
                    textAlign="center" 
                    fontStyle="italic"
                    fontFamily="'Crimson Text', serif"
                    letterSpacing="wider"
                  >
                    {section.caption}
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        );
      
      case 'quote':
        return (
          <Box 
            key={index}
            maxW={{ base: '90%', md: '800px' }}
            mx="auto"
            px={4}
            py={8}
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              maxWidth: '300px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 80%, transparent 100%)',
            }}
            _after={{
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '35%',
              maxWidth: '250px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.08) 80%, transparent 100%)',
            }}
          >
            <Text
              as="span"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontStyle="italic"
              color="gray.800"
              lineHeight="1.7"
              fontFamily="'EB Garamond', serif"
              position="relative"
              display="inline-block"
              _before={{
                content: '"\\201C"',
                fontSize: '1.8em',
                lineHeight: '0',
                marginRight: '0.2em',
                verticalAlign: '-0.4em',
                opacity: 0.7,
                color: 'rgba(0,0,0,0.3)',
              }}
              _after={{
                content: '"\\201D"',
                fontSize: '1.8em',
                lineHeight: '0',
                marginLeft: '0.2em',
                verticalAlign: '-0.6em',
                opacity: 0.7,
                color: 'rgba(0,0,0,0.3)',
              }}
            >
              {section.content}
              {section.author && (
                <Text 
                  as="cite" 
                  display="block" 
                  mt={6}
                  fontSize="lg"
                  color="gray.600"
                  fontWeight="500"
                  fontStyle="normal"
                  fontFamily="'Crimson Pro', serif"
                  textAlign="center"
                  _before={{
                    content: '""',
                    display: 'block',
                    width: '30%',
                    maxWidth: '120px',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.12) 80%, transparent 100%)',
                    mx: 'auto',
                    my: 3,
                  }}
                >
                  {section.author}
                </Text>
              )}
            </Text>
          </Box>
        );
      
      default:
        return null;
    }
  }, [formatText]); // Add formatText to the dependency array

  // Move styles to a constant to improve readability
  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');
    
    body {
      font-size: 1.3rem;
      line-height: 2;
    }
    
    .highlight {
      color: #2c1810;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
  `;


  return (
    <>
      <Global styles={globalStyles} />
      <Box
        as="section"
        minH="100vh"
        bg="#f5f0e6"
        role="article"
        backgroundImage="url('data:image/svg+xml;utf8,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm48%2025c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207zm-43-7c1.657%200%203-1.343%203-3s-1.343-3-3-3-3%201.343-3%203%201.343%203%203%203zm63%2031c1.657%200%203-1.343%203-3%200-1.657-1.343-3-3-3s-3%201.343-3%203%201.343%203%203%203zM34%2090c1.657%200%203-1.343%203-3%200-1.657-1.343-3-3-3s-3%201.343-3%203%201.343%203%203%203zm56-76c1.657%200%203-1.343%203-3%200-1.657-1.343-3-3-3s-3%201.343-3%203%201.343%203%203%203zM12%2086c2.21%200%204-1.79%204-4%200-2.21-1.79-4-4-4-2.21%200-4%201.79-4%204%200%202.21%201.79%204%204%204zm28-65c2.21%200%204-1.79%204-4%200-2.21-1.79-4-4-4-2.21%200-4%201.79-4%204%200%202.21%201.79%204%204%204zm23-11c2.76%200%205-2.24%205-5%200-2.76-2.24-5-5-5s-5%202.24-5%205%202.24%205%205%205zm-6%2060c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm29%2022c2.76%200%205-2.24%205-5%200-2.76-2.24-5-5-5s-5%202.24-5%205%202.24%205%205%205zM32%2063c2.76%200%205-2.24%205-5s-2.24-5-5-5-5%202.24-5%205%202.24%205%205%205zm57-13c2.76%200%205-2.24%205-5%200-2.76-2.24-5-5-5s-5%202.24-5%205%202.24%205%205%205zm-9-21c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM60%2091c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM35%2041c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202zM12%2060c1.105%200%202-.895%202-2s-.895-2-2-2-2%20.895-2%202%20.895%202%202%202z%22%20fill%3D%22%23d9c7a7%22%20fill-opacity%3D%220.3%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E'"
        ref={containerRef}
        py={12}
        px={{ base: 4, md: 8 }}
      >
        <Box
          maxW={{ base: '100%', md: '4xl' }}
          mx="auto"
          position="relative"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(210,190,160,0.1) 0%, rgba(210,190,160,0.2) 50%, rgba(210,190,160,0.1) 100%)',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          <Box 
            position="relative"
            zIndex="1"
            bg="#fff9f0"
            boxShadow="0 0 30px rgba(0,0,0,0.1)"
            px={{ base: 6, md: 12, lg: 20 }}
            py={{ base: 8, md: 12 }}
            border="1px solid"
            borderColor="rgba(0,0,0,0.05)"
            _before={{
              content: '""',
              position: 'absolute',
              top: '10px',
              left: '10px',
              right: '10px',
              bottom: '10px',
              border: '1px solid',
              borderColor: 'rgba(0,0,0,0.05)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          >
            <VStack spacing={4} mb={16} pt={8}>
              <Box textAlign="center" mb={12}>
                <Text 
                  fontSize="sm"
                  color="gray.600"
                    letterSpacing="0.3em"
                    textTransform="uppercase"
                    mb={3}
                    fontFamily="'Crimson Pro', serif"
                    fontWeight="500"
                  >
                  {t('header.title')}
                </Text>
                <Divider borderColor="rgba(0,0,0,0.2)" w="120px" mx="auto" mb={6} borderBottomWidth="1px" />
                <Heading 
                  as="h1" 
                  fontSize={{ base: '3.2rem', md: '4.5rem' }}
                  fontFamily="'EB Garamond', serif"
                  fontWeight="500"
                  color="#2c1810"
                  letterSpacing="-0.02em"
                  lineHeight="1.05"
                  mb={4}
                  textShadow="1px 1px 1px rgba(0,0,0,0.05)"
                >
                  {t('curriculum.title')}
                </Heading>
                <Text 
                  fontSize="2xl" 
                  color="gray.700"
                  fontStyle="italic"
                  maxW="2xl"
                  mx="auto"
                  fontFamily="'Crimson Pro', serif"
                  letterSpacing="0.01em"
                  mt={6}
                  fontWeight="400"
                >
                  {t('curriculum.subtitle')}
                </Text>
                <Divider 
                  borderColor="rgba(0,0,0,0.1)" 
                  w="200px" 
                  mx="auto" 
                  mt={8} 
                  mb={2}
                  borderBottomWidth="1px"
                  borderStyle="dashed"
                />
              </Box>
            </VStack>

            <VStack spacing={0} align="stretch">
              {contentSections.map((section, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <SectionSeparator />}
                  {renderContent(section, index)}
                </React.Fragment>
              ))}
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Curriculum;
