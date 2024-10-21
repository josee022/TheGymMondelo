import React from 'react';

export default function ContenedorPost({ blogs, currentIndex, formatFechaBlog, handlePrev, handleNext }) {
    return (
        <div className="contenedor-posts">
            <div className="contenedor-negro">
                {blogs.length > 0 ? (
                    <>
                        <div className="info-post">
                            <p className="autor-post">Autor del Post: Entrenador {blogs[currentIndex].autor?.name || 'Desconocido'}</p>
                            <p className="fecha-post">{formatFechaBlog(blogs[currentIndex].fecha_publicacion)}</p>
                        </div>
                        <div className="contenido-post">
                            <h3 className="titulo-post">{blogs[currentIndex].titulo}</h3>
                            <p className="texto-post">{blogs[currentIndex].contenido}</p>
                        </div>
                    </>
                ) : (
                    <p className="texto-post">No hay posts disponibles.</p>
                )}
            </div>
            <div className="contenedor-botones">
                <button className="boton-navegacion" onClick={handlePrev} disabled={currentIndex === 0}>{"<"}</button>
                <button className="boton-navegacion" onClick={handleNext} disabled={currentIndex === blogs.length - 1}>{">"}</button>
            </div>
        </div>
    );
}
