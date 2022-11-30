import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../app/features/userSlice';
import { selectTotalItems } from '../../app/features/cartSlice';
import { fetchFilteredProducts, selectSearchTerm, setSearchTerm } from '../../app/features/productsSlice';

export const Navbar = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const totalItems = useSelector(selectTotalItems);
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    return (
        <section className="navbar">

            <div className='header'>
                <p><Link to='/'>Sahara.com</Link></p>
            </div>
            <div className='searchbar'>
                <input id='newSearchTerm' onChange={(e) => dispatch(setSearchTerm(e.target.value))}></input><button onClick={() => dispatch(fetchFilteredProducts(searchTerm))}>Search</button>
            </div>
            <div className='login-buttons'>
                {isLoggedIn ? 
                    <div className='login-buttons'>
                        <p><Link to='/profile'><img alt='profile icon' src='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png' /></Link></p>
                        <p><Link to='/cart'><img alt='cart icon' src='https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png' />{totalItems}</Link></p>                        
                    </div>
                    :
                    <div className='login-buttons'>
                        <p><Link to='/login'><img alt='profile icon' src='https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png' /></Link></p>
                        <p><Link to='/cart'><img alt='cart icon' src='https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png' /></Link></p>
                    </div>
                }
                
            </div>

        </section>
    )
}