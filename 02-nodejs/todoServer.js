/* You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.*/ 
const fs = require('fs');
const express = require('express'); const bodyParser = require('body-parser');const e = require('express');
const { send } = require('process');
 const app = express(); 
//const port = 3000; 
app.use(bodyParser.json()); 

/*- Don't use any database, just store all the data in an array to store the todo list data (in-memory) - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)*/ //Each todo has a title and a description. The title is a string and the description is a string. 
//Each todo should also get an unique autogenerated id every time it is created //The expected API endpoints are defined below, 
app.get('/todos', function(req, res){ 
    fs.readFile('./todos.json', 'utf8', (err, data) => {
        if (err) {
            send.status(404);
        }
        res.status(200).json(JSON.parse(data));
    });
     }); 
//Description: Returns a list of all todo items. //Response: 200 OK with the list of todo items in JSON format. //2.GET /todos/:id - Retrieve a specific todo item by ID //Description: Returns a specific todo item identified by its ID. //Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found. 
app.get('/todos/:id', function(req, res){ 
    fs.readFile('./todos.json', 'utf8', (err, data) => {
    if (err) {res.status(404).send("not found")}
    const id = req.params.id; 
    const temp = JSON.parse(data);
    const todo = temp.find(todo => todo.id === id); 
    if(!todo){res.status(404).send("not found")} 
    else{ res.status(200).json(todo); }});  }); 
//3. POST /todos - Create a new todo item //Description: Creates a new todo item while incrementing the ID of the item. //Request Body: JSON object representing the todo item.
 app.post('/todos', function(req, res){ 
    const todo = req.body; 
    const id = Math.floor(Math.random() * 1000000);
    todo.id = id;
// console.log(todo);
    fs.writeFile('./todos.json', JSON.stringify(todo), err => {
        if (err) {
            res.status(404);
        }
        res.status(201).json({id: id});
    })
     });
/*Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1} Example: POST http://localhost:3000/todos Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }*/ //4. PUT /todos/:id - Update an existing todo item by ID //Description: Updates an existing todo item identified by its ID. //Request Body: JSON object representing the updated todo item. //Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found. //Example: PUT http://localhost:3000/todos/123 //Request Body: { "title": "Buy groceries", "completed": true } 
app.put('/todos/:id', function(req, res){ 
    fs.readFile('./todos.json', 'utf8', (err, data) => {
    if (err) {res.status(404).send("not found")}
    const id = req.params.id;
    const temp = JSON.parse(data);
    const todoindex = temp.findIndex(todo => todo.id === id);
    if(todoindex===-1){res.status(404).send("not found")} 
    else{ const todo_new = req.body;
 //console.log(todo_new);
    temp[todoindex].completed = todo_new.completed; 
    fs.writeFile('./todos.json', JSON.stringify(temp[todoindex].completed), err => {
    if (err) {res.status(404);}
    res.status(200).send("OK"); })}}) }); 
    /*5. DELETE /todos/:id
 - Delete a todo item by ID Description: Deletes a todo item identified by its ID. Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found. Example: DELETE http://localhost:3000/todos/123*/ 
app.delete('/todos/:id', function(req, res){ 
    const id= req.params.id;
    const todo = todos.find(todo => todo.id === id); 
    if(!todo){res.status(404).send("not found")} 
    else{ todos.splice(parseInt(id)-1, 1); res.status(200).send("OK"); } }); 
//- For any other route not defined in the server return 404 Not Found 
function notFound(req, res, next){
     res.status(404).send("not found"); 
     next(); } 
app.use(notFound); 
/* Testing the server - run `npm run test-todoServer` command in terminal */ 
//app.listen(port, () => {  console.log(`Example app listening on port ${port}`)  }) 
module.exports = app;