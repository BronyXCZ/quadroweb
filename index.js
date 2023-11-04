const fs = require('fs');
const path = require('path');

const app = require('express')();
const port = process.env.PORT || 3000;

app.get("", (req, res) => {
    document.body.innerHTML = fs.readFileSync(path.join(__dirname, "sites/home.html"))
})