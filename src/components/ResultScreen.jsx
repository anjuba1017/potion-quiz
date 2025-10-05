import React, { useState } from 'react';
import './ResultScreen.css';

const ResultScreen = ({ answers, totalQuestions, startTime, endTime, onRestart }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [showResults, setShowResults] = useState(false);

  const correctAnswers = answers.filter(a => a.correct).length;
  const isSuccess = correctAnswers >= 6;
  const timeSpent = Math.round((endTime - startTime) / 1000); // in seconds
  
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  const handleVideoEnd = () => {
    // Wait for video to finish, then show results
    setShowAnimation(false);
    setShowResults(true);
  };

  const renderPotionBottles = () => {
    const bottles = [];
    for (let i = 0; i < totalQuestions; i++) {
      const isCorrect = i < correctAnswers;
      
      bottles.push(
        <div 
          key={i} 
          className={`potion-bottle-svg ${isCorrect ? 'correct' : 'incorrect'}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" className="potion-svg">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
              <path d="M19 15a7 7 0 1 1-14 0a7 7 0 0 1 14 0"/>
              <path d="M13 15a2.5 2.5 0 0 1-5 0m4.46-10.016q.025-.237.01-.476l-.122-1.978c-.022-.34.309-.601.65-.513l4.613 1.194a.495.495 0 0 1 .298.759l-1.13 1.653q-.136.2-.238.417m-4.08-1.056a3 3 0 0 1-.09.48L11.517 8m.943-3.016L11 4.606m1.46.378l4.08 1.056m0 0q-.104.223-.17.46L15.66 9m.882-2.96L18 6.418M5 15h14m-4.992-3h-.009"/>
            </g>
          </svg>
        </div>
      );
    }
    return bottles;
  };

  return (
    <div className="result-screen">
      {showAnimation && (
        <div className="animation-container fullscreen">
          <video 
            autoPlay 
            playsInline
            className="potion-animation-fullscreen"
            onEnded={handleVideoEnd}
          >
            <source 
              src={isSuccess ? '/correct-potion.mp4' : '/incorrect-potion.mp4'} 
              type="video/mp4" 
            />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      )}

      {showResults && (
        <div className="results-container">
          <div className="results-book">
            <div className="results-header">
              <h1 className="results-title">
                {isSuccess ? '¡Receta Exitosa!' : 'Receta Incompleta'}
              </h1>
              {isSuccess && <div className="witch-face">🧙‍♀️</div>}
              {!isSuccess && <div className="witch-face-sad">😔</div>}
            </div>

            <div className="results-message">
              <p className="message-text">
                {isSuccess 
                  ? 'Has preparado una poción mágica perfecta. La bruja está orgullosa de ti.' 
                  : 'Necesitas más práctica con el grimorio. La bruja te anima a intentarlo de nuevo.'}
              </p>
            </div>

            <div className="score-section">
              <div className="score-box">
                <div className="score-number">{correctAnswers}</div>
                <div className="score-label">de {totalQuestions}</div>
                <div className="score-sublabel">respuestas correctas</div>
              </div>

              <div className="time-box">
                <div className="time-icon">⏱️</div>
                <div className="time-value">
                  {minutes > 0 && `${minutes}m `}{seconds}s
                </div>
                <div className="time-label">tiempo total</div>
              </div>
            </div>

            <div className="potions-display">
              <h3 className="potions-title">Pociones Preparadas</h3>
              <div className="potions-grid">
                {renderPotionBottles()}
              </div>
            </div>

            <div className="percentage-display">
              <div className="percentage-circle">
                <svg className="progress-ring" width="120" height="120">
                  <circle
                    className="progress-ring-circle-bg"
                    cx="60"
                    cy="60"
                    r="54"
                  />
                  <circle
                    className="progress-ring-circle"
                    cx="60"
                    cy="60"
                    r="54"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 54}`,
                      strokeDashoffset: `${2 * Math.PI * 54 * (1 - correctAnswers / totalQuestions)}`
                    }}
                  />
                </svg>
                <div className="percentage-text">
                  {Math.round((correctAnswers / totalQuestions) * 100)}%
                </div>
              </div>
            </div>

            <button className="restart-button" onClick={onRestart}>
              <span className="button-ornament">❧</span>
              Intentar de Nuevo
              <span className="button-ornament">❧</span>
            </button>

            <div className="results-footer">
              <div className="footer-flourish">~✦~</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultScreen;

