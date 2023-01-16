import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { authenticateUser, verifyAdmin } from "../middleware/authentication.js";
const router = express.Router();

router.route("/").get(verifyAdmin, getAllUsers);
router.route("/:id").get(authenticateUser, getUser).patch(authenticateUser, updateUser).delete(verifyAdmin, deleteUser)

export default router;