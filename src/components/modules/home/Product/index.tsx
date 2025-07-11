
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui/core/ProductCard';
import { getAllProducts } from '@/services/Product';
import { IProduct } from '@/types';
import Link from 'next/link';
import React from 'react';

const ProductPage =async () => {
    const {data:products}=await getAllProducts();
    return (
        <div className='bg-white bg-opacity-50 py-10 '>
           <div className='container mx-auto'>
             <div className='flex items-center justify-between'>
                  <h2 className="font-bold text-2xl">Featured Products</h2>
             <Link href="/products">
             <Button variant="outline" className="rounded-full">
             All Collection
             </Button>
             </Link>

                </div>  
                <div className='grid my-4 grid-cols-3 lg:grid-cols-5 gap-5 items-center '>
                    {
                        products?.slice(0, 5)?.map((product:IProduct,idx:number)=>(<ProductCard key={idx} product={product}></ProductCard>))
                    }

                </div>
           </div>
        </div>
    );
};

export default ProductPage;