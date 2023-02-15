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

async function deleteTask(id) {
    try {
      const { data, error } = await supabase
        .from('todo')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      console.log('Task deleted successfully:', data);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
  


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs');
app.set('views','views');
app.use(express.json());
// Show list of todo in todo.ejs
// directly render todo.ejs file
app.get('/', (req, res) => {
    console.log(getTodos())
    getTodos().then((data) => { 
        res.render('todo', {data: data})
    })
    // res.render('add')
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
        res.redirect('/');
    }
    )


});
// get /delete
app.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;
        const { data, error } = await supabase
          .from('todo')
          .delete()
          .eq('id', id);
    
        if (error) {
          throw error;
        }
    
        console.log(`Deleted task with ID ${id}`);
        res.redirect('/');
      } catch (err) {
        console.error(`Error deleting task: ${err.message}`);
        res.status(500).send(`Error deleting task: ${err.message}`);
      }
  });