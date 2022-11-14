import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItems/ReviewItem';
import './Review.css';

const Review = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const handlePlaceOrder = () =>{
        navigate('/shipment');
    }
    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart); 
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProduct = productKey.map(key => {
            const product = fakeData.find(pd => pd.key ===key);
            product.quantity = savedCart[key];
            return product;
            
        })
        setCart(cartProduct)   
    },[])
    return (
        <div className='review'>
            <div className='reviewProduct'>
                    {
                        cart.map(pd => <ReviewItem product={pd}
                            key={pd.key}
                            removeProduct ={removeProduct}
                        ></ReviewItem>)
                    }
                </div>
            <div className="cartReview">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='main-btn'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;