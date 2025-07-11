const express = require('express');
const router = express.Router();
const Link = require('../models/link');
const shortid = require('shortid');

let APP_LINK = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
    APP_LINK = process.env.BASE_URL;
}

router.post('/short', async (req, res) => {
    try {
        const { link } = req.body;
        let url = await Link.findOne({ source: link });

        if (url) {
            return res.json(url);
        }
        const code = shortid.generate();
        const shortUrl = `${APP_LINK}/links/${code}`;
        url = new Link({
            code,
            source: link,
            short: shortUrl,
        });

        await url.save();
        return res.json(url);
    } catch (err) {
        return res.status(500).json({ status: 500, message: JSON.stringify(err) });
    }
});

router.get('/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const urlObj = await Link.findOne({ code });
        if (urlObj) {
            return res.redirect(urlObj.source);
        } else {
            return res.status(404).json({ status: 404, message: 'Link not found' });
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: JSON.stringify(err) });
    }
});
module.exports = router;
