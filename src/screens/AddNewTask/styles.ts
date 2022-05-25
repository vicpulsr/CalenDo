import styled from 'styled-components/native';

import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    background-color: ${({ theme }) => theme.colors.primary};

    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
    padding-top: ${getStatusBarHeight() + RFValue(28)}px;
    padding-bottom: ${getBottomSpace() + RFValue(28)}px;
`;

export const Input = styled.TextInput`
    width: 100%;
    padding: 10px 20px;
    background-color: #FFF;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.primary};
`;