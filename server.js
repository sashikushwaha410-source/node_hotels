const express=require('express')
const app=express();
const db = require('./db');

const bodyParser=require('body-parser');
app.use(bodyParser.json());

const Person=require('./models/Person');
const MenuItem=require('./models/MenuItem');

app.get('/',function(req,res){
    res.send('welcome to my hotel')
})



// import the router files
const personRoutes =require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');


app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);


app.listen(4000,()=>{
    console.log('listening on port 3000');
})