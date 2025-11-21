const express = require("express");
const app = new express();
const path = require("path");

const ejs = require("ejs");

const fileUpload = require('express-fileupload')
// ==================== CHAPTER05 =======================
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser:
    true
})
// ======================================================

const BlogPost = require('./models/BlogPost.js')
// chap 9
const newPostController = require('./controllers/newPost')
const aboutController = require('./controllers/about')

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

// *******************Chapter 8 Middleware***********
const customMiddleWare = (req,res,next)=>{
console.log('Custom middle ware called')
next()
}
app.use(customMiddleWare)

const validateMiddleWare = (req,res,next)=>{
if(req.files == null || req.body.title == null){
return res.redirect('/posts/new')
}
next()
}

// ************************************************

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.use(fileUpload());
// Chap 8
app.use('/posts/store',validateMiddleWare);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});


app.get("/", async (req, res) => {
  const blogposts = await BlogPost.find({})
  // console.log(blogposts)
  res.render('index', {
    blogposts: blogposts
  });
});

app.get("/about", aboutController);

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get('/post/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post', {
    blogpost
  })
});

app.get('/posts/new',newPostController)

app.post("/posts/store", (req, res) => {
  console.log("req.files:", req.files); // Check if files are received
  console.log("req.body:", req.body); // Check form data

  let image = req.files.image;
  console.log("Image name:", image.name); // Check image details
  image.mv(
    path.resolve(__dirname, "public/assets/img", image.name),
    async (error) => {
      if (error) {
        console.error("Error moving file:", error); // ADD THIS
        return res.status(500).send(error);
      }
      console.log(
        "Image saved successfully to:",
        path.resolve(__dirname, "public/assets/img", image.name)
      ); // ADD THIS
      await BlogPost.create({
        ...req.body,
        image: "/assets/img/" + image.name,
      });
      res.redirect("/");
    }
  );
});

// app.post('/posts/store', (req, res) => {
//   // model creates a new doc with browser data
//   let image = req.files.image;
//   image.mv(path.resolve(__dirname, '/public/assets/img', image.name), async (error) => {
//     await BlogPost.create({
//       ...req.body,
//       image: 'public/assets/img/' + image.name
//     })
//     res.redirect('/')
//     });
//   });




