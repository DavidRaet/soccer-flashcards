import { useState, useEffect } from 'react';

const Flashcard = () => {
  const flashcardData = [
    {
      id: 1,
      question: "How many players are on the field for each team in standard soccer?",
      answer: "11 players",
      img: "/images/players.png"
    }, 
    {
      id: 2,
      question: "What is the maximum number of substitutions allowed in most professional soccer matches?",
      answer: "5 substitutions (Rules may vary by league and competition)",
      img: "/images/substitution.jpg"
    },{
      id: 3,
      question: "Who is the most decorated international men's soccer player in World Cup history?",
      answer: "Pelé (Brazil)",
      img: "/images/pele.jpg"
    }, 
    {
      id: 4,
      question: "What is the term for when a player scores 3 consecutive goals in one match",
      answer: "A Hattrick",
      img: "/images/hattrick.jpg"
    },{
      id: 5,
      question: "What is the duration of a standard soccer match? (Excluding extra time)",
      answer: "90 Minutes (Split into 45 minutes halves)",
      img: "/images/clock-time.svg"
    }, 
    {
      id: 6,
      question: "Which country won the 2022 FIFA Men's World Cup?",
      answer: "Argentina",
      img: "/images/world-cup.webp"
    },{
      id: 7,
      question: "What is the name of the governing body for international soccer?",
      answer: "FIFA (Fédération Internationale de Football Association).",
      img: "/images/hattrick.jpg"
    }, 
    {
      id: 8,
      question: "What is the term for a player who is positioned between the defenders and forwards?",
      answer: "Midfielder",
      img: "/images/luka.jpg"
    },{
      id: 9,
      question: "What is the name of the tournament for national teams in Europe?",
      answer: "UEFA European Championship",
      img: "/images/champions-league.jpg"
    }, 
    {
      id: 10,
      question: "Which player has scored the most goals in a single FIFA World Cup tournament?",
      answer: "Just Fontaine (13 goals in 1958)",
      img: "/images/Just_Fontaine.jpg"
    },
  ]

  const [shuffledData, setShuffledData] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);


  


  const shuffleArray = (array) => {
    const shuffled = [...array];
    for(let i = shuffled.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i - 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const shuffleCards = () => {
    const shuffledCards = shuffleArray(shuffledData);
    setShuffledData(shuffledCards);
  }

  useEffect (() => {
    const initialShuffle = shuffleArray(flashcardData);
    setShuffledData(initialShuffle);
  }, [])

  const nextCard = () => {
    if(currentCardIndex === shuffledData.length - 1){
      const newShuffled = shuffleArray(flashcardData);
      setShuffledData(newShuffled);
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    setIsFlipped(false);
    setUserGuess('');
    setHasSubmitted(false);
    setIsCorrect(false);
  }
  
  const previousCard = () => {
      if(currentCardIndex === 0){
        setCurrentCardIndex(shuffledData.length - 1);
      } else {
        setCurrentCardIndex(currentCardIndex - 1);
      }
      setIsFlipped(false);
      setUserGuess('');
      setHasSubmitted(false);
      setIsCorrect(false);
   }

    const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  }

      const handleSubmitGuess = () => {
      const correctAnswer = shuffledData[currentCardIndex].answer.toLowerCase().trim();
      const guess = userGuess.toLowerCase().trim();

      setIsCorrect(correctAnswer.includes(guess) && guess.length > 2);
      setHasSubmitted(true);
  }



  return (
    <div className="container">                                                                                     
      {shuffledData.length > 0 && (
        <div onClick={toggleFlip} className={`card ${isFlipped ? 'flipped' : ''}`}>
      <div className="front-card">
        <h2>{shuffledData[currentCardIndex].question}</h2>
        <img src={shuffledData[currentCardIndex].img} alt="imagery" />
      </div>
      <div className="back-card">
        <h2>{shuffledData[currentCardIndex].answer}</h2>
      </div>
      </div>
      )}  

      <div className="input-container">
        <div className="input-wrapper">
          <input 
          type="text" 
          className="guess-input"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder=" "
          disabled={hasSubmitted} />
          <label htmlFor="" className="input-label">
            Enter your guess, egoist...
          </label>
        </div>
        <button 
        disabled={!userGuess.trim() || hasSubmitted}
        onClick={handleSubmitGuess}
        className="submit-button">
          Submit Guess
        </button>
      </div>
      {hasSubmitted && (
        <div className={`feedback ${isCorrect? 'correct' : 'incorrect'}`}>
          <span className="feedback-icon">{isCorrect ? '✓ ' : '✗ '}</span>
          <span className="feedback-text">
            {isCorrect ? 'Correct! Nice work.' 
            : 
            `Wrong. The answer is ${shuffledData[currentCardIndex].answer}`
            } 
          </span>
        </div>

      )}
      <div className="button-container">
      <button onClick={previousCard} disabled={currentCardIndex === 0} className="arrows">
        ←
        </button>
      <button onClick={nextCard} className="arrows">→</button>
      <button onClick={shuffleCards} className="shuffle-button">Shuffle</button>
      </div>

    </div>
  )
}

export default Flashcard