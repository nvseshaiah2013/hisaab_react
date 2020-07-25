import React from 'react';
import { Container } from '@material-ui/core';

const Gives = ({ type }) => {
    return (
        <Container maxWidth="md">
            Gives Works! {type}
        </Container>
    );
}

export default Gives;