import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Content from '../components/Content/Content';
import Hero from '../components/Hero/Hero';
import Navbar from '../components/Navbar/Navbar';
import News from '../components/News/News';
import toast, {Toaster} from 'react-hot-toast';
import {getArticles} from "../store/ArticleSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const articles = useSelector(({ articleReducer }) => articleReducer.articles);
  const hero = useSelector(({ articleReducer }) => articleReducer.hero);


  useEffect(() => {
    if(articles.length == 0){
      dispatch(getArticles());
    }
    
  }, [])



  return (
    <div className="App" style={{textAlign: "center", alignItems: "center", padding: "0px 100px"}}>
      <Navbar />
      <Box display={'flex'} flexDirection={"column"} justifyContent={'center'} alignItems={"center"}>
        <Hero />
        <News article={hero}/>
      </Box>
      <Content/>
      <Toaster
        position="top-center"
      />
    </div>
  );
}

export default Home;
