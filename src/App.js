import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import Content from './components/Content/Content';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import axiosInstance from './lib/AxiosInterface';
import toast, {Toaster} from 'react-hot-toast';

function App() {
  const [articles, setArticles] = useState([]);
  const [hero, setHero] = useState(null);


  useEffect(() => {
    if(articles.length == 0){
      getArticles();
    }
    
  }, [])

  const getArticles = async () => {
    toast.loading('Preparing Article');
    const {data} = await axiosInstance({
      method: "GET",
      url: `/article/getAll`,
    })


    if(data.length > 0){
      let firstData = data.splice(data.length-1, 1);

      setArticles(data)
      setHero({...firstData[0]})
    }
  }
  


  return (
    <div className="App">
      <Navbar />
      <Box display={'flex'} flexDirection={"column"} justifyContent={'center'} alignItems={"center"}>
        <Hero />
        <News article={hero}/>
      </Box>
      <Content articles={articles}/>
      <Toaster
        position="top-center"
      />
    </div>
  );
}

export default App;
