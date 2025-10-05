import { useState, useEffect, useRef } from 'react';
import './App.css';
import { getRandomQuestions } from './data/questions';
import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import HintPopup from './components/HintPopup';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'results'
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // Store all answers
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHintPopup, setShowHintPopup] = useState(false);
  const [disabledOptions, setDisabledOptions] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const backgroundAudioRef = useRef(null);

  const startGame = async () => {
    const randomQuestions = getRandomQuestions(10);
    setQuestions(randomQuestions);
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setHintUsed(false);
    setShowHintPopup(false);
    setDisabledOptions([]);
    setStartTime(Date.now());
    setEndTime(null);
    
    // Start background audio after user interaction (button click)
    try {
      if (!backgroundAudioRef.current) {
        backgroundAudioRef.current = new Audio(import.meta.env.BASE_URL + 'boiling-water.mp3');
        backgroundAudioRef.current.loop = true;
        backgroundAudioRef.current.volume = 1.0; // Maximum volume for background
        
        // Preload the audio
        backgroundAudioRef.current.load();
      }
      
      // Play the audio
      await backgroundAudioRef.current.play();
      console.log('Background audio started successfully at volume:', backgroundAudioRef.current.volume);
    } catch (error) {
      console.error('Failed to play background audio:', error);
    }
  };

  // Stop background audio when game ends
  useEffect(() => {
    if (gameState === 'results' && backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
    }
  }, [gameState]);

  const handleAnswer = (answerIndex) => {
    if (showFeedback) return; // Prevent multiple clicks
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    // Store the answer
    const newAnswer = {
      questionId: currentQuestion.id,
      correct: isCorrect,
      selectedIndex: answerIndex
    };
    setAnswers([...answers, newAnswer]);

    // Move to next question or end game after delay
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        // Next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setDisabledOptions([]);
      } else {
        // Game over
        setEndTime(Date.now());
        setGameState('results');
      }
    }, 1500);
  };

  const handleUseHint = () => {
    if (hintUsed) return;
    setShowHintPopup(true);
  };

  const applyHint = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const wrongAnswers = [0, 1, 2, 3].filter(index => index !== correctAnswer);
    
    // Randomly select 2 wrong answers to disable
    const shuffled = wrongAnswers.sort(() => Math.random() - 0.5);
    const toDisable = shuffled.slice(0, 2);
    
    setDisabledOptions(toDisable);
    setHintUsed(true);
    setShowHintPopup(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="app">
      {gameState === 'start' && (
        <StartScreen onStart={startGame} />
      )}

      {gameState === 'playing' && currentQuestion && (
        <>
          <QuestionCard
            question={currentQuestion}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            disabledOptions={disabledOptions}
            onUseHint={handleUseHint}
            hintUsed={hintUsed}
          />
          
          {showHintPopup && (
            <HintPopup 
              onConfirm={applyHint}
              onCancel={() => setShowHintPopup(false)}
            />
          )}
        </>
      )}

      {gameState === 'results' && (
        <ResultScreen
          answers={answers}
          totalQuestions={questions.length}
          startTime={startTime}
          endTime={endTime}
          onRestart={startGame}
        />
      )}
    </div>
  );
}

export default App;
