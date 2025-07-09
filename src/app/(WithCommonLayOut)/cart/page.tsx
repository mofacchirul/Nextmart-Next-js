
import Address from '@/components/modules/cart/Address';
import CartProducts from '@/components/modules/cart/CartProducts';
import Coupon from '@/components/modules/cart/Coupon';
import PaymentDetails from '@/components/modules/cart/PaymentDetails';
import ProductPage from '@/components/modules/products/banner';
import React from 'react';

const CartPage = () => {
    return (
        <div className='container mx-auto '>
            <div>
                <ProductPage title='Cart Page' path='Home - Cart Page'></ProductPage>
            </div>
            <div className='grid mt-10 lg:grid-cols-2 grid-cols-1 gap-4 items-center'>
                <div>
                    <CartProducts></CartProducts>
                </div>
                <div className='space-y-3'>
                      <Coupon></Coupon>
                      <Address></Address>
                      <PaymentDetails></PaymentDetails>
                </div>
            </div>
          
        </div>
    );
};

export default CartPage;