import React from 'react';
import { Box, Text, VStack, HStack, Heading, useColorModeValue, Icon, SimpleGrid, Card, CardBody, CardHeader, Flex, Badge, Link, Image, Tooltip } from '@chakra-ui/react';
import { FaTrophy, FaRecordVinyl, FaMusic, FaCalendarAlt, FaMapMarkerAlt, FaUserTie, FaExternalLinkAlt } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

// Type for Wikipedia links
type WikipediaLinks = {
  [key: string]: string;
};

// Type for artist names and their descriptions
type ArtistNames = {
  [key: string]: string;
};

// Curriculum data is now directly used in the component

const SectionIcon = ({ icon, color }: { icon: React.ElementType, color: string }) => (
  <Flex
    w={12}
    h={12}
    align="center"
    justify="center"
    rounded="full"
    bg={`${color}.100`}
    color={`${color}.600`}
    mb={4}
  >
    <Icon as={icon} boxSize={6} />
  </Flex>
);

const HighlightItem = ({ 
  children, 
  icon, 
  size = 'md',
  color = 'gray.700'
}: { 
  children: React.ReactNode, 
  icon?: React.ElementType,
  size?: 'sm' | 'md' | 'lg',
  color?: string
}) => {
  const sizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  };

  return (
    <HStack align="flex-start" spacing={3}>
      {icon && (
        <Flex 
          as="span" 
          color="orange.400" 
          mt={1} 
          flexShrink={0}
          fontSize={sizes[size]}
        >
          <Icon as={icon} />
        </Flex>
      )}
      <Text 
        fontSize={sizes[size]} 
        color={color}
        lineHeight={1.6}
      >
        {children}
      </Text>
    </HStack>
  );
};

const Curriculum: React.FC = () => {
  const highlightColor = useColorModeValue('orange', 'orange.300');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const cardBg = useColorModeValue('white', 'gray.800');
  const quoteBg = useColorModeValue('orange.50', 'gray.800');

// Wikipedia links for artists and events
  const wikipediaLinks: WikipediaLinks = {
    'Manolo Sanlúcar': 'https://es.wikipedia.org/wiki/Manolo_Sanl%C3%BAcar',
    'José Antonio Rodríguez': 'https://es.wikipedia.org/wiki/Jos%C3%A9_Antonio_Rodr%C3%ADguez_(guitarrista)',
    'El Viejín': 'https://es.wikipedia.org/wiki/Jos%C3%A9_Antonio_Rodr%C3%ADguez_Mu%C3%B1oz',
    'Juan Manuel Cañizares': 'https://es.wikipedia.org/wiki/Juan_Manuel_Ca%C3%B1izares',
    'Rafael Riqueni': 'https://es.wikipedia.org/wiki/Rafael_Riqueni',
    'Jerónimo Maya': 'https://es.wikipedia.org/wiki/Jer%C3%B3nimo_Maya',
    'Manolo Franco': 'https://es.wikipedia.org/wiki/Manuel_Franco_(guitarrista)',
    'José Luis Montón': 'https://es.wikipedia.org/wiki/Jos%C3%A9_Luis_Mont%C3%B3n',
    'Mayte Martín': 'https://es.wikipedia.org/wiki/Mayte_Mart%C3%ADn',
    'Miguel Poveda': 'https://es.wikipedia.org/wiki/Miguel_Poveda',
    'Inmaculada Salomón': 'https://es.wikipedia.org/wiki/Inmaculada_Salom%C3%B3n',
    'Bienal de Flamenco de Sevilla': 'https://es.wikipedia.org/wiki/Bienal_de_Flamenco_de_Sevilla',
    'Festival de la Guitarra de Córdoba': 'https://es.wikipedia.org/wiki/Festival_de_la_Guitarra_de_C%C3%B3rdoba',
    'Flamenco Festival': 'https://es.wikipedia.org/wiki/Flamenco_Festival',
    'Fosforito': 'https://es.wikipedia.org/wiki/Antonio_Fern%C3%A1ndez_D%C3%ADaz',
    'Niño Ricardo': 'https://es.wikipedia.org/wiki/Manuel_Serrap%C3%AD_S%C3%A1nchez',
    'Paco de Lucía': 'https://es.wikipedia.org/wiki/Paco_de_Luc%C3%ADa',
    'Ramón Montoya': 'https://es.wikipedia.org/wiki/Ram%C3%B3n_Montoya',
    'Manuel de Huelva': 'https://es.wikipedia.org/wiki/Manuel_G%C3%B3mez_V%C3%A9lez',
    'Francisco Tárrega': 'https://es.wikipedia.org/wiki/Francisco_T%C3%A1rrega',
    'Agustín Barrios': 'https://es.wikipedia.org/wiki/Agust%C3%ADn_Barrios_Mangor%C3%A9',
    'Miguel Llobet': 'https://es.wikipedia.org/wiki/Miguel_Llobet',
    'Federico Chopin': 'https://es.wikipedia.org/wiki/Fr%C3%A9d%C3%A9ric_Chopin',
    'Sabicas': 'https://es.wikipedia.org/wiki/Sabicas',
    'Concierto de Aranjuez': 'https://es.wikipedia.org/wiki/Concierto_de_Aranjuez',
    'Fantasía para un Gentilhombre': 'https://es.wikipedia.org/wiki/Fantas%C3%ADa_para_un_gentilhombre',
    'Romanza de Bacarisse': 'https://es.wikipedia.org/wiki/Salvador_Bacarisse',
    'Vicente Amigo': 'https://es.wikipedia.org/wiki/Vicente_Amigo'
  };

  // Function to find and replace names with links
  const renderWithLinks = (text: string) => {
    if (!text) return null;
    
    // Create a combined list of all names to match, sorted by length (longest first)
    // to handle cases where one name is a substring of another
    const allNames = [
      ...Object.keys(wikipediaLinks),
      ...Object.keys(artistNames)
    ].sort((a, b) => b.length - a.length);

    // Create a regex pattern to match any of the names
    const pattern = new RegExp(
      `(${allNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
      'g'
    );

    // Split the text into parts, alternating between regular text and matches
    const parts = text.split(pattern);
    
    return parts.map((part, i) => {
      // Skip empty parts from the split
      if (!part) return null;
      
      // Check if this part is a name we want to link or highlight
      if (wikipediaLinks[part]) {
        return (
          <Tooltip label={`Ver en Wikipedia`} key={i} hasArrow>
            <Link 
              href={wikipediaLinks[part]} 
              isExternal
              color="orange.500"
              fontWeight="600"
              _hover={{ 
                textDecoration: 'underline',
                color: 'orange.600' 
              }}
              display="inline"
            >
              {part}
            </Link>
          </Tooltip>
        );
      } else if (artistNames[part]) {
        return (
          <Tooltip label={artistNames[part]} key={i} hasArrow>
            <Text 
              as="span" 
              color="orange.500"
              fontWeight="600"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
              onClick={() => {
                if (wikipediaLinks[part]) {
                  window.open(wikipediaLinks[part], '_blank');
                }
              }}
            >
              {part}
            </Text>
          </Tooltip>
        );
      }
      
      // Return regular text for non-matching parts
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  // Album data with images
  const albums = [
    {
      title: 'Maestros del Arte Clásico Flamenco',
      year: '2022',
      slug: 'maestros-del-arte-clasico-flamenco',
      image: '/images/discography/portada-maestros.jpeg',
      description: 'Homenaje a Ramón Montoya y Manuel de Huelva'
    },
    {
      title: 'Tamiz',
      year: '2023',
      slug: 'tamiz',
      image: '/images/discography/portada-tamiz.jpeg',
      description: 'Composiciones propias',
      badge: 'Mejor Álbum Flamenco 2023 - Expo Flamenco'
    },
    {
      title: 'El Primer Llanto',
      year: '2025',
      slug: 'el-primer-llanto',
      image: '/images/discography/portada-primer-llanto.jpg',
      description: 'Visión actual de la guitarra flamenca con composiciones propias',
      note: 'Incluye formas musicales del siglo XIX como panaderos y habaneras'
    }
  ];

  // List of artist names to highlight
  const artistNames: ArtistNames = {
    'Marco Uceda': 'Profesor inicial de guitarra',
    'Manolo Sanlúcar': 'Maestro de guitarra flamenca',
    'José Antonio Rodríguez': 'Guitarrista flamenco',
    'El Viejín': 'Guitarrista flamenco',
    'Juan Manuel Cañizares': 'Guitarrista de Paco de Lucía',
    'Rafael Riqueni': 'Compositor y guitarrista',
    'Jerónimo Maya': 'Guitarrista y compositor',
    'Manolo Franco': 'Profesor de guitarra',
    'José Luis Montón': 'Guitarrista y compositor',
    'Mayte Martín': 'Cantaora',
    'Miguel Poveda': 'Cantaor',
    'Inmaculada Salomón': 'Bailaora',
    'Patricia Guerrero': 'Bailaora',
    'Marco Flores': 'Bailaor',
    'Niño Ricardo': 'Guitarrista de referencia',
    'Paco de Lucía': 'Maestro de la guitarra flamenca'
  };

  return (
    <Box maxW="6xl" mx="auto" py={12} px={{ base: 4, md: 8 }}>
      <VStack spacing={16} align="stretch">
        <Box textAlign="center" mb={12}>
          <Heading as="h1" size="2xl" mb={6} fontWeight="bold" color={textColor}>
            Trayectoria Profesional
          </Heading>
          <Box 
            as="blockquote" 
            fontStyle="italic" 
            p={8}
            bg={quoteBg}
            borderRadius="xl"
            borderLeft="4px"
            borderColor={`${highlightColor}.500`}
            mb={8}
            position="relative"
            _before={{
              content: '"\u201C"',
              position: 'absolute',
              top: '0',
              left: '4',
              fontSize: '6xl',
              color: `${highlightColor}.100`,
              lineHeight: '1',
            }}
          >
            <Text fontSize="lg" color={textColor} mb={4} position="relative" zIndex={1}>
              <Text>"Después de haber trabajado a lo largo de mi trayectoria profesional con los mejores guitarristas de mi tiempo, empezando por {renderWithLinks('Niño Ricardo')} y pasando por el genial {renderWithLinks('Paco de Lucía')}, doy fe de la enorme capacidad guitarrística de {renderWithLinks('Alejandro Hurtado')}, y no me cabe duda de que está llamado a ocupar un lugar de privilegio en el mundo de la guitarra flamenca."</Text>
            </Text>
            <Text fontWeight="bold" textAlign="right" color={`${highlightColor}.600`}>
              — Antonio Fernández Díaz, "Fosforito"
            </Text>
          </Box>
          <Text fontSize="lg" color={textColor} maxW="3xl" mx="auto">
            Su excepcional técnica, limpieza de ejecución y fuerza expresiva le permiten transmitir intensas sensaciones en el escenario. Su talento creativo y dominio del instrumento lo sitúan entre los más destacados intérpretes de guitarra flamenca de concierto de nuestros días.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <Card bg={cardBg} boxShadow="lg" borderRadius="xl" overflow="hidden" borderTop="4px" borderColor={`${highlightColor}.500`}>
            <CardHeader pb={0}>
              <SectionIcon icon={FaMusic} color="blue" />
              <Heading size="lg" mb={2}>Formación</Heading>
              <Text color="gray.500" fontSize="sm">Desde los 9 años</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HighlightItem 
                  icon={FaCalendarAlt} 
                  size="lg"
                  color={textColor}
                >
                  <Text>Inició sus estudios con {renderWithLinks('Marco Uceda')} a los 9 años</Text>
                </HighlightItem>
                <HighlightItem 
                  icon={FaMapMarkerAlt}
                  size="md"
                  color={textColor}
                >
                  Conservatorio Profesional de Música y Danza "Vicente Lillo Cánovas" de San Vicente del Raspeig (Alicante)
                </HighlightItem>
                <HighlightItem
                  size="sm"
                  color="gray.600"
                >
                  <Text>Ha recibido clases de grandes maestros como {renderWithLinks('Manolo Sanlúcar, José Antonio Rodríguez, El Viejín, Juan Manuel Cañizares, Rafael Riqueni, Jerónimo Maya, Manolo Franco y José Luis Montón')}</Text>
                </HighlightItem>
                <Box bg={`${highlightColor}.50`} p={4} borderRadius="md" borderLeft="3px" borderColor={`${highlightColor}.400`}>
                  <Text fontSize="sm" color={`${highlightColor}.800`} fontWeight="medium">
                    <strong>Logros académicos:</strong> Grado Superior con Matrícula de Honor, Premio Extraordinario y Máster en Flamenco en la ESMUC (Barcelona) con Matrícula de Honor
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} boxShadow="lg" borderRadius="xl" overflow="hidden" borderTop="4px" borderColor={`${highlightColor}.500`}>
            <CardHeader pb={0}>
              <SectionIcon icon={FaUserTie} color="green" />
              <Heading size="lg" mb={2}>Trayectoria Artística</Heading>
              <Text color="gray.500" fontSize="sm">Activo profesionalmente</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box mb={6}>
                  <Text 
                    fontSize="lg" 
                    fontWeight="semibold" 
                    mb={3}
                    color={`${highlightColor}.600`}
                    borderBottom="1px"
                    borderColor="gray.200"
                    pb={1}
                    display="inline-block"
                  >
                    Festivales Destacados
                  </Text>
                  <VStack spacing={3} align="stretch">
                    <HighlightItem 
                      icon={FaCalendarAlt} 
                      size="md"
                      color={textColor}
                    >
                      <Box>
                        <Text as="span" fontWeight="600">Ha actuado en los festivales más importantes: {renderWithLinks('Bienal de Flamenco de Sevilla')}, {renderWithLinks('Flamenco Festival')} de Nueva York y Londres, {renderWithLinks('Festival de la Guitarra de Córdoba')}, Festival de Jazz Voll-Damm de Barcelona, entre otros</Text>
                      </Box>
                    </HighlightItem>
                    
                    <HighlightItem 
                      icon={FaCalendarAlt} 
                      size="md"
                      color={textColor}
                    >
                      <Box>
                        <Text as="span" fontWeight="600">Flamenco Festival NY/Londres</Text>
                        <Text fontSize="sm" color="gray.500">Gira internacional de flamenco más importante</Text>
                      </Box>
                    </HighlightItem>
                    
                    <HighlightItem 
                      icon={FaCalendarAlt} 
                      size="md"
                      color={textColor}
                    >
                      <Box>
                        <Text as="span" fontWeight="600">Festival de la Guitarra de Córdoba</Text>
                        <Text fontSize="sm" color="gray.500">Referencia internacional de la guitarra</Text>
                      </Box>
                    </HighlightItem>
                  </VStack>
                </Box>
                
                <Box mb={4}>
                  <Text fontWeight="medium" mb={2}>Colaboraciones destacadas:</Text>
                  <Text>Como arreglista y acompañante de <strong>{renderWithLinks('Mayte Martín')}</strong> en los espectáculos "Déjá vú" y "Memento"</Text>
                  <Text>Ha colaborado con artistas como {renderWithLinks('Mayte Martín')} (como arreglista y acompañante), {renderWithLinks('Miguel Poveda')} (gira <em>Diverso</em> y <em>Poema del Cante Jondo</em>), y bailaores como {renderWithLinks('Inmaculada Salomón')}, {renderWithLinks('Patricia Guerrero')} y {renderWithLinks('Marco Flores')}</Text>
                </Box>

                <Box bg={`${highlightColor}.50`} p={4} borderRadius="md" borderLeft="3px" borderColor={`${highlightColor}.400`}>
                  <Text fontSize="sm" color={`${highlightColor}.800`} fontWeight="medium">
                    <Text>Ha actuado como solista con orquesta interpretando el <strong>{renderWithLinks('Concierto de Aranjuez, Fantasía para un Gentilhombre de Rodrigo, Romanza de Bacarisse')} y Gypsy Concert de {renderWithLinks('Sabicas')}-Cofiner</strong></Text>
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} boxShadow="lg" borderRadius="xl" overflow="hidden" borderTop="4px" borderColor={`${highlightColor}.500`}>
            <CardHeader pb={0}>
              <SectionIcon icon={FaRecordVinyl} color="purple" />
              <Heading size="lg" mb={2}>Discografía</Heading>
              <Text color="gray.500" fontSize="sm">2022 - Presente</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <Flex as={RouterLink} to="/discography/maestros-del-arte-clasico-flamenco" _hover={{ textDecoration: 'none' }} gap={4} align="flex-start">
                  <Image 
                    src={albums[0].image} 
                    alt={albums[0].title}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                    _dark={{ borderColor: 'gray.600' }}
                  />
                  <Box>
                    <Heading size="md" color={`${highlightColor}.600`} mb={2} _hover={{ textDecoration: 'underline' }}>"{albums[0].title}" ({albums[0].year})</Heading>
                    <Text>{albums[0].description}</Text>
                    <Text fontSize="sm" color="gray.500" mt={1}>Grabado con instrumentos originales de la época</Text>
                  </Box>
                </Flex>
                
                <Flex as={RouterLink} to="/discography/tamiz" _hover={{ textDecoration: 'none' }} gap={4} align="flex-start">
                  <Image 
                    src={albums[1].image} 
                    alt={albums[1].title}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                    _dark={{ borderColor: 'gray.600' }}
                  />
                  <Box>
                    <Heading size="md" color={`${highlightColor}.600`} mb={2} _hover={{ textDecoration: 'underline' }}>"{albums[1].title}" ({albums[1].year})</Heading>
                    <Text>{albums[1].description}</Text>
                    <Badge colorScheme="green" mt={2}>{albums[1].badge}</Badge>
                  </Box>
                </Flex>
                
                <Flex as={RouterLink} to="/discography/el-primer-llanto" _hover={{ textDecoration: 'none' }} gap={4} align="flex-start">
                  <Image 
                    src={albums[2].image} 
                    alt={albums[2].title}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.200"
                    _dark={{ borderColor: 'gray.600' }}
                  />
                  <Box>
                    <Heading size="md" color={`${highlightColor}.600`} mb={2} _hover={{ textDecoration: 'underline' }}>"{albums[2].title}" ({albums[2].year})</Heading>
                    <Text>{albums[2].description}</Text>
                    <Text fontSize="sm" color="gray.500" mt={1}>{albums[2].note}</Text>
                  </Box>
                </Flex>
              </VStack>
            </CardBody>
          </Card>

          <Card bg={cardBg} boxShadow="lg" borderRadius="xl" overflow="hidden" borderTop="4px" borderColor={`${highlightColor}.500`}>
            <CardHeader pb={0}>
              <SectionIcon icon={FaTrophy} color="yellow" />
              <Heading size="lg" mb={2}>Premios y Reconocimientos</Heading>
              <Text color="gray.500" fontSize="sm">2006 - 2023</Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box 
                  bgGradient="linear(to-r, yellow.50, orange.50)" 
                  p={5} 
                  borderRadius="lg" 
                  borderLeft="4px" 
                  borderColor="orange.400"
                  boxShadow="sm"
                  mb={6}
                >
                  <Flex align="center" mb={2}>
                    <Icon as={FaTrophy} color="orange.500" boxSize={6} mr={3} />
                    <Heading size="lg" color="orange.700" mb={0}>Bordón Minero (2017)</Heading>
                  </Flex>
                  <Text fontSize="md" color="orange.800" fontWeight="500">
                    Festival Internacional del Cante de las Minas de La Unión
                  </Text>
                  <Text fontSize="sm" color="orange.700" mt={2} fontStyle="italic">
                    "Máximo galardón de la guitarra flamenca de concierto"
                  </Text>
                </Box>
                
                <VStack spacing={4} align="stretch" mt={6}>
                  <Text 
                    fontSize="lg" 
                    fontWeight="semibold" 
                    color={`${highlightColor}.600`}
                    borderBottom="1px"
                    borderColor="gray.200"
                    pb={1}
                    display="inline-block"
                    mb={2}
                  >
                    Otros Premios Destacados
                  </Text>
                  
                  <Box 
                    p={4} 
                    bg="white" 
                    borderRadius="md" 
                    borderLeft="3px" 
                    borderColor="yellow.400"
                    _dark={{ bg: 'gray.700' }}
                  >
                    <Text fontWeight="600" mb="1">1er Premio "{renderWithLinks('Vicente Amigo')}" (2015)</Text>
                    <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
                      Concurso Jóvenes Flamencos de Córdoba
                    </Text>
                  </Box>
                  
                  <Box 
                    p={4} 
                    bg="white" 
                    borderRadius="md" 
                    borderLeft="3px" 
                    borderColor="yellow.400"
                    _dark={{ bg: 'gray.700' }}
                  >
                    <Text fontWeight="600" mb={1}>1er Premio Diputación de Jaén (2014)</Text>
                    <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
                      Concurso Nacional de guitarra flamenca para jóvenes intérpretes
                    </Text>
                  </Box>
                  
                  <Box 
                    p={4} 
                    bg="white" 
                    borderRadius="md" 
                    borderLeft="3px" 
                    borderColor="yellow.400"
                    _dark={{ bg: 'gray.700' }}
                  >
                    <Text fontWeight="600" mb={1}>Mejor Álbum Flamenco 2023</Text>
                    <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
                      Por "Tamiz" - Premio Expo Flamenco
                    </Text>
                  </Box>
                </VStack>
                
                <Box mt={4} p={4} bg="gray.50" borderRadius="md">
                  <Text fontSize="sm" fontStyle="italic">
                    "Su excepcional técnica, limpieza de ejecución y fuerza expresiva le permiten transmitir intensas sensaciones en el escenario."
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Curriculum;