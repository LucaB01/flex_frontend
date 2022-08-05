import React from 'react';
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import {Fold} from 'react-native-animated-spinkit';
import {colors} from '../../../colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textStyleDisabled?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  title,
  loading,
  style,
  disabledStyle = styles.disabledPrimaryButton,
  textStyleDisabled = styles.buttonText,
  textStyle = styles.buttonText,
  disabled,
}: PrimaryButtonProps) => {

  const buttonStyle = [styles.primaryButton, style];

  if (disabled) {
    buttonStyle.push(disabledStyle);
  }

  if (loading) {
    return (
      <Pressable
        style={[disabledStyle ? disabledStyle : {}, style]}
        disabled={true}>
        <Fold size={25} color={colors.white} />
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={buttonStyle}
      disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    borderRadius: 8,
    width: '100%',
    height: 45,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(136, 154, 175, 0.15)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 2,
  },

  disabledPrimaryButton: {
    opacity: 0.5,
  },

  buttonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: colors.black,
  },
});
