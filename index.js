const http = require('http');
const fs = require('fs');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    fs.readFile('./sites/home.html', 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            console.error('Error:', err);
            res.end('Experienced error whilst loading an HTML');
        } else {
            fs.readFile('./css/home.css', 'utf8', (err, data2) => {
                console.log(data2);
            })

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        }
    })
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});