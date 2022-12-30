import express from "express";
const router = express.Router();
import { getAllAgences, createAgence, updateAgence, getAgence, deleteAgence } from "../controllers/agence.js";

//GET

router.route("/").get(getAllAgences).post(createAgence);
router.route("/:id").get(getAgence).patch(updateAgence).delete(deleteAgence)

//UPDATE
//DELETE

export default router;