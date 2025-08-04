import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Comment from './pages/Comment';
import './App.css';

function App() {
  return (
    <div>
      <nav className='m-2 flex flex-col w-49'>
        <div className='flex items-center gap-1 mb-3'>
          <Link to='/'><img className='w-8' src="/images/home.png" alt="Icon for home page" /></Link>
          <p className=' text-2xl font-bold'>Home</p>
        </div>
        <div className='flex items-center gap-1'>
          <Link to='/create'><img className='w-8' src="/images/create.png" alt="Icon for create page" /></Link>
          <p className=' text-2xl font-bold'>Create</p>
        </div>
      </nav>
      <main>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit/:id' element={<Edit />} />
      <Route path='/comment/:id' element={<Comment />} />
      </Routes>
      </main>

    </div>
  );
}

export default App;
