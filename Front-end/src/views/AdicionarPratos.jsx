import React, { useContext } from 'react';
import AtualizarPratos from '../componentes/AtualizarPratos/AtualizarPratos';
import { AuthContext } from '../Context/AuthContext';

const AdicionarPratos = () => {
  const { user } = useContext(AuthContext);

  // Verifica se o usuário é um administrador
  const isAdmin = user && user.userCargo === 'admin';

  return (
    <div>
      {isAdmin ? <AtualizarPratos /> : null}
      {/* Adicione aqui qualquer outra lógica que você queira renderizar para usuários não administradores */}
    </div>
  );
};

export default AdicionarPratos;
