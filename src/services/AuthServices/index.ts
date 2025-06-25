"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { FieldValues } from "react-hook-form"

export const registeruser = async(useData: FieldValues)=>{
    try{
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(useData)
})
return res.json();
    }

    catch(err:any){
        return Error(err)
    }

}


export const loginuser = async(useData: FieldValues)=>{
    try{
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(useData)
})
const result= await res.json();
if(result.success){
    (await cookies()).set("accessToken", result.data.accessToken)
}



return result;
    }

    catch(err:any){
        return Error(err)
    }

}


export const getCurrentUser = async()=>{
    const accessToken= (await cookies()).get("accessToken")?.value;
    let decodedData= null;
    if(accessToken){
        decodedData= await jwtDecode(accessToken);
        return decodedData
    }
    else{
        return null;
    }
}


export const reChatChaTokenVerification = async(token:string)=>{
  try{
      const res = await fetch("https://www.google.com/recaptcha/api/siteverify",{
        method:"POST",
        headers:{
            "Content-type":"application/x-www-form-urlencoded"
        },
        body:new URLSearchParams({
            secret:process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
            response:token
        })
    })
    return res.json()
  }
  catch(err:any){
        return Error(err)
    }
}


export const logout = async()=>{
    (await cookies()).delete("accessToken")
}