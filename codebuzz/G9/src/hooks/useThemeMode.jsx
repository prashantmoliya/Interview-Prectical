import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

const useThemeMode = () => {

    const { theme } = useContext(ThemeContext);

    return theme === "light";
}

export default useThemeMode;

// export const ThemeMode = (theme) =>  theme === "light" ? "light" : "dark";
