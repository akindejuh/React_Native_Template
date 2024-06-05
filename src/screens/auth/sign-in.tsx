import React, { FunctionComponent, useState } from 'react';
import { Screen, Text, TextField } from 'src/components';

const SignIn: FunctionComponent = (): React.JSX.Element => {
  const [value, setValue] = useState<string>('');

  return (
    <Screen preset="scroll" baseAllowance={40}>
      <Text text="Sign In" marginTop={40} />
      <TextField value={value} setValue={setValue} marginTop={10} />
    </Screen>
  );
};

export default SignIn;
