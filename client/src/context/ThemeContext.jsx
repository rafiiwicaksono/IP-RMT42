import { createContext, useState } from "react";

export const themeContext = createContext({
    currentTheme: "light",
    setCurrentTheme: () => { },
    theme: {
        light: {
            bgColor: "bg-white",
            textColor: "text-dark",
            btnVariant: "primary"
        },
        dark: {
            bgColor: "bg-dark",
            textColor: "text-light",
            btnVariant: "success"
        }
    }
})

export default function ThemeProvider(props) {
    const [currentTheme, setCurrentTheme] = useState("light")
    return (
        <themeContext.Provider
            value={{
                currentTheme: currentTheme,
                setCurrentTheme: setCurrentTheme,
                theme: {
                    light: {
                        bgColor: "bg-white",
                        textColor: "text-dark",
                        btnVariant: "primary"
                    },
                    dark: {
                        bgColor: "bg-dark",
                        textColor: "text-light",
                        btnVariant: "success"
                    }
                }
            }}
        >
            {props.children}
        </themeContext.Provider>
    )
}