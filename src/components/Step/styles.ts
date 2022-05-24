import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    border-radius: 5px;
    padding: 5px 10px;
    margin: 10px 0;
`;

export const NumberWrapper = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};

    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;
    border-radius: 50%;

    margin-right: 10px;
`;

export const Number = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;