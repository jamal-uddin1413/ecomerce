import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, quantity,key} = props.product;
    return (
        <div className='reviewItem'>
            <h4>{name}</h4>
            <p>Quantity : {quantity}</p>
            <button className='main-btn'
            onClick={()=> props.removeProduct(key)}
            >Remove Item</button>
        </div>
    );
};

export default ReviewItem;