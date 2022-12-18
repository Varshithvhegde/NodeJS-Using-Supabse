const express = require('express')
const { createClient } = require('@supabase/supabase-js')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const app = express()
const port = 3000
const router = express.Router();

const supabase = createClient(
    'https://lazvuosskhhcgvhxafst.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhenZ1b3Nza2hoY2d2aHhhZnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEzMzQyNDIsImV4cCI6MTk4NjkxMDI0Mn0.5rhHnVT8OsgFUiN6fp7v7ocKLQxkqBDK5QdmHNE_NQo'
  )

async function getTodos() {
    let { data, error } = await supabase.from('todo').select('*')
    return data
}
// sHOW ALL TODOS in the index.html file
// app.get('/', (req, res) => {
// //   send index.html file
//     res.sendFile(__dirname + '/index.html')
// })
// localhost:3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
// get ul element from index.html
const dom = new JSDOM(`<!DOCTYPE html><ul id="todoul"></ul>`);
const todoul = dom.window.document.getElementById("todoul");

app.set('view engine','ejs');
app.set('views','views');
// Show list of todos
app.get('/', (req, res) => {
    getTodos().then((data) => { 
        todoul.innerHTML = data.map((todo) => `<li>${todo.task_name}</li>`).join('')
        res.send(dom.serialize())
    })
})
app.get('/:name/:id', function(req, res) {
   
    res.send("The name is " + req.params.name + " and the id is " + req.params.id);
    console.log(req.params.name);
 });

app.get("/todo", function(req, res) {
//    use todo.js file
 

    res.render('/todo');
    });
// port 3000
const todojs = require('./todo');
app.use('/todo', () => todojs);
module.exports = router ;



