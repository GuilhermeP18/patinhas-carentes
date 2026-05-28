import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto min-h-screen flex flex-col">
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