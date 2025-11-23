const express = require("express");
const app = new express();
const ejs = require("ejs");
const path = require("path");

const fileUpload = require('express-fileupload')
// ==================== CHAPTER05 =======================
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser:
    true
})
// ======================================================s
// Controllers
const newPostController = require('./controllers/newPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');

// Middleware
const validateMiddleware = require("./middleware/validateMiddleware");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

// app.use(validateMiddleware);

app.post('/posts/store',validateMiddleware, storePostController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

// Ch 9
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get('/posts/new',newPostController)
app.get('/post/:id', getPostController);
app.post("/posts/store", storePostController);
app.get('/auth/register', newUserController);
app.post('/users/register', storeUserController);
app.get('/auth/login', loginController);
app.post('/users/login', loginUserController)






