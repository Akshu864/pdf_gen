const express=require('express')

const bodyParser=require('body-parser')

const { default: mongoose } = require('mongoose')

const route=require('./route/routes')

const app=express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://Akshu12:Akshay123@cluster0.eqljz.mongodb.net/pdf_gen",{
    useNewUrlParser:true
})
.then(()=>console.log("Mongodb is running"))

.catch(err=> console.log(err))


app.use('/',route)




app.listen(3000,()=>{
    console.log("Server listening on port 3000")
})