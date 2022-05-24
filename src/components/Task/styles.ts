import styled, { css } from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    done: boolean;
};

export const Container = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.shape};
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: ${RFValue(15)}px;
    padding: ${RFValue(10)}px;
    border-left-color: ${({ theme }) => theme.colors.secondary};
    border-left-width: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

export const Checked = styled.View<Props>`
    height: 16px;
    width: 16px;

    align-items: center;
    justify-content: center;

    border-radius: 4px;
    border-width: 1px;
    border-color: #B2B2B2;
    
    margin-right: 10px;

    ${({ theme, done }) => done && css`
        background-color: ${theme.colors.primary};
    `}
`;

export const Text = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
`;