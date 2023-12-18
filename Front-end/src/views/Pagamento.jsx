import React, { useState } from 'react';
import QuantidadePrato from "../componentes/QuantidadePrato/QuantidadePrato";
import CrediDebCard from "../componentes/CrediDebiCard/CrediDebCard";

export default function Pagamento() {
  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(null);

  const handlePurchase = (quantidade) => {
    setQuantidadeSelecionada(quantidade);
  };

  const handleIrParaCrediDebCard = () => {
    // Lógica para ir para o componente CrediDebCard
    console.log('Indo para CrediDebCard');
  };

  return (
    <div className="h-screen w-full mt-16">
      {quantidadeSelecionada === null ? (
        <QuantidadePrato
          onPurchase={handlePurchase}
          onIrParaCrediDebCard={handleIrParaCrediDebCard}
        />
      ) : (
        <CrediDebCard quantidadeSelecionada={quantidadeSelecionada} />
      )}
    </div>
  );
}