let http = require('http');
let fs = require('fs');
let url = require('url');
let express = require("express");
let app = express();

app.use((req, res) => {
    let q = url.parse(req.url, true);
    let fileName = '.' + q.pathname;
    fs.readFile(fileName, function(err, data) {
        if (err) {
            // If there is an error, read and serve the 404.html file
            fs.readFile('./404.html', function(error404, data404) {
                if (error404) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    return res.end('<h1>500 Internal Server Error</h1>');
                }
                res.writeHead(404, {'Content-Type': 'text/html'});
                return res.end(data404);
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(8080, () => {
    console.log('Server is listening on port 8080');
});
