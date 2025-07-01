import { Button } from '@/components/ui/button';
import { getAllbrands } from '@/services/Brand';
import { IBrand } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BrandPage = async() => {
    const {data:Brands}=await getAllbrands();
    console.log(Brands);
    
    return (
        <div className='container mx-auto my-20'>
           <div className=''>
             <div className='flex items-center justify-between'>
                  <h2 className="font-bold text-2xl">Top Brand</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-full">
         All Collection
          </Button>
        </Link>

                </div> 
           </div>

        <div className='grid lg:grid-cols-4 grid-cols-2 my-4 gap-5'>
            {
               Brands.map((brand:IBrand,idx:number)=>
                <div key={idx}>
                     <div className="bg-white  bg-opacity-50 border-2  rounded-2xl text-center p-6 h-44">
                          <Image
                            src={brand?.logo}
                            width={150}
                            height={200}
                            alt="category icon"
                            className="mx-auto"
                          />
                          <h3 className="text-lg font-semibold truncate mt-3">{brand.name}</h3>
                        </div>
                </div>
               
                
               )
            }
        </div>




        </div>
    );
};

export default BrandPage;