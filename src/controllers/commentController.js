import mongoose from 'mongoose'
import Comment from '../model/Comment.js'
import User from '../model/User.js'

const { ObjectId } = mongoose.Types


export const createComment = async (req, res) => {

    const payload = req.body

    const user = await User.findById(req.userId)

    const newComment = new Comment({ ...payload, user: user })

    const commentSaved = await newComment.save()

    res.status(201).json(commentSaved)

}


export const getComment = async (req, res) => {
    try {
        const comment = await Comment.find()
        res.json(comment);
    } catch (error) {
        res.json(error)
    }
}


export const updateCommentById = async (req, res) => {
    const payload = req.body

    const userId = req.userId

    const found = await Comment.findById(req.params.id)

    const user = await found.user.toString()

    if (userId === user) {

        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, payload, { new: true })
        if (!updatedComment) return res.status(204).json();
        res.status(200).json(updatedComment)

    } else {
        res.status(203).json({ message: "Unauthorized" })
    }


}


export const deleteCommentById = async (req, res) => {

    const userId = req.userId

    const found = await Comment.findById(req.params.id)

    const user = await found.user.toString()

    if (userId === user) {

        await Comment.findByIdAndDelete(req.params.id)
        res.status(204).json()

    } else {
        res.status(203).json({ message: "Unauthorized" })
    }
}