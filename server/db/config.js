const mongoose=require('mongoose')

const main=async ()=>{
    try {
        mongoose.connect(`mongodb://127.0.0.1:27017/contacts`)
        console.log('mongodb started')
    } catch (error) {
        console.log(error)
    }
}

module.exports=main;