import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const UserInfo = () => {
  const { logout, user } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [seed, setSeed] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (user && user.userName) {
      if (user.userName === 'Snuggles') {
        setSeed('Snuggles');
      } else if (user.userName === 'Ramon') {
        setSeed('Loki');
      } else if (user.userCargo === 'admin') {
        setSeed('Chloe');
      } else {
        setSeed(user.userName);
      }
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`);
        setAvatarUrl(response.config.url);
      } catch (error) {
        console.error('Erro ao obter avatar:', error);
      }
    };
  
    fetchData();
    console.log('User email:', user?.userEmail); 
  }, [seed, user]);

  const handleExpandToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 p-4 mb-8">
      <div className="w-32 h-32 rounded-full bg-white mb-2 overflow-hidden">
        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="w-full text-center">
        <p className="text-xl font-bold mb-2">{user?.userName || 'Nome Indisponível'}</p>
        {expanded && (
          <div className="flex flex-col items-center mb-2">
            <p>ID: {user?._id || 'ID Não Encontrado'}</p>
            <p>Subsídio: {user?.userSubsidio ? 'Sim' : 'Não'}</p>
            <p>Email: {user?.userEmail || 'Email Não Localizado'}</p>
          </div>
        )}
        <div className="flex flex-col items-center">
          <button
            onClick={handleExpandToggle}
            className="text-blue-500 focus:outline-none mt-2"
          >
            {expanded ? 'Recolher' : 'Expandir'}
          </button>
          <button
            onClick={() => logout()}
            className={`bg-green-700 hover:bg-green-500 text-white rounded-xl p-2 cursor-pointer mt-2`}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
