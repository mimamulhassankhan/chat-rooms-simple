'use client';
import React from 'react';

const Error = ({error,reset}:any) => {
    return (
        <div>
            <p>Something went wrong</p>
            <button onClick={()=>reset()}>Reset error boundary</button>
            
        </div>
    );
};

export default Error;