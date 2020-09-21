var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('books', ['books']);
var bodyParser = require('body-parser')

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json())


app.get('/books', function(req,res){
    console.log("I got the cheriiff")

    db.books.find(function(err,docs){
        console.log(docs);
        res.json(docs)
    })
})

app.post('/books', function(req, res){
    console.log(req.body)
    db.books.insert(req.body, function(err,doc){
        res.json(doc)
    })
})

app.delete("/books/:id", function(req,res){
    var id = req.params.id;
    console.log(id)
    db.books.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        res.json(doc);
    })
})


app.put("/books/:id", function(req, res){
    var id = req.params.id;
    console.log("LOOOK : " + req.body.name)
    db.books.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name}},
        new: true}, function(err, doc) {
            res.json(doc);
        }
    )
})

app.listen(5000);
console.log("Server running on 3000")