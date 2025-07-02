import AllProducts from '@/components/modules/products';
import ProductPage from '@/components/modules/products/banner';
import CategoryCard from '@/components/ui/core/CategoryCard';
import { getAllcategory } from '@/services/category';
import { getAllProducts } from '@/services/Product';
import { Icategory } from '@/types';
import React from 'react';

const AllProductPage = async() => {
    const {data:categorys}=await getAllcategory()
    const {data:products}=await getAllProducts()
    return (
        <div>
            <ProductPage title='All Products' path="Home - Product"></ProductPage>

              <div className='grid container mx-auto  grid-cols-3 lg:grid-cols-6 gap-8 my-5'>
         {
              categorys.map((category:Icategory , idx:any)=>(
                <CategoryCard key={idx} category={category}></CategoryCard>
            ))
         }
     </div>
     <AllProducts products={products}></AllProducts>
        </div>
    );
};

export default AllProductPage;