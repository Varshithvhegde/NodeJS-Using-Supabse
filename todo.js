const express = require('express')
const { createClient } = require('@supabase/supabase-js')
const app = express()
const port = 5000
const router = express.Router();
const bodyParser = require('body-parser');
const supabase = createClient(
    'https://lazvuosskhhcgvhxafst.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhenZ1b3Nza2hoY2d2aHhhZnN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEzMzQyNDIsImV4cCI6MTk4NjkxMDI0Mn0.5rhHnVT8OsgFUiN6fp7v7ocKLQxkqBDK5QdmHNE_NQo'
  )

async function getTodos() {
    let { data, error } = await supabase.from('todo').select('*')
    return data
}
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs');
app.set('views','views');
// Show list of todo in todo.ejs
// directly render todo.ejs file
app.get('/', (req, res) => {
    getTodos().then((data) => { 
        res.render('todo', {data: data})
    })
}
)

// Port 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.post('/add', (req, res) => {
    // get post data
    let task_name = req.body.todo;
    // Add to database
    supabase.from('todo').insert([
        { task_name : task_name,done : false }
    ]).then((data) => {
        // redirect to todo page
        res.redirect('/todo');
    }
    )


});
// get /delete
app.post('/delete', (req, res) => {
    let id = req.body.id;
    console.log(id);
    // delete from database
    supabase.from('todo').delete().match({ id: id }).then((data) => {
        // redirect to todo page
        res.redirect('/');
    }
    )
})