import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

api.interceptors.request.use(async config => {
    const token = process.env.REACT_APP_TOKEN_MERCADO_PAGO_PUBLIC;
    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    };
};

export default function APIMercadoPago() {
    const [formData, setFormdata] = useReducer(formReducer, {});
    const [responsePayment, setResponsePayment] = useState(false);
    const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(false);
    const [statusPayment, setStatusPayment] = useState(false);
    const { user } = useContext(AuthContext);

    const handleChange = (event) => {
        setFormdata({
            name: event.target.name,
            value: event.target.value,
        });
    };

    const getStatusPayment = () => {
        api.get(`v1/payments/${responsePayment.data.id}`).then((response) => {
            if (response.data.status === 'approved') {
                // Faça algo com o status aprovado, se necessário
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const body = {
            "transaction_amount": 10,
            "description": "Produto teste de desenvolvimento",
            "payment_method_id": "pix",
            "payer": {
                "email": user.userEmail,
                "first_name": user.userName,
                "last_name": "JS python html",
                "identification": {
                    "type": "CPF",
                    "number": "01234567890",
                },
            },
            "notification_url": "https://eorpjcvcjvhqnq6.m.pipedream.net",
        };

        api.post("v1/payments", body)
            .then((response) => {
                setResponsePayment(response);
                setLinkBuyMercadoPago(response.data.point_of_interaction.transaction_data.ticket_url);
                getStatusPayment();
            })
            .catch((err) => {
                console.error('Erro ao enviar o pagamento:', err);
            });
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <p className="text-4xl font-bold mb-6">PIX</p>

                <form onSubmit={handleSubmit}>
                    <div className="bg-gray-100 p-6 rounded-md shadow-md">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Nome do Usuário</label>
                            <span>{user.userName}</span>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">ID do Usuário</label>
                            <span>{user._id}</span>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Subsídio</label>
                            <span>{user.userSubsidio ? 'Sim' : 'Não'}</span>
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                PAGAR
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
