const express=require('express')
const app=express()
const user=require('./routes/userRoute')
const bodyParser=require('body-parser')
const Admin = require('./routes/adminRoute')
const mongoose=require('mongoose')
const session = require('express-session');
let port = process.env.PORT||3000;
const noCache= require('nocache')
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

app.use(flash());
app.set('view engine','ejs')
app.set('views','./views/user')


app.use(noCache());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret:crypto.randomBytes(64).toString('hex'), 
    resave: false,
    saveUninitialized: true,
}))


mongoose.connect('mongodb://127.0.0.1:27017/login').then(()=>{
    console.log("Mongodb connected");
}).catch(()=>{
    console.log("Failed to connect");
})







app.use('/',user)
app.use('/admin',Admin)



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});