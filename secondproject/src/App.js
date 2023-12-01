import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import {Box, Button, Text} from '@chakra-ui/react'
import 'react-calendar/dist/Calendar.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [unavailable, setunavailable] = useState(false);
  let [timing,setTiming]=useState({
    start:'08:00',
    end:'17:00',
    unavailability:[]
  })

let[interval,setIntervals]=useState([])


// change the selected date
  const handleDateChange = (date) => {
    setSelectedDate(date);
    availability(date.getDay())
  };
//check available in that date or not for calender
  const checkIfUnavailable = (date) => {
    const day = date.getDay();

    // Disable Sundays and previous days
    if (day === 0) {
      return true;
    }
    if(date<new Date())
    return true
    return false; 
  };
  //set the timing availability
  const availability=(day)=>{
    if(day==1 || day==2 || day==4 || day==5){
      setTiming({
        start:'08:00',
        end:'17:00',
        unavailability:[
          {
            start:'12:30',
            end:'13:00'
          }
        ]
      })
    }else if(day==3){
      setTiming({
        start:'08:00',
        end:'17:00',
        unavailability:[
          {
            start:'12:30',
            end:'13:00'
          },
          {
            start:'15:30',
            end:'16:30'
          }
        ]
      })
    }else if(day==6){
      setTiming({
        start:'08:00',
        end:'12:00',
        unavailability:[]
      })
    }
  }

  // Time availability varies on different days
  const generateTimeSlots = () => {
    const intervals = [];
    let currentTime = timing.start;
    while (currentTime <= timing.end) {
      intervals.push(currentTime);
      const [hours, minutes] = currentTime.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10) + 30);
      currentTime = date.toTimeString().slice(0, 5);
    }
    return intervals;
  };

  const isAvailable=(time)=>{
    const [hours, minutes] = time.split(':');
    const selectedDate = new Date(0, 0, 0, hours, minutes);

    for (const range of timing.unavailability) {
      const start = new Date(0, 0, 0, ...range.start.split(':'));
      const end = new Date(0, 0, 0, ...range.end.split(':'));
      if (selectedDate >= start && selectedDate < end) {
        return true
      }
    }
    return false
  }

  useEffect(()=>{
    const day = new Date()
    availability(day.getDay())

    let interval=generateTimeSlots()
    setIntervals([...interval])
  },[])

  useEffect(()=>{
    let interval=generateTimeSlots()
    setIntervals([...interval])
  },[selectedDate])



  return (
    <div className='App'>
      <Text fontWeight={'700'} textAlign={'center'}>Select Date & Time</Text>
      
      <Box display={'flex'}
      top={'50%'}
      left={'50%'}
      position={'absolute'}
      transform={'translate(-50%,-50%)'}
      gap={10}>
      <Calendar
      className={'calender'}
      onChange={handleDateChange}
      value={selectedDate}
      tileDisabled={({ date }) => checkIfUnavailable(date)}
      />
       <Box w={'350px'} h={'282px'}
       display={'flex'}
       gap={10}
       flexWrap={'wrap'}
       >
          {
            interval.map((el,ind)=>{
              return <Button 
              key={el}
              w={'80px'}
              h={'40px'}
              borderRadius={5}
              bg={isAvailable(el) ? 'gray.100' : 'white'}
              isDisabled={isAvailable(el)}
              cursor={'pointer'}
              >
                  {el}
              </Button>
            })
          }
       </Box>
      </Box>
     
    </div>
  );
}

export default App;
