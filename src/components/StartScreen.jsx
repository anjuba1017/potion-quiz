import React from 'react';
import './StartScreen.css';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <div className="book-page">
        <div className="ink-border"></div>
        
        <h1 className="title">
          <span className="title-line">El Libro de</span>
          <span className="title-line">Recetas Mágicas</span>
        </h1>
        
        <div className="subtitle-ornament">✦ ✦ ✦</div>
        
        <div className="instructions">
          <p className="instruction-text">
            Bienvenida, aprendiz de bruja...
          </p>
          <p className="instruction-text">
            Responde 10 preguntas del grimorio
          </p>
          <p className="instruction-text">
            para preparar tu receta especial
          </p>
        </div>

        <div className="hint-info">
          <p>✨ Tienes un hechizo de ayuda disponible</p>
        </div>

        <button className="start-button" onClick={onStart}>
          <span className="button-ornament-left">❧</span>
          Abrir el Grimorio
          <span className="button-ornament-right">❧</span>
        </button>

        <div className="footer-ornament">
          <div className="flourish">~✦~</div>
        </div>

        <div className="credits">
          <p className="credits-text">
            Creado por Paula Andrea Villadiego Perez, Andres Julian Barrios Arrieta y Maria Antonia Zapata Hernandez
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

