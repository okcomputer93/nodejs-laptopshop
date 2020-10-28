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
    console.log(pathName);

    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('This is the response');
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
});