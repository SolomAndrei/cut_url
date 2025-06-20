const express = require('express');
const Link = require('../models/link');
const router = express.Router();

router.get('/', async (req, res) => {
    const lastAddedLinks = await Link.find().sort({ date: -1 }).limit(25);

    return res.render('index', { links: lastAddedLinks || [] });
});

module.exports = router;
