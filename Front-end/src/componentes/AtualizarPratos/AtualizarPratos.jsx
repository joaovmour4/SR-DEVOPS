import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const AtualizarPratos = () => {
  const { user } = useContext(AuthContext);
  const [prato, setPrato] = useState({
    nome: '',
    // descricao: '',
    tipo: '',
  });

  const handleChange = (campo, valor) => {
    setPrato((prevPrato) => ({
      ...prevPrato,
      [campo]: valor,
    }));
  };

  const handleEnviar = async () => {
    try {
      const response = await axios.post('http://localhost:3000/prato', prato, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken.token}`,  
          },
        }
      );

      console.log(response.data);

      setPrato({
        nome: '',
        descricao: '',
        tipo: '',
      });
    } catch (error) {
      console.error('Erro ao enviar prato:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white rounded-lg shadow-2xl">
        <h3 className="text-lg font-bold mb-2">CRIAR PRATOS</h3>
        <input
          type="text"
          placeholder="NOME DO PRATO"
          value={prato.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded w-full"
        />
        <textarea
          placeholder="DESCRIÇÃO DO PRATO"
          value={prato.descricao}
          onChange={(e) => handleChange('descricao', e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded w-full h-32 resize-none"
        />
        <div className="flex mb-4">
          <select
            value={prato.tipo}
            onChange={(e) => handleChange('tipo', e.target.value)}
            className="p-2 border border-gray-300 rounded w-48 mr-2"
          >
            <option value="">TIPO</option>
            <option value="COMUM">COMUM</option>
            <option value="VEGETARIANO">VEGETARIANO</option>
          </select>
          <div className="flex-grow"></div>
          <button
            className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={handleEnviar}
          >
            CADASTRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default AtualizarPratos;
