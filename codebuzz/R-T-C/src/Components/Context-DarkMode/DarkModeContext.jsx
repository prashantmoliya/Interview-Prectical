import React, { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext();
// console.log("Create-Context-Api++", DarkModeContext);

export const DarkModeContextProvider = ({ children }) => {
    // console.log("Provider-Context-Api++", children);

    const [dark, setDark] = useState(() => {
        const savedTheme = localStorage.getItem('dark-mode');
        
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    useEffect(() => {
        dark ? document.body.classList.add('dark-mode') : document.body.classList.remove('dark-mode');

        localStorage.setItem('dark-mode', JSON.stringify(dark));
    }, [dark]);

    return (
        <DarkModeContext.Provider value={{ dark, setDark }}>
            {children}
        </DarkModeContext.Provider>
    )
}   