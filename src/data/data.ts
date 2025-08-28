import { convertEvents } from '../utils/eventDataUtils';

// Raw event data that will be converted to proper Event objects
const rawEvents = [
  {
    eventNumber: 1,
    eventName: 'Classical Guitar Recital',
    date: '2025-10-20',
    location: {
      country: 'USA',
      city: 'New York',
      building: 'Carnegie Hall',
    },
    image: '/images/event1.jpg',
    awards: [],
    description: 'An evening of classical and contemporary guitar music.',
  },
  {
    eventNumber: 2,
    eventName: 'Flamenco Night',
    date: '2025-11-05',
    location: {
      country: 'Spain',
      city: 'Madrid',
      building: 'Teatro Real',
    },
    image: '/images/event2.jpg',
    awards: [
      {
        name: 'Best Performance',
        year: 2025,
      },
    ],
    description: 'A passionate performance of traditional flamenco music.',
  },
  {
    eventNumber: 3,
    eventName: 'Acoustic Sessions',
    date: '2024-09-15',
    location: {
      country: 'UK',
      city: 'London',
      building: 'Royal Albert Hall',
    },
    image: '/images/event3.jpg',
    awards: [
      { name: 'Songwriter of the Year', year: 2024 },
      { name: 'Best Acoustic Album', year: 2024 },
    ],
    description: 'An intimate acoustic set featuring new compositions.',
  },
  {
    eventNumber: 4,
    eventName: 'Guitar Virtuosos Festival',
    date: '2024-07-22',
    location: {
      country: 'Germany',
      city: 'Berlin',
      building: 'Berliner Philharmonie',
    },
    image: '/images/event4.jpg',
    awards: [
      {
        name: 'Top Guitarist Prize',
        year: 2024,
      },
      { name: 'Audience Favorite', year: 2024 },
    ],
    collaborators: ['Guest Artist'],
    description: 'A celebration of guitar mastery from around the world.',
  },
  {
    eventNumber: 5,
    eventName: 'Tokyo Guitar Night',
    date: '2026-02-10',
    location: {
      country: 'Japan',
      city: 'Tokyo',
      building: 'Suntory Hall',
    },
    image: '/images/event5.jpg',
    awards: [],
    description: 'Exploring the fusion of traditional Japanese music with classical guitar.',
  },
  {
    eventNumber: 6,
    eventName: 'Bossa Nova Evening',
    date: '2023-11-30',
    location: {
      country: 'Brazil',
      city: 'Rio de Janeiro',
      building: 'Theatro Municipal',
    },
    image: '/images/event6.jpg',
    awards: [
      { name: 'Latin Grammy Nomination', year: 2023 },
    ],
    collaborators: ['Local Bossa Nova Group'],
    description: 'A relaxing evening of Bossa Nova and smooth guitar sounds.',
  },
  {
    eventNumber: 7,
    eventName: 'Sydney Opera House Debut',
    date: '2027-05-25',
    location: {
      country: 'Australia',
      city: 'Sydney',
      building: 'Sydney Opera House',
    },
    image: '/images/event7.jpg',
    awards: [],
    description: 'A landmark performance at one of the world\'s most iconic venues.',
  },
  {
    eventNumber: 8,
    eventName: 'Italian Renaissance Concert',
    date: '2028-03-18',
    location: {
      country: 'Italy',
      city: 'Florence',
      building: 'Teatro della Pergola',
    },
    image: '/images/event8.jpg',
    awards: [],
    description: 'A night dedicated to the music of the Italian Renaissance on classical guitar.',
  },
  {
    eventNumber: 9,
    eventName: 'Tango & Guitar',
    date: '2022-08-21',
    location: {
      country: 'Argentina',
      city: 'Buenos Aires',
      building: 'Teatro Colón',
    },
    image: '/images/event9.jpg',
    awards: [],
    collaborators: ['A Tango Dance Couple'],
    description: 'The passionate rhythms of Tango meet the classical guitar.',
  },
  {
    eventNumber: 10,
    eventName: 'Montreal International Jazz Festival',
    date: '2029-07-04',
    location: {
      country: 'Canada',
      city: 'Montreal',
      building: 'Place des Arts',
    },
    image: '/images/event10.jpg',
    awards: [],
    description: 'A special guest performance at the world-renowned jazz festival.',
  },
  {
    eventNumber: 11,
    eventName: 'Indian Classical Fusion',
    date: '2024-04-12',
    location: {
      country: 'India',
      city: 'Mumbai',
      building: 'National Centre for the Performing Arts',
    },
    image: '/images/event11.jpg',
    awards: [],
    collaborators: ['Sitar Player'],
    description: 'A unique blend of Indian classical music and Western guitar techniques.',
  },
  {
    eventNumber: 12,
    eventName: 'Vienna New Year\'s Concert',
    date: '2030-01-01',
    location: {
      country: 'Austria',
      city: 'Vienna',
      building: 'Musikverein',
    },
    image: '/images/event12.jpg',
    awards: [],
    description: 'A prestigious New Year\'s performance in the capital of classical music.',
  },
];

// Convert raw events to properly typed Event objects
const events = convertEvents(rawEvents);

export default events;
