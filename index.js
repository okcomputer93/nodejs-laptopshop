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
    //console.log(pathName);
    const id = url.parse(req.url, true).query.id;

    //PRODUCTS OVERVIEW
    if (pathName === '/products' || pathName === '/') {
        res.writeHead(200, {'Content-type': 'text/html'});
        
        fileSystem.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            
            fileSystem.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput)
                res.end(overviewOutput);
            });
        });

        
    }

    //LAPTOP DETAIL
    else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, {'Content-type': 'text/html'});
        
        //This is asynchronus, so users don't wait until it finishes to read this file
        fileSystem.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    }
    //IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fileSystem.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data);
        });
    }

    //URL NOT FOUND
    else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end('Uh oh. That was unexpected.');
    }

    
});

server.listen(1337, '127.0.0.1', () => {
    console.log('Listening for requests now');
});

function replaceTemplate(originalHTML, laptop) 
{
    let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}