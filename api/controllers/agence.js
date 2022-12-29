import express from "express";
import Agence from "../models/Agence.js"
import asyncWrapper from "../middleware/async.js";

const router = express.Router();

//GET
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
//DELETE
