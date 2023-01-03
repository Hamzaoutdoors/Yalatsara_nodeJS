import express from "express";
import { createTrip, deleteTrip, getAllTrips, getTrip, updateTrip } from "../controllers/trip.js";
import { verifyAdmin } from "../middleware/verifyToken.js";
const router = express.Router();

router.route("/:agenceId").post(verifyAdmin, createTrip);
router.route("/").get(getAllTrips);
router.route("/:tripId").get(getTrip).patch(verifyAdmin, updateTrip)
router.route("/:agenceId/:tripId").delete(verifyAdmin, deleteTrip);

export default router; 