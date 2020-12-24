const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./Auxiliar functions/auxliar')
// Lectura de las plantillas

const tempOverview = fs.readFileSync(
    `${__dirname}/templates/overview.html`,
    'utf-8'
  );
  const tempCard = fs.readFileSync(
    `${__dirname}/templates/templateCard.html`,
    'utf-8'
  );
  const tempProduct = fs.readFileSync(
    `${__dirname}/templates/product.html`,
    'utf-8'
  );


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObject = JSON.parse(data);



const server = http.createServer((req, res)=>{

    const  {pathname, query} = url.parse(req.url, true);

    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {
            'Content-type': 'text/html'
          });

          console.log(pathname);

        const mappedArray =  dataObject.map(item => replaceTemplate(tempCard, item)).join('');

        const tempOverviewFill = tempOverview.replace('{%CARDS%}', mappedArray);

        res.end(tempOverviewFill);

    }else if(pathname === '/product'){

        res.writeHead(200, {
            'Content-type': 'text/html'
        });
   
        const tempObjectDetails = replaceTemplate(tempProduct, dataObject[query.id]);1
        res.end(tempObjectDetails);

    }else if(pathname === '/api'){
        
    }else{
        res.writeHead(404,{
            'Content-type': 'text/html',
            'concat,y-own-header': 'hello world'
        });

        res.end('<h1> 404 page not found </h1>')
    }
    res.end('Hello from the server');
});

server.listen(8000, 'localhost', ()=> {
    console.log('Conectado en el servidor correctamente');
})