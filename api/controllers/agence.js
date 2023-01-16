import express from "express";
import Agence from "../models/Agence.js"
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js"
import { StatusCodes } from "http-status-codes";

//GET
export const getAgence = asyncWrapper(async (req, res, next) => {
    const { id: agenceID } = req.params;
    const agence = await Agence.findOne({ _id: agenceID });

    if (!agence) {
        return next(createCustomError(`No agence with id: ${agenceID}`, 404))
    }

    res.status(200).json({ agence })
})

//GET ALL
export const getAllAgences = asyncWrapper(async (req, res) => {
    const { min, max, ...others } = req.query;

    const agences = await Agence.find({
        ...others,
        cheapest: { $gt: min || 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json({ agences })
});

//CREATE

export const createAgence = asyncWrapper(async (req, res) => {
    const agence = await Agence.create(req.body)
    res.status(201).json({ agence })
})

//UPDATE

export const updateAgence = asyncWrapper(async (req, res, next) => {
    const { id: agenceId } = req.params;

    const agence = await Agence.findByIdAndUpdate({ _id: agenceId }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!agence) {
        return next(createCustomError(`No agence with id : ${agenceId}`, 404))
    }

    res.status(StatusCodes.OK).json({ agence })
})
//DELETE

export const deleteAgence = asyncWrapper(async (req, res, next) => {
    const { id: agenceId } = req.params;

    const agence = await Agence.findOne({ _id: agenceId });

    if (!agence) {
        return next(createCustomError(`No agence with id: ${agenceId}`, StatusCodes.NOT_FOUND))
    }

    await agence.remove();
    res.status(StatusCodes.OK).json({ agence })
});

export const countByCity = asyncWrapper(async (req, res) => {
    const cities = req.query.cities.split(",");

    const list = await Promise.all(
        cities.map((city) => {
            return Agence.countDocuments({ city: city })
        })
    );

    res.status(StatusCodes.OK).json(list)
});

export const countByCat = asyncWrapper(async (req, res) => {
    const mountCount = await Agence.countDocuments({ cat: "Mountains" });
    const internationalCount = await Agence.countDocuments({ type: "International" });

    res.status(StatusCodes.OK).json([
        { category: "Hiking and outdoors", count: mountCount },
        { type: "International trips", count: internationalCount },
    ]);
});