export interface Movie {
    id: string;
    title: string;
    director: string;
    releaseYear: number;
    genre: string;
    duration: number;
    rating: number | null;
    actors: string[];
    coverImage: string;
    showtimes: Showtime[];
  }
  
  export interface Showtime {
    day: string;
    times: string[];
  }
  