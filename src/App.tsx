import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Home" element={<Home/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;