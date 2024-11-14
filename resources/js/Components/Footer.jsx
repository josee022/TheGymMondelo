import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo y título */}
                <img
                    src="/imagenes/logo/1-logoWeb.png"
                    alt="Logo"
                    className="footer-logo"
                />
                <h1 className="footer-title">TheGymMondelo</h1>
                {/* Línea horizontal */}
                <hr className="footer-line" />
            </div>

            {/* Columnas de información */}
            <div className="footer-columns">
                <div className="footer-column">
                    <h2 className="footer-column-title">AYUDA</h2>
                    <ul className="footer-column-list">
                        <li>
                            <a
                                href="/ayuda"
                                target="_blank"
                                className="footer-link"
                            >
                                Preguntas frecuentes
                            </a>
                        </li>
                        <li>
                            <a
                                href="/ayuda#privacidad"
                                target="_blank"
                                className="footer-link"
                            >
                                Políticas de privacidad
                            </a>
                        </li>
                        <li>
                            <a
                                href="/ayuda#cookies"
                                target="_blank"
                                className="footer-link"
                            >
                                Políticas de cookies
                            </a>
                        </li>
                        <li>
                            <a
                                href="/ayuda#aviso-legal"
                                target="_blank"
                                className="footer-link"
                            >
                                Aviso legal
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h2 className="footer-column-title">CONTACTO</h2>
                    <ul className="footer-column-list">
                        <li>
                            <a href="/contacto" className="footer-link">
                                📞 622 33 18 27
                            </a>
                        </li>
                        <li>
                            <a href="/contacto" className="footer-link">
                                ✉️ thegymmondelo@gmail.com
                            </a>
                        </li>
                        <li>
                            <a href="/contacto" className="footer-link">
                                🔈 Atención al cliente
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h2 className="footer-column-title">REDES SOCIALES</h2>
                    <ul className="footer-column-list">
                        <li>
                            <a
                                href="https://www.instagram.com/TheGymMondelo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                            >
                                <FaInstagram className="social-icon" />{" "}
                                TheGymMondelo
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.facebook.com/MondeloGym"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                            >
                                <FaFacebook className="social-icon" /> Mondelo's
                                Gym
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.twitter.com/thegymmondeloOficcial"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                            >
                                <FaTwitter className="social-icon" />{" "}
                                thegymmondeloOficcial
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Imagen en la esquina inferior derecha */}
            <div className="footer-license">
                <img
                    src="/imagenes/licencia/licencia.png"
                    alt="Licencia"
                    className="footer-license-image"
                />
            </div>
        </footer>
    );
};

export default Footer;
