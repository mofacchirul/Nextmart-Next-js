"use server"

import { getValidToken } from "@/lib/verifyToken"
import { revalidateTag } from "next/cache"


export const createbrand=async(data:FormData)=>
  {
     const token= await getValidToken()
    const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand`,{
        method:'POST',
        headers:{
Authorization:token
        },
        body:data

    })
    revalidateTag("BRAND")
    return res.json();
  }


  export const getAllbrands= async()=>{
   
    try{
        const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand`,{
            next:{
                tags:["BRAND"]
            }
        })
        return res.json()
    }
    catch(err){
        console.error(err)


    }
  }


  export const deleteBrand = async (brandId: string): Promise<any> => {
     const token= await getValidToken()
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/brand/${brandId}`,
       {
        method: "DELETE",
        headers: {
          Authorization: token
        },
      }
    );
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
