import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {colors} from '../../../colors';
import { Text } from '../index';
import LottieView from 'lottie-react-native';

interface AnswerButtonProps {
  answerId: number;
  title: string;
  clicked: boolean;
  getValue: CallableFunction;
  activeIndex: number;
  style?: ViewStyle;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  title,
  clicked,
  getValue,
  answerId,
  activeIndex,
  style,
}: AnswerButtonProps) => {
  return (
    <Pressable
      onPress={() => {
        getValue(title, answerId, activeIndex);
      }}
      style={styles.answerButton}>
      {clicked && (
        <LottieView
          source={require('../../assets/animations/answer_animation.json')}
          style={styles.checkbox}
          resizeMode="cover"
          loop={false}
          autoPlay
        />
      )}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  answerButton: {
    display: 'flex',
    backgroundColor: 'transparent',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },

  checkbox: {
    height: 50,
    width: 130,
    position: 'absolute',
    top: 0,
    left: 0,
  },

  text: {
    marginLeft: 100,
  },
});
