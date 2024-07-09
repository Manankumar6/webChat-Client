
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Chat from './pages/Chat';
import Home from './pages/Home';
import Navbar from './pages/Navbar';

function App() {
 
  return (
   <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/chat' element={<Chat/>}/>
    
   </Routes>
  
   </>
  );
}

export default App;
