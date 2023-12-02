import React from "react";
import { Link } from "react-router-dom";

const UserButtons = ({ openModal }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="mb-4">
        <button
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          onClick={openModal}
        >
          HISTÓRICO
        </button>
      </div>
      <div>
        <Link to="/pagamento">
          <button className="p-2 bg-green-500 text-white rounded hover:bg-green-700">
            PAGAMENTO
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserButtons;
