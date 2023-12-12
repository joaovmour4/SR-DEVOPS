import React, { useState } from 'react';

const AtualizarPratos = ({ handleEnviarPratos, isAdmin }) => {
  const [prato, setPrato] = useState({
    nome: '',
    descricao: '',
    tipo: 'COMUM',
  });

//   if (!isAdmin) {
//     return null;
//   }

  const handleChange = (campo, valor) => {
    setPrato((prevPrato) => ({
      ...prevPrato,
      [campo]: valor,
    }));
  };

  const handleEnviar = () => {
    handleEnviarPratos(prato);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white rounded-lg shadow-2xl    ">
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
            <option value="COMUM">COMUM</option>
            <option value="VEGETARIANO">VEGETARIANO</option>
          </select>
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
