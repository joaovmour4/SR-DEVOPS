import React from 'react';
import './App.css';
import Header from '../src/componentes/Header'
import Footer from '../src/componentes/Footer'
import Home from '../src/views/Home'
import Cardapio from '../src/views/Cardapio'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './views/Login';

export default function App() {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cardapio' element={<Cardapio/>}/>
            
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}