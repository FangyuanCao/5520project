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
import Upload from '../components/upload';
import Admin from '../components/manage-components/AdminManage';
import Member from '../components/manage-components/MembershipManage'
import AdminLogin from '../components/manage-components/AdminLogin'
import Transfer from '../components/transferAndHistory'

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
        <Route path="/SubMenu/:category" element={<><TitleBar /><Submenu /><Foot /></>} /> {/* 更新了路径 */}
        <Route path="/Discount" element={<><TitleBar /><Discount /><Foot /></>} />
        <Route path="/upload" element={<><TitleBar /><Upload /><Foot /></>} />
        <Route path="/Transfer" element={<><TitleBar /><Transfer /><Foot /></>} />
        <Route path="/admin/*" element={<Mainlayout />} />
        <Route path="/Admin" element={<><Mainlayout />< Admin/></>} />
        <Route path="/Member" element={<><Mainlayout />< Member/></>} />
        <Route path="/AdminLogin" element={<>< AdminLogin/></>} />

      </Routes>
    </Router>
  );
};

export default AppRouter;
