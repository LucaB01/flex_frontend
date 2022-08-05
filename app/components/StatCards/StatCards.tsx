import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '../index';
import s from '../../../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {colors} from '../../../colors';

interface StatCardsProps {
}

export const StatCards = ({ }: StatCardsProps) => {


  return (
    <View style={styles.statCardContainer}>
      <View style={styles.highCard}>
        <FontAwesomeIcon icon="fire" color={colors.white} size={30} />
        <Text preset="header" style={{color: colors.white}}>
          2.439
        </Text>
        <Text preset="secondary" style={{fontSize: 14, color: colors.white}}>
          kcal burnt
        </Text>
      </View>
      <View style={styles.verticalContainer}>
        <View style={[styles.wideCard, {backgroundColor: colors.primaryColor}]}>
          <FontAwesomeIcon icon="dumbbell" color={colors.black} size={30} />
          <View style={styles.textContainer}>
            <Text style={{color: colors.black}}>53</Text>
            <Text
              preset="secondary"
              style={{fontSize: 14, color: colors.black}}>
              Exercises
            </Text>
          </View>
        </View>
        <View style={[styles.wideCard]}>
          <FontAwesomeIcon icon="clock" color={colors.black} size={30} />
          <View style={styles.textContainer}>
            <Text style={{color: colors.black}}>30h</Text>
            <Text
              preset="secondary"
              style={{fontSize: 14, color: colors.black}}>
              Total time
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statCardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  verticalContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  highCard: {
    height: 150,
    width: 100,
    backgroundColor: '#2D2D2F',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  wideCard: {
    flexDirection: 'row',
    height: 60,
    width: 140,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 20,
  },

  textContainer: {
    height: '100%',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
  },
});
