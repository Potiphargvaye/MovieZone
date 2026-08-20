/**
 * Mock movie data for MovieZone.
 *
 * `poster` / `backdrop` are left as `null` and rendered as a solid-color
 * placeholder block (see components/PosterCard.tsx and app/movie/[id].tsx)
 * until the real Figma image exports are dropped into assets/images.
 *
 * See assets/images/README.md for the exact filename -> slot mapping to wire
 * up once those files exist.
 */

import type { ImageSourcePropType } from "react-native";

export type Movie = {
  id: string;
  title: string;
  rating: number;
  ageRating: string;
  year: string;
  duration: string;
  genre: string;
  description: string;
  director: string;
  cast: string;
  releaseDate: string;
  ticketPrice: number;
  placeholderColor: string;
  poster: ImageSourcePropType | null;
  backdrop: ImageSourcePropType | null;
  showtimes: { time: string; seatsAvailable: number }[];
};

export const movies: Movie[] = [
  {
    id: "blade-runner-2049",
    title: "Blade Runner 2049",
    rating: 4.8,
    ageRating: "R",
    year: "2017",
    duration: "164m",
    genre: "Sci-Fi, Action",
    description:
      "Officer K (Ryan Gosling), a new blade runner for the Los Angeles Police Department, unearths a long-buried secret that has the potential to plunge whats left of society into chaos. His discovery leads him on a quest to find Rick Deckard (Harrison Ford).",
    director: "Denis Villeneuve",
    cast: "Ryan Gosling, Harrison Ford, Ana de Armas, Mackenzie Davis",
    releaseDate: "October 6th, 2017",
    ticketPrice: 50.0,
    placeholderColor: "#C9963B",
    poster: require("@/assets/images/image7.png"),
    backdrop: require("@/assets/images/image7.png"),
    showtimes: [
      { time: "11:15", seatsAvailable: 4 },
      { time: "14:15", seatsAvailable: 10 },
      { time: "17:15", seatsAvailable: 15 },
    ],
  },
  {
    id: "dune",
    title: "Dune",
    rating: 4.6,
    ageRating: "PG-13",
    year: "2021",
    duration: "155 minutes",
    genre: "Sci-Fi, Adventure",
    description:
      "A noble family becomes embroiled in a war for control over the galaxys most valuable asset while its heir becomes troubled by visions of a dark future.",
    director: "Denis Villeneuve",
    cast: "Timothee Chalamet, Zendaya, Rebecca Ferguson",
    releaseDate: "October 22nd, 2021",
    ticketPrice: 500.0,
    placeholderColor: "#4C7A78",
    poster: require("@/assets/images/image1.png"),
    backdrop: null,
    showtimes: [
      { time: "11:15", seatsAvailable: 6 },
      { time: "14:15", seatsAvailable: 9 },
      { time: "17:15", seatsAvailable: 12 },
      { time: "20:15", seatsAvailable: 3 },
    ],
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    rating: 4.9,
    ageRating: "PG-13",
    year: "2022",
    duration: "133 minutes",
    genre: "Action, Drama",
    description:
      "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a new generation of pilots for a specialized mission.",
    director: "Joseph Kosinski",
    cast: "Tom Cruise, Miles Teller, Jennifer Connelly",
    releaseDate: "May 27th, 2022",
    ticketPrice: 590.0,
    placeholderColor: "#B7823C",
    poster: require("@/assets/images/image2.png"),
    backdrop: null,
    showtimes: [
      { time: "11:15", seatsAvailable: 8 },
      { time: "15:15", seatsAvailable: 5 },
    ],
  },
  {
    id: "asteroid-city",
    title: "Asteroid City",
    rating: 4.2,
    ageRating: "PG-13",
    year: "2023",
    duration: "105 minutes",
    genre: "Comedy, Drama",
    description:
      "A Junior Stargazer convention in a fictional American desert town circa 1955 brings together students, parents, and military personnel for an unforgettable week.",
    director: "Wes Anderson",
    cast: "Jason Schwartzman, Scarlett Johansson, Tom Hanks",
    releaseDate: "January 12th, 2023",
    ticketPrice: 1000.0,
    placeholderColor: "#4FD1C5",
    poster: require("@/assets/images/image3.png"),
    backdrop: null,
    showtimes: [
      { time: "12:00", seatsAvailable: 11 },
      { time: "16:30", seatsAvailable: 7 },
    ],
  },
  {
    id: "her",
    title: "Her",
    rating: 4.5,
    ageRating: "R",
    year: "2023",
    duration: "126 minutes",
    genre: "Romance, Drama",
    description:
      "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
    director: "Spike Jonze",
    cast: "Joaquin Phoenix, Scarlett Johansson, Amy Adams",
    releaseDate: "February 3rd, 2023",
    ticketPrice: 700.0,
    placeholderColor: "#C23B6B",
    poster: require("@/assets/images/image4.png"),
    backdrop: null,
    showtimes: [
      { time: "13:45", seatsAvailable: 9 },
      { time: "19:00", seatsAvailable: 2 },
    ],
  },
];

export const getMovieById = (id: string | undefined) =>
  movies.find((movie) => movie.id === id);

export const nowPlaying = [movies[1], movies[2]]; // Dune, Top Gun: Maverick
export const comingSoon = [movies[3], movies[4]]; // Asteroid City, Her
export const heroMovie = movies[0]; // Blade Runner 2049
