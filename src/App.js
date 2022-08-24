import { createTheme, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './pages/Blog';
import DetailArticle from './pages/DetailArticle';
import Home from './pages/Home';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    Development: {
      main: '#f73378',
      contrastText: '#fff',
    },
    NFT:{
      main: '#1c8ab9',
      contrastText: '#fff',
    },
    StartUp: {
      main: '#e0a246',
      contrastText: '#fff',
    },
    Blockchain: {
      main: '#5138EE',
      contrastText: '#fff',
    },
    Technology: {
      main: '#4caf50',
      contrastText: '#fff',
    }

  },
});


function App() {
  return (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="article">
          <Route path=":articleId" element={<DetailArticle />} />
        </Route>
        <Route path="/blog" element={<Blog />}></Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  
  );
}

export default App;
