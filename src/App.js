import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Centers from './components/Centers/Centers';
import Singup from './components/Signup/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/centers" element={<Centers />} />
        <Route path="/signup" element={<Singup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
