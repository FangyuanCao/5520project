import React from 'react';
import MainPage from './coffee-shop/src/components/MainPage';
import Login from './coffee-shop/src/components/login';
import TitleBar from './coffee-shop/src/components/TitleBar';
import Menu from './coffee-shop/src/components/Menu';
import SignUp from './coffee-shop/src/components/SignUp';
import AboutUs from './coffee-shop/src/components/AboutUs';
import Submenu from './coffee-shop/src/components/SubMenu';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';

test('renders all navigation buttons in titleBar', () => {
  render(
    <MemoryRouter>
        <TitleBar/>
    </MemoryRouter>
  );
  expect(screen.getByText('Menu')).toBeInTheDocument();
  expect(screen.getByText('About Us')).toBeInTheDocument();
  expect(screen.getByText('FAQs')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Shopping Cart'));
  expect(screen.getByText('Total:')).toBeInTheDocument();

});

test('renders all navigation buttons in login', () => {
  render(
    <MemoryRouter>
        <Login/>
    </MemoryRouter>
  );
  expect(screen.getByText('SIGN UP')).toBeInTheDocument();
});

test('renders all navigation buttons in SignUp', () => {
  render(
    <MemoryRouter>
        <SignUp/>
    </MemoryRouter>
  );
  expect(screen.getByText('SIGN IN')).toBeInTheDocument();
});

test('login navigate to SIGN UP',()=>{
  render(
    <MemoryRouter  initialEntries={['/login']}>
      <Routes>
        <Route path ="/login" element={<Login/>}/>
        <Route path = "/SignUp" element={<SignUp/>}/>
      </Routes>
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('SIGN UP'));
  expect(screen.getByText("Create Account")).toBeInTheDocument();
});
  
  test('main page navigate to SIGN UP',()=>{
    render(
      <MemoryRouter  initialEntries={['/']}>
        <Routes>
          <Route path ="/" element={<MainPage/>}/>
          <Route path = "/SignUp" element={<SignUp/>}/>
        </Routes>
      </MemoryRouter>
  
    );
  fireEvent.click(screen.getByText('Sign Up'));
  expect(screen.getByText("Create Account")).toBeInTheDocument();
});

test('sign up navigate to SIGN IN',()=>{
  render(
    <MemoryRouter  initialEntries={['/SignUp']}>
      <Routes>
        <Route path = "/SignUp" element={<SignUp/>}/>
        <Route path ="/login" element={<Login/>}/>
      </Routes>
    </MemoryRouter>

  );
  fireEvent.click(screen.getByText('SIGN IN'));
  expect(screen.getByText("Coffee shop")).toBeInTheDocument();
 
});
test('sign up navigate to main',()=>{
  render(
    <MemoryRouter  initialEntries={['/SignUp']}>
      <Routes>
        <Route path = "/SignUp" element={<SignUp/>}/>
        <Route path ="/" element={<MainPage/>}/>
      </Routes>
    </MemoryRouter>

  );
  fireEvent.click(screen.getByText('Coffee shop'));
  expect(screen.getByText("About us")).toBeInTheDocument();
 
});

test('navigate to Menu',()=>{
  render(
    <MemoryRouter  initialEntries={['/']}>
      <Routes>
        <Route path ="/" element={<MainPage/>}/>
        <Route path = "/Menu" element={<Menu/>}/>
      </Routes>
    </MemoryRouter>

  );

  fireEvent.click(screen.getByText('Order here'));
  expect(screen.getByText("Menu")).toBeInTheDocument();
});

test('comeback to Menu',()=>{
  render(
    <MemoryRouter  initialEntries={['/SubMenu']}>
      <Routes>
        <Route path ="/SubMenu" element={<Submenu/>}/>
        <Route path = "/Menu" element={<Menu/>}/>
      </Routes>
    </MemoryRouter>

  );

  fireEvent.click(screen.getByText('Come Back Main Menu'));
  expect(screen.getByText("Menu")).toBeInTheDocument();
});

test('navigate to ABOUT US',()=>{
  render(
    <MemoryRouter  initialEntries={['/']}>
      <Routes>
        <Route path ="/" element={<MainPage/>}/>
        <Route path = "/AboutUs" element={<AboutUs/>}/>
      </Routes>
    </MemoryRouter>
  );
  fireEvent.click(screen.getByText('Click IT'));
  expect(screen.getByText('Welcome to [Coffee Shop Name]! At [Coffee Shop Name], we believe every cup of coffee tells a story. Established in [Year] by [Founder’s Name], our mission is to serve high-quality coffee in a warm and inviting atmosphere. We carefully select premium coffee beans from around the world, using both traditional and modern brewing methods to ensure each cup is exceptional. Join us for a quiet moment or a lively chat with friends, and don’t miss our regular events and workshops. We’re excited to share our passion for coffee with you')).toBeInTheDocument();
});

test('sign in navigate to main',()=>{
  render(
    <MemoryRouter  initialEntries={['/login']}>
      <Routes>
        <Route path = "/login" element={<Login/>}/>
        <Route path ="/" element={<MainPage/>}/>
      </Routes>
    </MemoryRouter>

  );
  fireEvent.click(screen.getByText('Coffee shop'));
  expect(screen.getByText("About us")).toBeInTheDocument();
 
});

test('handleClick and handleClose ', () => {
  render(
    <MemoryRouter>
    <TitleBar />
  </MemoryRouter>
  );

  expect(screen.queryByText('Checkout')).toBeNull();
  fireEvent.click(screen.getByText('Shopping Cart'));
  expect(screen.getByText('Checkout')).toBeInTheDocument();
  fireEvent.mouseDown(document.body);
  waitFor(() => {
    expect(screen.queryByText('Checkout')).toBeNull();
  });

});