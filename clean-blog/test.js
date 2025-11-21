const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

// BlogPost.create({
//     title: 'The Mythbuster Guide to Saving Money on Energy Bills',
//     body: `If you have been here a long time, you might remember when I
// went on ITV Tonight to dispense a masterclass in saving money on energy
// bills. Energy-saving is one of my favourite money topics, because once
// you get past the boring bullet-point lists, a whole new world of thrifty
// nerdery opens up. You know those bullet-point lists. You start spotting
// them everything at this time of year. They go like this:`
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// })

// BlogPost.create({
//     title: 'Delete This',
//     body: `To Be Deleted`
// }, (error, blogpost) => {
//     console.log(error, blogpost)
// })


// Reading Data from MongoDB using Mongoose
BlogPost.find({}, (error, blogspot) =>{
console.log(error,blogspot)
})

// to find all documents in BlogPosts collection with a particular title
// BlogPost.find({
// title:'The Mythbuster’s Guide to Saving Money on Energy Bills'
// }, (error, blogspot) =>{
// console.log(error,blogspot)
// })

// to find all documents in BlogPosts collection with ‘The’ in the title
// BlogPost.find({
// title:/The/}, (error, blogspot) =>{
// console.log(error,blogspot)
// })

// to retrieve single documents with unique id _id,
// var id = "5cb436980b33147489eadfbb";

// BlogPost.findById(id, (error, blogspot) =>{
// console.log(error,blogspot)
// })

// Updating Documents
// var id = "5cb436980b33147489eadfbb";
// BlogPost.findByIdAndUpdate(id,{
// title:'Updated title'
// }, (error, blogspot) =>{
// console.log(error,blogspot)
// })

// Deleting Single Record
// var id = "6915ecce39ebd3451ccd699f";
// BlogPost.findByIdAndDelete(id, (error, blogspot) =>{
// console.log(error,blogspot)
// })