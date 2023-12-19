import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { BigHead } from "extended-bigheads";


const UserInfo = () => {
  const { logout, user } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [seed, setSeed] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/self');
        const userData = response.data.message;
        setUserData(userData);
      } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const generateRandomSeed = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 10;
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  };

  let bigHeadComponent;

  if (user?.userName === 'Ramon') {
    // Se o usuário for "Ramon", usar propriedades específicas
    bigHeadComponent = (
      <BigHead
        showBackground={true}
        backgroundColor="green"
        backgroundShape="circle"
        accessory="roundGlasses"
        body="chest"
        circleColor="blue"
        clothing="vneck"
        clothingColor="black"
        eyebrows="serious"
        eyes="happy"
        faceMask={false}
        faceMaskColor="white"
        facialHair="mediumBeard"
        facialHairColor="black"
        graphic="none"
        hair="afro"
        hairColor="black"
        hat="none2"
        hatColor="white"
        lashes={false}
        lipColor="pink"
        mask
        mouth="tongue"
        skinTone="dark"
        className="w-32 h-32 rounded-full mb-2 overflow-hidden"
      />
    );
  } else if (user?.userCargo === 'admin') {
    // Se o usuário for "Admin", usar propriedades específicas
    bigHeadComponent = (
      <BigHead
        showBackground={true}
        backgroundColor="green"
        backgroundShape="circle"
        accessory="hoopEarrings"
        body="breasts"
        circleColor="blue"
        clothing="shirt"
        clothingColor="black"
        eyebrows="raised"
        eyes="normal"
        faceMask={false}
        faceMaskColor="white"
        facialHair="none"
        graphic="none"
        hair="long"
        hairColor="black"
        hat="none2"
        hatColor="white"
        lashes
        lipColor="red"
        mask={false}
        mouth="openSmile"
        skinTone="brown"
        className="w-32 h-32 rounded-full mb-2 overflow-hidden"
      />
    );
  } else if (user?.userCargo === 'tec') {
    // Se o usuário for "Tec", usar propriedades específicas
    bigHeadComponent = (
      <BigHead
        showBackground={true}
        backgroundColor="green"
        backgroundShape="circle"
        accessory="none"
        body="chest"
        circleColor="blue"
        clothing="shirt"
        clothingColor="white"
        eyebrows="raised"
        eyes="normal"
        faceMask={false}
        faceMaskColor="white"
        facialHair="stubble"
        graphic="none"
        hair="buzz"
        hairColor="black"
        hat="none2"
        hatColor="white"
        lashes={false}
        lipColor="red"
        mask={false}
        mouth="openSmile"
        skinTone="brown"
        className="w-32 h-32 rounded-full mb-2 overflow-hidden"
      />
    );
  } else {
    // Caso contrário, gerar um BigHead aleatório para qualquer outro usuário
    bigHeadComponent = (
      <BigHead
        showBackground={true}
        backgroundColor="green"
        backgroundShape="circle"
        accessory="none"
        body="chest"
        clothing="naked"
        clothingColor="black"
        eyebrows="raised"
        eyes="leftTwitch"
        facialHair="mediumBeard"
        facialHairColor="black"
        graphic="none"
        hair="long"
        hairColor="black"
        hat="none"
        hatColor="black"
        lashes={false}
        lipColor="black"
        mouth="openSmile"
        skinTone="dark"
        faceMask={false}
        faceMaskColor="black"
        seed={generateRandomSeed()}
        className="w-32 h-32 rounded-full mb-2 overflow-hidden"
      />
    );
  }

  const handleExpandToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 p-4 mb-8">
      {bigHeadComponent}
      <div className="w-full text-center">
        <p className="text-xl font-bold mb-2">{user?.userName || 'Nome Indisponível'}</p>
        {expanded && (
          <div className="flex flex-col items-center mb-2">
          <p>ID: {userData?._id || 'ID Não Encontrado'}</p>
          <p>Subsídio: {userData?.userSubsidio ? 'Sim' : 'Não'}</p>
          <p>Email: {userData?.userEmail || 'Email Não Localizado'}</p>
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
