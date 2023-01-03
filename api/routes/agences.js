import express from "express";
const router = express.Router();
import { getAllAgences, createAgence, updateAgence, getAgence, deleteAgence } from "../controllers/agence.js";
import { verifyAdmin } from "../middleware/verifyToken.js";


router.route("/").get(getAllAgences).post(verifyAdmin, createAgence);
router.route("/:id").get(getAgence).patch(verifyAdmin, updateAgence).delete(verifyAdmin, deleteAgence)

export default router;