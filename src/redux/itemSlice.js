import { createSlice } from "@reduxjs/toolkit";

const data = JSON.parse(localStorage.getItem('items'));

const itemSlice = createSlice({
    name: 'items',
    initialState: data ? data : [],
    reducers: {
        addItem(state, action) {
            state.push(action.payload);
        },
        // editItem(state, action) {
        //     state.map((item, idx) => {
        //         if (item.id === action.payload.id) item = action.payload;
        //     });
        // },
        removeItem(state, action) {
            state.map((item, idx) => {
                if (item.id === action.payload) state.splice(idx, 1);
            });
        },
    }
});

const { actions, reducer } = itemSlice;
export const { addItem, removeItem } = actions;
export default reducer;