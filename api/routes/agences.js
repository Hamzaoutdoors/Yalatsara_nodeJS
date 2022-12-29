import express from "express";
const router = express.Router();
import { getAllAgences, createAgence } from "../controllers/agence.js";

//GET

router.route("/").get(getAllAgences).post(createAgence);

//UPDATE
//DELETE

export default router;