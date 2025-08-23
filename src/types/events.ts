export interface Award {
  name: string;
  year: number;
  iconUrl?: string; // Optional URL for a custom icon/symbol
}

export interface Event {
  eventNumber: number;
  eventName: string; // Replaces 'title'
  tourName?: string; // Optional, as not all events are part of a tour
  date: string; // Keeping a single ISO string 'YYYY-MM-DD' is best for sorting and filtering
  location: {
    country: string;
    province?: string; // Optional
    city: string;
    building?: string; // Optional
  };
  collaborators?: string[]; // For 'artist2', an array is more flexible
  luthier?: string;
  image?: string;
  awards: Award[]; // Using the new Award interface
  description?: string; // Keeping description as optional
}
