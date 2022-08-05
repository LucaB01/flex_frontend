import React from 'react';
import { View } from 'react-native';

interface SizedBoxProps {
  width?: number;
  height?: number;
}

export const SizedBox: React.FC<SizedBoxProps> = ({ width = 0, height = 0 }: SizedBoxProps) => {
  return <View style={{ width: width, height: height }}></View>;
};
