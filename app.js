const express = require('express');
const app = express();
const port = 3000;
const dir = __dirname;

app.set('view engine', 'pug');              //View Engine
app.use(express.static('public'));    //Static Content
// Reading Post request
app.use(express.urlencoded());

app.get('/', (req,res)=>{

    res.render('index', {title: 'PetZilla - Home'})

})

app.get('/Create', (req, res)=>{

    res.render('createaccount', {title: 'PetZilla - Create Account'})

})

app.get('/Login', (req,res)=>{

    res.render('login', {title: 'PetZilla - Login'})

})

app.post('/Login', (req,res)=>{

    // console.log(req);
    console.log(req.body.username);
    console.log(req.body.password);
    var username = req.body.username;
    var password = req.body.password;
    res.redirect('/')

})

app.get('*', (req,res)=>{

    res.status(404);
    res.render('404', {title: 'PetZilla - 404'})

})

app.listen(port, ()=> console.log(`PetZilla now running at port ${port}`))