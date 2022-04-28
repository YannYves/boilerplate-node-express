import axios from "axios";
import { redisClient } from "../../server";
import { HandlerRequest, HandlerResponse, Movie } from "../../types";

// TEMPLATE FOR API CALL
// const getMovie = async (
//   req: HandlerRequest,
//   res: HandlerResponse
// ): Promise<void> => {
//   const { title } = req.query;
//   const oneDayInSecond = 86400;
//   const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`;

//   try {
//     const cachedMovie: any = await redisClient.get(`${title}`);
//     if (cachedMovie) {
//       res
//         .status(200)
//         .send({ movie: JSON.parse(cachedMovie), message: "from cache" });
//     } else {
//       const { data } = await axios(url);
//       redisClient.setEx(`${title}`, oneDayInSecond, JSON.stringify(data));
//       res.status(200).send({ movie: data, message: "not from cache" });
//     }
//   } catch (error) {
//     console.log(error, "error");
//   }
// };

//TEMPLATE FOR DB
import MovieModel from "../../model/movie";
import { Movie as MovieType } from "../../types";
import { Response, Request } from "express";

const getMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies: MovieType[] = await MovieModel.find();
    res.status(200).json({ movies });
  } catch (error) {
    throw error;
  }
};

const addMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<MovieType, "Title" | "Year" | "Rated">;
    const movie: MovieType = new MovieModel({
      Title: body.Title,
      Year: body.Year,
      Rated: body.Rated,
    });

    const newMovie: MovieType = await movie.save();
    const allMovies: MovieType[] = await MovieModel.find();

    res.status(201).json({ message: "Movie added", newMovie, allMovies });
  } catch (error) {
    throw error;
  }
};

const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateMovie: MovieType | null = await MovieModel.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allMovies: MovieType[] = await MovieModel.find();
    res.status(200).json({
      message: "Movie updated",
      movie: updateMovie,
      movies: allMovies,
    });
  } catch (error) {
    throw error;
  }
};

const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedMovie: MovieType | null = await MovieModel.findByIdAndRemove(
      req.params.id
    );
    const allMovies: MovieType[] = await MovieModel.find();
    res.status(200).json({
      message: "Movie deleted",
      movie: deletedMovie,
      todos: allMovies,
    });
  } catch (error) {
    throw error;
  }
};

export { getMovie, addMovie, updateMovie, deleteMovie };
