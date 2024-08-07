import React from 'react';
import './Footer.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo y título */}
                <img src="/imagenes/logo/1-logoWeb.png" alt="Logo" className="footer-logo" />
                <h1 className="footer-title">TheGymMondelo</h1>
                {/* Línea horizontal */}
                <hr className="footer-line" />
            </div>

            {/* Columnas de información */}
            <div className="footer-columns">
                <div className="footer-column">
                    <h2 className="footer-column-title">AYUDA</h2>
                    <ul className="footer-column-list">
                        <li>Preguntas frecuentes</li>
                        <li>Políticas de privacidad</li>
                        <li>Políticas de cookies</li>
                        <li>Aviso legal</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h2 className="footer-column-title">CONTACTO</h2>
                    <ul className="footer-column-list">
                        <li>📞 622 33 18 27</li>
                        <li>✉️ thegymmondelo@gmail.com</li>
                        <li>🔈 Atención al cliente</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h2 className="footer-column-title">REDES SOCIALES</h2>
                    <ul className="footer-column-list">
                        <li>@TheGymMondelo</li>
                        <li>@Mondelo's Gym</li>
                        <li>@thegymmondeloOficcial</li>
                    </ul>
                </div>
            </div>

            {/* Imagen en la esquina inferior derecha */}
            <div className="footer-license">
                <img src="/imagenes/licencia/licencia.png" alt="Licencia" className="footer-license-image" />
            </div>
        </footer>
    );
};

export default Footer;
