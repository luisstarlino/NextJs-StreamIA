/**************************************************************************************
// @LuisStarlino | 24/11/2024 19"42
/***************************************************************************************/
'use client';
import { Toaster } from 'react-hot-toast';

export const ToasterProvider = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
                    border: '1px solid #713200',
                    fontSize: '15px',
                    padding: '12px',
                    color: '#713200',
                },
            }}

        />
    )
}

