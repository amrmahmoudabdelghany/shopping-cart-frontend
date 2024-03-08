import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

let cartItems = localStorage.getItem("cartItems");

const initialState = {
  cartItems: cartItems ? JSON.parse(cartItems) : [],
  totalCartQuantity: 0,
  totalCartAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.info(`${state.cartItems[itemIndex].name} Quantity Increased`, {
          position: "bottom-left",
        });
      } else {
        const porductTemp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(porductTemp);
        toast.success(`${porductTemp.name} Added To Cart`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error(`${action.payload.name} Removed From Cart`, {
        position: "bottom-left",
      });
    },
    decreaseItemQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        let cartQuantity = state.cartItems[itemIndex].cartQuantity;
        if (cartQuantity === 1) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
          state.cartItems = nextCartItems;
          toast.error(`${action.payload.name} Removed From Cart`, {
            position: "bottom-left",
          });
        } else if (cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
          toast.info(`${action.payload.name} Quantity Decreased`, {
            position: "bottom-left",
          });
        }else { 
            toast.error(`${action.payload.name} Alread Removed From Cart`, {
                position: "bottom-left",
              });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
      
    },
    increaseItemQuantity(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); 
      toast.info(`${action.payload.name} Quantity Increased`, {
        position: "bottom-left",
      });
    },
    clearCart(state , action) { 
        state.cartItems = [] ; 
        toast.error('Cart Cleared', {
            position: "bottom-left",
          });
          localStorage.setItem("cartItems" , JSON.stringify(state.cartItems)) ; 
    } , 
    getTotals(state , action) { 
     const result =    state.cartItems.reduce( (total , item)=>{ 
            const {price , cartQuantity} = item ; 
            const itemTotal = price * cartQuantity ; 
            total.totalPrice += itemTotal ; 
            total.totalQuantity += cartQuantity ; 
            return total ;  
        } ,
         { 
            totalPrice :0  , 
            totalQuantity : 0 
        }) 
        state.totalCartQuantity = result.totalQuantity ; 
        state.totalCartAmount = result.totalPrice ; 
    }

    
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  clearCart, 
  getTotals
} = cartSlice.actions;

export default cartSlice.reducer;
