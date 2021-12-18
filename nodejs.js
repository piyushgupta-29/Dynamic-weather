const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const path=require('path');
const e = require('express');

app.use(express.static(path.join(__dirname,'/views')));

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('index');
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

app.listen(8000,(err)=>{
    if(err)
        console.log('error');
    else 
        console.log('listning');
})