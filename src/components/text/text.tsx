import React from 'react';
import { Text as DefaultText, TextStyle } from 'react-native';
import { colors } from 'src/design-system';
import { TextProps } from './text.props';
import { fonts } from 'src/assets/fonts/fonts';

export function Text({ text, ...props }: TextProps): React.JSX.Element {
  const TEXT: TextStyle = {
    // Default Value
    color: colors().grayText,
    fontSize: 16,
    fontFamily: fonts.primaryFont_400,

    // Dynamic from the props
    ...props,
  };

  return <DefaultText style={TEXT}>{text}</DefaultText>;
}
