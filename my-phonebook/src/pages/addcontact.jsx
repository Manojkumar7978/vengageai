import React, { useState } from 'react'
import { Input, Text, chakra } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

//fetch api for post a new contact
const addcontact=async (contact,id)=>{
    try {
        let data=await axios.post(`${process.env.REACT_APP_URL}/contact/${id}`,contact)
        return data.data
    } catch (error) {
        return error
    }
}

export default function Addcontact() {
    const navigate=useNavigate()
    let[contactinput,setcontactinput]=useState({
        Name:null,
        Number:""
    })
    let userid=useSelector((e)=>e.user[0]._id)
    const dispatch=useDispatch()


    // handelsave function add the new contact to database and navigate to phonebook page

    const handelSave=()=>{
        let numbertype=/^\d{10}$/;
        if(numbertype.test(contactinput.Number) && 
        (contactinput.Name!==null && contactinput.Name!=="")
        ){
            addcontact(contactinput,userid)
            .then((res)=>{
                dispatch({
                    type:'CONTACT',
                    payload:res
                })
            })
            navigate('/phonebook')
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

        {/* Add a contact  */}

        <form onSubmit={(e)=>{
            e.preventDefault()
            handelSave()
        }}>
            <label htmlFor="">Enter name</label>
            <Input onChange={(e)=>{
                setcontactinput({
                    ...contactinput,
                    Name:e.target.value
                })
            }} type='text' />
            <label htmlFor="">Enter Mobile number</label>
            <Input onChange={(e)=>{
                setcontactinput({
                    ...contactinput,
                    Number:e.target.value
                })
            }} type='number' />
            <Input  mt={3} bg={'blue'} color={'white'}
            value={'save'}
            cursor={'pointer'}
            type='submit'/>
        </form>

      
    </chakra.div>
  )
}
