"use server"

import { cookies } from "next/headers"

export const createbrand=async(data:FormData)=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand`,{
        method:'POST',
        headers:{
Authorization:(await cookies()).get("accessToken")!.value
        },
        body:data
    })
    return res.json();
  }