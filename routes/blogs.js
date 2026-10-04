const express = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");

const router = express.Router();


// ======================================
// CREATE BLOG
// ======================================

router.post("/", async (req, res) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const blog = new Blog({
            title: title,
            content: content,
            author: decoded.id
        });

        await blog.save();

        res.status(201).json({
            message: "Blog created successfully",
            blog: blog
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// ======================================
// GET ALL BLOGS
// ======================================

router.get("/", async (req, res) => {
    try {

        const blogs = await Blog.find()
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.json(blogs);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// ======================================
// GET SINGLE BLOG
// ======================================

router.get("/:id", async (req, res) => {
    try {

        const blog = await Blog.findById(req.params.id)
            .populate("author", "name email");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


module.exports = router;