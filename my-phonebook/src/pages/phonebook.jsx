import React, { useEffect, useState } from 'react'
import { chakra, Box,Text,
    Input,
    Avatar,
    InputGroup,
    InputLeftElement} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AddIcon, ChevronRightIcon, Search2Icon } from '@chakra-ui/icons'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// featch api for getting all the contacts of respective users
async function getData(userid,q){
    try {
        let data=await axios.get(`${process.env.REACT_APP_URL}/contacts/${userid}?q=${q}`)
        return data.data
    } catch (error) {
        return error
    }
}



export default function Phonebook() {
    let data=useSelector((e)=> e.user)
    let contact=useSelector((e)=> e.contacts)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    let [query,setquery]=useState("")

    //every time query change runs the useeffect
    useEffect(()=>{
            getData(data[0]._id,query)
            .then((res)=>{
                dispatch({
                    type:'CONTACT',
                    payload:res
                })

            }).catch((err)=>{
                return err
            })
    },[query])

    
  return (
    <chakra.div>
       {/* header part and search box*/}
        <Box
        position={'sticky'}
        top={0}
        bg={'white'}
        p={3}
        >
        <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        >
            <Text  fontWeight={'700'}>My Phonebook</Text>
            <Avatar size={'sm'} name={data[0].Email} />
        </Box>
        <InputGroup mt={3}  size={'sm'}  >
        <InputLeftElement pointerEvents='none'>
      <Search2Icon color='gray.300' />
    </InputLeftElement>
        <Input
        onChange={(e)=>{
            setquery(e.target.value)
        }}
        bg={'gray.100'}  type={'text'} placeholder='Search Contacts' borderRadius={50} />
        </InputGroup>
        </Box>

        {/* add contact icon */}
        <Box
        display={'grid'}
    placeItems={'center'}
    position={'fixed'}
    bottom={5}
    right={5}
    cursor={'pointer'}
    onClick={()=>{navigate('/addcontact')}}
        borderRadius={'50%'} bg={'blue'} w={10} h={10}>
        <AddIcon color={'white'}  />
        </Box>

    {/* All contact container */}
       <Box p={3}>
            {
                contact.length>0 && <>
                {
                    contact.map((el,ind)=>{
                        return <Box display={'flex'} alignItems={'center'}
                        justifyContent={'space-between'}
                        cursor={'pointer'}
                        key={el._id}
                        onClick={()=>{
                            navigate(`/editcontact/${ind}`)
                        }}
                        >
                            <Box 
                        display={'flex'}
                        alignItems={'center'}
                        gap={3}
                        >
                            <Avatar size={'sm'} name={el.Name}/>
                            <div>
                                <Text fontSize={'sm'} fontWeight={'700'}>{el.Name}</Text>
                                <Text fontSize={'xs'} fontWeight={'600'} color={'gray'}>{el.Number}</Text>
                            </div>

                        </Box>
                        <ChevronRightIcon/>
                        </Box>
                    })
                }
                </>
            }
        </Box>
        
    </chakra.div>
  )
}
