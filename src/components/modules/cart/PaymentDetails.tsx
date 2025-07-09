"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { cityProductsSelector, clearCart, GrandTotal, orderProductsSelector, orderselector, shippingcost, subtotalSelector } from "@/redux/features/cartSlice";
// import { cityProductsSelector, GrandTotal, orderProductsSelector, orderselector, shippingAddressSelector, shippingcost, subtotalSelector } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { createOder } from "@/services/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";



export default function PaymentDetails() {
const dispatch= useAppDispatch()
  const subTotal = useAppSelector(subtotalSelector);
const ShippingCost = useAppSelector(shippingcost)

 const Orderselector= useAppSelector(orderselector)
const grandTotal = useAppSelector(GrandTotal)
const city= useAppSelector(cityProductsSelector);
// const address= useAppSelector(shippingProductsSelector)
const oder = useAppSelector(orderProductsSelector)
const router = useRouter()
const user = useUser()

const handleOrder=async()=>{
  const loading= toast.loading("Order is being Placed")
 try{

 if(!user.user){
    router.push("/login")
  throw new Error("Plase Frist Login")

 }


  if(!city){
    throw new Error("City is missing")
  }

  if(oder.length === 0){
    throw new Error("Cart is empty ,what are you trying to oder ??")

  }
 const res = await createOder(Orderselector)
 console.log(res);
 
if(res.success){
  toast.success(res.message,{id:loading})
  dispatch(clearCart())
 router.push(res.data.paymentUrl);

}
if(!res.success){
  toast.error(res.message)
}
 


  
 }
 catch(err:any){
  toast.error(err.message,{id:loading})
 }
  
}

  return (
    <div className="border-2  bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(subTotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Discount</p>
          {/* <p className="font-semibold">{currencyFormatter(0)}</p> */}
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">{currencyFormatter(ShippingCost)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
      </div>
      <Button
         onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}