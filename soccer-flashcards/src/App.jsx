import { useState } from 'react'
import './App.css'
import './components/Flashcard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Soccer Flashcards</h1>
      <Flashcard />
    </div>
  )
}

export default App
