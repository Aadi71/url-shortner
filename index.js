const express = require('express');
const { connectToMongoDB } = require('./connect')
const urlRoute = require("./routes/url");
const URL = require('./models/url');
const app = express();
const PORT = 3030;

connectToMongoDB("mongodb://localhost:27017/url-shortner");

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, (error) => {
  if (error) {
    console.error('Server start error:', error);
    process.exit(1);
  } else {
    console.log(`Server started at PORT: ${PORT}`);
  }
});
