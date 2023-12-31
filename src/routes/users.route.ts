import express from "express";
import { getUsersController } from "../controllers/users.controllers";
import errorWrap from "../utils/errors.utils";
const router = express.Router();

router.get("/", errorWrap(getUsersController, "Could not get the users"));

export default router;
