const express = require("express");
var bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require('cors');

const axios = require('axios');

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

////////////////////////////////////////////////////////////////////////////////////////////////////
// let name="Kritika"
// //GET API
// const cb=(req, res) => {
//     res.send(name);
//   }
// app.get("/",cb );

// //POSt API
// app.post("/postApi",(req,res)=>{
//     // console.log(req.body);
//    name+=' '+req.body.name;
//     res.send({age:name})
// })

var todoList = [];
// let id = 0;
//postApi
const add = (req, res) => {
  const d = new Date();

  let date = d.toString();
  let todoName = req.body.todoName;
  todoList.push({
    todoName: todoName,
    id: uuidv4(), //unique
    isCompleted: false,
    createdAt: date, //dateString})
    updatedAt: date,
  });
  res.send("Sucessfully added.");
};
//showApi
const show = (req, res) => {
  res.send(todoList);
};
//query
const complete_specific_todo = (req, res) => {
  const d = new Date();
  let date = d.toString();
  let index = req.body.id;
  todoList = todoList.map(find);
  function find(a) {
    const task = a;
    if (index == task.id) {
      task.isCompleted = true;
      task.updatedAt = date;
    }
    return task;
  }
  res.send(todoList);
};
const editTask = (req, res) => {
  const d = new Date();
  let date = d.toString();
  let updatedName = req.body.updatedName;
  let id = req.body.id;
  todoList = todoList.map(edit);
  function edit(element) {
    if (id == element.id) {
      element.todoName = updatedName;
      element.updatedAt = date;
    }
    return element;
  }
  res.send(todoList);
};

const find = (req, res) => {
  let id = req.query.id;
  let foundTask = todoList.filter((task) => {
    if (task.id == id) return task;
  });
  if (foundTask.length == 0) res.status(502);
  res.send(foundTask);
};

const callDummy=(req,res)=>{
  axios.get("https://anapioficeandfire.com/api/characters/583").then((response)=>{
  res.send(response.data);
});

};
app.post("/add", add);
app.get("/", show);
app.post("/done", complete_specific_todo);
app.post("/edit", editTask);
app.get("/find", find);
app.get("/call",callDummy);

/////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


