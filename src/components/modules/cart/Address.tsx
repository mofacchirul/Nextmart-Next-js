"use client";

import { cities } from "@/components/constants/cities";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cityProductsSelector, shippingProductsSelector, updatecityselector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";



export default function Address() {
const dispacth= useDispatch();
const city= useAppSelector(cityProductsSelector)
const shipping= useAppSelector(shippingProductsSelector)


const handlecity=(city:string)=>{
dispacth(updatecityselector(city))
    
}
const handleshipping=(address:string)=>{
dispacth(updatecityselector(address))
console.log(city,shipping);
    
}
  return (
    <div className="border-2  bg-background brightness-105 rounded-md col-span-4  p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold">Address</h1>
        <p className="text-gray-500">Enter your address.</p>
        <div className="mt-5">
          <Select onValueChange={(city)=> handlecity(city)} >
            <SelectTrigger className="mb-5 w-full ">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
           onChange={(e)=>handleshipping(e.target.value)}
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}