const express = require('express')
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    morgan = require('morgan'), // loger
    config = require('./config');

mongoose.connect(config.database, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});

var app = express();

/* For application/x-www-form-urlencoded, the body of
 the HTTP message sent to the server is essentially one giant query string -- name/value pairs
 are separated by the ampersand (&), and names are separated from values by the equals symbol (=).
 An example of this would be:
 MyVariableOne=ValueOne&MyVariableTwo=ValueTwo
*/

// middleware to funkcja wykonywana pomiedzy żądaniem a odpowiedzia
// middleware to funkcja posiadająca dostep do responsa i requesta oraz funkcji next ktora w chwili wywolania wykonuje kolejny middleware
// body-parser to przykład middlewera
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.listen(config.port, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('Listening on port 3000');
    }
})