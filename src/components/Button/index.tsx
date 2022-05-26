import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
    Container,
    Text
} from './styles';

interface Props extends RectButtonProps {
    title: string;
};

export function Button({
    title,
    ...rest
}: Props) {
    return (
        <Container {...rest}>
            <Text>{title}</Text>
        </Container>
    );
};