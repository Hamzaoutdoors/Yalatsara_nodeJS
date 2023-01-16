import express from "express";
import { createReservation, deleteReservation, getAllReservations, getCurrentUserReservations, getReservation, updateReservation } from "../controllers/reservation.js";
import { authenticateUser, verifyAdmin } from "../middleware/authentication.js";
const router = express.Router();

router.route("/").get(verifyAdmin, getAllReservations).post(authenticateUser, createReservation);
router.route("/:reservationId").get(getReservation).patch(verifyAdmin, updateReservation).delete(verifyAdmin, deleteReservation);
router.route("/find/showAllMyReservations").get(authenticateUser, getCurrentUserReservations)

export default router;

