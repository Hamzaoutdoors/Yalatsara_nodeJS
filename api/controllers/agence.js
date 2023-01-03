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
    const agences = await Agence.find({});
    res.status(200).json({ agences })
})

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
    const { id: agenceID } = req.params;
    const agence = await Agence.findByIdAndDelete({ _id: agenceID });

    if (!agence) {
        return next(createCustomError(`No agence with id: ${agenceID}`, 404))
    }

    res.status(200).json({ agence })
})