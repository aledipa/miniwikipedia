const wiki = require('wikipedia');


function getSearch() {
    (async () => {
        try {
            const search = await wiki.search('Batman');
            console.log(search);
            //Response of type @wikiSearch - contains the results
        } catch (error) {
            console.log(error);
            //=> Typeof wikiError
        }
    })();
}