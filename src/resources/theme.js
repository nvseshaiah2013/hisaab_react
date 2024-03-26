import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: [
            'Special Elite',
            'sans-serif'
        ].join(','),
    },
    components: {
        MuiTextField : {
            styleOverrides : {
                root : {
                    margin : '1rem auto',
                    '& input:valid + fieldset': {
                        borderColor: '#2196f3',
                        borderWidth: 2,
                    },
                    '& input:invalid + fieldset': {
                        borderColor: '#d32f2f',
                        borderWidth: 2,
                    },
                    '& input:valid:focus + fieldset': {
                        borderLeftWidth: 6,
                        padding: '4px !important',
                    },
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    fontWeight: 'bolder',
                    letterSpacing : '1.2px'
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontWeight: 'bolder',
                    fontSize: '1rem',
                    lineHeight: '1.5rem'
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root : {
                    padding : '24px'
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                body: {
                    fontWeight: '200',
                    '&:hover': {
                        backgroundColor: 'rgb(110,107,96,0.2)',
                        borderBottom : '2px solid grey'
                    },
                    borderBottom : '2px solid transparent',
                    textAlign : 'center'
                },
                head: {
                    borderBottom : '2px solid grey',
                    fontWeight: 'bolder',
                    backgroundColor: 'rgb(110,110,110,0.9)',
                    '&:first-of-type': {
                        borderTopLeftRadius: '10px'
                    },
                    '&:last-child': {
                        borderTopRightRadius: '10px'
                    },
                    textAlign : 'center'
                }
            }
        }
    }
});