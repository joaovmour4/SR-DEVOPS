import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const CRUDAddPratos = ({ closeModal, refreshPratos }) => {
  const { user } = useContext(AuthContext);
  const [prato, setPrato] = useState({
    nomePrato: '',
    tipoPrato: '',
  });

  const handleChange = (campo, valor) => {
    setPrato((prevPrato) => ({
      ...prevPrato,
      [campo]: valor,
    }));
  };

  const handleEnviar = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/prato',
        {
          prato: prato.nomePrato,
          pratoType: prato.tipoPrato,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);

      setPrato({
        nomePrato: '',
        tipoPrato: '',
      });

      closeModal();
      refreshPratos();
    } catch (error) {
      console.error('Erro ao enviar prato:', error);
    }
  };

  const handleFecharModal = () => {
    closeModal();
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button
          className="text-2xl font-bold"
          onClick={handleFecharModal}
        >
          X
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">CRIAR PRATO</h2>
      <label className="block mb-2">
        NOME DO PRATO:
        <input
          type="text"
          className="border p-2 w-full"
          value={prato.nomePrato}
          onChange={(e) => handleChange('nomePrato', e.target.value)}
        />
      </label>
      <label className="block mb-2">
        TIPO DO PRATO:
        <select
          value={prato.tipoPrato}
          onChange={(e) => handleChange('tipoPrato', e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Selecione o tipo</option>
          <option value="comum">Comum</option>
          <option value="vegetariano">Vegetariano</option>
          <option value="acompanhamento">Acompanhamento</option>
        </select>
      </label>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <div style={{ flex: '1', marginRight: '4%' }}>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus.outline.none focus.shadow.outline w-full"
            onClick={handleEnviar}
          >
            CADASTRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default CRUDAddPratos;
