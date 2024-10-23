import React from "react";
import { motion } from "framer-motion";

export default function Mapa() {
    return (
        <motion.div
            className="w-full bg-gray-800 rounded-lg shadow-xl mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <iframe
                title="Mapa de TheGymMondelo"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24143.617167017943!2d-3.7035827!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287a542fa2c7%3A0x371de53695c6a1e0!2sCalle%20Fitness%20123%2C%20Madrid!5e0!3m2!1ses!2ses!4v1633528857386!5m2!1ses!2ses"
                width="100%"
                height="400"
                className="rounded-lg shadow-lg"
                allowFullScreen=""
                loading="lazy"
            ></iframe>
        </motion.div>
    );
}
