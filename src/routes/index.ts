import express from "express";
import postsRouter from "./posts.route";
import usersRouter from "./users.route";
import authRouter from "./auth.route";
const rootRouter = express.Router();

rootRouter.use("/posts", postsRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/auth", authRouter);

export default rootRouter;
