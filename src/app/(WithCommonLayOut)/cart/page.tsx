import Coupon from '@/components/modules/cart/Coupon';
import ProductPage from '@/components/modules/products/banner';
import React from 'react';

const CartPage = () => {
    return (
        <div>
            <div>
                <ProductPage title='Cart Page' path='Home - Cart Page'></ProductPage>
            </div>
            <Coupon></Coupon>
        </div>
    );
};

export default CartPage;