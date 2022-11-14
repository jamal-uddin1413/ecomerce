import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [product, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);
    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProduct = productKey.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity= savedCart[key];
            return product;
        })
        setCart(cartProduct)
    },[])
    const handleAddProduct = (product) =>{

        
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity +1;
            sameProduct.quantity=count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart=[...others, sameProduct];
        }
        else{
            product.quantity=1;
            newCart = [...cart, product]

        }

        setCart(newCart);

        addToDatabaseCart(product.key, count);

        
    }
    return (
        <div className='shop-container'>
            <div className="product-container">
                <ul>
                    {
                        product.map( pd=> <Product product={pd}
                            handleAddProduct ={handleAddProduct}
                        key = {pd.key}
                        ></Product>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className='main-btn'> Review Cart</button>
                    </Link>
                </Cart>
                
            </div>
        </div>
    );
};

export default Shop;