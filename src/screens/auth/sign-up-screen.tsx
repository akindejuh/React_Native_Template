import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { TextStyle } from 'react-native';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Screen, Text, TextField } from 'src/components';
import { RegisterUserRequest } from 'src/domain/auth';
import { errorToast, successToast } from 'src/helpers';
import validator from 'validator';

const SignUpScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();

  interface IRegisterUserRequest extends RegisterUserRequest {
    confirm_password: string;
  }

  const [registerData, setRegisterData] = useState<IRegisterUserRequest>({
    email: '',
    user_name: '',
    password: '',
    confirm_password: '',
  });

  const handleInputChange = (key: keyof IRegisterUserRequest, val: string) => {
    setRegisterData(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const registerUser = useCallback(() => {
    if (!validator.isEmpty(registerData.user_name)) {
      errorToast({
        message: 'Invalid User Name!',
      });
      return;
    }

    if (!validator.isEmail(registerData.email)) {
      errorToast({
        message: 'Invalid Email!',
      });
      return;
    }

    if (!registerData.password) {
      errorToast({
        message: 'Invalid Password!',
      });
      return;
    }

    //TODO: Run SignUp Logic
    successToast({
      message: 'User Registered successfully!',
    });

    setRegisterData({
      email: '',
      user_name: '',
      password: '',
      confirm_password: '',
    });
  }, [registerData]);

  const navToSignInScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignInScreen',
    });
  };

  return (
    <Screen preset="scroll" baseAllowance={300}>
      <Text
        text="Let's get you started!"
        marginTop={40}
        marginBottom={25}
        fontSize={28}
        fontFamily={fonts.primaryFont_700}
      />

      <Text
        text="Username"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.user_name}
        setValue={text => handleInputChange('user_name', text as string)}
        placeholder="John Doe"
        autoFocus={true}
      />

      <Text
        text="Email"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.email}
        setValue={text => handleInputChange('email', text as string)}
        placeholder="johndoe@gmail.com"
        inputMode="email"
      />

      <Text
        text="Password"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.password}
        setValue={text => handleInputChange('password', text as string)}
        placeholder="********"
        secureTextEntry
        isPassword
      />

      <Text
        text="Confirm Password"
        marginBottom={7}
        fontSize={15}
        fontFamily={fonts.primaryFont_500}
      />
      <TextField
        marginBottom={15}
        value={registerData.confirm_password}
        setValue={text => handleInputChange('confirm_password', text as string)}
        placeholder="********"
        secureTextEntry
        isPassword
      />

      <Button
        text="Already have an account?"
        preset="link"
        marginLeft={'auto'}
        marginTop={15}
        marginBottom={3}
        onPress={navToSignInScreen}
        textStyle={LINK_TEXT}
      />

      <Button
        text="Register"
        marginTop={8}
        onPress={registerUser}
        disabled={
          !(
            registerData.email &&
            registerData.password &&
            registerData.user_name
          )
        }
      />
    </Screen>
  );
};

export default SignUpScreen;

const LINK_TEXT: TextStyle = {
  fontSize: 13,
};
