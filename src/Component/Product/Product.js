import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom';


const Product = (props) => {
    const { name, img, price, stock, seller,key } = props.product;
    
    return (
        <div className='product'>
            <div className="pd-img">
                <img src={img} alt="" />
            </div>
            <div className="pd-desc">
                <div>
                <h3 className='pdName'><Link to={'/product/'+key}>{name}</Link></h3>
                <p><small>Supplier: {seller}</small></p>
                <p><small>Price : $ {price}</small></p>
                <p><small>Stock only available {stock} pcs</small></p>
                </div>
                <div>
                <button onClick={() => {props.handleAddProduct(props.product)}} className='main-btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Product;