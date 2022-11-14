import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    
    let total = (cart.reduce( (total, prd) => total + prd.price* prd.quantity,0)).toFixed(2);
    
    let shipping = 0;
    if(total > 0 && total <50 ){
        shipping=10;
    }
    if(total >50 && total < 100){
        shipping = 5;
    }
    let vat = ((total+shipping)/10).toFixed(2)
    let grandTotal = (parseInt(total) + parseInt(shipping )+ parseInt(vat))
    return (
        <div className='cart-continer'>
            <div className="cart-desc">
            <h2>Total item added : {cart.length}</h2>
            <p>Product Price :{total}</p>
            <p>Shipping Charge : {shipping}</p>
            <p>VAT : {vat}</p>
            <p>Total Amount : {grandTotal}</p>
            {
                props.children
            }
            </div>
        </div>
    );
};

export default Cart;