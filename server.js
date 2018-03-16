var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');
app.use(express.static(__dirname + '/authors/dist'));

var Schema = mongoose.Schema;
var AuthorSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
}, {timestamps: true});
var Author = mongoose.model('Author', AuthorSchema);
mongoose.Promise = global.Promise;

app.get('/authors', function(req, res){
    Author.find({}, function(err, authors){
        if(err){
            res.json({message:'Error', error:err})
        }else{
            res.json({message:'Find All Complete', data: authors});
        }
    })
})
app.get('/authors/:id', function(req, res){
    Author.findOne({_id: req.params.id}, function(err, author){
        if(err){
            res.json({message:'Error', error:err})
        }else{
            res.json({message:'Find One Complete', data: author});
        }
    })
})
app.post('/authors', function(req, res){
    var author = new Author(req.body);
    author.save(function(err){
        if(err){
            res.json({message:'Error', error:err});
        }else{
            res.json({message:'Creation Complete', data:author});
        }
    })
})
app.delete('/authors/:id', function(req, res){
    Author.findOne({_id:req.params.id}, function(err, author){
        if(err){
            res.json({message:'Error'});
        }else{
            author.remove();
            res.json({message:'Deletion Successful'});
        }
    })
})
app.put('/edit/:id', function(req, res) {
    Author.findOne({_id:req.params.id}, function(err, author){
        console.log(req.body);
        if(req.body.name.length < 3){
            res.json({message:"Error", error:'Path `name` (' + req.body.name + ') is shorter than the minimum allowed length (3).'});
        }else{
            author.name = req.body.name;
            author.save();
            res.json({message:'Update Successful', author: author});
        }
    })
})

app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./authors/dist/index.html'));
})
app.listen(8000, function(){
    console.log('Listening on port 8000')
});