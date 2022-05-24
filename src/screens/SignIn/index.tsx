import React, { useState } from "react";
import { Alert, ActivityIndicator, Platform } from "react-native";

import AppleSvg from '../../assets/apple.svg';

import { SignInSocialButton } from "../../components/SignInSocialButton";
import theme from "../../global/styles/theme";

import { useAuth } from "../../hooks/Auth";

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styles';

export function SignIn() {
    const { signInWithApple } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignInWithApple() {
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Apple');
            setIsLoading(false);
        };
    };

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    {/* <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    /> */}

                    <Title>
                        Cadastre {'\n'}
                        suas tarefas {'\n'}
                        de forma muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Faça seu login
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    {Platform.OS === 'ios' && 
                        <SignInSocialButton
                            title="Entrar com apple"
                            svg={AppleSvg}
                            onPress={handleSignInWithApple}
                        />
                    }
                </FooterWrapper>

                {isLoading &&
                    <ActivityIndicator
                        color={theme.colors.shape}
                        style={{ marginTop: 18 }}
                    />
                }
            </Footer>
        </Container>
    );
};