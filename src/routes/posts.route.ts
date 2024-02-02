import express from "express";
import { getPostsController } from "../controllers/posts.controllers";
import errorWrap from "../utils/errors.utils";
import auth from "../middleware/auth";
const router = express.Router();

router.use(auth);
router.get("/", errorWrap(getPostsController, "Could not get the posts"));

export default router;
