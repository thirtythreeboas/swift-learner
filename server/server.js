const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;

// app.get('/app', function (req, res) {
//    res.send('Hello World');
// })

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", req.headers.origin);
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

app.get('/api', (req, res) => {
   res.sendFile(path.join(__dirname, './data/dictionary.json'));
 });

var server = app.listen(PORT, () => console.log("first"))