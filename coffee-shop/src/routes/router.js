import React from 'react';
import {useState}from 'react';
import {Routes,Navigate,BrowserRouter as Router, Route } from 'react-router-dom';
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
import AdminManage from '../components/manage-components/AdminManage';
import Analytics from '../components/manage-components/Analytics';
import MembershipManage from '../components/manage-components/MembershipManage';
import OrderManage from '../components/manage-components/OrderManage';

const AppRouter = () => {
  return (
    <Router>
      <TitleBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Menu/SubMenu" element={<Submenu />} />
        <Route path="/Discount" element={<Discount/>} />
        <Route path="/AdminManage" element={<AdminManage />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/MembershipManage" element={<MembershipManage />} /> 
        <Route path="/OrderManage" element={<OrderManage />} /> 
      </Routes>
      <Foot />
    </Router>
  );
};

/*const isAuthenticated = true;
const PrivateRoute = ({ element: element, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const App = () => (
  <Switch>
    <PrivateRoute path="/discount" component={DiscountPage} />
  </Switch>
);*/

/*function AppRouter() {
  return (
    <Router>
      <TitleBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/Management" element={<Management />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Menu/SubMenu" element={<Submenu />} />
        <Route path="/Discount" element={<Discount />} />
      </Routes>
      <Foot />
    </Router>
  );
}*/

export default AppRouter;
