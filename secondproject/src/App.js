import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import {Box, Button} from '@chakra-ui/react'
import 'react-calendar/dist/Calendar.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [unavailable, setunavailable] = useState(false);
  let [timing,setTiming]=useState({})
let[interval,setIntervals]=useState([])
  const handleDateChange = (date) => {
    setSelectedDate(date);
    availability(date.getDay())
  };

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
  
  const availability=(day)=>{
    console.log(day)
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

  const generateTimeSlots = () => {
    const intervals = [];
    let currentTime = timing.start;
    console.log(timing)
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

  useEffect(()=>{
    const day = new Date()
    availability(day.getDay())
  },[])

  useEffect(()=>{
    let interval=generateTimeSlots()
    setIntervals([...interval])
  },[selectedDate])

  return (
    <div className='App'>
      <h3>Select Date & Time</h3>
      
      <Box display={'flex'} gap={10}>
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
              w={'80px'}
              h={'40px'}
              borderRadius={5}
              bg={'white'}
              
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
