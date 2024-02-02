import express from "express";
import { getUsersController } from "../controllers/users.controllers";
import errorWrap from "../utils/errors.utils";
import auth from "../middleware/auth";
const router = express.Router();

router.use(auth);
router.get("/", errorWrap(getUsersController, "Could not get the users"));

export default router;
