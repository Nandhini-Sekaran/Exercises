const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
 
const app= express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);


// Request Targeting A Specific Article

app.route("/articles")
    .get(function(req, res) {
       Article.find() .then(function(foundArticles) {
         res.send(foundArticles);
        }) .catch(function(err) {
             console.log(err);
        });
    })

    .post(function(req, res) {
       const newArticle = new Article ({
         title: req.body.title,
         content: req.body.content
       });
        newArticle.save() .then(function() {
           res.send("Successfully added a new article");
        }) .catch(function(err) {
           res.send(err);
        });
    })

    .delete(function(req, res) {
       Article.deleteMany() .then(function() {
         res.send("Successfully deleted all articles.");
       }) .catch(function(err) {
           res.send(err);
       });
    });


// Request Targeting A Specific Article


app.route("/articles/:articleTitle")
    .get(function(req, res) {
        Article.findOne({title: req.params.articleTitle}) .then(function(foundArticle) {
            res.send(foundArticle);
        }) .catch(function(err) {
            res.send("No article matching that title was found.");
        });
    })
    .put(function(req, res) {
        Article.replaceOne({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}) .then(function() {
            res.send("Successfully article updated!");
        }) .catch(function(err) {
            res.send(err);
        });     
    })
    
    .patch(function(req, res) {
        Article.updateOne({title: req.params.articleTitle}, {$set: req.body}) .then(function() {
            res.send("Succesfully updated article.");
        }) .catch(function(err) {
            res.send(err);
        });
    })
    .delete(function(req, res) {
        Article.deleteOne({title: req.params.articleTitle}) .then(function() {
            res.send("Successfully deleted the corresponding article.");
        }) .catch(function(err) {
            res.send(err);
        });
    });


app.listen(3000, function() {
    console.log("Server started on port 3000.");
});