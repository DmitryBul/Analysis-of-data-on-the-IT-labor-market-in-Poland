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
        } = req.query;
        var {
            page = 1, // default to first page
            pageSize = 10 // default to 10 items per page
        } = req.query;

        let filters = {};

        if (companyName) filters.companyName = companyName;
        if (minAvg_Salary) filters.avg_Salary = {...filters.avg_Salary, $gte: Number(minAvg_Salary)};
        if (maxAvg_Salary) filters.avg_Salary = {...filters.avg_Salary, $lte: Number(maxAvg_Salary)};
        if (location) filters.location = {$in: location.split(',').map(loc => loc.trim())};
        if (technology) filters.technology = {$in: technology.split(',').map(tech => tech.trim())};
        if (seniority) filters.seniority = seniority;
        if (year) filters.year = year;
        if (month) filters.month = month;

        page = (parseInt(page) && parseInt(page) > 0) ? parseInt(page) : 1;
        pageSize = (parseInt(pageSize) && parseInt(pageSize) > 0) ? parseInt(pageSize) : 10;

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
        res.status(500).json({message: err.message});
    }
});

router.get('/filters', async (req, res) => {
    const location = await Item.distinct('location');
    const technology = await Item.distinct('technology');
    const seniority = await Item.distinct('seniority');
    const year = await Item.distinct('year');
    const month = await Item.distinct('month');

    res.json({
        location,
        technology,
        seniority,
        year,
        month
    });
});

export {router as filterRouter};
