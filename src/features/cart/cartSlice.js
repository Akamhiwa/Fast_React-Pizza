import { createSlice } from "@reduxjs/toolkit";

const initialState={
    cart:[],
}
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addItem(state,action){
            state.cart.push(action.payload)
        },
        deleteItem(state,action){
            state.cart=state.cart.filter((item)=>item.pizzaId!==action.payload);
        },
        increaseItemQuantity(state,action){
            const item=state.cart.find((item)=>item.pizzaId===action.payload);
            item.quantity++;
            item.totalPrice=item.quantity * item.unitPrice
            //the state changes exactly as the refrence variable
        },
        decreaseItemQuantity(state,action){
            const item=state.cart.find((item)=>item.pizzaId===action.payload);
            item.quantity--;
            item.totalPrice=item.quantity * item.unitPrice
            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
        },
        ClearCart(state){
            state.cart=[];
        },
    },
});
export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    ClearCart}=cartSlice.actions;
    //export functuations
    
    export default cartSlice.reducer
    //Integrate this reducer into your Redux store configuration.

    export const getCart=(state)=>state.cart.cart;

    export const getTotalCartQuantity=(state)=>
        state.cart.cart.reduce((sum,item)=>sum+item.quantity,0)

    export const getTotalCartPrice = (state) =>
        state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
    //state.cart is referring to the slice name
    //the last cart is accessing the cart array
    export const getCurrentQuantityById = (id) => (state) =>
        state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0; 
    //Selectors are functions that extract and possibly compute derived data from the Redux store state.