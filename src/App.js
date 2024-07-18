
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Chat from './pages/Chat';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Signup from './pages/Signup';
import Webchat from './pages/Webchat';

function App() {
 
  return (
   <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/chat' element={<Chat/>}/>
    <Route path='/signup' element={<Signup/>}/>
    
    <Route path='/webchat' element={<Webchat/>}/>
    
   </Routes>
  
   </>
  );
}

export default App;
