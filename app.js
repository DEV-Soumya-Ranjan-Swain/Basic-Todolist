const express = require("express");
const app = express();
const date = require(__dirname+"/date.js");
app.set("view engine", "ejs");
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    let day = date.GetDate();

    res.render("layout", { listTitle: day, NewListItems: items });
})

app.get("/work", function (req, res) {
    res.render("layout", { listTitle: "work list", NewListItems: workItems })
})

app.post("/work", function (req, res) {

    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.post("/", function (req, res) {
    let item = req.body.newItem;

    if (req.body.list === "work list") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");

    }
})


app.get("/about",(req,res) => {
    res.render("about");
})
app.listen(3000, () => {
    console.log("server running in port 3000");
})

