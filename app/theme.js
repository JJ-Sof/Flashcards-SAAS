'use client'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#00478e',
        },
    },
});

export default function MuiThemeProvider({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}