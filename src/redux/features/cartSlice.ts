
import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store';
interface InitialState{
    products:IProduct[]
}
const initialState:InitialState= {
    products:[]
}
const cartSlice= createSlice({
    name:"cart",
    initialState,
    reducers:{
         addProducts:(state,action)=>{
            state.products.push(action.payload)
        }
    }
})
export const orderProductsSelector = (state:RootState)=>{
    return state.cart.products;
}


export const {addProducts}=cartSlice.actions
export default cartSlice.reducer