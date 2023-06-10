"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const http = require('http');
// const fs = require('fs');
// const wiki = require('wikipedia');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/ts', express.static('public/ts'));
app.use('/img', express.static(__dirname + 'public/img'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.listen(port, () => console.info('Listening on port ' + port));
// const server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     fs.readFile('src/index.html', function(error, data) {
//         if (error) {
//             res.writeHead(404);
//             res.write('Error: File Not Found');
//         } else {
//             res.write(data);
//         }
//         res.end();
//     });
// });
// server.listen(port, function(error) {
//     if (error) {
//         console.log('Something went wrong', error);
//     } else {
//         console.log('Server is listening on port ' + port)
//     }
// });
// function summarize() {
//     const text: string = document.getElementById("text").textContent;
//     const summary: string = cohere.summarize(text);
//     document.getElementById("summary").innerHTML = summary;
// }
//# sourceMappingURL=index.js.map