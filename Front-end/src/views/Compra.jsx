import React from "react";

export default function Compra(){
    return(
        <>
            <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-200 p-8">
                <h1 className="text-3xl font-bold mb-6">Compra</h1>
                <div className="grid grid-cols-2 gap-4">
                <label htmlFor="" className="mb-2">Subsídio:</label>
                <label htmlFor="" id="userSubsidio" className="mb-2"><b>Não</b></label>
                <label htmlFor="quantidade" className="mb-2">Quantidade*: </label>
                <input type="number" name="quantidade" id="userQuantity" min="1" value="1" className="w-full p-2" />
                <label htmlFor="" className="mb-2">Valor:</label>
                <label htmlFor="" id="userPrice" className="mb-2"><b>R$ 13,00</b></label>
                <label htmlFor="pagamento" className="mb-2">Método de pagamento:</label>
                <div className="flex items-center">
                    <input type="checkbox" name="pagamento" id="pix" checked required className="mr-2" />
                    <label htmlFor="pagamento">Pix</label>
                </div>
                </div>
                <button className="btn mt-4" id="comprarButton">Comprar</button>
                <div className="mt-4">
                <p>*Se o preço for subsidiado, só é possível realizar a compra de uma refeição.</p>
                <p>*Consulte as opções de pratos no <a href="cardapio.html" className="link_cardapio">Cardápio</a>.</p>
                </div>
            </main>
            </div>
        </>
    );
}