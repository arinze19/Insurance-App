import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/UI/Navbar';
import HomePage from './pages/HomePage';
import PolicyPage from './pages/PolicyPage';
import './index.css';

const App = () => (
  <div className='bg-purple-50'>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/policies' element={<PolicyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
