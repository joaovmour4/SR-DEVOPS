import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListaPratos = () => {
  const [pratos, setPratos] = useState([]);
  const [testeModal,setModal] = useState(false);

  const [pratoComum, setPratoComum] = useState('');
  const [pratoVegetariano, setPratoVegetariano] = useState('');
  const [acompanhamento, setAcompanhamento] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/prato', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPratos(response.data.message);
      } catch (error) {
        console.error('Erro ao obter dados dos pratos:', error);
      }
    };

    fetchData();
  }, []);

  function handleAdd(prato) {
    if (prato.pratoType === 'comum') {
      setPratoComum(prato.prato)
    } else if (prato.pratoType === 'vegetariano') {
      setPratoVegetariano(prato.prato)
    } else if (prato.pratoType === 'acompanhamento') {
      setAcompanhamento((prevPratos) => [...prevPratos, prato.prato]);
    } else {
      console.log('Erro');
    }
  }

  function cancelarPrato(){
    setPratoComum('')
    setPratoVegetariano('')
    setAcompanhamento([])
  }

  async function enviarPrato(day){
    const acompanhamentoNew = acompanhamento.join(',')
    await axios.post('http://localhost:3000/menu', {
        diaSemana: day,
        pratoComum,
        pratoVegetariano,
        acompanhamentos: acompanhamentoNew
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    console.log(`pratoComum` + pratoComum)
    console.log(`pratoVegetariano` + pratoVegetariano)
    console.log(`acompanhamento` + acompanhamento.map((prato) => prato.prato))
  },[pratoComum,pratoVegetariano,acompanhamento])

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-8 mt-8">CARRINHO DE COMPRAS</h1>
      <div className="flex flex-wrap space-y-4">
        <div
            className="bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-[80%] md:max-w-md"
        >
            <div className="text-lg font-semibold">Segunda</div>
            {pratos.map((prato,index) => (
              <div key={index}>
                  <p><strong>Prato:</strong> {prato.prato}</p>
                  <p><strong>Prato:</strong> {prato.pratoType}</p>
                  <button onClick={() => handleAdd(prato)} className='bg-green-300 px-8 py-2 rounded-md text-white font-bold'>Adicionar</button>
              </div>
            ))}
           <div className='flex flex-col'>
            <button className='mt-2' onClick={() => setModal(true)}>Ver prato</button>
            <button onClick={() => enviarPrato('segunda')} className='w-full py-2 rounded-md mt-3 bg-blue-300 mx-auto'>Enviar prato</button>
           </div>
        </div>
        {pratoComum.length > 0 || pratoVegetariano.length > 0 || acompanhamento.length > 0  ? (
          <button onClick={() => cancelarPrato()} className='bg-red-300 px-8 py-2 w-[45%] mx-auto rounded-md text-white font-bold'>Cancelar</button>
        ): null}
        <div
            className="bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-[80%] md:max-w-md"
        >
            <div className="text-lg font-semibold">Terça</div>
            {pratos.map((prato,index) => (
              <div key={index}>
                  <p><strong>Prato:</strong> {prato.prato}</p>
                  <p><strong>Prato:</strong> {prato.pratoType}</p>
                  <button onClick={() => handleAdd(prato)} className='bg-green-300 px-8 py-2 rounded-md text-white font-bold'>Adicionar</button>
              </div>
            ))}
           <div className='flex flex-col'>
            <button className='mt-2' onClick={() => setModal(true)}>Ver prato</button>
            <button onClick={() => enviarPrato('terca')} className='w-full py-2 rounded-md mt-3 bg-blue-300 mx-auto'>Enviar prato</button>
           </div>
        </div>
        {pratoComum.length > 0 || pratoVegetariano.length > 0 || acompanhamento.length > 0  ? (
          <button onClick={() => cancelarPrato()} className='bg-red-300 px-8 py-2 w-[45%] mx-auto rounded-md text-white font-bold'>Cancelar</button>
        ): null}
        <div
            className="bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-[80%] md:max-w-md"
        >
            <div className="text-lg font-semibold">Quarta</div>
            {pratos.map((prato,index) => (
              <div key={index}>
                  <p><strong>Prato:</strong> {prato.prato}</p>
                  <p><strong>Prato:</strong> {prato.pratoType}</p>
                  <button onClick={() => handleAdd(prato)} className='bg-green-300 px-8 py-2 rounded-md text-white font-bold'>Adicionar</button>
              </div>
            ))}
           <div className='flex flex-col'>
            <button className='mt-2' onClick={() => setModal(true)}>Ver prato</button>
            <button onClick={() => enviarPrato('quarta')} className='w-full py-2 rounded-md mt-3 bg-blue-300 mx-auto'>Enviar prato</button>
           </div>
        </div>
        {pratoComum.length > 0 || pratoVegetariano.length > 0 || acompanhamento.length > 0  ? (
          <button onClick={() => cancelarPrato()} className='bg-red-300 px-8 py-2 w-[45%] mx-auto rounded-md text-white font-bold'>Cancelar</button>
        ): null}
        <div
            className="bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-[80%] md:max-w-md"
        >
            <div className="text-lg font-semibold">Quinta</div>
            {pratos.map((prato,index) => (
              <div key={index}>
                  <p><strong>Prato:</strong> {prato.prato}</p>
                  <p><strong>Prato:</strong> {prato.pratoType}</p>
                  <button onClick={() => handleAdd(prato)} className='bg-green-300 px-8 py-2 rounded-md text-white font-bold'>Adicionar</button>
              </div>
            ))}
           <div className='flex flex-col'>
            <button className='mt-2' onClick={() => setModal(true)}>Ver prato</button>
            <button onClick={() => enviarPrato('quinta')} className='w-full py-2 rounded-md mt-3 bg-blue-300 mx-auto'>Enviar prato</button>
           </div>
        </div>
        {pratoComum.length > 0 || pratoVegetariano.length > 0 || acompanhamento.length > 0  ? (
          <button onClick={() => cancelarPrato()} className='bg-red-300 px-8 py-2 w-[45%] mx-auto rounded-md text-white font-bold'>Cancelar</button>
        ): null}
        <div
            className="bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-[80%] md:max-w-md"
        >
            <div className="text-lg font-semibold">Sexta</div>
            {pratos.map((prato,index) => (
              <div key={index}>
                  <p><strong>Prato:</strong> {prato.prato}</p>
                  <p><strong>Prato:</strong> {prato.pratoType}</p>
                  <button onClick={() => handleAdd(prato)} className='bg-green-300 px-8 py-2 rounded-md text-white font-bold'>Adicionar</button>
              </div>
            ))}
           <div className='flex flex-col'>
            <button className='mt-2' onClick={() => setModal(true)}>Ver prato</button>
            <button onClick={() => enviarPrato('sexta')} className='w-full py-2 rounded-md mt-3 bg-blue-300 mx-auto'>Enviar prato</button>
           </div>
        </div>
        {pratoComum.length > 0 || pratoVegetariano.length > 0 || acompanhamento.length > 0  ? (
          <button onClick={() => cancelarPrato()} className='bg-red-300 px-8 py-2 w-[45%] mx-auto rounded-md text-white font-bold'>Cancelar</button>
        ): null}
        <div
            className="bg-gray-100 p-4 rounded-md text-center mx-auto w-full max-w-[80%] md:max-w-md"
        >
            <div className="text-lg font-semibold">Sabado</div>
            {pratos.map((prato,index) => (
              <div key={index}>
                  <p><strong>Prato:</strong> {prato.prato}</p>
                  <p><strong>Prato:</strong> {prato.pratoType}</p>
                  <button onClick={() => handleAdd(prato)} className='bg-green-300 px-8 py-2 rounded-md text-white font-bold'>Adicionar</button>
              </div>
            ))}
           <div className='flex flex-col'>
            <button className='mt-2' onClick={() => setModal(true)}>Ver prato</button>
            <button onClick={() => enviarPrato('sabado')} className='w-full py-2 rounded-md mt-3 bg-blue-300 mx-auto'>Enviar prato</button>
           </div>
        </div>
        {pratoComum.length > 0 || pratoVegetariano.length > 0 || acompanhamento.length > 0  ? (
          <button onClick={() => cancelarPrato()} className='bg-red-300 px-8 py-2 w-[45%] mx-auto rounded-md text-white font-bold'>Cancelar</button>
        ): null}
      </div>
      {testeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
              {pratoComum && (
              <div>
                <p><strong>Prato Comum:</strong> {pratoComum}</p>
              </div>
            )}
            {pratoVegetariano && (
              <div>
                <p><strong>Prato Vegetariano:</strong> {pratoVegetariano}</p>
              </div>
            )}
            {acompanhamento && acompanhamento.map((prato,index) => (
              <div key={index}>
                <p><strong>Acompanhamento</strong> {prato.prato}</p>
              </div>
            ))}
            {pratoComum.length === 0 && pratoVegetariano.length === 0 && acompanhamento.length === 0 && (
              <p>Não há Itens nesse pratos</p>
            )}
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-2"
              onClick={() => setModal(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPratos;
