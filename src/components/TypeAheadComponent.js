import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        zIndex : 1000,
        position : 'absolute'
    }
}));


const Typeahead = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            TypeAhead Component Works!
        </div>
    );
}

export default Typeahead;