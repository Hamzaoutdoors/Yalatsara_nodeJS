import express from "express";
import { createTrip, deleteTrip, getAllTrips, getTrip, updateTrip } from "../controllers/trip.js";
import { verifyAdmin } from "../middleware/authentication.js";
const router = express.Router();

router.route("/").get(getAllTrips).post(verifyAdmin, createTrip);
router.route("/:tripId").get(getTrip).patch(verifyAdmin, updateTrip).delete(verifyAdmin, deleteTrip);

export default router; 