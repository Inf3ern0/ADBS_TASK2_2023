const http = require('https');
const app = require('./app');
const fs = require('fs');

const port = 3000


const server = http.createServer(
    {
        key: fs.readFileSync('./Keys/privatekey.pem'),
        cert: fs.readFileSync('./Keys/certificate.pem')
    },app);

server.listen(port)