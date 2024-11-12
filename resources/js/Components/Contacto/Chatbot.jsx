import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (input.trim() === "") return;

        // Añadir el mensaje del usuario al estado de mensajes
        setMessages([...messages, { text: input, user: true }]);

        // Enviar la consulta al servidor usando axios
        axios
            .post("/chatbot", { question: input })
            .then((response) => {
                // Capturar la respuesta como texto plano y añadirla al estado de mensajes
                const responseText = response.data;
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: responseText, user: false },
                ]);
            })
            .catch((error) => {
                console.error(
                    "Error al obtener la respuesta del chatbot:",
                    error
                );
            });

        setInput(""); // Limpiar el campo de entrada
    };

    const clearChat = () => setMessages([]); // Función para limpiar el chat

    return (
        <div className="bg-gradient-to-br from-lime-500 to-green-700 p-6 rounded-xl shadow-2xl w-full max-w-lg mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-center text-white mb-4">
                Chatbot 🤖
            </h2>
            <div className="chat-box bg-white p-4 rounded-lg h-64 overflow-y-auto shadow-inner space-y-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg ${
                            msg.user
                                ? "bg-blue-500 text-white text-right ml-auto max-w-xs"
                                : "bg-gray-200 text-black text-left mr-auto max-w-xs"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Escribe tu pregunta..."
                    className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white focus:outline-none placeholder-gray-400"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 px-4 py-2 rounded-r-lg text-white font-semibold hover:bg-blue-500 transition"
                >
                    Enviar
                </button>
                <button
                    onClick={clearChat}
                    className="bg-red-600 px-4 py-2 rounded-lg text-white font-semibold hover:bg-red-500 transition ml-2"
                >
                    Limpiar
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
