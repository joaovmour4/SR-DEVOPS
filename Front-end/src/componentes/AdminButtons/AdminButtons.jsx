import React from "react";
import { Link } from "react-router-dom";

const BotoesAdmin = ({ abrirModal }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="mb-4">
        <button
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          onClick={abrirModal}
        >
          GERENCIAR USUÁRIOS
        </button>
      </div>
      <div>
        <Link to="/configuracoes">
          <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            CONFIGURAÇÕES
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BotoesAdmin;
