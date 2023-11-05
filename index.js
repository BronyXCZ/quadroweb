const app = require('express')();
const fs = require('fs');

app.get('', (req, res) => {
    fs.readFile('./sites/home.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.send(data);
        }
    })
})