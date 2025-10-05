import React, { useEffect, useRef } from 'react';
import './QuestionCard.css';

const QuestionCard = ({
  question,
  currentQuestionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  showFeedback,
  disabledOptions,
  onUseHint,
  hintUsed
}) => {
  const correctAudioRef = useRef(null);
  const wrongAudioRef = useRef(null);

  useEffect(() => {
    // Initialize feedback audio elements
    correctAudioRef.current = new Audio('/correct-answer.mp3');
    correctAudioRef.current.volume = 0.7;
    
    wrongAudioRef.current = new Audio('/wrong-answer.mp3');
    wrongAudioRef.current.volume = 0.7;

    // Cleanup function
    return () => {
      if (correctAudioRef.current) {
        correctAudioRef.current = null;
      }
      if (wrongAudioRef.current) {
        wrongAudioRef.current = null;
      }
    };
  }, []);

  // Play feedback sound when answer is selected
  useEffect(() => {
    if (showFeedback && selectedAnswer !== null) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      if (isCorrect && correctAudioRef.current) {
        correctAudioRef.current.currentTime = 0;
        correctAudioRef.current.play().catch(e => console.log('Play error:', e));
      } else if (!isCorrect && wrongAudioRef.current) {
        wrongAudioRef.current.currentTime = 0;
        wrongAudioRef.current.play().catch(e => console.log('Play error:', e));
      }
    }
  }, [showFeedback, selectedAnswer, question.correctAnswer]);

  const handleOptionClick = (index) => {
    if (!showFeedback && !disabledOptions.includes(index)) {
      onAnswer(index);
    }
  };

  const getOptionClass = (index) => {
    const baseClass = 'option-button';
    
    if (disabledOptions.includes(index)) {
      return `${baseClass} disabled`;
    }
    
    if (!showFeedback) {
      return baseClass;
    }
    
    if (index === question.correctAnswer) {
      return `${baseClass} correct`;
    }
    
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return `${baseClass} incorrect`;
    }
    
    return baseClass;
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="question-card-container">
      <div className="grimoire-page">
        {/* Page corner fold effect */}
        <div className="page-corner"></div>
        
        {/* Progress indicator */}
        <div className="progress-bar">
          <div className="progress-ornament">✦</div>
          <span className="progress-text">
            Pregunta {currentQuestionNumber} de {totalQuestions}
          </span>
          <div className="progress-ornament">✦</div>
        </div>

        {/* Question text */}
        <div className="question-scroll">
          <div className="scroll-top"></div>
          <div className="question-text">
            {question.question}
          </div>
          <div className="scroll-bottom"></div>
        </div>

        {/* Options */}
        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={getOptionClass(index)}
              onClick={() => handleOptionClick(index)}
              disabled={showFeedback || disabledOptions.includes(index)}
            >
              <span className="option-label">{optionLabels[index]}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        {/* Hint button */}
        <div className="hint-container">
          <button 
            className={`hint-button ${hintUsed ? 'used' : ''}`}
            onClick={onUseHint}
            disabled={hintUsed}
          >
            <span className="hint-icon">✨</span>
            <span className="hint-text">
              {hintUsed ? 'Hechizo usado' : 'Hummm... lo tengo en la punta de la lengua'}
            </span>
          </button>
        </div>

        {/* Decorative elements */}
        <div className="page-decoration top-left">❦</div>
        <div className="page-decoration top-right">❦</div>
        <div className="page-decoration bottom-left">❦</div>
        <div className="page-decoration bottom-right">❦</div>
      </div>
    </div>
  );
};

export default QuestionCard;

