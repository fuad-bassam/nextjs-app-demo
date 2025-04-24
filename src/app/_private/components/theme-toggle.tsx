'use client'

import { useKTheme } from "../Context/KThemeContext"

import SunnyIcon from '@mui/icons-material/Sunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useKTheme()

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Toggle ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? <SunnyIcon /> : <BedtimeIcon />}
        </button>
    )
}