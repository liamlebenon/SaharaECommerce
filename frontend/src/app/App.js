import './App.css';
import { Navbar } from '../components/Navbar';
import { Products } from '../components/Products';
import { Login } from '../components/Login';
import { Signup } from '../components/Signup';
import { Profile } from '../components/Profile';
import { ProductDetails } from '../components/ProductDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLoggedInUser } from './features/userSlice';
import { Cart } from '../components/Cart';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLoggedInUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Products />} />
          <Route exact path='/products/:id' element={<ProductDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>          
      </div>
    </Router>
  );
}

export default App;
