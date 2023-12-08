import React, { useState } from 'react';
import axios from 'axios';

const AdicionarPratos = ({ handleEnviarPratos, isAdmin }) => {
  // Movido o useState para o início do componente
  const [pratos, setPratos] = useState({
    SEGUNDA: { PRATO: '', VEGETARIANO: '', ACOMPANHAMENTO: '' },
    TERÇA: { PRATO: '', VEGETARIANO: '', ACOMPANHAMENTO: '' },
    QUARTA: { PRATO: '', VEGETARIANO: '', ACOMPANHAMENTO: '' },
    QUINTA: { PRATO: '', VEGETARIANO: '', ACOMPANHAMENTO: '' },
    SEXTA: { PRATO: '', VEGETARIANO: '', ACOMPANHAMENTO: '' },
    SÁBADO: { PRATO: '', VEGETARIANO: '', ACOMPANHAMENTO: '' },
  });

  // Verifica se isAdmin é falso e retorna null, ainda não sei como fazer isso
  /*if (!isAdmin) {
    return null;
  }*/

  const handleChange = (dia, tipo, valor) => {
    setPratos((prevPratos) => ({
      ...prevPratos,
      [dia]: {
        ...prevPratos[dia],
        [tipo]: valor,
      },
    }));
  };

  const handleEnviar = () => {
    handleEnviarPratos(pratos);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {Object.keys(pratos).map((dia) => (
        <div key={dia} className="mb-4">
          <h3 className="text-lg font-bold mb-2">{dia}</h3>
          <div className="flex gap-4">
          <input
              type="text"
              placeholder="Prato"
              value={pratos[dia].PRATO}
              onChange={(e) => handleChange(dia, 'PRATO', e.target.value)}
              className="p-2 border border-gray-300 rounded w-48"
            />
            <input
              type="text"
              placeholder="Vegetariano"
              value={pratos[dia].VEGETARIANO}
              onChange={(e) => handleChange(dia, 'VEGETARIANO', e.target.value)}
              className="p-2 border border-gray-300 rounded w-48"
            />
            <input
              type="text"
              placeholder="Acompanhamento"
              value={pratos[dia].ACOMPANHAMENTO}
              onChange={(e) => handleChange(dia, 'ACOMPANHAMENTO', e.target.value)}
              className="p-2 border border-gray-300 rounded w-48"
            />
          </div>
        </div>
      ))}
      <button
        className="p-2 bg-green-500 text-white rounded hover:bg-green-700 mb-8"
        onClick={handleEnviar}
      >
        Enviar
      </button>
    </div>
  );
};

export default AdicionarPratos;
