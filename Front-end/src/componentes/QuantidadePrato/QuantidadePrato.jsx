import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const QuantidadePrato = ({ onPurchase, onIrParaCrediDebCard }) => {
  const [quantity, setQuantity] = useState(1);
  const { user } = useContext(AuthContext);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    
    // Limitar a quantidade a 1 se o usuário tiver subsídio
    if (user && user.userSubsidio) {
      setQuantity(1);
    } else {
      setQuantity(isNaN(newQuantity) ? '' : newQuantity);
    }
  };

  const handlePurchase = () => {
    onPurchase(quantity);

    onIrParaCrediDebCard();
  };

  return (
    <div className="purchase-screen max-w-md mx-auto p-8 bg-white rounded-md shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comprar de Checkin</h2>
      <label className="block mb-2 text-sm">Quantidade desejada:</label>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        className="p-2 border border-gray-300 w-full rounded-md mb-4"
      />
      <p className="text-sm mb-4">
        Valor por check-in:{' '}
        {user && user.userSubsidio ? 'R$ 2,00' : 'R$ 13,00 (sem subsídio)'}
      </p>
      <button
        type="button"
        onClick={handlePurchase}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 cursor-pointer"
      >
        Comprar
      </button>
    </div>
  );
};

export default QuantidadePrato;
