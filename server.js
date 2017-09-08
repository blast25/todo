const express = require("express")
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

var jsn_todo = require("./data/todo.json")
var jsonfile = require("jsonfile")
app.use(express.static(__dirname + '/'))

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.sendFile("form.html",  { root: '/Users/Lukas/Desktop/testwithnode'})
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.post("/", function(req, res) {
    if (req.body.pw === "test")
    {   
        res.render("todo.ejs", jsn_todo)
    } 
    else {
        res.send("Please go away.")
    }
})

app.post("/add", function(req, res) {
    if (req.body.add || req.body.add === "")
    {
        todo_data(req.body.add)
        res.render("todo.ejs", jsn_todo)
    }
})
app.post("/remove", function(req, res) {
    jsn_todo.data.splice(req.body.num, 1)
    jsonfile.writeFile("./data/todo.json", jsn_todo)
    res.render("todo.ejs", jsn_todo)
})

function todo_data(entry) {
    if (entry) {
        jsn_todo.data.push(entry)
        jsonfile.writeFile("./data/todo.json", jsn_todo)
    }
}