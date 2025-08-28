import { Box, Container, Heading, Text, Image, VStack, HStack, Link, Icon } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { FaSpotify, FaApple } from 'react-icons/fa';

// This data should ideally be fetched from a service or CMS
const albums = [
  {
    title: 'El Primer Llanto',
    slug: 'el-primer-llanto',
    year: 2023,
    imageUrl: '/images/ElPrimerLlanto.jpeg',
    description: `“El Primer Llanto” es la nueva propuesta del guitarrista Alejandro Hurtado, donde conviven varias formas de expresión del propio autor.\n\nEn primer lugar el guitarrista y sensible compositor exquisito y delicado, en la tradición y concepto romántico de la guitarra de Francisco Tárrega, Agustín Barrios o Miguel Llobet, con una guitarra que emula de alguna manera al piano y su repertorio, especialmente el de Federico Chopin. Sonido aterciopelado, expresión dulce e intimista. El Alejandro más clásico viaja a finales del siglo XIX y principios del XX, para evocar, recuperar y actualizar para la guitarra contemporánea, formas de concierto a solo como la habanera, la mazurca, la nana y la petenera.\n\nDecía el romántico por excelencia e hipersensible Chopin, que “Nada es más hermoso que una guitarra, salvo tal vez dos”. Allí está la larga tradición de dúos en la historia de la guitarra española, clásica y flamenca, para confirmarlo. Como conocedor de este periodo histórico de la guitarra en el que convivían y se retroalimentaban la guitarra académica con la guitarra popular, Alejandro se duplica, e incluso se triplica para ampliar su evocación, recuperación y actualización de aires andaluces decimonónicos, entre lo bolero y lo flamenco -con el baile como eje vertebrador- con su propuesta añeja y a la vez actual, de las sevillanas, los panaderos, e incluso con el primer tema del disco, un impromptu a modo de fantasía improvisada, señalando que, incluso la rumba tan de moda en la actualidad por su forma directa y radial, también puede ser renovada, desde el conocimiento y el gusto musical.\n\nPor otra parte escuchamos al Alejandro más flamenco, siempre con detalles añejos desde una contemporaneidad expresada de forma coral y afinaciones alternativas. Lo hará por soleá, y arropado por discretas y eficaces percusiones por serrana, por bulería y por tangos.\n\nAlejandro Hurtado guitarrista clásico, flamenco, clásico-flamenco, a pesar de esta multiplicidad, hay un denominador común que unifica este primer llanto, el de la elaboración contemporánea de un virtuosismo no espectacular y sin agresividad, al servicio de la música, con un sutil y exquisito trabajo en torno a las dinámicas que permite la guitarra y sus timbres. Con este su tercer disco, como en los dos anteriores, queda confirmado que su personalidad siempre inquieta y curiosa, y su afición por la guitarra, van más allá de etiquetas quizás hoy superadas, para perfilar otro horizonte de la guitarra española, el del feliz reencuentro de sus expresiones populares y académicas, flamenca y clásica. Las que tuvo en la configuración de su modernidad durante el romanticismo, y que convierten el instrumento en una de las mayores expresiones cultas de lo popular.\n\nO sea música romántica del XIX renovada y contemporalizada para el siglo XXI, la de Alejandro Hurtado.\n\nNorberto Torres.`,
    tracklist: ['Track 1', 'Track 2', 'Track 3'],
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },
  {
    title: 'Maestros Del Arte Clasico Flamenco',
    slug: 'maestros-del-arte-clasico-flamenco',
    year: 2021,
    imageUrl: '/images/MaestrosDelArteClasicoFlamenco.jpeg',
    description: `Alejandro Hurtado nos deja en esta grabación sus magníficas versiones de dos de los grandes maestros de la guitarra flamenca: Ramón Montoya y Manolo de Huelva.\n\nPero además de su excepcional forma de interpretar esta música, este registro nos aporta otro interesante documento: por primera vez podremos escuchar con la calidad que permiten los actuales sistemas de grabación los instrumentos originales que esos dos guitarristas utilizaron durante la mayor parte de su carrera.\n\nSe trata de dos excepcionales instrumentos, construidos por Santos Hernández en 1916 (en el taller de la Viuda de Manueo Ramírez) la de Montoya y en 1937 la de Manolo de Huelva . Ambas guitarras son propiedad de la familia Zayas desde el fallecimiento de sus respectivos dueños, siendo esta la primera vez que se autoriza su uso para una grabación.\n\nAlejandro ha seleccionado cinco piezas de cada uno de los intérpretes; de Montoya, interpreta cinco de sus más interesantes composiciones, entre las que no podía faltar su célebre Rondeña, de la que nos deja una inigualable versión. En el caso de Manolo de Huelva, guitarrista que siempre se negó a actuar en solitario, y solo concebía la guitarra flamenca como instrumento acompañante, Hurtado ha hecho su propia selección de diferentes falsetas, que ha combinado para dar forma a cinco de los estilos flamencos más clásicos (Soleares, seguiríyas, alegrías, serrana y bulerías), que nos presenta como verdaderas piezas de concierto.\n\nSolo un guitarrista con la sensibilidad y la técnica de Alejandro Hurtado, cualidades a las que hay que unir su profundo conocimiento del repertorio de los clásicos de la guitarra flamenca, puede conseguir rescatar los toques de estos dos guitarristas, respetando el estilo de cada uno al tiempo que adaptándose a las características de cada una de las guitarras, pero sin dejar de aportar su personal forma de entender la música.\n\nA mediados de los años 30 del siglo XX Marius de Zayas decidió apoyar a Ramón Montoya, produciendo una serie de grabaciones discográficas, así como impulsando su carrera artística. De modo similar actuó con Manolo de Huelva, de quien grabó un histórico video acompañando al baile a "La Argentinita". Su esposa, Virginia Randolph Harrison, trabajó durante años mano a mano con Manolo de Huelva, transcribiendo a notación musical la totalidad de las falsetas del genial músico onubense.\n\nLa relación con la familia Zayas se mantuvo hasta el fallecimiento de ambos artistas. Esto explica por qué sus instrumentos pasaron a ser propiedad de la familia Zayas. Desaparecido Marius, los instrumentos quedaron a cargo de su hijo, Rodrigo de Zayas, quien los ha mantenido en un perfecto estado hasta la actualidad. Posiblemente una de las razones de ese magnífico estado de conservación sea el cariño y el cuidado con que los han tratado, así como el nivel de protección que han mantenido siempre. Los instrumentos rara vez han salido de su casa, y apenas han sido tocados por otros guitarristas en todo este tiempo, por temor a que pudieran ser dañados.\n\nIndudablemente, ha sido necesaria la aparición de una persona con un talento tan especial como el de Alejandro Hurtado, para que después de tantas décadas los propietarios de los instrumentos autorizasen su uso para una grabación. Alejandro se acercó al archivo de los Zayas no en busca de las guitarras, sino con la intención de encontrar música de Manolo de Huelva, conocedor de que allí se guardaban las transcripciones de sus falsetas. Tras varias visitas, y después de escuchar tocar a Alejandro, tanto Rodrigo de Zayas como su esposa Anne apreciaron el enorme talento de este joven guitarrista, al mismo tiempo que su calidad humana. De este modo fueron ellos mismos los que le ofrecieron la posibilidad de utilizar los instrumentos para una grabación\n\nDesde el momento en que Alejandro recibió esta oferta, se puso a trabajar intensamente, y después de tan solo 52 días -de los cuales apenas dos fueron para tomar contacto con los instrumentos originales- en los que diseñó y preparó los temas a grabar, entró en el estudio de grabación. Consciente de que los instrumentos no podían estar mucho tiempo fuera de la casa de los Zayas, en tan solo dos días grabó los 10 temas que se incluyen en este disco, alguno de los cuales se puede escuchar grabado de una sola toma, sin ningún tipo de edición, al igual que se hacía en la época de Montoya y Manolo de Huelva. El resultado es el magnífico trabajo que hoy tiene usted en sus manos.\n\nImplicarse en este proyecto ha puesto a Rodrigo de Zayas en situación de repetir lo que su padre hiciera casi un siglo antes: facilitar la grabación de ese disco que nos permite escuchar la música de estos dos grandes pilares de la guitarra flamenca, en instrumentos históricos, pero con la calidad de sonido que permiten los modernos sistemas de grabación. Alejandro Hurtado nos deja unas versiones que, sin dejar de ser fieles al estilo y manera de tocar de los dos grandes maestros, nos aportan su personal visión de la música. Aunque lo que él pretende, desde la humildad que caracteriza a los grandes artistas, es que las nuevas generaciones vuelvan a escuchar y a valorar la música de los maestros antiguos tanto como él lo hace.\n\nPablo Barón Catedrático de guitarra clásica.`,
    tracklist: ['Track 1', 'Track 2', 'Track 3'],
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },
  {
    title: 'Tamiz',
    slug: 'tamiz',
    year: 2019,
    imageUrl: '/images/Tamiz.jpeg',
    description: `Disco que marca el arranque como compositor del guitarrista Alejandro Hurtado\n\nLo que hacen los verdaderamente grandes es empezar por venerar y aprender de sus mayores, asimilarlo, recrearlo y, a la vez, filtrar. De lo que hicieron aquellos genios y también de lo que tienen alrededor, a mano. Para, finalmente y con el producto de las dos cribas, crear su universo. Luego, si el tamiz es bueno y cabal, la pepita que se consigue es de oro. La sustancia forzosamente tiene que ser buena.\n\nAlejandro Hurtado es esa buena noticia que la guitarra siempre necesita, y más ahora. De Alicante, como alguno de nuestros mayores más recordados. Y su segundo disco, que en realidad nació a la par que el primero, es la otra criba que nos faltaba para terminar de asombrarnos. Es su otra verdad, pero habrá más. Si no hace mucho dejó clara su exquisita sabiduría a la hora de recrear la esencia de los muy maestros, toca ahora mostrar el enlace de aquello con su realidad tocaora. Segunda pepita, onza, lingote de oro. No recodábamos debut más abigarrado ni más contundente en la sonanta. Estreno difícil de igualar en el que, efectivamente, además de primero, golpea dos veces.\n\n“Tamiz” llega al caudal de la guitarra flamenca en medio de una época, de una corriente de materiales y sedimentos de variado origen, intención y resultado. Los tiempos actuales, en los que este disco alumbra, son para ir nadando y, con notoria facilidad, buscar hueco entre el rebaño y dejarse llevar. Hay abrigos seguros y muchas veces hasta rentables. Pero Alejandro Hurtado ha optado por lo contrario: navegar hacia arriba, contracorriente. Hacia la cima del toque de su tiempo. Y, como su guitarra de concierto, solo y sin cuadrilla. De momento, ya mismo podría incluso grabar mucho más, lleva en los esportones dos discos y en este, como en el anterior, sus credenciales de aficionado, de conocedor y, en última instancia, de importantísimo virtuoso con pretensiones más allá de lo que dicten los mercados. Y ese más allá son las veredas y corrientes por las que, sin remedio, tendrán que navegar los pocos guitarristas que de verdad quieran dejar huella y marcar una época del toque. A todo ello, añádase la dificilísima capacidad de reconversión y recreación de cada toque, la constante renovación de sus composiciones y el inabarcable caudal creativo que atesora, así vengan tormentas imprevistas. Su tamiz no deja de estar alerta.\n\nEse ”Tamiz” de Alejandro aúna potencia, soniquete, peso… eso que tanto exigen los cancerberos de lo purísimo a los forasteros del flamenco que pasan por sus barrios. Pero también articulación, fraseo, limpieza y esas últimas novedades técnicas y armónicas que tanto demandan los académicos obsesionados con los análisis clínicos.\n\nSin embargo, el fuerte de la propuesta de Alejandro Hurtado es que su tremenda guitarra se pone al servicio de su propia razón de ser, de su misma esencia humana. Al final, se ve la nobleza de un joven pero ya bregado guitarrista que sabe quién es su familia, su amor, aquel festival de guitarra que le dio un pequeño empujón, el otro que le encumbró, la calle cordobesa en la que vivió su paso a la edad adulta, el cantaor que le pidió candela seguiriyera, el mítico cuarto de cabales de Villa Rosa donde se coció la guitarra flamenca o su mejor momento del día, para ser él mismo. El Alejandro que conocemos, el de siempre.\n\nPablo San Nicasio Ramos.`,
    tracklist: ['Track 1', 'Track 2', 'Track 3'],
    spotifyUrl: '#',
    appleMusicUrl: '#',
  },
];

const AlbumDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const album = albums.find(a => a.slug === slug);

  if (!album) {
    return <Box>Album not found</Box>;
  }

  return (
    <Box bg="black" color="white" minH="100vh">
      <Container maxW="container.lg" py={{ base: 6, md: 20 }}>
        <VStack spacing={{ base: 6, md: 10 }} align="stretch">
          <VStack spacing={{ base: 6, md: 10 }} align="stretch">
            <Image 
              src={album.imageUrl} 
              alt={album.title} 
              borderRadius="lg" 
              w={{ base: '100%', md: '300px' }} 
              h={{ base: 'auto', md: '300px' }} 
              objectFit="cover" 
              shadow="2xl" 
              aspectRatio="1"
            />
            <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
              <Heading 
                as="h1" 
                size="2xl" 
                textAlign={{ base: 'center', md: 'left' }}
                letterSpacing="tight"
                fontWeight="bold"
              >
                {album.title}
              </Heading>
              <Text 
                fontSize="xl" 
                color="gray.400"
                textAlign={{ base: 'center', md: 'left' }}
              >
                {album.year}
              </Text>
              
              <HStack 
                spacing={6} 
                justify={{ base: 'center', md: 'flex-start' }} 
                w="100%"
                pt={2}
                pb={6}
              >
                <Link href={album.spotifyUrl} isExternal>
                  <Icon as={FaSpotify} w={8} h={8} transition="all 0.2s" _hover={{ color: 'green.400' }} />
                </Link>
                <Link href={album.appleMusicUrl} isExternal>
                  <Icon as={FaApple} w={8} h={8} transition="all 0.2s" _hover={{ color: 'red.400' }} />
                </Link>
              </HStack>

              <Text 
                fontSize={{ base: 'md', md: 'lg' }} 
                lineHeight="tall"
                letterSpacing="wide"
                color="gray.300"
                whiteSpace="pre-wrap"
                sx={{
                  '&': {
                    maxWidth: '65ch',
                    textAlign: 'justify',
                  },
                  '& p': {
                    marginBottom: '1.5rem',
                  },
                  '@media (max-width: 48em)': {
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                    paddingX: '1rem',
                  }
                }}
              >
                {album.description}
              </Text>
            </VStack>
          </VStack>
          
          <Box pt={8}>
            <Heading 
              as="h2" 
              size="xl" 
              mb={5}
              textAlign={{ base: 'center', md: 'left' }}
              letterSpacing="tight"
            >
              Tracklist
            </Heading>
            <VStack 
              align="stretch" 
              spacing={3}
              px={{ base: 4, md: 0 }}
            >
              {album.tracklist.map((track, index) => (
                <Text 
                  key={index} 
                  fontSize={{ base: 'md', md: 'lg' }}
                  py={2}
                  px={4}
                  borderRadius="md"
                  _hover={{ bg: 'whiteAlpha.100' }}
                  transition="all 0.2s"
                >
                  {index + 1}. {track}
                </Text>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AlbumDetailPage;
