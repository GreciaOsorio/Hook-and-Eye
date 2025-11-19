import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const themes = {
    light: 'light',
    dark: 'dark',
    ocean: 'ocean',
};

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || themes.light;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    return(
        <ThemeContext.Provider value={{ theme, setTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if(!context) {
        throw new Error('useThme must be used within ThemeProvider')
    }
    return context;
}