const mongoose=require('mongoose')


let contactSchema=new mongoose.Schema({
    userId:String,
    Name:String,
    Number:Number,
})

let contactModel=new mongoose.model('contact',contactSchema)

module.exports=contactModel
