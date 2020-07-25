import React from 'react';
import { Container } from '@material-ui/core';

const Takes = ({ type }) => {
    return (
        <Container maxWidth="md">
            Takes Works! {type}
        </Container>
    );
}

export default Takes;