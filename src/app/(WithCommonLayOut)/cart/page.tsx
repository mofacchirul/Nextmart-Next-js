import CartProducts from '@/components/modules/cart/CartProducts';
import Coupon from '@/components/modules/cart/Coupon';
import PaymentDetails from '@/components/modules/cart/PaymentDetails';
import ProductPage from '@/components/modules/products/banner';
import React from 'react';

const CartPage = () => {
    return (
        <div>
            <div>
                <ProductPage title='Cart Page' path='Home - Cart Page'></ProductPage>
            </div>
            <div className='grid grid-cols-2 gap-4 items-center'>
                <div>
                    <CartProducts></CartProducts>
                </div>
                <div>
                      <Coupon></Coupon>
                      <PaymentDetails></PaymentDetails>
                </div>
            </div>
          
        </div>
    );
};

export default CartPage;