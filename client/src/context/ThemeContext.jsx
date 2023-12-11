import React, { createContext, useState, useContext } from "react";

export const ThemeContext = createContext({
    currentTheme: "light",
    setCurrentTheme: () => {},
    theme: {
        light: {
            bgColor: "bg-white",
            textColor: "text-dark",
            btnVariant: "primary",
            tableBgColor: "table-light"
        },
        dark: {
            bgColor: "bg-dark",
            textColor: "text-light",
            btnVariant: "success",
            tableBgColor: "table-dark"
        },
    },
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState("light");

    const toggleTheme = () => {
        setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const theme = {
        light: {
            bgColor: "bg-white",
            textColor: "text-dark",
            btnVariant: "primary",
            tableBgColor: "table-light"
        },
        dark: {
            bgColor: "bg-dark",
            textColor: "text-light",
            btnVariant: "success",
            tableBgColor: "table-dark"
        },
    };

    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme: toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};