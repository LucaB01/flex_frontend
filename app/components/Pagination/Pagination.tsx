import {StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../../../colors';
import {SizedBox} from '../index';

interface PaginationProps {
  length: number;
  activeIndex: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  length,
  activeIndex,
}: PaginationProps) => {
  const renderLines = () => {
    return [...Array(length)].map((e, i) => {
      let backgroundColor = '#535353';
      let margin = {};

      if (i === activeIndex) {
        backgroundColor = colors.primaryColor;
      }
      if (i !== length) {
        margin = {marginRight: 5};
      }

      return (
        <View
          key={i}
          style={[styles.line, {backgroundColor: backgroundColor}, margin]}
        />
      );
    });
  };

  return (
    <View key={activeIndex} style={styles.paginationContainer}>
      {renderLines()}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 10,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  line: {
    flex: 1,
    height: 3,
    borderRadius: 30,
    backgroundColor: '#535353',
  },
});
