import './Cart.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, removeItemFromCart } from '../../app/features/cartSlice';
import { selectIsLoggedIn } from '../../app/features/userSlice';

export const Cart = () => {
    const cart = useSelector(selectCart);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();
    let grandTotal = 0;

    return (
        <div className='cart-card'>
            <img alt='user icon' src='https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png' />
            {isLoggedIn ?
                <div>
                    <h3>Items in Cart:</h3>
                    {Object.keys(cart).length < 1 ? 
                        <p>No items in your cart...</p>
                        :
                        Object.keys(cart).map(item => {
                            console.log('Item: ', item)
                            return (
                                <div>
                                    {cart[item].qty > 1 ? 
                                        <div><p>{cart[item].qty}x {item}</p><br /><button onClick={() => dispatch(removeItemFromCart(cart[item]))}>Remove</button></div>
                                        :
                                        <div><p>{item}</p><br /><button onClick={() => dispatch(removeItemFromCart(cart[item]))}>Remove</button></div>
                                    }
                                </div>
                            )
                        })
                    }
                    <h3>Subtotal: </h3>
                    {Object.keys(cart).forEach(item => {
                        const totalPerItem = (cart[item].qty * cart[item].price) / 100;
                        console.log('total: ', totalPerItem);
                        grandTotal += totalPerItem;
                    })}
                    <p>${Math.round(grandTotal * 100) / 100}</p>
                </div>
                :
                <p>You must <Link to='/login'>log in</Link> or <Link to='/signup'>create an account</Link> to view your cart</p>
            }

        </div>
    );
};