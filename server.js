// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// date string is empty
app.get('/api/timestamp', (req, res) => {
    res.json({
        "unix": new Date().getTime(),
        "utc": new Date().toUTCString()
    });
});

app.get('/api/timestamp/:date_string', (req, res) => {
    const date_string = req.params.date_string;

    if(isNaN(date_string)) {
        if(isNaN(Date.parse(date_string))) {
            res.json({ "error" : "Invalid Date" });
        } else {
            res.json({
                "unix": new Date(date_string).getTime(),
                "utc": new Date(date_string).toUTCString()
            });
        }
    } else {
        const utc = new Date(parseInt(date_string)).toUTCString();
        if(utc === "Invalid Date")
            res.json({ "error" : "Invalid Date" });
        res.json({
            "unix": date_string,
            "utc": utc
        });
    }
});

app.get('*', (req, res) => {
    res.send("Not Found.");
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});