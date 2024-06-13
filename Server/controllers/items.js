import express from 'express';
import Item from '../db/models/Data.js';

const router = express.Router();

// @route   GET api/items
// @desc    Get all items with filters
// @access  Public
router.get('/', async (req, res) => {
    try {
        const {
            companyName,
            location,
            technology,
            seniority,
            minAvg_Salary,
            maxAvg_Salary,
            year,
            month,
            page = 1, // default to first page
            pageSize = 10 // default to 10 items per page
        } = req.query;

        let filters = {};

        if (companyName) filters.companyName = companyName;
        if (minAvg_Salary) filters.avg_Salary = { ...filters.avg_Salary, $gte: Number(minAvg_Salary) };
        if (maxAvg_Salary) filters.avg_Salary = { ...filters.avg_Salary, $lte: Number(maxAvg_Salary) };
        if (location) filters.location = { $in: location.split(',').map(loc => loc.trim()) };
        if (technology) filters.technology = { $in: technology.split(',').map(tech => tech.trim()) };
        if (seniority) filters.seniority = seniority;
        if (year) filters.year = year;
        if (month) filters.month = month;

        const totalItems = await Item.countDocuments(filters);
        const items = await Item.find(filters).skip((page - 1) * pageSize).limit(parseInt(pageSize));
        const totalPages = Math.ceil(totalItems / pageSize);

        res.json({
            page: page,
            totalPages: totalPages,
            pageSize: pageSize,
            totalItems: totalItems,
            items: items
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as filterRouter };
