import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { fonts } from 'src/assets/fonts/fonts';
import { Button, Screen, Text, TextField } from 'src/components';
import { saveString } from 'src/configs/storage';
import { strings } from 'src/configs/strings';
import { useAuth } from 'src/context/auth/interfaces';
import { RegisterUserRequest } from 'src/domain/auth';
import { errorToast, infoToast, successToast } from 'src/helpers';
import validator from 'validator';

const SignUpScreen: FunctionComponent = (): React.JSX.Element => {
  const navigation = useNavigation();
  const { setAuth } = useAuth();

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

  const registerUser = useCallback(async () => {
    try {
      if (validator.isEmpty(registerData.user_name.trim())) {
        errorToast({
          message: 'Invalid User Name!',
        });
        return;
      }

      if (!validator.isEmail(registerData.email.trim())) {
        errorToast({
          message: 'Invalid Email!',
        });
        return;
      }

      if (!validator.isStrongPassword(registerData.password.trim())) {
        infoToast({
          message:
            'Password must be 8+ chars with upper, lower, number & special char.',
        });
        return;
      }

      if (
        registerData.password.trim() !== registerData.confirm_password.trim()
      ) {
        errorToast({
          message: 'Passwords do not match!',
        });
        return;
      }

      //TODO: Run SignUp Logic
      await saveString(strings.userToken, 'test');
      setAuth({
        id: 'test',
      });
      successToast({
        title: 'Authentication',
        message: 'Account created successfully!',
      });

      setRegisterData({
        email: '',
        user_name: '',
        password: '',
        confirm_password: '',
      });
    } catch (error) {
      errorToast({
        message:
          (error as any)?.response?.data?.msg ||
          (error as Error)?.message ||
          'Something went wrong!',
      });
    }
  }, [registerData, setAuth]);

  const navToSignInScreen = () => {
    navigation.navigate('AuthStack', {
      screen: 'SignInScreen',
    });
  };

  return (
    <Screen preset="scroll">
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
        // autoFocus={true}
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
        autoCapitalize="none"
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
      />

      <Button
        text="Register"
        marginTop={8}
        onPress={registerUser}
        disabled={
          !(
            registerData.email &&
            registerData.user_name &&
            registerData.password &&
            registerData.confirm_password
          )
        }
      />
    </Screen>
  );
};

export default SignUpScreen;
