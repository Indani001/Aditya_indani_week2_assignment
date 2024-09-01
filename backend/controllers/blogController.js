const Blog = require('../models/blogModel');

// Get all blogs
exports.getAllBlogs = (req, res) => {
    Blog.getAll((err, blogs) => {
        if (err) res.status(500).send(err);
        res.json(blogs);
    });
};

// Create a new blog
exports.createBlog = (req, res) => {
    const newBlog = req.body;
    Blog.create(newBlog, (err, blogId) => {
        if (err) res.status(500).send(err);
        res.status(201).send({ id: blogId });
    });
};

// Update a blog
exports.updateBlog = (req, res) => {
    const updatedBlog = req.body;
    const blogId = req.params.id;
    Blog.update(blogId, updatedBlog, (err) => {
        if (err) res.status(500).send(err);
        res.sendStatus(200);
    });
};

// Delete a blog
exports.deleteBlog = (req, res) => {
    const blogId = req.params.id;
    Blog.delete(blogId, (err) => {
        if (err) res.status(500).send(err);
        res.sendStatus(200);
    });
};
