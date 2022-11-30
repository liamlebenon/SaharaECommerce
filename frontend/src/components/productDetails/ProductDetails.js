import './ProductDetails.css';
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { addToCart } from '../../app/features/cartSlice';
import { useDispatch } from 'react-redux';


export const ProductDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const fetchProduct = async () => {
        const response = await fetch(`http://localhost:4000/products/${id}`)
        const data = await response.json();
        setProduct(data[0]);
    }

    const [ product, setProduct ] = useState({});


    useEffect(() => {
        fetchProduct();
        console.log('Product details: ', product)
    }, []);

    return (
        <div className="product-details-card">
            <h2>{product.name}</h2>
            <img alt={product.name} src={product.image} />
            <p>{product.description}</p>
            <p className='product-price'>${product.price / 100}</p>
            <button onClick={() => dispatch(addToCart({ name: product.name, price: product.price, qty: 1 }))}>Add to Cart</button>
            <p>Sold by: {product.seller}</p>
        </div>
    )
};