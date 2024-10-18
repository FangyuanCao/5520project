import MainPage from '../components/MainPage';
import Login from '../components/login';
import TitleBar from '../components/TitleBar';
import Menu from '../components/Menu';
import About from '../components/AboutUs';
import FAQs from '../components/FAQs';
import Management from '../components/Management';
import SignUp from '../components/SignUp';
import Submenu from '../components/SubMenu';
import Discount from '../components/Discount';
import { MemoryRouter,Routes,Route } from 'react-router-dom';
import { render, screen, fireEvent} from '@testing-library/react'
test('renders all navigation buttons', () => {
  render(
    <MemoryRouter>
        <TitleBar/>
    </MemoryRouter>
  );

  expect(screen.getByText('Menu')).toBeInTheDocument();
  expect(screen,getByText('About Us')).toBeInTheDocument();
  expect(screen,getByText('FAQs')).toBeInTheDocument();
  expect(screen,getByText('Login')).toBeInTheDocument();
  expect(screen,getByText('Shopping Cart')).toBeInTheDocument();
});

test('navigate to MainPage',()=>{
  render(
    <MemoryRouter  initialEntries={['/']}>
      <Routes>
        <Route path ="/" element={<MainPage/>}/>
        <Route path = "/Menu" element={<Menu/>}/>
      </Routes>
    </MemoryRouter>

  );

  fireEvent.click(screen.getByTestId('ORDER HERE'));
  expect(screen.getByTest(Menu)).toBeInTheDocument();
});
