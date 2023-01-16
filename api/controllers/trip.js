import Trip from "../models/Trip.js";
import Agence from "../models/Agence.js";
import { createCustomError } from "../errors/custom-error.js"
import { StatusCodes } from "http-status-codes";
import asyncWrapper from "../middleware/async.js";

//CREATE
export const createTrip = async (req, res, next) => {
    const { agence: agenceId } = req.body;

    const agence = await Agence.findOne({ _id: agenceId })

    if (!agence) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: `agence with id: ${agenceId} doesn't exists` });
        return next(createCustomError(`No agence  with id: ${agenceId}`, StatusCodes.NOT_FOUND));
    }

    const newTrip = await Trip.create({...req.body, availableSeats: req.body.maxMembers});

    await Agence.findByIdAndUpdate(agenceId, {
        $push: { trips: newTrip._id },
    })


    res.status(StatusCodes.CREATED).json({ trip: newTrip });
};

//GET
export const getTrip = async (req, res, next) => {
    const { tripId } = req.params;
    const trip = await Trip
        .findOne({ _id: tripId })
        .populate({
            path: 'agence',
        });;

    if (!trip) {
        return next(createCustomError(`No trip with id : ${tripId} has been found`, StatusCodes.NOT_FOUND))
    };

    res.status(200).json({ trip });
};

//GET ALL
export const getAllTrips = async (req, res) => {
    const { min, max, destination, ...others } = req.query;
    const regex = new RegExp(destination, 'i');

    const trips = await Trip
        .find({
            ...others,
            price: { $gt: min || 1, $lt: max || 99999 },
            destination: { $regex: regex },
        }).populate({
            path: 'agence',
        });
        
    res.status(200).json({ trips, count: trips.length })
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
    const { tripId } = req.params;
    const trip = await Trip.findOne({ _id: tripId });

    if (!trip) {
        return next(createCustomError('Try to use valid agence or trip id', StatusCodes.NOT_FOUND))
    };

    await trip.remove();

    res.status(200).json({ trip })
});

//Single agence trips

export const getSingleAgenceTrips = async (res, req) => {
    const { agenceId } = req.params;

    const trips = await Trip.find({ agence: agenceId });

    res.status(StatusCodes.OK).json({ trips, count: trips.length })
};