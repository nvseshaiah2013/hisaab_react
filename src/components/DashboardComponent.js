import React from 'react';
import { Container,Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/ActionCreators';

const Dashboard = () => {
    const dispatch = useDispatch();
    return (
        <Container>
            Dashboard Works!
            <Button onClick={() => dispatch(logout())}>Log Out</Button>
        </Container>
    );
};

export default Dashboard;