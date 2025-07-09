"use server"

import { Iorder } from '@/types/cart';
import { cookies } from 'next/headers';

export const createOder=async(order:Iorder)=>{
    try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
         method: "POST",
         headers: {
                        Authorization:(await cookies()).get("accessToken")!.value,
                       "Content-Type": "application/json",


         },
         body: JSON.stringify(order)
       });
   
       const result = await res.json();
   
     
   
       return result;
   
     } catch (err: any) {
       return Error(err);
     }
    }

export const couponSelector=async(  
      couponCode: string,
  subTotal: number,
  shopId: string)=>{
    try {
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coupon/${couponCode}`, {
         method: "POST",
         headers: {
                        Authorization:(await cookies()).get("accessToken")!.value,
                       "Content-Type": "application/json",


         },
         body: JSON.stringify({ orderAmount: subTotal, shopId }),
       });
   
       const result = await res.json();
   
     
   
       return result;
   
     } catch (err: any) {
       return Error(err);
     }
    }