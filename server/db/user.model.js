const mongoose=require('mongoose')


let userSchema = new mongoose.Schema({
   Email:String
})

let userModel = new mongoose.model('user', userSchema)

module.exports = userModel;