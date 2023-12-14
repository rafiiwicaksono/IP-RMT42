import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    value: 0,
    pubFoods: []
  },
  reducers: {
    fetchPubFoods: (state, action) => {
        state.pubFoods = action.payload
    }
  }
})

export const { fetchPubFoods } = appSlice.actions

export function fetchPubFoodsData() {
    return async function fetchPubFoodThunk(dispatch) {
        try {
            const response = await axios.get("https://calorie-choice.blog-website.my.id/pub/foods");
            setAllFoods(response.data);
            setFilteredFoods(response.data);
            dispatch(fetchPubFoods(response.data))
        } catch (error) {
            let errorMessage;
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
            });
        }
    }
}

export default appSlice.reducer