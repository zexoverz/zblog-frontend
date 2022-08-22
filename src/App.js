import { Box } from '@mui/material';
import './App.css';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Box display={'flex'} flexDirection={"column"} justifyContent={'center'} alignItems={"center"}>
        <Hero />
        <News />
      </Box>
    </div>
  );
}

export default App;
