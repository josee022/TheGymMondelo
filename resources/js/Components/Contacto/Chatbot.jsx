import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    // Estado para almacenar los mensajes en el chat
    const [messages, setMessages] = useState([]); // Lista de mensajes
    const [input, setInput] = useState(""); // Entrada del usuario

    // Función para enviar un mensaje
    const sendMessage = () => {
        if (input.trim() === "") return; // Si la entrada está vacía, no hace nada

        // Añade el mensaje del usuario al estado de mensajes
        setMessages([...messages, { text: input, user: true }]);

        // Enviar el mensaje al backend utilizando axios
        axios
            .post("/chatbot", { question: input }) // Envia el texto del usuario como `question`
            .then((response) => {
                // Captura la respuesta del servidor
                const responseText = response.data; // Respuesta del chatbot

                // Añade la respuesta al estado de mensajes
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: responseText, user: false }, // Mensaje del chatbot
                ]);
            })
            .catch((error) => {
                console.error(
                    "Error al obtener la respuesta del chatbot:",
                    error
                ); // Muestra el error en la consola
            });

        setInput(""); // Limpia el campo de entrada después de enviar
    };

    // Función para limpiar el chat
    const clearChat = () => setMessages([]); // Reinicia el estado de mensajes

    return (
        <div className="bg-gradient-to-br from-lime-500 to-green-700 p-6 rounded-xl shadow-2xl w-full mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-center text-white mb-4">
                Chatbot 🤖 ( Tu asistente personal 24/h)
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
