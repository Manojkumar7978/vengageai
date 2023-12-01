const express=require('express')
const cors=require('cors')
const main=require('./db/config.js')
const userModel = require('./db/user.model.js')


const app=express()

app.use(cors())
app.use(express.json())

app.post('/user',async (req,res)=>{
    let mail=req.body
    let x = await userModel.find({ Email: mail.Email })
    if(x.length==0){
       let user=await userModel.create({Email:mail.Email})
        res.send(user)
        return;
    }else{
        res.send(x)
        return;
    }
})



app.listen(8080,()=>{
    main()
    console.log('server running at port 8080')
})