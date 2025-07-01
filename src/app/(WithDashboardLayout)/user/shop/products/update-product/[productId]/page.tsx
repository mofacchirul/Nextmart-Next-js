import UpdateProductForm from '@/components/modules/auth/shop/product/UpdateProduct';
import { getSingleProduct } from '@/services/Product';
import React from 'react';

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {


const {productId}=await params;
const {data:product}=await getSingleProduct(productId)

console.log(product);

    return (
        <div className='flex justify-center items-center'>
            <UpdateProductForm product={product}></UpdateProductForm>
        </div>
    );
};

export default UpdateProductPage;