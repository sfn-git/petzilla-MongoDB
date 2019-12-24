const express = require('express');
const sha256 = require('js-sha256');
const app = express();
const port = 3000;

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

// MongoDB Stuff
const mongo = require('mongodb').MongoClient;
var dbconfig = require('./dbconfig.json');
var dbusername = dbconfig.username;
var dbpassword = dbconfig.password;
var dbhost = dbconfig.host;
var dbport = dbconfig.port;
var dbdatabase = dbconfig.database;
var uri = `mongodb://${dbusername}:${dbpassword}@${dbhost}:${dbport}/${dbdatabase}?authSource=petzilla`;

//Post Request to Create Page
app.post('/Create', (req,res)=>{

    var username = req.body.username;
    var password = sha256(req.body.password);
    var name = req.body.name;
    var birthday = req.body.birthday;
    var gender = req.body.gender;

    const client = new mongo(uri, {useNewUrlParser: true});
    client.connect(err=>{
        if(err) console.log("Unable to connect to server.");

        const db = client.db('petzilla');
        const object = {"username": username, "password":password, "name": name, "pets":{}, "birthday": birthday, 
        "gender": gender, "profile_pic_loc": "", "posts":{}, "account_created": Date()};
        db.collection("users").insertOne(object, function(err, res){

            if(err) throw err;
            console.log("Document Inserted");
            client.close();
        })
    })
    res.redirect('/');
})

app.get('/mongotest', (req, res)=>{
    const client = new mongo(uri, { useNewUrlParser: true });
    client.connect(err=>{

        if(err){console.error(err)}
        var messageOut = "";
        const db = client.db('petzilla');

        db.collection('users').find({}).toArray(function(err, result){
            if(err) throw err;

            for(index in result){
                messageOut +=  JSON.stringify(result[index]);
                messageOut += "\n";
            }
            
            res.render('mongotest', {title: "Mongo Test", message: `${messageOut}`}) 
        });
        client.close();
    })  
})

// ALL POST REQUEST
app.post('/Login', (req,res)=>{

    // console.log(req);
    var username = req.body.username;
    var password = sha256(req.body.password);

    res.redirect('/')

})

// 404 Error
app.get('*', (req,res)=>{

    res.status(404);
    res.render('404', {title: 'PetZilla - Page Not Found :('})

})

app.listen(port, ()=> console.log(`PetZilla now running at port ${port}`))