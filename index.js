const app = require('express')();
const port = process.env.PORT || 3000;

app.get("", (req, res) => {
    res.send(fetch('./sites/home.html').text());
})