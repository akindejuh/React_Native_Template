import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Screen, Text, TextField } from 'src/components';
import { useAuth } from 'src/context/auth/interfaces';
import { LoginUserRequest } from 'src/domain/auth';
import { errorToast, successToast } from 'src/helpers';
import validator from 'validator';

const SignInScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();
  const { setAuth } = useAuth();

  const [loginData, setLoginData] = useState<LoginUserRequest>({
    email: '',
    password: '',
  });

  const handleInputChange = (key: keyof LoginUserRequest, val: string) => {
    setLoginData(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const loginUser = useCallback(() => {
    try {
      if (!validator.isEmail(loginData.email.trim())) {
        errorToast({
          message: 'Invalid Email!',
        });
        return;
      }

      if (validator.isEmpty(loginData.password.trim())) {
        errorToast({
          message: 'Invalid Password!',
        });
        return;
      }

      //TODO: Run SignIn Logic
      setAuth({
        id: 'test',
      });
      successToast({
        title: 'Authentication',
        message: 'User Logged in successfully!',
      });

      setLoginData({
        email: '',
        password: '',
      });
    } catch (error) {
      errorToast({
        message:
          (error as any)?.response?.data?.msg ||
          (error as Error)?.message ||
          'Something went wrong!',
      });
    }
  }, [loginData, setAuth]);

  const navToSignUpScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignUpScreen',
    });
  };

  return (
    <Screen preset="scroll">
      <Text
        text="Welcome Back!"
        marginTop={40}
        marginBottom={25}
        fontSize={28}
        fontFamily={fonts.primaryFont_700}
      />

      <Text
        text="Email"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={loginData.email}
        setValue={text => handleInputChange('email', text as string)}
        placeholder="johndoe@gmail.com"
        inputMode="email"
        autoCapitalize="none"
        // autoFocus={true}
      />

      <Text
        text="Password"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={loginData.password}
        setValue={text => handleInputChange('password', text as string)}
        placeholder="********"
        secureTextEntry
        isPassword
      />

      <Button
        text="Don't have an account?"
        preset="link"
        marginLeft={'auto'}
        marginTop={15}
        marginBottom={3}
        onPress={navToSignUpScreen}
      />

      <Button
        text="Login"
        marginTop={8}
        onPress={loginUser}
        disabled={!(loginData.email && loginData.password)}
      />
    </Screen>
  );
};

export default SignInScreen;
