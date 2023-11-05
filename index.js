const express = require('express');
const path = require('path');
const app = express();
exports.app = app;

const PORT = process.env.PORT || 3000;
exports.PORT = PORT;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route for the home page
app.get('/', (req, res) => {
  console.log("get request");
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});