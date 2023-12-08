import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../src/componentes/Header/Header';
import Footer from '../src/componentes/Footer/Footer';
import Home from '../src/views/Home';
import Compra from '../src/views/Compra';
import Cardapio from "../src/views/Cardapio";
import Cadastro from '../src/views/Cadastro';
import Login from './views/Login';
import Pagamento from './views/Pagamento';
import User from './views/User';
import ControlheUsuario from './views/ControlheUsuario';
import AdicionarPratos from './views/AdicionarPratos'

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
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/user" element={<User/>}/>
          <Route path="/controlheusuario" element={<ControlheUsuario/>}/>
          <Route path="/adicionarpratos" element={<AdicionarPratos/>}/>
        </Routes>
        <Footer />
      </>
    </BrowserRouter>
  );
}
