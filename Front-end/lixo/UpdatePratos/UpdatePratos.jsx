import React from 'react';

const UpdatePratos = ({ handleSubmit }) => {
  return (
    <button
      className="p-2 bg-green-500 text-white rounded hover:bg-green-700 mt-4 w-35"
      onClick={handleSubmit}
    >
      Atualizar Pratos
    </button>
  );
};

export default UpdatePratos;
