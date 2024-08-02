'use client'
import React, {createContext, useContext} from 'react';
import {z} from "zod";
import {Estimation} from "@/types";

const EstimationContext = createContext({} as z.infer<typeof Estimation>);

export const useEstimation = () => {
    const context = useContext(EstimationContext);
    if (!context) {
        throw new Error('useEstimation must be used within an EstimationProvider');
    }
    return context;
};

export const EstimationProvider = ({estimation, children}: { estimation: z.infer<typeof Estimation>, children: React.ReactNode }) => (
    <EstimationContext.Provider value={estimation}>
        {children}
    </EstimationContext.Provider>
);