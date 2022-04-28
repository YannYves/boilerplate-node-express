import { Router } from "express";
import { getMovie } from "../../controllers/movie";

const router: Router = Router();

router.get("/movie", getMovie);

export default router;
