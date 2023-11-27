import React, { useState } from 'react';
import CarouselCardapio from '../componentes/Carousel_do_cardapio';

const CardapioData = {
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
    const [blocoClicado, setBlocoClicado] = useState(null);
  
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
  
    return (
      <div className='min-h-screen'>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 font-serif p-4 md:mx-40">
          {/* Componente Carrossel */}
          <CarouselCardapio />
  
          {/* Dia e Prato - Segunda a Sábado */}
          {Object.keys(CardapioData).map((dia) => (
            <div
              key={dia}
              className={`border border-gray-300 rounded p-4 md:col-span-1 lg:col-span-1 md:h-full lg:h-full hover:shadow-md mx-2 cursor-pointer`}
              onClick={() => lidarComCliqueNoBloco(dia)}
            >
              <h2 className="text-center text-lg font-bold mb-2">{dia}</h2>
            </div>
          ))}
        </main>
  
        {/* Componente Modal */}
        {blocoClicado && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-75" onClick={handleCloseModal}></div>
            <div className="relative bg-white p-8 rounded-lg text-center md:w-96 lg:w-96 md:mx-auto lg:mx-auto mt-8 z-10">
              <h2 className="text-center text-xl font-bold mb-4">{blocoClicado}</h2>
              <p className="text-left">{CardapioData[blocoClicado].prato}</p>
              <p className="text-left">{CardapioData[blocoClicado].vegetariano}</p>
              <ul className="text-left">
                {CardapioData[blocoClicado].acompanhamentos.map((item, index) => (
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