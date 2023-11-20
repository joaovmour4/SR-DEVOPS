import React, { useState } from 'react';

const cardapioData = {
    SEGUNDA: {
      prato: 'GUISADO DE CARNE / FRANGO',
      vegetariano: 'VEGETARIANO: REFOGADO DE LENTILHA',
      acompanhamentos: ['ARROZ BRANCO', 'FEIJÃO COM MACAXEIRA E COUVE', 'FAROFA', 'SALADA CRUA CEN/REP', 'TANGERINA/MELANCIA'],
    },
    TERÇA: {
      prato: 'ESCONDIDINHO DE FRANGO',
      vegetariano: 'VEGETARIANO: PANQUECA DE PALMITO',
      acompanhamentos: ['ARROZ COM CENOURA E SALSINHA', 'FEIJÃO TROPEIRO', 'FAROFA DE OVOS', 'SALADA DE BETERRABA', 'MAMÃO FORMOSA'],
    },
    QUARTA: {
      prato: 'STROGONOFF DE CARNE',
      vegetariano: 'VEGETARIANO: RISOTO DE FUNGHI',
      acompanhamentos: ['ARROZ À GREGA', 'FEIJÃO CARIOCA', 'BATATA PALHA', 'SALADA DE ALFACE E TOMATE', 'MORANGO'],
    },
    QUINTA: {
      prato: 'YAKISSOBA DE FRANGO',
      vegetariano: 'VEGETARIANO: ABÓBORA REFOGADA',
      acompanhamentos: ['ARROZ INTEGRAL', 'FEIJÃO PRETO', 'SOPA DE LEGUMES', 'SALADA DE RÚCULA E AGRIÃO', 'ABACAXI'],
    },
    SEXTA: {
      prato: 'PEITO DE FRANGO GRELHADO',
      vegetariano: 'VEGETARIANO: NHOQUE DE BATATA-DOCE',
      acompanhamentos: ['ARROZ 7 GRÃOS', 'FEIJÃO BRANCO', 'FAROFA DE AVEIA', 'SALADA DE COUVE-FLOR', 'UVA'],
    },
    SÁBADO: {
      prato: 'LASANHA DE CARNE',
      vegetariano: 'VEGETARIANO: LASANHA DE BERINJELA',
      acompanhamentos: ['ARROZ ARBÓREO', 'FEIJÃO ANGELA', 'BATATA GRATINADA', 'SALADA DE AGRIÃO E ALFACE', 'MELÃO'],
    },
  };
  

export default function Cardapio() {
  const [clickedBlock, setClickedBlock] = useState(null);

  const handleBlockClick = (day) => {
    console.log(`Clicou em ${day}`);
    setClickedBlock(day);
  };

  const handleCloseModal = () => {
    setClickedBlock(null);
  };

  return (
    <div>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 font-serif p-4">
        {/* Dia e Prato - ocupando todo o espaço */}
        <div className="container col-span-full border border-gray-300 rounded p-2 mb-4">
          <h1 className="text-center">CARDÁPIO SEMANAL</h1>
        </div>

        {/* Dia e Prato - Segunda a Sábado */}
        {['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'].map((day) => (
          <div
            key={day}
            style={{ transition: 'transform 0.3s', transform: clickedBlock === day ? 'translateY(-10px)' : '' }}
            className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1`}
            onClick={() => handleBlockClick(day)}
          >
            <h2 className="text-center">{day}</h2>
            {/* ... conteúdo do dia */}
          </div>
        ))}
      </main>

      {clickedBlock && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={handleCloseModal}></div>
    <div className="relative bg-white p-8 rounded-lg text-center">
      <h2 className="text-center mb-4">{clickedBlock}</h2>
      <p className="text-left">{cardapioData[clickedBlock].prato}</p>
      <p className="text-left">{cardapioData[clickedBlock].vegetariano}</p>
      <ul className="text-left">
        {cardapioData[clickedBlock].acompanhamentos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => console.log('Comprar')}>
          Comprar
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={handleCloseModal}>
          Fechar
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
