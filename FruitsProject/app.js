const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",{ useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({

    name: {
        type: String,
        required: [true,"Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({

    rating: 10,
    review: "Nice taste"
});

 // fruit.save();


const personSchema = new mongoose.Schema ({
    name:String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit ({
    name: "Mango",
    rating: 8,
    review: "Decent Fruit."
});

mango.save();

Person.updateOne({name: "John"}, {favouriteFruit: mango}) .then(function() {
    console.log("Successfully updated!");
}) .catch(function(err) {
    console.log(err);
});

/*
const person = new Person ({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
});
*/

 // person.save();

const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 10,
    review: "The Best Fruit"
});
const orange = new Fruit ({
    name: "Orange",
    rating: 4,
    review: "Too sour for me"
});
const banana = new Fruit ({
    name: "Banana",
    rating: 3,
    review: "Weird texture"
});


//InsertMany Items

/*
Fruit.insertMany([kiwi,orange,banana]) .then(function () {
    console.log("Successfully saved all the fruits to fruitsDB");
}).catch(function (err) {
    console.log(err);
});

*/

// Find

/*
Fruit.find() .then(function(fruits) {

    mongoose.connection.close();

    fruits.forEach(function(fruit) {

        console.log(fruit.name);
    });

    }) .catch(function(err) {
        console.log(err);
    });

  */

//Update

/*
Fruit.updateOne({_id: "64354fbc2664cba9629939b5"}, {name: "Peach"}) .then(function() {
    console.log("Succesfully Updated the document.");
}) .catch(function(err) {
    console.log(err);
});
*/


//Delete

/*
Fruit.deleteOne({name: "Pappaya"}) .then(function() {
    console.log("Successfully deleted the document.")
}) .catch(function(err) {
    console.log(err);
});

*/

//Delete Many Items


/*
Person.deleteMany({name: "John"}) .then(function() {
    console.log("Successfully deleted the document.")
}) .catch(function(err) {
    console.log(err);
});
*/