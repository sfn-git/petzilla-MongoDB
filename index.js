const express = require('express');
const app = express();
const port = 3000;
const dir = __dirname;

app.set('view engine', 'pug');              //View Engine
app.use(express.static('views/public'));    //Static Content

app.get('/', (req,res)=>{

    res.render('index', {title: 'Test', message: 'h1 test'})

})

app.listen(port, ()=> console.log(`PetZilla now running at port ${port}`))