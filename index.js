//Core modules
const fileSystem = require('fs');
const http = require('http');
const url = require('url');

//__dirname = Home folder
// It can be synchronus because it runs only once
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
        
        //This is asynchronus, so users don't wait until it finishes to read this file
        fileSystem.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
            output = output.replace(/{%IMAGE%}/g, laptop.image);
            output = output.replace(/{%SCREEN%}/g, laptop.screen);
            output = output.replace(/{%CPU%}/g, laptop.cpu);
            output = output.replace(/{%SCREEN%}/g, laptop.screen);
            output = output.replace(/{%STORAGE%}/g, laptop.storage);
            output = output.replace(/{%RAM%}/g, laptop.ram);
            output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
            output = output.replace(/{%PRICE%}/g, laptop.price);
            res.end(output);
        });
    }
    else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('Uh oh. That was unexpected.');
    }

    
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
});