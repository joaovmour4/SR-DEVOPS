import React from 'react';

const SearchUSer = ({ handleClick }) => {
  return (
    <button
      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
      onClick={handleClick}
    >
      Buscar Usuário
    </button>
  );
};

export default SearchUSer;
