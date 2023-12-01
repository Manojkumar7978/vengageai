import React, { useState } from 'react'
import { chakra ,Input,Text,} from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

async function EditContact(data,id){
try {
    let res=await axios.patch(`${process.env.REACT_APP_URL}/contact/${id}`,data)

} catch (error) {
    return error
}
}

export default function Editpage() {
    const navigate=useNavigate()
    let{id}=useParams()
    let contact=useSelector((e)=>e.contacts[id])
    let[contactinput,setcontactinput]=useState({
        Name:contact.Name,
        Number:contact.Number
    })
    const dispatch=useDispatch()

    // update fuction update the contact information
    const update=()=>{
        let numbertype=/^\d{10}$/;
        if(numbertype.test(contactinput.Number) && 
        (contactinput.Name!==null && contactinput.Name!=="")
        ){
            console.log(contact._id)
            EditContact(contactinput,contact._id)
            .then((res)=>{
                navigate('/phonebook')
            })
        }
    }
    
  return (
    <chakra.div p={3}>
       {/* header section */}
 <chakra.div>
           
           <Text cursor={'pointer'}
           fontWeight={'700'}
           onClick={()=>{navigate('/phonebook')}}
           fontSize={'small'}> <ChevronLeftIcon/>Back</Text>
       </chakra.div>

       {/* edit contact section */}

       <form onSubmit={(e)=>{
            e.preventDefault()
            update()
        }}>
            <label htmlFor="">Edit name</label>
            <Input onChange={(e)=>{
                setcontactinput({
                    ...contactinput,
                    Name:e.target.value
                })
            }} type='text'  defaultValue={contactinput.Name} />
            <label htmlFor="">Edit Mobile number</label>
            <Input onChange={(e)=>{
                setcontactinput({
                    ...contactinput,
                    Number:e.target.value
                })
            }} type='number' defaultValue={contactinput.Number} />
            <Input  mt={3} bg={'blue'} color={'white'}
            value={'Update'}
            cursor={'pointer'}
            type='submit'/>
        </form>
      
    </chakra.div>

  )
}
