import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyToken.js";
const router = express.Router();

router.route("/").get(verifyAdmin, getAllUsers);
router.route("/:id").get(verifyUser, getUser).patch(verifyUser, updateUser).delete(verifyUser, deleteUser)

export default router;