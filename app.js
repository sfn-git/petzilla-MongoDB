const express = require('express');
const sha256 = require('js-sha256');
const app = express();
const port = 3000;

// MongoDB Stuff
const mongo = require('mongodb').MongoClient;
var dbconfig = require('./dbconfig.json');
var dbusername = dbconfig.username;
var dbpassword = dbconfig.password;
var dbhost = dbconfig.host;
var dbport = dbconfig.port;
var dbdatabase = dbconfig.database;
var uri = `mongodb://${dbusername}:${dbpassword}@${dbhost}:${dbport}/${dbdatabase}?authSource=petzilla`;

// Connect to MongoDB




app.set('view engine', 'pug');              //View Engine
app.use(express.static('public'));    //Static Content
// Reading Post request
app.use(express.urlencoded());

// ALL GET REQUEST
app.get('/', (req,res)=>{

    res.render('index', {title: 'PetZilla - Home'})

})

app.get('/Create', (req, res)=>{

    res.render('createaccount', {title: 'PetZilla - Create Account'})

})

app.get('/Login', (req,res)=>{

    res.render('login', {title: 'PetZilla - Login'})

})

app.get('/mongotest', (req, res)=>{

    var message;
    const client = new mongo(uri, { useNewUrlParser: true });
    client.connect(err=>{
        if(err){console.error(err)}
    
        const collection = client.db('petzilla').collection('users');
        collection.find({}, function(err, result){
            if(err) throw err;
            message = result;
            console.log(result)
        });
    
        client.close();
    })

    res.render('mongotest', {title: "Mongotest", message: message})

})

// ALL POST REQUEST
app.post('/Login', (req,res)=>{

    // console.log(req);
    var username = req.body.username;
    var password = sha256(req.body.password);

    res.redirect('/')

})

app.post('/Create', (req,res)=>{

    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var birthday = req.body.birthday;
    var gender = req.body.gender;

    res.redirect('/');
})


app.get('*', (req,res)=>{

    res.status(404);
    res.render('404', {title: 'PetZilla - 404'})

})

app.listen(port, ()=> console.log(`PetZilla now running at port ${port}`))