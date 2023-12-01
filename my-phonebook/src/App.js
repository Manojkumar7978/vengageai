// import logo from './logo.svg';
import './App.css';
import { Box, chakra } from '@chakra-ui/react';
import Router from './components/router';

function App() {
  return (
    <chakra.div className="App" position={'relative'}
    w={'100vw'}
    h={'100vh'}
    bg={'black'}>
      <Box className='mobile'>
       <Router/>
      </Box>
   
    </chakra.div>
  );
}

export default App;
