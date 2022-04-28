import { Router } from "express";
import {
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../../controllers/movie";

const router: Router = Router();

router.get("/movie", getMovie);
router.post("/add-movie", addMovie);
router.put("/edit-movie/:id", updateMovie);
router.delete("/delete-movie/:id", deleteMovie);

export default router;
