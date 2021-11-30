import express from 'express'
import DogGrommer from '../model/DogGrommer.js'
import Service from '../model/Service.js'



export const getDogGrommer = async (req, res) => {
    try {
        const dg = await DogGrommer.find()
        res.json(dg)
    } catch (error) {
        res.json(error)
    }

}

export const getDogGrommerById = async (req, res) => {

    const dogGrommerFound = await DogGrommer.findById(req.params.id).populate("service")

    if (!dogGrommerFound) return res.status(204).json();

    return res.status(200).json(dogGrommerFound)
}


// export const getDogGrommerById = async (req, res) => {

//     const dgFound = await DogGrommer.findById(req.params.id)
//     if (!dgFound) return res.status(204).json();
//     return res.status(200).json(dgFound)
// }

export const searchDG = async (req, res) => {
    try {
        const dg = await DogGrommer.find({
            name: new RegExp(req.params.query, 'i'),
        });
        res.json(dg);
    } catch (error) {
        res.status(400).json({
            message: "Error al procesar la peticion"
        })
    }
}


export const createDogGrommer = async (req, res) => {
    const payload = req.body

    const serviceFound = await Service.findOne({ _id: payload.service })

    const dGFound = await DogGrommer.findOne({ name: payload.name })
    if (dGFound) {
        res.status(409).json({ message: 'Dog Grommer already exists' })

    } else if (!serviceFound) {
        res.status(409).json({ message: 'This service does not exist' })
    } else {
        const dG = new DogGrommer({ ...payload })

        const savedDG = await dG.save()
        res.status(201).json(savedDG)
    }
}

export const updateDogGrommerById = async (req, res) => {

    const payload = req.body

    const dgFound = await DogGrommer.findOne({ name: payload.name })
    if (dgFound)
        return res.status(409).json({ message: `The service ${payload.name} alredy exists` })

    const serviceFound = await Service.findOne({ _id: payload.service })

    // if (!serviceFound)
    //     res.status(409).json({ message: 'This service does not exist' })


    const updatedDG = await DogGrommer.findByIdAndUpdate(req.params.id, payload, { new: true })

    if (!updatedDG) return res.status(204).json()

    res.status(200).json(updatedDG)
}

export const deleteDogGrommerById = async (req, res) => {

    const dgFound = await DogGrommer.findByIdAndDelete(req.params.id)

    if (!dgFound) return res.status(204).json();

    return res.json(dgFound)
}
