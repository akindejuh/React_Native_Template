/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FunctionComponent, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAppState } from './src/hooks/use-app-state';
import { useOnlineManager } from './src/hooks/use-online-manager';
import { Button } from './src/components/button/button';
import { View } from './src/components/view/view';
import { Screen } from './src/components/screen/screen';
import { Text } from './src/components/text/text';
import { TextField } from './src/components/text-field/text-field';

const App: FunctionComponent = () => {
  useAppState();
  useOnlineManager();

  const [val, setVal] = useState<string>('');

  return (
    <SafeAreaProvider>
      <Screen statusBar="light-content" preset="scroll" paddingHorizontal={20}>
        <View marginTop={'auto'}>
          <Text marginTop={30} text="AGMA Design System" />
          <TextField
            marginTop={20}
            value={val}
            setValue={setVal}
            inputMode="email"
          />
          <TextField marginTop={10} value={val} setValue={setVal} isPassword />
          <TextField
            marginTop={10}
            value={val}
            setValue={setVal}
            inputMode="email"
            multiline
            editable={false}
          />

          <Button marginTop={20} text="Continue" />
          <Button
            marginTop={10}
            preset="secondary"
            text="Pause"
            isLoading={false}
          />
        </View>
      </Screen>
    </SafeAreaProvider>
  );
};

export default App;
