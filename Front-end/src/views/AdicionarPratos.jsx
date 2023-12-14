import React, { useContext } from 'react';
import CRUDPratos from '../componentes/CRUDPratos/CRUDPratos';
import { AuthContext } from '../Context/AuthContext';

const AdicionarPratos = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.userCargo === 'admin';

  return (
    <div className='h-full'>
      {isAdmin ? <CRUDPratos /> : null}
    </div>
  );
};

export default AdicionarPratos;
