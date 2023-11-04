const app = require('express')();
const port = process.env.PORT || 3000;

app.get("", (req, res) => {
    document.body.innerHTML = fetch('./sites/home.html').text();
})