const app = require('express')();
const port = process.env.PORT || 3000;

app.get("", (req, res) => {
    document.getElementById("content").innerHTML = fetch('./sites/home.html').text();
})