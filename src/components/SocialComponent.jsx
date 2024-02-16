import React from 'react';
import Box from '@mui/material/Box';
import {makeStyles } from '@mui/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';


const useStyles = makeStyles((theme) => ({
    facebook: {
        color: theme.palette.info.dark,
    },
    whatsapp: {
        color: theme.palette.success.dark,
    },
    linkedin: {
        color: theme.palette.info.main,
    },
    instagram: {
        color: '#E1306C',
    },
    hover: {
        '&:hover': {
            marginRight: '12px'
        },
        transition: '0.5s',
    }
}));


const SocialButtons = () => {
    const classes = useStyles();
    return (
        <Box display={'flex'} flexDirection={'column'}>
            <IconButton
                style={{ flexGrow: 1, display : 'block' }}
                className={classes.hover}
                size="large">
                <LinkedInIcon fontSize="large" className={classes.linkedin} />
            </IconButton>
            <IconButton
                style={{ flexGrow: 1 , display : 'block' }}
                className={classes.hover}
                size="large">
                <InstagramIcon fontSize="large" className={classes.instagram} />
            </IconButton>
            <IconButton
                style={{ flexGrow: 1, display : 'block'  }}
                className={classes.hover}
                size="large">
                <FacebookIcon fontSize="large" className={classes.facebook} />
            </IconButton>
            <IconButton
                style={{ flexGrow: 1, display : 'block'  }}
                className={classes.hover}
                size="large">
                <WhatsAppIcon fontSize="large" className={classes.whatsapp} />
            </IconButton>
            <IconButton
                style={{ flexGrow: 1 , display : 'block' }}
                className={classes.hover}
                size="large">
                <GitHubIcon fontSize="large" />
            </IconButton>
        </Box>
    );
}

export default SocialButtons;