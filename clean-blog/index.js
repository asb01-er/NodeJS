const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

// Chapter 5
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true});
// .........

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('index');
})

app.get('/about', (req,res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about');
})

app.get('/post', (req,res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    res.render('post');
})

app.get('/contact', (req,res)=>{
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact');
})

app.listen(4000, () =>{
    console.log('App listening on port 4000')
})