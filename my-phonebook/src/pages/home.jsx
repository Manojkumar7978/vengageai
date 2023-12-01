import React, { useState } from 'react'
import { Input, Heading,  InputGroup, InputLeftElement, chakra } from '@chakra-ui/react'
import {EmailIcon} from '@chakra-ui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Home() {
  let[userid,setuserid]=useState()
  let navigate=useNavigate()

  // this funtion is helps to signup or login to a user
  const handelMailSubmit=async (e)=>{
    e.preventDefault()
    const emailType = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailType.test(userid)){
      console.log(process.env.REACT_APP_URL)
      let res=await axios.post(`${process.env.REACT_APP_URL}/user`,{
        Email:userid
      })
      navigate('/phonebook')
    }
  }


  return (
    <chakra.div position={'absolute'}
    top={'50%'}
    left={'50%'}
    transform={'translate(-50%,-50%)'}
    minW={'240px'}
    >
        <Heading mb={10} textAlign={'center'} size={'md'}>Welcome to <br/> My-Phonebook</Heading>
       <form onSubmit={(e)=>{handelMailSubmit(e)}}>
       <InputGroup>
    <InputLeftElement pointerEvents='none'>
      <EmailIcon color='gray.300' />
    </InputLeftElement>
    <Input
    onChange={(e)=>{
      setuserid(e.target.value)
    }}
    type='email' placeholder='Enter your Email'/>
  </InputGroup>
  <Input type='submit' value={'submit'} mt={10}
  bg='blue'
  color={'white'}
  cursor={'pointer'}
  />
 
       </form>
      
    </chakra.div>
  )
}


