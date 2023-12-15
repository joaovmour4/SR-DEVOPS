import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const CRUDAddPratos = ({ closeModal, refreshPratos }) => {
  const { user } = useContext(AuthContext);
  const [prato, setPrato] = useState({
    nomePrato: '', // Nome do prato comum
    tipoPrato: '', // Tipo do prato (comum ou vegetariano)
    acompanhamentoPrato: '', // Acompanhamento do prato comum
    nomePratoVegetariano: '', // Nome do prato vegetariano
    tipoPratoVegetariano: '', // Tipo do prato (comum ou vegetariano) para vegetariano
    acompanhamentoPratoVegetariano: '', // Acompanhamento do prato vegetariano
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
        'http://localhost:3000/prato/post',
        {
          nomePrato: prato.nomePrato,
          tipoPrato: prato.tipoPrato,
          acompanhamentoPrato: prato.acompanhamentoPrato,
          nomePratoVegetariano: prato.nomePratoVegetariano,
          tipoPratoVegetariano: prato.tipoPratoVegetariano,
          acompanhamentoPratoVegetariano: prato.acompanhamentoPratoVegetariano,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwtToken.token}`,
          },
        }
      );

      console.log(response.data);

      setPrato({
        nomePrato: '',
        tipoPrato: '',
        acompanhamentoPrato: '',
        nomePratoVegetariano: '',
        tipoPratoVegetariano: '',
        acompanhamentoPratoVegetariano: '',
      });

      const closeModal = () => {
        console.log('Modal fechado');
      };
      refreshPratos();
    } catch (error) {
      console.error('Erro ao enviar prato:', error);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button
          className="text-2xl font-bold"
          onClick={closeModal}
        >
          X
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">CRIAR PRATO</h2>
      <label className="block mb-2">
        NOME DO PRATO COMUM:
        <input
          type="text"
          className="border p-2 w-full"
          value={prato.nomePrato}
          onChange={(e) => handleChange('nomePrato', e.target.value)}
        />
      </label>
      {/* <label className="block mb-2">
        TIPO DO PRATO COMUM:
        <select
          value={prato.tipoPrato}
          onChange={(e) => handleChange('tipoPrato', e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Selecione o tipo</option>
          <option value="COMUM">Comum</option>
          <option value="VEGETARIANO">Vegetariano</option>
        </select>
      </label> */}
      <label className="block mb-2">
        ACOMPANHAMENTO DO PRATO COMUM:
        <input
          type="text"
          className="border p-2 w-full"
          value={prato.acompanhamentoPrato}
          onChange={(e) => handleChange('acompanhamentoPrato', e.target.value)}
        />
      </label>

      <label className="block mb-2">
        NOME DO PRATO VEGETARIANO:
        <input
          type="text"
          className="border p-2 w-full"
          value={prato.nomePratoVegetariano}
          onChange={(e) => handleChange('nomePratoVegetariano', e.target.value)}
        />
      </label>
      {/* <label className="block mb-2">
        TIPO DO PRATO VEGETARIANO:
        <select
          value={prato.tipoPratoVegetariano}
          onChange={(e) => handleChange('tipoPratoVegetariano', e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Selecione o tipo</option>
          <option value="COMUM">Comum</option>
          <option value="VEGETARIANO">Vegetariano</option>
        </select>
      </label> */}
      <label className="block mb-2">
        ACOMPANHAMENTO DO PRATO VEGETARIANO:
        <input
          type="text"
          className="border p-2 w-full"
          value={prato.acompanhamentoPratoVegetariano}
          onChange={(e) => handleChange('acompanhamentoPratoVegetariano', e.target.value)}
        />
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
