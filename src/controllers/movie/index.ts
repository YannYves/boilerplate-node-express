import axios from "axios";
import { redisClient } from "../../server";
import { HandlerRequest, HandlerResponse } from "../../types";

const getMovie = async (
  req: HandlerRequest,
  res: HandlerResponse
): Promise<void> => {
  const { title } = req.query;
  const oneDayInSecond = 86400;
  const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`;

  try {
    const cachedMovie: any = await redisClient.get(`${title}`);
    if (cachedMovie) {
      res
        .status(200)
        .send({ movie: JSON.parse(cachedMovie), message: "from cache" });
    } else {
      const { data } = await axios(url);
      redisClient.setEx(`${title}`, oneDayInSecond, JSON.stringify(data));
      res.status(200).send({ movie: data, message: "not from cache" });
    }
  } catch (error) {
    console.log(error, "error");
  }
};

export { getMovie };
