import React from 'react';
import {KeyboardTypeOptions, StyleProp, StyleSheet, TextInput, TextStyle, ViewStyle} from 'react-native';

interface InputFieldProps {
  placeholder?: string;
  onChange?: (event) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  maxLength?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onTouch?: () => void;
  editable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  autoCapitalize?: 'none' | 'words';
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  onChange,
  keyboardType,
  secureTextEntry,
  maxLength,
  value,
  style = styles.input,
  textStyle,
  onTouch,
  editable = true,
  autoCapitalize = 'words',
  onSubmitEditing,
  autoFocus,
}: InputFieldProps) => {
  return (
      <TextInput
        autoFocus={autoFocus}
        onTouchStart={onTouch}
        keyboardType={keyboardType}
        placeholderTextColor="#FFFFFF"
        style={[styles.input, style, textStyle]}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        onChangeText={event => {
          if (onChange) {
            onChange(event);
          }
        }}
        value={value}
        editable={editable}
        secureTextEntry={secureTextEntry} />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    padding: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#FFFFFF',
  },
});
