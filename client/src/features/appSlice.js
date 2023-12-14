import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        value: 0,
        data: []
    },
    reducers: {
        fetchTransactionSuccess: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { fetchTransactionSuccess } = appSlice.actions

export function fetchTransaction() {
    return async function fetchTransactionThunk(dispatch) {
        try {
            const access_token = localStorage.getItem(`access_token`);
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            };
            const response = await axios.get(`https://calorie-choice.blog-website.my.id/payment/transactions`, config);
            dispatch(fetchTransactionSuccess)
        } catch (error) {
            let errorMessage;
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
            });
        }
    }
}

export default appSlice.reducer