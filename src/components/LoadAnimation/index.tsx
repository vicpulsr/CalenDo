import React from 'react';
import LottieView from 'lottie-react-native';

import lottie from '../../assets/lottie.json';

import {
    Container
} from './styles';

export function LoadAnimation() {
    return (
        <Container>
            <LottieView
                source={lottie}
                autoPlay
                style={{ height: 200 }}
                resizeMode="contain"
                loop
            />
        </Container>
    );
}