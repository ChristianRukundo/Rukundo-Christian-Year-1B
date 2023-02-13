const express = require('express');
const app = express();
const mysql = require('mysql');
const env = require('dotenv');

const router = express.Router();


app.set('view engine', 'ejs');

const public = `${__dirname}/public`;
app.use('/public', express.static(public));

const assets = `${__dirname}/assets`;
app.use('/assets',express.static(assets));


env.config({path :'./.env'});
let db = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect( (err) =>{
    if(err){
        console.log("Mysqli error");
    }else{
        console.log("Connected successfully");
    }
});


app.use('/', require('./routes/router'));

app.use('/auth', require('./routes/auth'))



app.listen(process.env.APP_PORT, () =>{
    console.log("Server started");
})
