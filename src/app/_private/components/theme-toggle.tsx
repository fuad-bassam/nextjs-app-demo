'use client'

import { useKTheme } from "../Context/KThemeContext"

import SunnyIcon from '@mui/icons-material/Sunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useKTheme()

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            sss {theme === 'dark' ? <SunnyIcon /> : <BedtimeIcon />}
        </button>
    )
}