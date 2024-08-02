import React, { FunctionComponent } from 'react';
import { Button, Screen, Text } from 'src/components';
import { reset } from 'src/configs/storage';
import { useAuth } from 'src/context/auth/interfaces';

const HomeScreen: FunctionComponent = (): React.JSX.Element => {
  const { setAuth } = useAuth();

  const logOut = async () => {
    await reset();
    setAuth(null);
  };

  return (
    <Screen preset="fixed">
      <Text text="Home Screen" marginTop={20} />

      <Button
        text="Sign Out"
        marginBottom={10}
        marginTop={'auto'}
        onPress={logOut}
      />
    </Screen>
  );
};

export default HomeScreen;
