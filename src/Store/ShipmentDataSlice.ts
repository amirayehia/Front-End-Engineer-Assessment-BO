import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { useEffect } from 'react';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UsersState {
    contents: {
        TransitEvents: {
            state: string,
            timestamp: string
        }[],
        TrackingNumber: string,
        CurrentStatus: {
            state: string,
            timestamp: string
        },
        PromisedDate: string

    },
    isLoading: boolean,
    error: string | undefined,
}


const initialState: UsersState = {
    contents: {
        TransitEvents: [],
        TrackingNumber: '',
        CurrentStatus: {
            state: '',
            timestamp: ''
        },
        PromisedDate: ''
    },
    isLoading: false,
    error: '',
}
// 
export const fetchContent = createAsyncThunk(
    'content/fetchContent',
    async (para: string) => {
        const res = await axios(`https://tracking.bosta.co/shipments/track/${para}`);
        const data = await res.data;
        return data
    }
)

export const ShipmentSlice = createSlice({
    name: 'shipment',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchContent.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = ""
            state.contents = action.payload
        })
        builder.addCase(fetchContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    },
})


export default ShipmentSlice.reducer