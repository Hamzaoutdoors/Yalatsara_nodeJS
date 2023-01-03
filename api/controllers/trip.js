import Trip from "../models/Trip.js";
import Agence from "../models/Agence.js";
import { createCustomError } from "../errors/custom-error.js"
import { StatusCodes } from "http-status-codes";
import asyncWrapper from "../middleware/async.js";

//CREATE
export const createTrip = asyncWrapper(async (req, res, next) => {
    const { agenceId } = req.params;
    const newTrip = await Trip.create(req.body);

    const agence = await Agence.findById(agenceId)

    if (!agence) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: `agence with id: ${agenceId} doesn't exists` });
        return next(createCustomError(`No agence  with id: ${agenceId}`, StatusCodes.NOT_FOUND));
    }

    await Agence.findByIdAndUpdate(agenceId, {
        $push: { trips: newTrip._id },
    })

    res.status(StatusCodes.OK).json({ trip: newTrip });
});

//GET
export const getTrip = async (req, res, next) => {
    const { tripId } = req.params;
    const trip = await Trip.findOne({ _id: tripId });

    if (!trip) {
        return next(createCustomError(`No trip with id : ${tripId} has been found`, StatusCodes.NOT_FOUND))
    };

    res.status(200).json({ trip });
};

//GET ALL
export const getAllTrips = async (req, res) => {
    const trips = await Trip.find({});
    res.status(200).json({ trips })
};


//UPDATE
export const updateTrip = asyncWrapper(async (req, res, next) => {
    const { tripId } = req.params;

    const trip = await Trip.findByIdAndUpdate({ _id: tripId }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!trip) {
        return next(createCustomError(`No trip with id : ${tripId} has been found`, StatusCodes.NOT_FOUND))
    }

    res.status(StatusCodes.OK).json({ trip })
});

//DELETE

export const deleteTrip = asyncWrapper(async (req, res, next) => {
    const { tripId, agenceId } = req.params;
    const trip = await Trip.findByIdAndDelete({ _id: tripId });
    const agence = await Agence.findByIdAndUpdate(agenceId, {
        $pull: { trips: tripId },
    });

    if (!trip || !agence) {
        return next(createCustomError('Try to use valid agence or trip id', StatusCodes.NOT_FOUND))
    };

    res.status(200).json({ msg: "Trip has been deleted!" })
});