import './Products.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectIsLoadingProducts, selectProducts } from '../app/features/productsSlice';
import { addToCart } from '../app/features/cartSlice';
import { Link } from 'react-router-dom';

export const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const isLoading = useSelector(selectIsLoadingProducts);

    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    if (isLoading) {
        return (
            <div>
                <h1>Products are loading...</h1>
            </div>
        )
    } else {
        return (
            <div className='card-container'>
                {products.map((product) => {
                    console.log(product)
                    return (
                        <div className='card'>
                            <img src={product.image} alt={product.name} className='widthSet'/>
                            <div className='item-info'>
                                <h4 className='product-name'><Link to={`/products/${product.id}`}>{product.name}</Link></h4>
                                <p className='price'>${product.price / 100}</p>
                            </div>
                            <button onClick={() => dispatch(addToCart({ name: product.name, price: product.price, qty: 1 }))}>Add to Cart</button>
                        </div>
                    )
                })}
            </div>
        )
    }
};