import express from "express";
import { getPostsController } from "../controllers/posts.controllers";
import errorWrap from "../utils/errors.utils";
const router = express.Router();

router.get("/", errorWrap(getPostsController, "Could not get the posts"));

export default router;
