const mongoose=require('mongoose');

const pdfSchema=new mongoose.Schema({

    content:{type:String}

},{timestamps:true})


module.exports=mongoose.model('pdf',pdfSchema)