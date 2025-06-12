import { useState } from 'react';

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const flashcardData = [
    {
      id: 1,
      question: "How many players are on the field for each team in standard soccer?",
      answer: "11 players"
    }, 
    {
      id: 2,
      question: "What is the maximum number of substitutions allowed in most professional soccer matches?",
      answer: "5 substitutions (Rules may vary by league and competition)"
    },{
      id: 3,
      question: "Who is the most decorated international men's soccer player in World Cup history?",
      answer: "Pelé (Brazil)"
    }, 
    {
      id: 4,
      question: "What is the term for when a player scores 3 consecutive goals in one match",
      answer: "A Hattrick"
    },{
      id: 5,
      question: "What is the duration of a standard soccer match?",
      answer: "90 Minutes (Split into 45 minutes halves)"
    }, 
    {
      id: 6,
      question: "Which country won the 2022 FIFA Men's World Cup?",
      answer: "Argentina"
    },{
      id: 7,
      question: "What is the name of the governing body for international soccer?",
      answer: "FIFA (Fédération Internationale de Football Association)."
    }, 
    {
      id: 8,
      question: "What is the term for a player who is positioned between the defenders and forwards?",
      answer: "Midfielder"
    },{
      id: 9,
      question: "What is the name of the tournament for national teams in Europe?",
      answer: "UEFA European Championship"
    }, 
    {
      id: 10,
      question: "Which player has scored the most goals in a single FIFA World Cup tournament?",
      answer: "Just Fontaine (13 goals in 1958)"
    },
  ]

  const flipCard = () => {
      setIsFlipped(!isFlipped)
  }

  const toggleArrow = () => {
    if (currentCardIndex == 0 || ){
      setCurrentCardIndex(currentCardIndex + 1)
    } 
  }

  return (
    <div className="container">
      <h2 onClick={flipCard} className='flashcard'>{isFlipped ? flashcardData[currentCardIndex].answer : flashcardData[currentCardIndex].question}</h2>
      <button onClick={toggleArrow} className="arrows">←</button>
      <button onClick={toggleArrow} className="arrows">→</button>
    </div>
  )
}

export default Flashcard