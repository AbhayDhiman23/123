const express = require('express');
const Category = require('../models/category');

const router = express.Router();

// Create a category
router.post('/', async (req, res) => {
    const { name, parentCategory } = req.body;

    try {
        const category = new Category({ name, parentCategory });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().populate('parentCategory');
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
