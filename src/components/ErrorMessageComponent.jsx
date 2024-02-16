import React from 'react';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

const ErrorMessage = ({message}) => {
    return (
        <Typography 
            variant="subtitle2" 
            display="block" 
            align="left" 
            style={{ 
                    color : 'white',
                    backgroundColor : red[500],
                    padding : '0.4rem', 
                    fontWeight : 'bolder', 
                    borderRadius : '4px', 
                    width : 'fit-content' 
                }}> 
                    {message} 
        </Typography>
    );
}

export default ErrorMessage;