import React from "react";

const UserInfo = ({ userName, userRole }) => {
  return (
    <div className="h-80 flex flex-col items-center bg-gray-300 p-4 mb-8">
      <div className="w-48 h-48 rounded-full bg-white mb-2"></div>
      <div className="w-full text-center">
        <div className="w-full text-center">
          <p className="w-80 p-2 rounded mb-2 mx-auto">{`NOME DO USUÁRIO: ${userName || 'Nome Indisponível'}`}</p>
          <p>{userRole === 'admin' ? 'Cargo: Admin' : 'Cargo: User'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
