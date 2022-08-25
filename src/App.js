import { createTheme, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './pages/Blog';
import DetailArticle from './pages/DetailArticle';
import Home from './pages/Home';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store, persistor} from "./store";

const theme = createTheme({
  palette: {
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
