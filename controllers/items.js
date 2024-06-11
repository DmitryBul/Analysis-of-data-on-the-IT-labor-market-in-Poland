import express from 'express';
import Item from '../models/Data.js';

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
            month
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

        const items = await Item.find(filters);
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export { router as filterRouter };
