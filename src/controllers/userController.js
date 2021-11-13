import express from 'express'
import User from '../model/User.js'
//import bcrypt from 'bcryptjs'
import Role from '../model/Role.js'
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types



export const createUser = async (req, res) => {
    const payload = req.body
    const userFound = await User.findOne({ userName: payload.userName })
    if (userFound)
        return res.status(409).json({ message: 'The userName alredy exists' })

    // const salt = bcrypt.genSaltSync(10)
    // const hash = bcrypt.hashSync(payload.password, salt)

    // const user = new User( {...payload, password: hash})
    const emailFound = await User.findOne({ email: payload.email })
    if (emailFound)
        return res.status(409).json({ message: 'The email alredy exists' })

    const user = new User( {...payload, password: await User.encryptPassword(payload.password)
    })

    if (payload.roles) {
        const foundRoles = await Role.find({name: {$in: payload.roles}})
        user.roles = foundRoles.map(role => role._id)
    } else {
        const role = await Role.findOne({name: "user"})
        user.roles = [role._id];
    }

    const savedUser = await user.save()
    res.status(201).json(savedUser)
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users);
    } catch (error) {
        res.json(error)
    }
}

export const getUser = async (req, res) => {
    const userFound = await User.findById(req.params.id)
    if (!userFound) return res.status(204).json();
    return res.status(200).json(userFound)
}

export const deleteUser = async (req, res) => {
    const userFound = await User.findByIdAndDelete(req.params.id)
    if (!userFound) return res.status(204).json();
    return res.json(userFound)
}

export const updateUser = async (req, res) => {

    const { id } = req.params
    const payload = req.body
    //const userUpdated = await User.findByIdAndUpdate(req.params.id, payload, {new: true})
    //if (!userUpdated) return res.status(204).json();
    //res.status(200).json(userUpdated)


if (payload?.password) {
    
    const decoded = await User.encryptPassword(payload.password)

    await User.updateOne({ _id: new ObjectId(id) }, { ...payload, password: decoded })
  } else {
    await User.updateOne({ _id: new ObjectId(id) }, payload)
  }

  res.status(200).json(payload)
}

