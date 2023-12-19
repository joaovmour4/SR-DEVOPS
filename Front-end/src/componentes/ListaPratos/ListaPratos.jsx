import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { AuthContext } from '../../Context/AuthContext';

const ListaPratos = () => {
  const authContext = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [pratosComum, setPratosComum] = useState([]);
  const [pratosVegetariano, setPratosVegetariano] = useState([]);
  const [pratosAcompanhamento, setPratosAcompanhamento] = useState([]);
  const [selectedAcompanhamentoOptions, setSelectedAcompanhamentoOptions] = useState([]);
  const [menuData, setMenuData] = useState([]);

  // campo de chckboc de acompanhamento
  const CustomOption = ({ innerProps, label, data }) => (
    <div className="relative cursor-pointer flex items-center my-2 pl-2">
      <input
        type="checkbox"
        onChange={() => handleCheckboxChangeAcompanhamento(data.value)}
        checked={selectedAcompanhamentoOptions.includes(data.value)}
        className="absolute opacity-0 cursor-pointer h-6 w-6"
      />
      <div className="checkmark h-8 w-8 border border-gray-400 rounded flex items-center justify-center mr-2">
        <svg
          className="h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span>{label}</span>
    </div>
  );

  const fetchMenu = async (day) => {
    try {
      const response = await axios.get(`http://localhost:3000/menu?diaSemana=${day}`, {
        headers: {
          Authorization: `Bearer ${authContext.user.jwtToken.token}`,
        },
      });
      setMenuData(response.data.message);
    } catch (error) {
      console.error('Erro ao obter menu:', error);
    }
  };

  useEffect(() => {
    const fetchPratos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/prato', {
          headers: {
            Authorization: `Bearer ${authContext.user.jwtToken.token}`,
          },
        });
        const pratos = response.data.message;

        const comum = pratos.filter((prato) => prato.pratoType === 'comum');
        const vegetariano = pratos.filter((prato) => prato.pratoType === 'vegetariano');
        const acompanhamento = pratos.filter((prato) => prato.pratoType === 'acompanhamento');

        setPratosComum(comum);
        setPratosVegetariano(vegetariano);
        setPratosAcompanhamento(acompanhamento);
      } catch (error) {
        console.error('Erro ao obter pratos:', error);
      }
    };

    fetchPratos();
  }, [authContext.user.jwtToken.token]);

  const enviar = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/menu/${selectedDay}`,
        {
          diaSemana: selectedDay,
          pratoComum: selectedOptions[0] || 'any',
          pratoVegetariano: selectedOptions[1] || 'any',
          acompanhamentos: JSON.stringify(
            selectedAcompanhamentoOptions.map((value) =>
              pratosAcompanhamento.find((prato) => prato._id === value)?.prato || 'any'
            )
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${authContext.user.jwtToken.token}`,
          },
        }
      );

      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    } finally {
      closeModal();
    }
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/user', {
  //         headers: {
  //           Authorization: `Bearer ${authContext.user.jwtToken.token}`,
  //         },
  //       });
  //     } catch (error) {
  //       console.error('Erro ao obter usuários:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, [authContext.user.jwtToken.token]);

  // Função de manipulação de checkbox para os pratos do tipo acompanhamento
  const handleCheckboxChangeAcompanhamento = (value) => {
    const isSelected = selectedAcompanhamentoOptions.includes(value);
    if (isSelected) {
      setSelectedAcompanhamentoOptions(selectedAcompanhamentoOptions.filter((option) => option !== value));
    } else {
      setSelectedAcompanhamentoOptions([...selectedAcompanhamentoOptions, value]);
    }
  };

  const handleOptionChange = (value, isCheckbox) => {
    if (isCheckbox) {
      const isSelected = selectedOptions.includes(value);
      setSelectedOptions(
        isSelected
          ? selectedOptions.filter((option) => option !== value)
          : [...selectedOptions, value]
      );
    } else {
      const updatedSelection = selectedAcompanhamentoOptions.includes(value)
        ? selectedAcompanhamentoOptions.filter((id) => id !== value)
        : [...selectedAcompanhamentoOptions, value];
      setSelectedAcompanhamentoOptions(updatedSelection);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedAcompanhamentoOptions(selectedOptions.map((option) => option.value));
  };

  const openModal = async (day) => {
    await fetchMenu(day); 
    setShowModal(true);
    setSelectedDay(day);
  };

  const closeModal = (forceClose = false) => {
    if (forceClose) {
      setShowModal(false);
      setSelectedDay(null);
    } else if (!forceClose && selectedDay) {
      return;
    } else {
      setShowModal(false);
      setSelectedDay(null);
    }
  };

  return (
    <div>
      {selectedDay && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 cursor-pointer" onClick={closeModal}>
          {/* Conteúdo da div clicável */}
          <div className="text-white p-4 bg-gray-800 rounded-lg">
            {/* Clique para selecionar opções para {selectedDay} */}
          </div>
        </div>
      )}

      {/* Renderização das divs clicáveis */}
      <div className="flex justify-center mt-8">
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day) => (
          <div key={day} onClick={() => openModal(day)} className="cursor-pointer p-4 border m-2 rounded-lg bg-blue-500 text-white">
            {day}
          </div>
        ))}
      </div>

      {showModal && (
        <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          width: '350px',
          maxHeight: '80vh',
          overflowY: 'auto', 
        }}
        >
          <h1 className='text-center font-bold uppercase mb-8'>{selectedDay}</h1>

          {/* 1ª ComboBox - Pratos do Tipo Comum */}
          <div className="select-container">
            <label htmlFor="comumSelect" className="text-sm font-bold uppercase mb-1">Pratos do Tipo Comum:</label>
            <select id="comumSelect" className="p-1 border rounded">
              {pratosComum.map((prato) => (
                <option key={prato._id} value={prato._id}>
                  {prato.prato}
                </option>
              ))}
            </select>
          </div>

          {/* 2ª ComboBox - Pratos do Tipo Vegetariano */}
          <div className="select-container">
            <label htmlFor="vegetarianoSelect" className="text-sm font-bold uppercase mb-1">Pratos do Tipo Vegetariano:</label>
            <select id="vegetarianoSelect" className="p-1 border rounded">
              {pratosVegetariano.map((prato) => (
                <option key={prato._id} value={prato._id}>
                  {prato.prato}
                </option>
              ))}
            </select>
          </div>

          {/* 3ª Lista de Checkbox - Pratos do Tipo Acompanhamento */}
          <div className="select-container">
            <label className="text-sm font-bold uppercase mb-1">Pratos do Tipo Acompanhamento:</label>
            <div className="styled-select">
              <Select
                isMulti
                options={pratosAcompanhamento.map((prato) => ({ value: prato._id, label: prato.prato }))}
                components={{ Option: CustomOption }}
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? 'bg-blue-500' : 'bg-white',
                    color: state.isSelected ? 'text-white' : 'text-gray-700',
                    padding: '8px',
                  }),
                }}
                value={selectedAcompanhamentoOptions.map((value) => ({
                  value,
                  label: pratosAcompanhamento.find((prato) => prato._id === value)?.prato || '',
                }))}
                onChange={handleSelectChange}
              />
            </div>
            <p className="mt-2 text-sm text-gray-700">
              {selectedAcompanhamentoOptions.length > 0 ? (
                <>
                  <span className="font-bold">
                    {selectedAcompanhamentoOptions.length}{' '}
                    {selectedAcompanhamentoOptions.length === 1 ? 'prato' : 'Acompanhamentos'} selecionado
                    {selectedAcompanhamentoOptions.length !== 1 && 's'}:
                  </span>{' '}
                  {selectedAcompanhamentoOptions.map((value, index) => (
                    <span key={value}>
                      {pratosAcompanhamento.find((prato) => prato._id === value)?.prato || ''}
                      {index !== selectedAcompanhamentoOptions.length - 1 && ', '}
                    </span>
                  ))}
                </>
              ) : (
                'Nenhum Acompanhamento Selecionado.'
              )}
            </p>

          </div>
          {/* Botões abaixo das seleções */}
          <div className="flex justify-between mt-4">
            <button onClick={enviar} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{ width: '40%' }}>
              Enviar
            </button>
            <button onClick={closeModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" style={{ width: '40%' }}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPratos;
