const express=require('express')
const cors=require('cors')
const main=require('./db/config.js')
const userModel = require('./db/user.model.js')
const contactModel = require('./db/allcontact.model.js')


const app=express()

app.use(cors())
app.use(express.json())

//api to create a new user if not existed

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

// to add contact and get updted contact list
app.post('/contact/:userid',async (req,res)=>{
    let {userid}=req.params
    let data=req.body
    let contact=await contactModel.create({
        userId:userid,
        Name:data.Name,
        Number:data.Number,
    })
    let contacts=await contactModel.find({userId:userid})
    res.send(contacts)

})

// to get all the contacts of respective user
app.get('/contacts/:userid',async (req,res)=>{
  try {
    let {userid}=req.params
    let{q}=req.query
    if(!q || q.trim() === ''){

    let contacts=await contactModel.find({userId:userid})
    res.send(contacts)
    }else{
        let contacts = await contactModel.find({
            userId: userid,
            $or: [
                { Name: { $regex: q, $options: 'i' } }  
            ]
        });
        res.send(contacts)
    }
  } catch (error) {
    console.log(error)
  }
})

// to delete a contact of a user and get updated contact list
app.delete('/contact/:contactid',async (req,res)=>{
    let {contactid}=req.params
    await contactModel.deleteOne({_id:contactid})
    res.send('Contact deleted sucessfully')
})

//to update a contact of a user

app.patch('/contact/:contactid',async (req,res)=>{
    let {contactid}=req.params
    console.log(contactid)
    let data=req.body
    let updatedData=await contactModel.findByIdAndUpdate(contactid,data)
    res.send(updatedData)
})

//api for search functionality



let port=process.env.PORT || 8080



app.listen(port,()=>{
    main()
    console.log(`server running at port ${port}`)
})