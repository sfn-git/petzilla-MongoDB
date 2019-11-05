const express = require('express');
const app = express();
const port = 3000;
const dir = __dirname;

app.set('view engine', 'pug');              //View Engine
app.use(express.static('public'));    //Static Content

app.get('/', (req,res)=>{

    res.render('index', {title: 'PetZilla - Home'})

})

app.get('/Create', (req, res)=>{

    res.render('createaccount', {title: 'PetZilla - Create Account'})

})

app.get('/Login', (req,res)=>{

    res.render('login', {title: 'PetZilla - Login'})

})

app.listen(port, ()=> console.log(`PetZilla now running at port ${port}`))