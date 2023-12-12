import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselCardapio from '../componentes/Carousel_do_cardapio/Carousel_do_cardapio';

const CardapioData = {
  SEGUNDA: {
    PRATO: [],
    VEGETARIANO: [],
    ACOMPANHAMENTO: []
  },
  TERÇA: {
    PRATO: [],
    VEGETARIANO: [],
    ACOMPANHAMENTO: []
  },
  QUARTA: {
    PRATO: [],
    VEGETARIANO: [],
    ACOMPANHAMENTO: []
  },
  QUINTA: {
    PRATO: [],
    VEGETARIANO: [],
    ACOMPANHAMENTO: []
  },
  SEXTA: {
    PRATO: [],
    VEGETARIANO: [],
    ACOMPANHAMENTO: []
  },
  SÁBADO: {
    PRATO: [],
    VEGETARIANO: [],
    ACOMPANHAMENTO: []
  },
};

export default function Cardapio() {
  const [blocoClicado, setBlocoClicado] = useState(null);
  const [cardapioData, setCardapioData] = useState(CardapioData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:3000/purchase');
        setCardapioData(response.data);
      } catch (error) {
        console.error('Erro ao buscar pratos:', error);
      }
    };

    fetchData();
  }, []);

  const lidarComCliqueNoBloco = (dia) => {
    console.log(`Clicou em ${dia}`);
    setBlocoClicado(dia);
  };

  const handleCloseModal = () => {
    setBlocoClicado(null);
  };

  const handleCompraClick = () => {
    // Lógica para ação de compra
    console.log('Clicou em Comprar');
  };

  const atualizarCardapio = async (dia) => {
    // Verificar se já temos os dados localmente
    if (!cardapioData[dia]?.PRATO.length) {
      try {
        {/* pedi para o jv add uma rota de id=dia como segunda a sabado para pegar o prato certo ou add uma rota purchase/all para pegar todos os pratos de uam só vez */}
        const response = await axios.get(`https://localhost:3000/purchase/${dia}`);
        const { prato, vegetariano, acompanhamentos } = response.data;
        setCardapioData((prevData) => ({
          ...prevData,
          [dia]: { PRATO: prato, VEGETARIANO: vegetariano, ACOMPANHAMENTO: acompanhamentos },
        }));
      } catch (error) {
        console.error(`Erro ao buscar pratos para ${dia}:`, error);
      }
    }
  };

  return (
    <div className='min-h-screen'>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 font-serif p-4 md:mx-40">
        <CarouselCardapio />

        {Object.keys(cardapioData).map((dia) => (
          <div
            key={dia}
            className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1 md:h-full lg:h-full hover:shadow-md mx-2 cursor-pointer`}
            onClick={() => {
              lidarComCliqueNoBloco(dia);
              atualizarCardapio(dia);
            }}
          >
            <h2 className="text-center text-lg font-bold mb-2">{dia}</h2>
          </div>
        ))}
      </main>

      {blocoClicado && (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={handleCloseModal}></div>
    <div
      className="relative bg-white p-8 rounded-lg text-center md:w-96 lg:w-96 md:mx-auto lg:mx-auto mt-8 z-10"
      style={{
        maxWidth: '350px',
        width: '100%',
      }}
    >
            <h2 className="text-center text-xl font-bold mb-4">{blocoClicado}</h2>
            <p className="text-left">PRATO: {cardapioData?.[blocoClicado]?.PRATO}</p>
            <p className="text-left">VEGETARIANO: {cardapioData?.[blocoClicado]?.VEGETARIANO}</p>
            <p className="text-left">ACOMPNHAMENTO: {cardapioData?.[blocoClicado]?.ACOMPANHAMENTO}</p>
            <ul className="text-left">
              {cardapioData?.[blocoClicado]?.ACOMPANHAMENTO?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <div className="flex justify-center mt-6">
              <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mr-2" onClick={handleCompraClick}>
                Comprar
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded" onClick={handleCloseModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
