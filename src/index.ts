// Purpose: Main file of the project. Contains the server and the routes.

// Importing the required modules
const wiki = require('wikipedia');
const express = require('express')
const app = express()
const port = 3000;

// Setting up the view engine
app.engine('html', require('ejs').renderFile);

// Setting up the server
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/script', express.static(__dirname + 'public/script'));
app.use('/img', express.static(__dirname + 'public/img'));

// Handling home page request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Handling privacy policy request
app.get('/privacy', (req, res) => {
    res.sendFile(__dirname + '/views/privacy.html');
});

// Handling terms policy request
app.get('/terms', (req, res) => {
    res.sendFile(__dirname + '/views/terms.html');
});

// Handling search request
app.get('/result', (req, res) => {
    (async () => {
        try {
            // Tries to give the summary of the search
            req.query.search = setPhraseCapitalFirstLetters(req.query.search);
            const summary = await wiki.summary(req.query.search, {autoSuggest: false});
            if (summary.extract.includes("refer to:")) {
                throw new Error("No specific summary found");
            }
            res.render(__dirname + '/views/result.html', {title:summary.title, description:summary.description, summary:summary.extract});
            //Response of type @wikiSummary - contains the intro and the main image
        } catch (error) {
            // If no summary is found, gives the search results to choose from
            const search_results = await wiki.search(req.query.search, {suggestion: true, limit: 10});
            if (search_results.results.length > 0) {
                var links:Array<string> = [];
                for (let i=0; i<search_results.results.length; i++) {
                    links.push(formatSpaces(linkFromTitle(search_results.results[i].title), '_'));
                }
                res.render(__dirname + '/views/search.html', {title:req.query.search, description:"Topics referred to by the same term", search_results:search_results.results, links:links});
            } else {
                // If no search results are found, gives the summary of the "HTTP 404" page
                const summary = await wiki.summary("HTTP 404", {autoSuggest: false});
                res.render(__dirname + '/views/result.html', {title:summary.title, description:summary.description, summary:summary.extract});
            }
            //=> Typeof wikiError
        }
    })();
});

// Handling suggestion request
app.post("/suggestion", async (req, res) => {
    (async () => {
        try {
            const suggestion = await wiki.suggest(req.body.search); //await wiki.search(req.body.search, {suggestion: true, limit: 10});
            res.json([{suggestion: suggestion}]);
            //Response of type @wikiSuggestion - contains the results
        } catch (error) {
            res.json([{suggestion: error}]);
            //=> Typeof wikiError
        }
    })();
});

// Server listening on given port
app.listen(port, () => console.info('Listening on port ' + port ));

// Sets the first letter of every word in a phrase to capital
function setPhraseCapitalFirstLetters(phrase: string) {
    let words = phrase.split(' ');
    let capitalizedWords = [];
    words.forEach(word => {
        capitalizedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
    });
    return capitalizedWords.join(' ');
}

// Replaces spaces with underscores
function formatSpaces(phrase: string, replacement: string) {
    let words = phrase.split(' ');
    return words.join(replacement);
}

// Creates the link of the result option
function linkFromTitle(title: string) {
    return "/result?search=" + title;
}