import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(RectButton)`
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

export const Text = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(15)}px;
    font-family: ${({ theme }) => theme.fonts.medium};
`;