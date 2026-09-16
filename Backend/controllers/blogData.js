const mongoose = require("mongoose")
const blogModel = require("../models/blogs")
const chatModel = require("../models/chats")

async function getBlogs(req, res) {
    try {
        const allBlogs = await blogModel.find({})
        return res.status(200).json(allBlogs)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}

async function getById(req, res) {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" })
    }

    try {
        const result = await blogModel.findOne({ _id: id }).populate('createdBy', 'name')

        if (!result) {
            return res.status(404).json({ message: "Blog not found" })
        }

        return res.status(200).json(result)
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}

async function createBlog(req, res) {
    const body = req.body

    if (!body || !body.title) {
        return res.status(400).json({ error: "no data" })
    }

    try {
        const result = await blogModel.create({
            title: body.title,
            image: body.image,
            description: body.description,
            textContent: body.textContent,
            createdBy: req.user._id
        })
        return res.status(201).json({
            message: "Blog created successfully",
            blog: result
        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}

async function setComment(req, res) {
    const id = req.params.id
    const body = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" })
    }

    if (!body || !body.text) {
        return res.status(400).json({ message: "Comment text is required" })
    }

    try {
        const chatData = await chatModel.create({
            text: body.text,
            createdBy: req.user._id,
            commentOn: id
        })

        return res.status(201).json({
            message: "New comment created successfully",
            comment: chatData
        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}

async function getComments(req, res) {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" })
    }

    try {
        const comments = await chatModel.find({ commentOn: id }).populate('createdBy', 'name')
        return res.status(200).json(comments)
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getById,
    setComment,
    getComments
}