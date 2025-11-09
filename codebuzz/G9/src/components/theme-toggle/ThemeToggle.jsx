import React, { useContext } from 'react'
import { FaSun, FaMoon, FaCheck } from 'react-icons/fa';
import { MdLightMode } from 'react-icons/md';
import { ThemeContext } from '../../context/ThemeContext';
import useThemeMode from '../../hooks/useThemeMode';

const ThemeToggle = () => {

    const { theme, toggleTheme } = useContext(ThemeContext);
    const ThemeMode = useThemeMode();

    return (
        // <button className="theme-toggle" onClick={toggleTheme}>
        //         {theme === 'light' ? <FaMoon /> : <FaSun />}
        //     </button>
        <div className='theme_group d-flex'>
            <button
                className={`theme-toggle ${theme === 'light' ? 'active' : ''}`}
                onClick={toggleTheme}
            >
                {/* {theme === 'light' ? <FaMoon /> : <FaSun />} */}
                {theme === 'light' ? <FaCheck /> : <MdLightMode />}

                <span className='ms-2'>Light</span>
            </button>
            <button
                className={`theme-toggle ${theme === 'dark' ? 'active' : ''}`}
                onClick={toggleTheme}
            >
                {/* {theme === 'dark' ? <FaMoon /> : <FaSun />} */}
                {theme === 'dark' ? <FaCheck /> : <FaMoon />}

                <span className='ms-2'>Dark</span>
            </button>
        </div>
    )
}

export default ThemeToggle;