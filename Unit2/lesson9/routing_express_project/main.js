const port = 3000;
const express = require("express");
const app = express()


// 9.1 example
// app.post("/Contact", (req,res) => {
//     res.send("Contact information submitted successfully.");
// });
// 9.2 example
// app.get("/item/:vegetable", (req,res) => {
//     res.send(req.params.vegetable);
// });
app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.get("/item/:vegetable", (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for ${veg}`);
});


app.post("/", (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.send("POST Successful!");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});

