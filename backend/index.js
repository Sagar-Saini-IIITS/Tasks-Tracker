const connectToMongo = require('./db'); // importing and using that fn
const express = require('express');
var cors =require('cors');
connectToMongo();
const app = express() 
const port = 5000 

app.use(cors());
app.use(express.json())
app.use('/api/auth',require('./routes/auth')); 
app.use('/api/tasks',require('./routes/tasks')); 


app.listen(port, () => {
    console.log(`TaskTracker backend listening at http://localhost:${port}`)
})