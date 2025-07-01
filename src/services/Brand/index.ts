"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createbrand=async(data:FormData)=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/brand`,{
        method:'POST',
        headers:{
Authorization:(await cookies()).get("accessToken")!.value
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
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/brand/${brandId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("BRAND");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
