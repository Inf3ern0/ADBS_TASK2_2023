const express = require('express')
const app = express()
const urlprefix = '/api'
const mongoose = require('mongoose')
const Post = require('./Models/bpost')
const fs = require('fs');
const cert = fs.readFileSync('Keys/certificate.crt');

require('dotenv').config()

const options = {
    server: {sslCA: cert}};

const connString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`
const postRoutes = require("./routes/post");
const userRoutes=require("./routes/user");
mongoose.connect(connString)                 
.then(()=>
{
    console.log('Connected :)')
})
.catch((error)=>
{
    console.error('Error:', error);
    console.log('Not Connected :(')                
},options);

app.use(express.json())  
app.use((reg,res,next) => 
{
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
   res.setHeader('Access-Control-Allow-Methods','*'); 
   next(); 
});

app.get(urlprefix +'/',(req, res) => {
    res.send('Hello World')

})

app.use(urlprefix+'/posts',postRoutes)
app.use(urlprefix+'/users',userRoutes)

module.exports = app;
