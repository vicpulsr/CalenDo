import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS
} from 'react-native-reanimated';

import calendarPlus from '../../assets/calendar-plus.png';
import calendar from '../../assets/calendar.png';

import {
    Container
} from './styles';

export function Splash({ onLayout }) {
    const splashAnimation = useSharedValue(0);
    const navigation = useNavigation();

    const calendarStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [0, -50],
                        Extrapolate.CLAMP
                    )
                }
            ],
        }
    });

    const calendarPlusStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [-50, 0],
                        Extrapolate.CLAMP
                    )
                }
            ],
        }
    });

    function startApp() {
        navigation.navigate('SignIn');
    };

    useEffect(() => {
        splashAnimation.value = withTiming(
            50,
            { duration: 2000 },
            () => {
                'worklet'
                runOnJS(startApp)();
            }
        );
    }, []);

    return (
        <Container onLayout={onLayout}>
            <Animated.View style={[calendarStyle, { position: 'absolute' }]}>
                <Image source={calendar} style={{ width: 80, height: 80 }} />
            </Animated.View>

            <Animated.View style={[calendarPlusStyle, { position: 'absolute' }]}>
                <Image source={calendarPlus} style={{ width: 80, height: 80 }} />
            </Animated.View>
        </Container>
    );
};