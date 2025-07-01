"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const createCategoy=async(data:FormData)=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`,{
        method:'POST',
        headers:{
Authorization:(await cookies()).get("accessToken")!.value
        },
        body:data
    })
    revalidateTag("CATEGORY")
    return res.json();
  }



  export const getAllcategory= async()=>{
    try{
        const res= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`,{
            next:{
                tags:["CATEGORY"]
            }
        })
        return res.json()
    }
    catch(err){
        console.error(err)


    }
  }

export const deleteCategory = async (categoryId: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("CATEGORY");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

