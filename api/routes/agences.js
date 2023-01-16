import express from "express";
const router = express.Router();
import { getAllAgences, createAgence, updateAgence, getAgence, deleteAgence, countByCity, countByCat } from "../controllers/agence.js";
import { verifyAdmin } from "../middleware/authentication.js";


router.route("/").get(getAllAgences).post(verifyAdmin, createAgence);
router.route("/find/:id").get(getAgence).patch(verifyAdmin, updateAgence).delete(verifyAdmin, deleteAgence);
router.route("/countByCity").get(countByCity);
router.route("/countByCategory").get(countByCat);

export default router;