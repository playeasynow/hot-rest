const tables = require('./../data/tables');
const waitlist = require('./../data/waitlist');

module.exports = function (app) {
    // Displays all tables
    app.get("/api/tables", function (req, res) {
        return res.json(tables);
    });

    // Displays waitlist
    app.get("/api/waitlist", function (req, res) {
        return res.json(waitlist);
    });

    // // Displays a single character, or returns false
    // app.get("/api/characters/:character", function(req, res) {
    //     const chosen = req.params.character;

    //     console.log(chosen);

    //     for (let i = 0; i < characters.length; i++) {
    //     if (chosen === characters[i].routeName) {
    //         return res.json(characters[i]);
    //     }
    //     }

    //     return res.json(false);
    // });

    // Create New Table - takes in JSON input
    app.post("/api/tables", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newTable = req.body;

        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        // newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

        // res.json(newTable);
        
        if (tables.length < 5) {
            res.statusCode = 200;
            tables.push(newTable);
            res.json({response:true});
        }
        
        waitlist.push(newTable);
        res.json({response : false});
    });
};