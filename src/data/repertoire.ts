export interface RepertoireItem {
  id: string;
  title: string;
  composer: string;
  duration: string;
  description: string[];
  highlights?: string[];
  year?: number;
}

export const nazarenoOlivaresRepertoire: RepertoireItem[] = [
  {
    id: 'concierto-aranjuez',
    title: 'Concierto de Aranjuez',
    composer: 'Joaquín Rodrigo',
    duration: '22 min',
    year: 1939,
    description: [
      'El Concierto de Aranjuez es, sin duda, la obra más representativa del repertorio para guitarra y orquesta. Desde su estreno en Barcelona en 1940, se ha convertido en el concierto para guitarra más interpretado de la historia.',
      'Alejandro Hurtado ofrece una versión que, manteniéndose fiel a la partitura original, incorpora sus personales criterios de fraseo, dinámicas y sonoridades, dando nueva vida a esta icónica obra.'
    ],
    highlights: [
      'Interpretado en el Teatro Real y Auditorio Nacional de Madrid',
      'Presentado en el Palau de la Música de Barcelona',
      'Actuación en el Barbican Center de Londres',
      'Conciertos en el Gran Teatro de Córdoba y Auditorio de Zaragoza'
    ]
  },
  {
    id: 'gypsy-concert',
    title: 'Gypsy Concert',
    composer: 'Sabicas/Enrique Escudé Cofiner',
    duration: '25 min',
    year: 1976,
    description: [
      'Compuesto en 1975-76, este concierto consta de cuatro movimientos basados en composiciones originales de Sabicas: Guajira, Soleá, Rondeña y Zapateado.',
      'Cofiner, hijo de guitarrista flamenco, creó las partes orquestales, introducciones y secciones de enlace, dando forma a una obra que combina el virtuosismo flamenco con la riqueza orquestal.'
    ],
    highlights: [
      'Versión revisada por Alejandro Hurtado',
      'Interpretado en el Auditori de Barcelona',
      'Presentado en el Teatro Real de Madrid'
    ]
  },
  {
    id: 'romanza',
    title: 'Romanza',
    composer: 'Salvador Bacarisse',
    duration: '8 min',
    year: 1957,
    description: [
      'Segundo movimiento del "Concertino para guitarra y orquesta" compuesto en el exilio parisino de Bacarisse.',
      'Esta pieza, cargada de melancolía y nostalgia, está considerada una de las obras más bellas del repertorio clásico, inspirada en los sentimientos del autor por la lejanía de su patria.'
    ]
  },
  {
    id: 'fantasia-gentilhombre',
    title: 'Fantasía para un Gentilhombre',
    composer: 'Joaquín Rodrigo',
    duration: '20 min',
    year: 1954,
    description: [
      'Compuesto por encargo de Andrés Segovia, este concierto está basado en temas del guitarrista barroco Gaspar Sanz.',
      'Rodrigo logra un diálogo perfecto entre el lenguaje armónico del siglo XX y el espíritu de las danzas españolas del siglo XVII.'
    ]
  },
  {
    id: 'concierto-flamenco',
    title: 'Concierto en Flamenco',
    composer: 'Sabicas/Federico Moreno Torroba',
    duration: '28 min',
    year: 1961,
    description: [
      'Obra maestra que combina cuatro palos flamencos (fandangos, seguiriyas, alegrías y bulerías) con orquestación sinfónica.',
      'Moreno Torroba realizó una magistral orquestación sobre grabaciones originales de Sabicas, creando la primera gran obra para guitarra flamenca y orquesta.'
    ]
  },
  {
    id: 'medea',
    title: 'Medea',
    composer: 'Manolo Sanlúcar',
    duration: '35 min',
    year: 2002,
    description: [
      'Adaptación de la tragedia de Eurípides para guitarra y orquesta sinfónica, originalmente concebida para el Ballet Nacional con coreografía de José Granero.',
      'Considerada una de las mejores orquestaciones flamencas de nuestro tiempo, Alejandro Hurtado ha sido seleccionado por el Ballet Nacional de España para interpretar esta obra en Madrid durante 10 representaciones en 2026.'
    ]
  }
];
