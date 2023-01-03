import express from "express";
import User from "../models/User.js"
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js"

//GET
export const getUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params;
    const user = await User.findOne({ _id: userID });

    if (!user) {
        return next(createCustomError(`No user with id: ${userID}`, 404))
    }

    res.status(200).json({ user })
})

//GET ALL
export const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ users })
})

//UPDATE

export const updateUser = asyncWrapper(async (req, res, next) => {
    const { id: userId } = req.params;

    const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!user) {
        return next(createCustomError(`No user with id : ${userId}`, 404))
    }

    res.status(200).json({ user })
})
//DELETE

export const deleteUser = asyncWrapper(async (req, res, next) => {
    const { id: userID } = req.params;
    const user = await User.findByIdAndDelete({ _id: userID });

    if (!user) {
        return next(createCustomError(`No user with id: ${userID}`, 404))
    }

    res.status(200).json({ user })
})