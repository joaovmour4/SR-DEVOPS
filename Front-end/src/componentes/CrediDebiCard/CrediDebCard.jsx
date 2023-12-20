import React, { useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import CreditCard from 'card-react';
import axios from 'axios';
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import { faMoneyCheckAlt, faArrowLeft, faArrowRight, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CrediDebCard = ({ quantidadeSelecionada }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardHolderName: '',
        cardExpiry: '',
        cardCVC: '',
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const purchaseData = {
            quantity: quantidadeSelecionada,
        };

        try {
            const response = await axios.post('http://localhost:3000/purchase', purchaseData);
            console.log(response.data);
            setCardData(response.data.purchase);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Erro na requisição de compra:', error);
        }
    };

    const generatePDF = () => {
        const pdf = new jsPDF();
        pdf.setFillColor(255, 255, 204); // Amarelo claro
        pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');

        const content = `
          USUÁRIO: ${cardData.userId}
          QUANTIDADE: ${cardData.quantity}
          VALOR R$: ${cardData.value}
          DATA DA COMPRA: ${cardData.purchaseDate}
        `;

        pdf.text(content, 10, 20);
        pdf.save('compra_realizada.pdf');
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Flipper flipKey={isFlipped}>
            <form
                className={`w-96 mx-auto p-8 rounded-md shadow-md transform ${isFlipped ? 'rotateY180' : ''
                    }`}
                onSubmit={onSubmit}
            >
                <Flipped flipId="card">
                    <div className={`relative ${isFlipped ? 'hidden' : 'block'}`}>
                        <label className="font-bold mb-2 block">NÚMERO DO CARTÃO</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardData.cardNumber}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 w-full rounded-md mb-2"
                        />

                        <label className="font-bold mb-2 block">NOME NO CARTÃO</label>
                        <input
                            type="text"
                            name="cardHolderName"
                            value={cardData.cardHolderName}
                            onChange={handleInputChange}
                            className="p-2 border border-gray-300 w-full rounded-md mb-2"
                        />

                        <div className="flex justify-between">
                            <div className="w-1/2 pr-2">
                                <label className="font-bold mb-2 block">EXPIRAÇÃO</label>
                                <input
                                    type="text"
                                    name="cardExpiry"
                                    value={cardData.cardExpiry}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-300 w-full rounded-md mb-2"
                                />
                            </div>
                        </div>
                    </div>
                </Flipped>

                <Flipped flipId="cardBack">
                    <div className={`relative ${isFlipped ? 'block' : 'hidden'}`}>
                        <div className="bg-gray-100 p-6 rounded-md">
                            <label className="font-bold mb-2 block">Código CVV</label>
                            <input
                                type="text"
                                name="cardCVC"
                                value={cardData.cardCVC}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-300 w-full rounded-md"
                            />
                        </div>
                    </div>
                </Flipped>

                <div className="flex justify-between items-center mt-5">
                    {isFlipped ? (
                        <button
                            type="button"
                            className="text-green-500 cursor-pointer flex items-center"
                            onClick={flipCard}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                            VOLTAR
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="text-green-500 cursor-pointer flex items-center"
                            onClick={flipCard}
                        >
                            CVV
                            <FontAwesomeIcon icon={faArrowRight} className="mx-2" />
                        </button>
                    )}

                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faMoneyCheckAlt} className="mr-2" />
                        PAGAR
                    </button>
                    {/* Modal */}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Compra Realizada com Sucesso"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                                border: 'none',
                                background: 'white',
                                padding: '20px',
                                maxWidth: '400px',
                                maxHeight: '100vh',
                                height: '350px',
                                margin: 'auto',
                                borderRadius: '8px',
                            },
                        }}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold uppercase">Compra Realizada com Sucesso!</h2>
                        </div>

                        <div className="flex flex-col mb-4">
                            <div className="mb-2">
                                <strong>USUÁRIO:</strong> {cardData.userId}
                            </div>
                            <div className="mb-2">
                                <strong>QUANTIDADE:</strong> {cardData.quantity}
                            </div>
                            <div className="mb-2">
                                <strong>VALOR R$:</strong> {cardData.value}
                            </div>
                            <div className="mb-2">
                                <strong>DATA DA COMPRA:</strong> {cardData.purchaseDate}
                            </div>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 cursor-pointer mr-2 flex-1"
                                onClick={generatePDF}
                            >
                                <FontAwesomeIcon icon={faFilePdf} className="mr-2" />
                                GERAR PDF
                            </button>

                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 cursor-pointer flex-1"
                                onClick={closeModal}
                            >
                                FECHAR
                            </button>
                        </div>
                    </Modal>

                </div>
            </form>
        </Flipper>
    );
};

export default CrediDebCard;
