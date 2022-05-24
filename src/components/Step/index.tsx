import React from 'react';

import {
    Container,
    NumberWrapper,
    Number,
    Text
} from './styles';

interface Props {
    number: number;
    text: string;
};

export function Step({
    number,
    text,
}: Props) {
    return (
        <Container>
            <NumberWrapper>
                <Number>{number}</Number>
            </NumberWrapper>
            <Text>{text}</Text>
        </Container>
    );
};