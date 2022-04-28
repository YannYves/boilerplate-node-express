import { Movie } from "../types/index";
import { model, Schema } from "mongoose";

const movieSchema: Schema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Year: {
      type: String,
      required: false,
    },
    Rated: {
      type: String,
      required: false,
    },

    Realeased: {
      type: String,
      required: false,
    },
    Runtime: {
      type: String,
      required: false,
    },
    Genre: {
      type: String,
      required: false,
    },
    Director: {
      type: String,
      required: false,
    },
    Writer: {
      type: String,
      required: false,
    },
    Actors: {
      type: String,
      required: false,
    },
    Plot: {
      type: String,
      required: false,
    },

    Language: {
      type: String,
      required: false,
    },
    Country: {
      type: String,
      required: false,
    },

    Awards: {
      type: String,
      required: false,
    },
    Poster: {
      type: String,
      required: false,
    },
    Ratings: {
      type: Object,
      required: false,
    },

    Metascore: {
      type: Object,
      required: false,
    },

    imdbRating: {
      type: Object,
      required: false,
    },

    imdbVotes: {
      type: Object,
      required: false,
    },

    imdbID: {
      type: Object,
      required: false,
    },

    Type: {
      type: Object,
      required: false,
    },

    DVD: {
      type: Object,
      required: false,
    },

    BoxOffice: {
      type: Object,
      required: false,
    },

    Production: {
      type: Object,
      required: false,
    },

    Website: {
      type: Object,
      required: false,
    },

    Response: {
      type: Object,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<Movie>("Movie", movieSchema);
