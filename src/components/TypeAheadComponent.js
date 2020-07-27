import React, { useEffect} from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch,useSelector } from 'react-redux';
import  { selectedFriend, clearFriend } from '../redux/ActionCreators';

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 1000,
        position: 'absolute',
        marginTop: '0.5rem',
        backgroundColor: `rgba(255,255,200,0.8)`,
        '& :hover': {
            backgroundColor: `rgba(255,255,200,0.9)`,
        },
    },
    listItem: {
        color: 'black',
        padding: theme.spacing(2),
        cursor: 'grab',
        width: '100%'
    },
    infoBox : {
        padding : theme.spacing(2),
        borderRadius  : '0.3rem',
        backgroundColor : theme.palette.info.light,
        color : theme.palette.grey.main,
        marginTop : '0.5rem',
        marginBottom : '0.5rem'
    }
}));


const Typeahead = ({ users, username, width, searched, setUsers, open, setOpen }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectFriend = useSelector(state=> state.gives.selectedFriend);
    const handleClick = (user) => {
        setOpen(false);
        dispatch(selectedFriend(user.username,user.name));
    }

    const handleClear = () => {
        setOpen(true);
        setUsers([]);
        dispatch(clearFriend());
    }

    useEffect(()=> {

    },[selectFriend]);
    if (username !== '' && ((selectFriend == null && !searched) || open ))
        return (
            <div className={classes.root} style={{ width: width, display : open && users.length!==0 ? 'block' : 'none' }}>
                {
                    users.slice(0, 5).map((user, index) => {
                        return (
                            <div className={classes.listItem} key={index} onClick={()=> handleClick(user)}>
                                <Typography variant="body1" align="center" display="block">{user.name}</Typography>
                                <Typography variant="body2" align="center" display="block">{user.username}</Typography>
                            </div>);
                    })
                }
            </div> 
        );
    else if(selectFriend!== null)
        return (
            <div className={classes.infoBox}>
                <Typography variant="h5" display="block">{selectFriend ? selectFriend.name  : ''}</Typography>
                <Typography variant="h6" display="block">{selectFriend ? selectFriend.username : ''}</Typography>
                <Box textAlign="right"> <Button color="secondary" onClick={handleClear} variant="contained"> Clear </Button></Box>
            </div>
            );
    else if(searched && users.length === 1) {
            setOpen(false);
            return (
                <div className={classes.infoBox}>
                     <Typography variant="h5" display="block">{users[0].name}</Typography>
                     <Typography variant="h6" display="block">{users[0].username}</Typography>
                     <Box textAlign="right"> <Button color="primary" onClick={()=> handleClick(users[0])} variant="contained"> Select </Button></Box>
                </div>
            );
    }
    else if (searched && users.length === 0) {
        return (<div>
            No User with username {username} found !
        </div>);
    }
    else
        return (<div className={classes.root} />);
}

export default Typeahead;