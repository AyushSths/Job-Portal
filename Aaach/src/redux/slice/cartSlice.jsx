import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}

export const cartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {
        setcart: (state, action) => {
            console.log("set - cart ")
            console.log(action);
            state.value = action.payload
        },
        addToCart: (state, action) => {
            console.log("set - cart ")
            console.log(action.payload);
            // state.value.push(action.payload)s

            let { _id, name, price, description, brands, images } = action.payload

            /* check if the clicked product already exits in our redux store */

            let existing_product = state.value.find(cart_item => cart_item._id == _id)

            if (existing_product) {
                let temp = [...state.value]
                temp = temp.map(el => {
                    if (el._id == _id) {
                        return {
                            ...el,
                            quantity: el.quantity + 1
                        }
                    }
                    return el
                })

                state.value = temp

            } else {

                state.value.push({
                    _id, name, price, description, images, brands, quantity: 1
                })
            }

            localStorage.setItem("cart_items", JSON.stringify(state.value))
        },
        increaseQuantity: (state, action) => {
            const { _id } = action.payload;

            const updatedItems = state.value.map((item) => {
                if (item._id === _id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            state.value = updatedItems;
        },

        decreaseQuantity: (state, action) => {
            const { _id } = action.payload; // Change 'index' to '_id' to match the payload

            const updatedItems = state.value.map((item) => {
                if (item._id === _id && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            state.value = updatedItems
        },
        reset: (state) => {
            localStorage.clear()
            state.value = []
        }
    },
})

export const { setcart, addToCart, addToFavourite, increaseQuantity, decreaseQuantity, reset } = cartSlice.actions

export default cartSlice.reducer

