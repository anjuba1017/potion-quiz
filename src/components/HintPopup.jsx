import React from 'react';
import './HintPopup.css';

const HintPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay" onClick={onCancel}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <span className="popup-icon">🔮</span>
          <h2 className="popup-title">Hechizo de Claridad</h2>
        </div>
        
        <div className="popup-content">
          <p className="popup-text">
            "Hummm... yo sé que recuerdo esto,
          </p>
          <p className="popup-text">
            lo tengo en la punta de la lengua..."
          </p>
          <p className="popup-hint">
            Este hechizo eliminará dos respuestas incorrectas
          </p>
        </div>

        <div className="popup-actions">
          <button className="popup-button cancel" onClick={onCancel}>
            <span>Cancelar</span>
          </button>
          <button className="popup-button confirm" onClick={onConfirm}>
            <span>✨ Usar Hechizo</span>
          </button>
        </div>

        <div className="popup-ornament">~✦~</div>
      </div>
    </div>
  );
};

export default HintPopup;

