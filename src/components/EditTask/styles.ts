import styled from 'styled-components/native';

import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;

    background-color: ${({ theme }) => theme.colors.primary};

    padding-left: ${RFValue(15)}px;
    padding-right: ${RFValue(15)}px;
    padding-top: ${getStatusBarHeight() + RFValue(28)}px;
    padding-bottom: ${getBottomSpace() + RFValue(28)}px;
`;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

export const HeaderText = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
    text-align: left;
    align-self: flex-start;
`;

export const Title = styled.TextInput`
    width: 100%;
    padding: 10px 20px;
    background-color: #FFF;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.primary};
`;