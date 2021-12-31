const express=require('express');
const app=express();
const path=require('path');
const hbs=require('hbs');
const mongoose=require('mongoose');
app.use(express.static(path.join(__dirname,'/views')));

const port = process.env.PORT || 8000;
app.set('view engine','hbs');
hbs.registerPartials(path.join(__dirname,'/partials'));

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/weather").then(()=>console.log('successful'))
.catch((err)=>console.log('error'));

const schema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
});

const User = new mongoose.model("User",schema);
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/login',async(req,res)=>{
    res.render('login');
})
app.post('/login',async(req,res)=>{
    try{
        let firstName=req.body.firstName;
        let lastName=req.body.lastName;
        let emailId=req.body.emailId;
        let gender=req.body.gender;
        let password=req.body.password;
        let confirmPassword=req.body.confirmPassword;
        console.log(req.body.firstName);
        let user1={firstName,lastName,emailId,gender,password,confirmPassword};
        const result=await User.insertMany([user1]);
        console.log(result);
    }
    catch{
        (e)=>console.log(e)
    }
})
app.get('/weather',(req,res)=>{
    res.render('weather');
})   
app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(port,(err)=>{
    if(err)
        console.log('error');
    else 
        console.log('listning');
})