const shortid = require('shortid');
const URL = require('../models/url');

async function generateShortUrl(req, res) {
  const body = req.body;
  const url = body.url
  if (!url) return res.status(400).json({ error: "No URL provided." });

  const shortURL = await URL.findOne({ redirectURL: url });
  if (shortURL) {
    return res.json({ message: `The URL is already present, with ID: ${shortURL.shortId}` })
  } else {
    const shortId = shortid();

    await URL.create({
      shortId: shortId,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.json({ id: shortId });
  }
}

async function getUrlAnalytics(req, res) {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ error: "ID is required" });
  } else {
    const url = await URL.findOne({ shortId });
    if (url) {
      return res.json({ totalClicks: url.visitHistory.length, timeStamps: url.visitHistory });
    } else {
      return res.status(400);
    }
  }
}

async function redirectToURL(req, res) {
  const shortId = req.params.shortId;

  if (!shortId) {
    return res.status(400).json({ error: "Invalid Request" });
  } else {
    const entry = await URL.findOneAndUpdate({
      shortId,
    },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          }
        }
      }
    );

    if (entry) {
      return res.redirect(entry.redirectURL);
    } else {
      return res.status(404).json({ error: "Not Found" });
    }
  }
}

module.exports = { generateShortUrl, getUrlAnalytics, redirectToURL };
