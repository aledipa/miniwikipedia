// const http = require('http');

import { get } from "http";

// const fs = require('fs');
const wiki = require('wikipedia');
const express = require('express')
const app = express()
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/script', express.static(__dirname + 'public/script'));
app.use('/img', express.static(__dirname + 'public/img'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.listen(port, () => console.info('Listening on port ' + port ));

// Handling suggestion request
app.post("/suggestion", async (req, res) => {
    // console.log("search: " + req.body.search);
    console.log("Request received");
    (async () => {
        try {
            const suggestion = await wiki.suggest(req.body.search); //await wiki.search(req.body.search, {suggestion: true, limit: 10});
            // console.log("sugg: " + suggestion);
            res.json([{suggestion: suggestion}]);
            //Response of type @wikiSuggestion - contains the results
        } catch (error) {
            res.json([{suggestion: error}]);
            //=> Typeof wikiError
        }
    })();
})


// Handling summary request 
app.post("/summary", async (req, res) => {
    console.log("Request received");
    (async () => {
        try {
            const summary = await wiki.summary(req.body.search);
            res.json([{summary: summary}]);
            //Response of type @wikiSummary - contains the intro and the main image
        } catch (error) {
            res.json([{summary: error}]);
            //=> Typeof wikiError
        }
    })();
 })

function getSummary() {
    (async () => {
        try {
            const summary: string = await wiki.summary('Batman');
            return summary;
            //Response of type @wikiSummary - contains the intro and the main image
        } catch (error) {
            return error;
            //=> Typeof wikiError
        }
    })();
}

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

