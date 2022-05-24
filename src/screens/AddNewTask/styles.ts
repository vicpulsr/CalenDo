import styled from 'styled-components/native';

import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    background-color: ${({ theme }) => theme.colors.primary};

    padding-left: ${RFValue(10)}px;
    padding-right: ${RFValue(10)}px;
    padding-top: ${getStatusBarHeight() + RFValue(28)}px;
    padding-bottom: ${getBottomSpace()}px;
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(25)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    text-align: center;
    margin: 0 auto;
`;

export const ButtonAdd = styled(RectButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    margin: 0 auto;
    margin-top: 30px;
    padding: 5px;

    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
`;

export const TextButton = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Input = styled.TextInput`
    width: 100%;
    padding: 10px 20px;
    background-color: #FFF;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.primary};
`;