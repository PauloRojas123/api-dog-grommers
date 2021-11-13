import mongoose from 'mongoose'
import Service from '../model/Service.js'

const { ObjectId } = mongoose.Types


export const createService = async (req, res) => {

    const payload = req.body

    const serviceFound = await Service.findOne({ name: payload.name })
    if (serviceFound)
        return res.status(409).json({ message: `The service ${payload.name} alredy exists` })

    const newService = new Service({ ...payload })

    const serviceSaved = await newService.save()

    res.status(201).json(serviceSaved)

}


export const getService = async (req, res) => {
    try {
        const service = await Service.find()
        res.json(service);
    } catch (error) {
        res.json(error)
    }
}


export const updateServiceById = async (req, res) => {

    const payload = req.body

    const serviceFound = await Service.findOne({ name: payload.name })
    if (serviceFound)
        return res.status(409).json({ message: `The service ${payload.name} alredy exists` })

    const updatedService = await Service.findByIdAndUpdate(req.params.id, payload, { new: true })

    if (!updatedService) return res.status(204).json();

    res.status(200).json(updatedService)

}


export const deleteServiceById = async (req, res) => {

    const serviceFound = await Service.findByIdAndDelete(req.params.id)

    if (!serviceFound) return res.status(204).json();
    
    return res.json(serviceFound)

}

