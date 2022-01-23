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
app.use(express.urlencoded({extended: false}));
mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/weather",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log('successful'))
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
        let user1=new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            gender: req.body.gender,
            password: req.body.password
        });
        const result=await user1.save();
        res.status(201).render('index');
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
// https://arcane-beach-86111.herokuapp.com/ | https://git.heroku.com/arcane-beach-86111.git
// git config --global user.email "you@example.com" git config --global user.name "Your Name"