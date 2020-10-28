//Core modules
const fileSystem = require('fs');
const http = require('http');
const url = require('url');

//__dirname = Home folder
const json = fileSystem.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
//console.log(__dirname);
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
    //Routing
    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('This is the PRODUCTS page');
    }
    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(`This is the LAPTOP page for laptop ${id}`);
    }

    res.writeHead(404, {'Content-type': 'text/html'});
    res.end('Uh oh. That was unexpected.');
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
});