import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../components/MainPage';
import Login from '../components/login';
import TitleBar from '../components/TitleBar';
import Menu from '../components/Menu';
import About from '../components/AboutUs';
import More from '../components/More';
import Events from '../components/Events';
import SignUp from '../components/SignUp';
import Foot from '../components/Foot';
import Submenu from '../components/SubMenu';

function AppRouter() {
  return (
    <Router>
      <TitleBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/More" element={<More />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Menu/SubMenu" element={<Submenu />} />
      </Routes>
      <Foot />
    </Router>
  );
}

export default AppRouter;
