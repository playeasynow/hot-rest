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

    // Create New Table - takes in JSON input
    app.post("/api/tables", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        const newTable = req.body;
        
        //if tables is under 5 add to tables, else add to waitlist
        if (tables.length < 5) {
            res.statusCode = 200;
            tables.push(newTable);

            //tell the frontend they got a table
            res.json({response:true});
        }
        else{
            waitlist.push(newTable);

            //tell the frontend they got waitlisted
            res.json({response : false});
        }
    });

    app.post("/api/clear",function(req,res){

        tables.length = 0;
        waitlist.length = 0;
        res.json({success: "Cleared", status:200})
    });
};