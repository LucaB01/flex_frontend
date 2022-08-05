import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';

import {View, Pressable, Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../colors';

const {width} = Dimensions.get('window');

export const TabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName = '';

        switch (label) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Workout':
            iconName = 'dumbbell';
            break;
          case 'Profile':
            iconName = 'user';
            break;
          default:
            break;
        }

        return (
          <View key={index} style={[styles.mainItemContainer]}>
            <Pressable
              onPress={onPress}
              style={{
                backgroundColor: isFocused ? '#030D16' : colors.darkBlue,
                borderRadius: 20,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                  padding: 10,
                }}>
                <FontAwesomeIcon
                  icon={iconName}
                  color={colors.primaryColor}
                  size={30}
                />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    backgroundColor: colors.darkBlue,
    borderRadius: 25,
    marginHorizontal: width * 0.1,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    borderColor: '#333B42',
  },
});
