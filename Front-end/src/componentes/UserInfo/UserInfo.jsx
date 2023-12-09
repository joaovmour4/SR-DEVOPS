import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const UserInfo = ({ userName, userRole, userSubsidio}) => {
  const { logout } = useContext(AuthContext)
  
  console.log(userRole)
  return (
    <div className="h-80 flex flex-col items-center bg-gray-300 p-4 mb-8">
      <div className="w-48 h-48 rounded-full bg-white mb-2"></div>
      <div className="w-full text-center">
        <div className="w-full text-center">
          <p className="w-80 p-2 rounded mb-2 mx-auto">{`Nome do Usuário: ${userName || 'Nome Indisponível'}`}</p>
          <p>Cargo: {userRole}</p>
          <p>{`Subsidio: ${userSubsidio || 'Subsidio Não Encontrado'}`}</p>
          <p onClick={() => logout()}>Sair</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;