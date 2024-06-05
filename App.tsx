/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppState } from './src/hooks/use-app-state';
import { useOnlineManager } from './src/hooks/use-online-manager';
import SignIn from 'src/screens/auth/sign-in';

const App: FunctionComponent = () => {
  useAppState();
  useOnlineManager();

  return (
    <SafeAreaProvider>
      <SignIn />
    </SafeAreaProvider>
  );
};

export default App;
