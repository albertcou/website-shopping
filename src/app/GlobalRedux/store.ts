"use client";
import { configureStore } from '@reduxjs/toolkit'
import Carts from './carts';

export const store = configureStore({
    reducer: {
        Carts
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;