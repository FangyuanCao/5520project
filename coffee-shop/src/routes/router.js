// AppRouter.js
import React, { useState } from 'react';
import { Routes, Navigate, BrowserRouter as Router, Route } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Login from '../components/login';
import TitleBar from '../components/TitleBar';
import Menu from '../components/Menu';
import About from '../components/AboutUs';
import FAQs from '../components/FAQs';
import SignUp from '../components/SignUp';
import Foot from '../components/Foot';
import Submenu from '../components/SubMenu';
import Discount from '../components/Discount';
import Mainlayout from '../components/manage-components/Mainlayout';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log('Login successful');
  };

  return (
    <Router>
      <Routes>
        {/* 用户界面路由 */}
        <Route path="/" element={<><TitleBar /><MainPage /><Foot /></>} />
        <Route path="/login" element={<><TitleBar /><Login /><Foot /></>} />
        <Route path="/Menu" element={<><TitleBar /><Menu /><Foot /></>} />
        <Route path="/AboutUs" element={<><TitleBar /><About /><Foot /></>} />
        <Route path="/FAQs" element={<><TitleBar /><FAQs /><Foot /></>} />
        <Route path="/SignUp" element={<><TitleBar /><SignUp /><Foot /></>} />
        <Route path="/Menu/SubMenu" element={<><TitleBar /><Submenu /><Foot /></>} />
        <Route path="/Discount" element={<><TitleBar /><Discount /><Foot /></>} />

        {/* 仅在 /admin/* 路径下加载 Mainlayout */}
        <Route 
          path="/admin/*" 
          element={<PrivateRoute isAuthenticated={isAuthenticated} element={<Mainlayout />} />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
