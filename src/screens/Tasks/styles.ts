import styled from 'styled-components/native';

import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    flex: 1;
    display: flex;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.primary};

    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
    padding-top: ${getStatusBarHeight() + RFValue(28)}px;
    padding-bottom: ${getBottomSpace()}px;
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    margin-top: 10px;
`;
