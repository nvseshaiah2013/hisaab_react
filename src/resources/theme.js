import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Raleway',
            'Patrick Hand',
            'sans-serif',
            'Roboto'
        ],
    },
    overrides: {
        MuiButton: {
            label: {
                textTransform: 'capitalize',
                fontWeight: 'bolder'
            }
        },
        MuiTooltip: {
            tooltip: {
                fontWeight: 'bolder',
                fontSize: '1rem',
                lineHeight: '1.5rem'
            }
        },
        MuiTableCell: {
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
                '&:first-child': {
                    borderTopLeftRadius: '10px'
                },
                '&:last-child': {
                    borderTopRightRadius: '10px'
                },
                textAlign : 'center'
            }
        },
    }
});

