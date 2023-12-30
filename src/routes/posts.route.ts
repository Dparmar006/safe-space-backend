import express from "express";
import { getPostsController } from "../controllers/posts.controllers";
const router = express.Router();

router.get("/", getPostsController);

export default router;
