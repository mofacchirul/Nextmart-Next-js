
import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store';

export interface CartProduct extends IProduct{
    orderQuantity:number;
}
interface InitialState{
    products:CartProduct[],
    city:string,
    shipping:string
      shopId: string
}
const initialState:InitialState= {
    products:[],
    city:"",
    shipping:"",
      shopId:""
}
const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{
         addProducts:(state,action)=>{
            if(state.products.length ===0){
                state.shipping=action.payload.shop._id
            }
               const productToAdd = state.products.find(
                (product)=> product._id === action.payload._id
               )
               if(productToAdd){
                productToAdd.orderQuantity += 1;
                return
               }
               state.products.push({...action.payload,orderQuantity:1})
        },
        incrementOrder:(state,action)=>{
            const productIncrement= state.products.find(product=> product._id === action.payload)
            if(productIncrement){
                productIncrement.orderQuantity +=1
            }
        },
        decrementOrder:(state,action)=>{
            const productIncrement= state.products.find(product=> product._id === action.payload)
            if(productIncrement && productIncrement.orderQuantity >1){
                productIncrement.orderQuantity -=1
            }
        },
        removeOrder:(state,action)=>{
            state.products= state.products.filter(product=> product._id !== action.payload)
        },

        updatecityselector:(state,action)=>{
            state.city= action.payload
        },
        updateshippingselector:(state,action)=>{
            state.shipping = action.payload
        },
        clearCart:(state)=>{
            state.products=[];
            state.city="";
            state.shipping="";
        }


    }
})
export const orderProductsSelector = (state:RootState)=>{
    return state.cart.products;
}
export const cityProductsSelector = (state:RootState)=>{
    return state.cart.city;
}
export const shippingProductsSelector = (state:RootState)=>{
    return state.cart.shipping;
}
export const subtotalSelector=(state:RootState)=>{
   return state.cart.products.reduce((acc,product)=>{
        if(product.offerPrice){
            return acc + product.offerPrice * product.orderQuantity ;
        }
        else{
            return acc + product.price * product.orderQuantity
        }
    },0)
}
export const shippingcost=(state:RootState)=>{
    if(state.cart.city && state.cart.city ==="Dhaka" && state.cart.city.length >0){
        return 60;
    }
    else if(state.cart.city && state.cart.city !== "Dhaka" && state.cart.city.length > 0)
         {
        return 120
    }
    else{
      return 0;  
    }
}
export const shopSelector = (state: RootState) => {
  return state.cart.shopId;
};


  export const orderselector =(state:RootState)=>{
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "White",
    })),
    shippingAddress: `${state.cart.shipping} - ${state.cart.city}`,
    paymentMethod: "Online"
  };
  }
  export const GrandTotal=(state:RootState)=>{
    const subtotal = subtotalSelector(state)
    const shipping= shippingcost(state);
    return subtotal+ shipping;
  } 



export const {addProducts,decrementOrder,incrementOrder,removeOrder,updateshippingselector,updatecityselector,clearCart}=cartSlice.actions
export default cartSlice.reducer