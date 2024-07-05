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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { DEFAULT_CONTAINER } from './src/assets/styles/global';
import RootStack from 'src/routes/root-stack';
import { CustomThemeProvider } from 'src/context/theme/theme';

const App: FunctionComponent = () => {
  useAppState();
  useOnlineManager();

  return (
    <CustomThemeProvider>
      <GestureHandlerRootView style={DEFAULT_CONTAINER}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </CustomThemeProvider>
  );
};

export default App;
