import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import SignPage from './pages/sign';
import Login from './pages/login'; 
import { motion } from "framer-motion";
import User from './pages/user';
import ProtectedRoute from "./assets/models/portected"
import Admin from './pages/admin'
import Custom from './pages/custom';
import Forgot from './pages/forgot';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />  
          <Route path="/sign-in" element={<SignPage />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/custom" element={<ProtectedRoute> <Custom /> </ProtectedRoute>} />
          <Route path="/Admin" element={<ProtectedRoute> <Admin /> </ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute> <User /> </ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
