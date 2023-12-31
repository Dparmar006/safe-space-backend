import express from "express";
import errorWrap from "../utils/errors.utils";
import { signin, signup } from "../controllers/auth.controllers";
const router = express.Router();

router.get("/signup", errorWrap(signup, "Could not get the users"));
router.get("/signin", errorWrap(signin, "Could not get the users"));

export default router;
