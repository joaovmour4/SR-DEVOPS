import React from "react";

export default function Compra() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="w-4/5 max-w-md p-4 md:p-20 bg-white rounded shadow-md mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">Finalizar Compra</h1>
        <div className="mx-8">
          <div className="mb-4">
            <p className="font-semibold mb-2">
              Subsídio:{" "}
              <span className="text-green-500 font-bold">Não</span>
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="userQuantity" className="font-semibold mb-2 block">
              Quantidade*:
            </label>
            <input
              type="number"
              name="quantidade"
              id="userQuantity"
              min="1"
              defaultValue="1"
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <p className="font-semibold mb-2">
              Valor: <span className="text-blue-500 font-bold">R$ 13,00</span>
            </p>
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="pagamento"
                id="pix"
                defaultChecked
                required
                className="mr-2"
              />
              <label htmlFor="pix" className="text-blue-500 font-bold">
                Pix
              </label>
            </div>
          </div>
          <button className="btn w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white">
            Comprar
          </button>
          <div className="mt-4 text-gray-600 text-center">
            <p>*Preço subsidiado permite apenas uma refeição.</p>
            <p>
              *Consulte as opções de pratos no{" "}
              <a href="cardapio.html" className="text-blue-500 font-bold">
                Cardápio
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
