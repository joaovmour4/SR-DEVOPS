import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import CRUDUsers from '../componentes/CRUDUsers/CRUDUsers';

export default function ListUser() {
  const { signed, user } = useContext(AuthContext);

  return (
    <main className="min-h-screen">
      {signed && user && <CRUDUsers token={user.token} />}
    </main>
  );
}