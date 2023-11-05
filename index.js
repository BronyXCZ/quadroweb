const fs = require('fs');

if (typeof document !== undefined) {
    fs.readFile('./sites/home.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            document.body.innerHTML = data;
        }
    })
} else {console.log("Not running on web")}