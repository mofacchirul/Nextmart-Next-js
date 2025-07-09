"use server"

import { getNewtoken } from "@/services/AuthServices";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const istokenExipred = async(token:string):Promise<boolean>=>{
    if(!token) return true;
    try{
        const decoded:{exp:number}= jwtDecode(token);
        return decoded.exp *1000 < Date.now();

    }
     catch (err: any) {
    console.error(err);
    return true;
  }
}

export const getValidToken= async(): Promise<string>=>{
    const cookiStore = await cookies();
    let token = cookiStore.get("accessToken")!.value;
    if(!token || (await istokenExipred(token))){
         const {data}= await getNewtoken();
         token = data?.accessToken
         cookiStore.set("accessToken",token)
    }
    return token

}