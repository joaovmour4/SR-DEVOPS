import React from 'react';
import './App.css';
import Header from '../src/componentes/Header';
import Footer from '../src/componentes/Footer';
import Home from '../src/views/Home';
import Compra from '../src/views/Compra';
import Cardapio from "../src/views/Cardapio";
import Cadastro from '../src/views/Cadastro';
import Login from './views/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/compra" element={<Compra />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}