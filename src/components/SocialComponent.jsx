import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';


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
            <IconButton style={{ flexGrow: 1, display : 'block' }} className={classes.hover} >
                <LinkedInIcon fontSize="large" className={classes.linkedin} />
            </IconButton>
            <IconButton style={{ flexGrow: 1 , display : 'block' }} className={classes.hover}>
                <InstagramIcon fontSize="large" className={classes.instagram} />
            </IconButton>
            <IconButton  style={{ flexGrow: 1, display : 'block'  }} className={classes.hover}>
                <FacebookIcon fontSize="large" className={classes.facebook} />
            </IconButton>
            <IconButton  style={{ flexGrow: 1, display : 'block'  }} className={classes.hover} >
                <WhatsAppIcon fontSize="large" className={classes.whatsapp} />
            </IconButton>
            <IconButton style={{ flexGrow: 1 , display : 'block' }} className={classes.hover} >
                <GitHubIcon fontSize="large" />
            </IconButton>
        </Box>
    );
}

export default SocialButtons;