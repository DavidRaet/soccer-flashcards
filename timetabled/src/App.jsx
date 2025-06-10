import './App.css';
import Calendar from './components/Calendar';
const App = (props) => {

  return (
    <div className="App">
      <h1>Boxing Training Camp TimeTable &#129354;</h1>
      <h2>This is a schedule for peak performance in the ring</h2>
      <Calendar/>
    </div>
  )
}

export default App