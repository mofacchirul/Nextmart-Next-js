import Image from 'next/image';
import style from "./Herosection.module.css"
import React from 'react';
import image from'../../../../assets/cup-with-headphone.png'
import { Button } from '@/components/ui/button';

const HeroSection = () => {
    return (
        <div className={`${style.bannar}   max-w-[1500px] mx-auto border-2 border-white rounded-3xl mt-10`}>
            <div className='grid lg:grid-cols-2 py-5 lg:py-5  items-center'>
                  <div className="pl-12">
          <h1 className="text-4xl font-bold leading-normal">
            Don&apos;t Miss Out on <br /> These Unbeatable Black <br /> Friday
            Deals!
          </h1>
          <p className="my-3">
            Save big this Black Friday with unbeatable deals on tech, home
            essentials, fashion, and more! Limited stock.
          </p>

          <Button className="rounded-full mr-2">Buy Now</Button>
          <Button className="rounded-full" variant="outline">
            All Products
          </Button>
                   </div>
                  <div className="flex items-center justify-center">
                    <Image alt='herosection' src={image} />
                 </div>
            </div>
        </div>
    );
};

export default HeroSection;