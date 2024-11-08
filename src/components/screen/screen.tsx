import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isNonScrolling, offsets, presets } from './screen.presets';
import { ScreenProps } from './screen.props';
import { useCustomTheme } from 'src/context/theme/interfaces';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const { colors, currentTheme } = useCustomTheme();

  const preset = presets.fixed;

  const backgroundStyle: ViewStyle = {
    backgroundColor: colors.background,
  };

  const screenStyle: ViewStyle = {
    paddingHorizontal: 18,
    ...props,
  };

  const baseAllowanceStyle: ViewStyle = {
    marginBottom: props.baseAllowance || 1,
  };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        barStyle={
          props.statusBar ?? currentTheme === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={colors.background}
        {...props.statusBarProps}
      />
      <View testID={props.testID} />
      {props.header}
      {props.unsafe ? (
        <View style={[preset.inner, screenStyle]}>
          {props.children}
          <View style={baseAllowanceStyle} />
        </View>
      ) : (
        <SafeAreaView>
          <View style={[preset.inner, screenStyle]}>
            {props.children}
            <View style={baseAllowanceStyle} />
          </View>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const { colors, currentTheme } = useCustomTheme();

  const insets = useSafeAreaInsets();
  const preset = presets.scroll;
  const backgroundStyle: ViewStyle = {
    backgroundColor: props.backgroundColor || colors.background,
  };

  const insetStyle: ViewStyle = {
    paddingTop: props.unsafe ? 0 : insets.top,
  };

  const screenStyle: ViewStyle = {
    paddingHorizontal: 18,
    ...props,
  };

  const baseAllowanceStyle: ViewStyle = {
    marginBottom: (props.baseAllowance || 350) + (isIos ? 20 : 0),
  };

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        barStyle={
          props.statusBar ?? currentTheme === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={colors.background}
        {...props.statusBarProps}
      />
      <View
        testID={props.testID}
        style={[preset.outer, backgroundStyle, insetStyle]}>
        {props.header}
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, screenStyle]}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={
            props.keyboardShouldPersistTaps || 'handled'
          }
          refreshControl={props.refreshControl}
          ref={props.innerRef || null}>
          {props.children}
          <View style={baseAllowanceStyle} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset || 'fixed')) {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}
