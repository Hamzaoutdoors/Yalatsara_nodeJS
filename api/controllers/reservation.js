import Reservation from "../models/Reservation.js";
import { createCustomError } from "../errors/custom-error.js"
import { StatusCodes } from "http-status-codes";
import asyncWrapper from "../middleware/async.js";
import Trip from "../models/Trip.js";

//CREATE
export const createReservation = asyncWrapper(async (req, res, next) => {
    const { numOfPlaces, trip: tripId } = req.body;

    const dbTrip = await Trip.findOne({ _id: tripId });
    if (!dbTrip) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: `trip with id: ${tripId} doesn't exists` });
        return next(createCustomError(`No trip  with id: ${tripId}`, StatusCodes.NOT_FOUND));
    };

    const { price, _id } = dbTrip;

    const total = numOfPlaces * price;

    const body = {
        ...req.body,
        total, 
        user: req.user._id
    }

    const newReservation = await Reservation.create(body);

    res.status(StatusCodes.CREATED).json({ reservation: newReservation });
});

//GET
export const getReservation = async (req, res, next) => {
    const { reservationId } = req.params;
    const reservation = await Reservation
        .findOne({ _id: reservationId })
        .populate({
            path: 'trip user',
        });

    if (!reservation) {
        return next(createCustomError(`No reservation with id : ${reservationId} has been found`, StatusCodes.NOT_FOUND))
    };

    res.status(200).json({ reservation });
};

//GET ALL
export const getAllReservations = async (req, res) => {

    const reservations = await Reservation.find({});

    res.status(200).json({ reservations, count: reservations.length })
};

// Current user Reservations
export const getCurrentUserReservations = async (req, res) => {
    const myReservations = await Reservation.find({ user: req.user.userId });
    res.status(StatusCoBAD_REQUESTdes.OK).json({ myReservations, count: myReservations.length });
};


//UPDATE
export const updateReservation = asyncWrapper(async (req, res, next) => {
    const { reservationId } = req.params;
    const { paymentIntentId } = req.body;

    const reservation = await Reservation.findOne({_id: reservationId});

    if (!reservation) {
        return next(createCustomError(`No reservation with id : ${reservationId} has been found`, StatusCodes.NOT_FOUND))
    };

    const trip = await Trip.findOne({_id: reservation.trip});

    if(trip.availableSeats < reservation.numOfPlaces) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: 'There is no places available, could you please choose an other trip' });
    }

    const availablePlaces = trip.availableSeats - reservation.numOfPlaces;

    reservation.paymentIntentId = paymentIntentId;
    reservation.status = 'paid'

    await Trip.findByIdAndUpdate({ _id: trip._id }, {availableSeats: availablePlaces}, {
        new: true,
        runValidators: true,
    });

    await reservation.save();
    res.status(StatusCodes.OK).json({ reservation })
});

//DELETE

export const deleteReservation = asyncWrapper(async (req, res, next) => {
    const { reservationId } = req.params;
    const reservation = await Reservation.findOneAndRemove({ _id: reservationId });

    /*     const reservation = await Reservation.findByIdAndUpdate(reservationId, {
            $pull: { reservations: reservationId },
        }); */

    if (!reservation) {
        return next(createCustomError('Try to use valid reservation or reservation id', StatusCodes.NOT_FOUND))
    };

    res.status(200).json({ reservation })
});
