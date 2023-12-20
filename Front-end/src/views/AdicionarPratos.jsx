import React, { useContext } from 'react';
import CRUDPratos from '../componentes/CRUDPratos/CRUDPratos';
import { AuthContext } from '../Context/AuthContext';

const AdicionarPratos = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.userCargo === 'admin';
  const isTec = user && user.userCargo === 'tec';

  return (
    <div className='h-full mb-8'>
      {isAdmin || isTec ? <CRUDPratos /> : null}
    </div>
  );
};

export default AdicionarPratos;
