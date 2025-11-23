const express = require("express");
const app = new express();
const ejs = require("ejs");
const path = require("path");
const expressSession = require('express-session');
const flash = require('connect-flash');

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
const logoutController = require('./controllers/logout');

// Middleware
const validateMiddleware = require("./middleware/validateMiddleware");

const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const authMiddleware = require('./middleware/authMiddleware');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload());

app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));


global.loggedIn = null;
app.use((req, res, next) => {
  loggedIn = req.session.userId;
  next()
});

app.use(flash());

app.use((req, res, next) => {
  res.locals.errors = req.flash('validationErrors');
  res.locals.data = req.flash('data')[0];
  next();
});


app.use((req, res, next) => {
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  next();
});

// app.use(validateMiddleware);
// app.post('/posts/store', authMiddleware, validateMiddleware, storePostController);

// Ch 9
// ROUTES
app.get("/", homeController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, validateMiddleware, storePostController);
app.get('/post/:id', getPostController);

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register', storeUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.post('/users/login', loginUserController);
app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));


app.listen(4000, () => {
  console.log("App listening on port 4000");
});



