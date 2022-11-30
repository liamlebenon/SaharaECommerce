import './App.css';
import { Navbar } from '../components/navbar/Navbar';
import { Products } from '../components/products/Products';
import { Login } from '../components/login/Login';
import { Signup } from '../components/signup/Signup';
import { Profile } from '../components/profile/Profile';
import { ProductDetails } from '../components/productDetails/ProductDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchLoggedInUser } from './features/userSlice';
import { Cart } from '../components/cart/Cart';

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
