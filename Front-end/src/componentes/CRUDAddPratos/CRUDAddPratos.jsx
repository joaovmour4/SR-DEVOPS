import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const CRUDAddPratos = ({ closeModal, refreshPratos }) => {
  const { user } = useContext(AuthContext);
  const [prato, setPrato] = useState({
    nome: '',
    descricao: '',
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
      });

      console.log(response.data);

      setPrato({
        nome: '',
        descricao: '',
        tipo: '',
      });

      closeModal();
      refreshPratos();
    } catch (error) {
      console.error('Erro ao enviar prato:', error);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <h2 className="text-2xl font-semibold mb-4">CRIAR PRATO</h2>
      <label className="block mb-2">
        NOME DO PRATO:
        <input
          type="text"
          className="border p-2 w-full"
          value={prato.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
        />
      </label>
      <label className="block mb-2">
        DESCRIÇÃO DO PRATO:
        <textarea
          type="text"
          className="border p-2 w-full h-32 resize-none"
          value={prato.descricao}
          onChange={(e) => handleChange('descricao', e.target.value)}
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <div style={{ flex: '1', marginRight: '4%' }}>
          <label className="block mb-2">
            <span className="sr-only">Tipo do Prato:</span>
            <select
              value={prato.tipo}
              onChange={(e) => handleChange('tipo', e.target.value)}
              className="border p-2 w-full flex text-center"
            >
              <option value="">TIPO</option>
              <option value="COMUM">COMUM</option>
              <option value="VEGETARIANO">VEGETARIANO</option>
            </select>
          </label>
        </div>
        <div style={{ flex: '1', marginRight: '4%' }}>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline w-full"
            onClick={handleEnviar}
          >
            CADASTRAR
          </button>
        </div>
        <div style={{ flex: '1' }}>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline w-full"
            onClick={closeModal}
          >
            VOLTAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRUDAddPratos;
