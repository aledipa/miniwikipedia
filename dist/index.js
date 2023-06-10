"use strict";
// const http = require('http');
Object.defineProperty(exports, "__esModule", { value: true });
// const fs = require('fs');
const wiki = require('wikipedia');
const express = require('express');
const app = express();
const port = 3000;
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/script', express.static(__dirname + 'public/script'));
app.use('/img', express.static(__dirname + 'public/img'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});
app.post('/result', (req, res) => {
    console.log("Request received");
    (async () => {
        try {
            const summary = await wiki.summary(req.body.search);
            // console.log("title: " + summary.title);
            // console.log("description: " + summary.description);
            // console.log("extract: " + summary.extract);
            res.render(__dirname + '/views/result.html', { title: summary.title, description: summary.description, summary: summary.extract });
            //Response of type @wikiSummary - contains the intro and the main image
        }
        catch (error) {
            res.json([{ summary: error }]);
            //=> Typeof wikiError
        }
    })();
});
// Handling suggestion request
app.post("/suggestion", async (req, res) => {
    // console.log("search: " + req.body.search);
    console.log("Request received");
    (async () => {
        try {
            const suggestion = await wiki.suggest(req.body.search); //await wiki.search(req.body.search, {suggestion: true, limit: 10});
            // console.log("sugg: " + suggestion);
            res.json([{ suggestion: suggestion }]);
            //Response of type @wikiSuggestion - contains the results
        }
        catch (error) {
            res.json([{ suggestion: error }]);
            //=> Typeof wikiError
        }
    })();
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
//# sourceMappingURL=index.js.map