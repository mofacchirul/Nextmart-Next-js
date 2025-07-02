import { Button } from '@/components/ui/button';
import CategoryCard from '@/components/ui/core/CategoryCard';
import { getAllcategory } from '@/services/category';

import { Icategory } from '@/types';
import { Link } from 'lucide-react';
import React from 'react';

const CategoryHOme =async () => {
    const {data:categorys }= await getAllcategory()

    
    return (
        <div className='container my-4 mx-auto'>
           <div >
             <div className='flex items-center justify-between'>
                  <h2 className="font-bold text-2xl">Category</h2>
        <Link href="/products">
          <Button variant="outline" className="rounded-full">
            View All
          </Button>
        </Link>

                </div> 
           </div>
     <div className='grid  grid-cols-3 lg:grid-cols-6 gap-8 my-5'>
         {
              categorys?.slice(0, 6)?.map((category:Icategory , idx:any)=>(
                <CategoryCard key={idx} category={category}></CategoryCard>
            ))
         }
     </div>
        </div>
    );
};

export default CategoryHOme;