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
  const [cardapioData, setCardapioData] = useState({
    segunda: {
      pratoComum: '',
      pratoVegetariano: '',
      acompanhamentos: []
    },
    terca: {
      pratoComum: '',
      pratoVegetariano: '',
      acompanhamentos: []
    },
    quarta: {
      pratoComum: '',
      pratoVegetariano: '',
      acompanhamentos: []
    },
    quinta: {
      pratoComum: '',
      pratoVegetariano: '',
      acompanhamentos: []
    },
    sexta: {
      pratoComum: '',
      pratoVegetariano: '',
      acompanhamentos: []
    },
    sabado: {
      pratoComum: '',
      pratoVegetariano: '',
      acompanhamentos: []
    },
  });

  const lidarComCliqueNoBloco = async (dia) => {
    console.log(`Clicou em ${dia}`);
    setBlocoClicado(dia);
    await atualizarCardapio(dia);
  };

  const handleCloseModal = () => {
    setBlocoClicado(null);
  };

  const handleCompraClick = () => {
    console.log('Clicou em Comprar');
  };

  const atualizarCardapio = async (dia) => {
    let newDia = dia.toLowerCase();
    // Verificar se já temos os dados localmente
    try {
      const response = await axios.get(`http://localhost:3000/menu/${newDia}`);
      if (response.data.message) {
        const { pratoComum, pratoVegetariano, acompanhamentos } = response.data.message;

        // Certifique-se de que pratoComum, pratoVegetariano e acompanhamentos são objetos antes de acessar suas propriedades
        setCardapioData((prevState) => ({
          ...prevState,
          [newDia]: {
            pratoComum: pratoComum ? pratoComum.prato : '',
            pratoVegetariano: pratoVegetariano ? pratoVegetariano.prato : '',
            acompanhamentos: Array.isArray(acompanhamentos)
              ? acompanhamentos.map((item) => (item ? item.prato : ''))
              : [],
          },
        }));
      } else {
        console.error(`Dados inválidos para ${dia}:`, response.data);
      }
    } catch (error) {
      console.error(`Erro ao buscar pratos para ${dia}:`, error);
    }
  };


  useEffect(() => {
    console.log('CardapioData:', cardapioData);
  }, [cardapioData]);

  return (
    <div className='min-h-screen'>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 font-serif p-4 md:mx-40">
        <CarouselCardapio />

        <div
          className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1 md:h-full lg:h-full hover:shadow-md mx-2 cursor-pointer`}
          onClick={() => {
            lidarComCliqueNoBloco('SEGUNDA')
            atualizarCardapio('segunda');
          }}
        >
          <h2 className="text-center text-lg font-bold mb-2">SEGUNDA</h2>
        </div>
        <div
          className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1 md:h-full lg:h-full hover:shadow-md mx-2 cursor-pointer`}
          onClick={() => {
            lidarComCliqueNoBloco('TERCA')
            atualizarCardapio('terca');
          }}
        >
          <h2 className="text-center text-lg font-bold mb-2">TERÇA</h2>
        </div>
        <div
          className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1 md:h-full lg:h-full hover:shadow-md mx-2 cursor-pointer`}
          onClick={() => {
            lidarComCliqueNoBloco('QUARTA')
            atualizarCardapio('quarta');
          }}
        >
          <h2 className="text-center text-lg font-bold mb-2">QUARTA</h2>
        </div>
        <div
          className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1 md:h-full lg:h-full hover:shadow-md mx-2 cursor-pointer`}
          onClick={() => {
            lidarComCliqueNoBloco('QUINTA')
            atualizarCardapio('quinta');
          }}
        >
          <h2 className="text-center text-lg font-bold mb-2">QUINTA</h2>
        </div>
        <div
          className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1 md:h-full lg:h-full hover:shadow-md mx-2 cursor-pointer`}
          onClick={() => {
            lidarComCliqueNoBloco('SEXTA')
            atualizarCardapio('sexta');
          }}
        >
          <h2 className="text-center text-lg font-bold mb-2">SEXTA</h2>
        </div>
        <div
          className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1 md:h-full lg:h-full hover:shadow-md mx-2 cursor-pointer`}
          onClick={() => {
            lidarComCliqueNoBloco('SABADO')
            atualizarCardapio('sabado');
          }}
        >
          <h2 className="text-center text-lg font-bold mb-2">SÁBADO</h2>
        </div>
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
            <p className="text-left">
              <span className="font-bold">PRATO:</span> {cardapioData[blocoClicado.toLowerCase()].pratoComum}
            </p>
            <p className="text-left">
              <span className="font-bold">VEGETARIANO:</span> {cardapioData[blocoClicado.toLowerCase()].pratoVegetariano}
            </p>
            <p className="text-left">
              <span className="font-bold">ACOMPANHAMENTO:</span> {cardapioData[blocoClicado.toLowerCase()].acompanhamentos.join(', ')}
            </p>
            <div className="flex justify-center mt-6">
              {/* <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mr-2" onClick={handleCompraClick}>
                Comprar
              </button> */}
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