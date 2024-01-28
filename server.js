let http = require('http');
let fs = require('fs');
let url = require('url');

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let fileName = '.' + q.pathname;
    fs.readFile(fileName, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
})