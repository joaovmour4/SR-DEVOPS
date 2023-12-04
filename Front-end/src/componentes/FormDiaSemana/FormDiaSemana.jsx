// Em FormDiaSemana.jsx
import React, { useState } from 'react';

const FormDiaSemana = ({ dia, informCardapio }) => {
  const [dadosForm, setDadosForm] = useState({
    prato: '',
    vegetariano: '',
    acompanhamentos: [],
  });

  const handleInputChange = (campo, valor) => {
    setDadosForm((prevDados) => ({
      ...prevDados,
      [campo]: valor,
    }));
  };

  const handleSubmit = () => {
    informCardapio({
      dia: dia,
      prato: dadosForm.prato,
      vegetariano: dadosForm.vegetariano,
      acompanhamentos: dadosForm.acompanhamentos.join(','),
    });

    setDadosForm({
      prato: '',
      vegetariano: '',
      acompanhamentos: [],
    });
  };

  return (
    <div>
      <h2>{dia}</h2>
      <label>
        Prato:
        <input
          type="text"
          value={dadosForm.prato}
          onChange={(e) => handleInputChange('prato', e.target.value)}
        />
      </label>
      <label>
        Vegetariano:
        <input
          type="text"
          value={dadosForm.vegetariano}
          onChange={(e) => handleInputChange('vegetariano', e.target.value)}
        />
      </label>
      <label>
        Acompanhamentos:
        <input
          type="text"
          value={dadosForm.acompanhamentos.join(', ')}
          onChange={(e) => handleInputChange('acompanhamentos', e.target.value.split(', '))}
        />
      </label>
      <button onClick={handleSubmit}>Enviar Dados</button>
    </div>
  );
};

export default FormDiaSemana;
