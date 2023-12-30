import express from "express";
import postsRouter from "./posts.route";
const rootRouter = express.Router();

rootRouter.use("/posts", postsRouter);

export default rootRouter;
