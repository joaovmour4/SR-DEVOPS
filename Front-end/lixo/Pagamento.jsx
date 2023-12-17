import React, { useState } from "react";
import qrcode from "../img/qrcode.jpeg";

export default function Pagamento() {
  const [copiado, setCopiado] = useState(false);
  const [codigoVisivel, setCodigoVisivel] = useState(false);

  const copiarParaAreaDeTransferencia = () => {
    const codigoPix = "sdinfsd93w8hwpgsd9fe809uw90erbraan-y";
    navigator.clipboard.writeText(codigoPix);
    setCopiado(true);
    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  };

  return (
    <>
      <main className="container mx-auto mt-8 max-w-screen-md mb-8">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
            Pagamento em Pix
          </h2>

          <div className="flex flex-col items-center gap-4">
            <img
              className="w-48 h-48 object-cover rounded-lg"
              src={qrcode}
              alt="qrcode de pagamento"
            />

            {codigoVisivel && (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={copiarParaAreaDeTransferencia}
                  className={`${
                    copiado ? "bg-green-400" : "bg-blue-500"
                  } text-white px-4 py-2 rounded-md transition-colors duration-300 focus:outline-none`}
                >
                  {copiado ? "Copiado!" : "Copiar código Pix"}
                </button>
                <p className="text-gray-800 text-center">
                  Código Pix: "sdinfsd93w8hwpgsd9fe809uw90erbraan-y"
                </p>
              </div>
            )}

            <button
              onClick={() => setCodigoVisivel(!codigoVisivel)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300 focus:outline-none"
            >
              {codigoVisivel ? "Ocultar Código" : "Ver Código"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
