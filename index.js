const express = require('express');
const formidable = require('formidable');
const {connectToServer, getDb} = require("./databaseConnection.js")
require('dotenv').config()
const app = express();
const PORT = 8000
connectToServer()
/* console.log(getDb()) */

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file




// index page
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(PORT, () => console.log('listening on port ' + PORT))

