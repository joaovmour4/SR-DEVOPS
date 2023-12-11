import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaPratos = () => {
  const [contadorPratos, setContadorPratos] = useState(0);
  const [pratos, setPratos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pratos');
        setPratos(response.data);
      } catch (error) {
        console.error('Erro ao obter dados dos pratos:', error);
      }
    };

    fetchData();
  }, []);

  const handleAdicionarPrato = () => {
    setContadorPratos(contadorPratos + 1);
  };

  const handlePagar = () => {
    alert(`Pagamento concluído para ${contadorPratos} prato(s)`);
  };

  const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-8 mt-8">CARRINHO DE COMPRAS</h1>
      <div className="flex flex-col space-y-4">
      {diasDaSemana.map((dia, index) => (
        <div
            key={dia}
            className="bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-[80%] md:max-w-md"
        >
            <h2 className="text-lg font-semibold">{dia}</h2>
            {pratos[index] && (
            <div>
                <p><strong>Prato:</strong> {pratos[index].nome}</p>
                <p><strong>Acompanhamento:</strong> {pratos[index].acompanhamento}</p>
                <p><strong>Opção Vegetariana:</strong> {pratos[index].vegetariano ? 'Sim' : 'Não'}</p>
                <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
                onClick={handleAdicionarPrato}
                >
                Adicionar ao Carrinho
                </button>
            </div>
            )}
        </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xl font-semibold">
          Total de pratos adicionados: {contadorPratos}
        </p>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md mt-2 mb-8"
          onClick={handlePagar}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default ListaPratos;
