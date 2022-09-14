import React, {ReactChild, ReactChildren} from 'react';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import {Text as Txt} from 'react-native';
import {colors} from '../../../colors';
import {presets, TextPresets} from './TextPresets';

interface TextProps {
  children?:
    | ReactChild
    | ReactChildren
    | ReactChild[]
    | (string | number | undefined)[];
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  preset?: TextPresets;
}

export const Text: React.FC<TextProps> = ({
  children,
  style,
  numberOfLines,
  preset = 'default',
}: TextProps) => {
  const presetStyle = presets[preset] as any;

  if (numberOfLines) {
    return (
      <Txt
        numberOfLines={numberOfLines}
        style={[styles.text, presetStyle, style]}>
        {children}
      </Txt>
    );
  }
  return <Txt style={[styles.text, presetStyle, style]}>{children}</Txt>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: colors.white,
  },
});
