import React, { useContext } from 'react';
import AtualizarPratos from '../componentes/AtualizarPratos/AtualizarPratos';
import { AuthContext } from '../Context/AuthContext';

const AdicionarPratos = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.userCargo === 'admin';

  return (
    <div>
      {isAdmin ? <AtualizarPratos /> : null}
    </div>
  );
};

export default AdicionarPratos;
