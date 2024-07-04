const express = require('express');
const { generateShortUrl, getUrlAnalytics, redirectToURL } = require('../controllers/url')

const router = express.Router();

router.post('/', generateShortUrl);
router.get('/analytics/:shortId', getUrlAnalytics);
router.get('/:shortId', redirectToURL);

module.exports = router;
