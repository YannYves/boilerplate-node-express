import { Request, Response } from "express";
import { Document } from "mongoose";
interface Movie extends Document {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: [
    { Source: string; Value: string },
    { Source: string; Value: string },
    { Source: string; Value: string }
  ];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

// I've let the MovieData type in place to make it easy to check wether the data is coming from cache or not.
type MovieData = {
  movie: Movie;
  message: string;
};

type ReqQuery = { title?: string };
type HandlerRequest = Request<ReqQuery>;
type HandlerResponse = Response<MovieData>;

export { Movie, HandlerRequest, HandlerResponse, MovieData };
