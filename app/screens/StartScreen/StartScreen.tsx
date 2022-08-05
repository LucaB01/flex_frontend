import {useNavigation} from '@react-navigation/native';
import {inject} from 'mobx-react';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {colors} from '../../../colors';
import UserStore from '../../stores/UserStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fold} from 'react-native-animated-spinkit';
import WorkoutStore from '../../stores/WorkoutStore';
import {Background} from '../../components';

interface StartScreenProps {
  userStore?: UserStore;
  workoutStore?: WorkoutStore;
}

const StartScreen = ({userStore, workoutStore}: StartScreenProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    void check();
    return () => {
      null;
    };
  }, []);

  const check = async () => {
    let currentUser = userStore?.currentUser;

    const token = await AsyncStorage?.getItem('token');
    console.log(token);
    if (token) {
      await userStore?.getCurrentUser();
      currentUser = userStore?.currentUser;
      await workoutStore?.getWorkoutPlan();

      if (token && currentUser) {
        if (!currentUser.confirmed) {
          navigation.navigate({
            name: 'ConfirmEmailScreen' as never,
            key: 'APP',
          });
        }
        if (!currentUser?.setupCompleted) {
          navigation.reset({
            index: 0,
            routes: [{name: 'WorkoutQuestionsScreen' as never, key: 'APP'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'HomeScreen' as never, key: 'APP'}],
          });
        }
      } else {
        await AsyncStorage.clear();
        navigation.navigate({name: 'SignInScreen' as never, key: 'APP'});
      }
    } else {
      await AsyncStorage.clear();
      navigation.navigate({name: 'SignInScreen' as never, key: 'APP'});
    }
  };

  return (
    <Background>
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Fold size={25} color={colors.white} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
  },

  icon: {
    width: 200,
    height: 200,
  },

  backgroundVideo: {
    minWidth: '100%',
    height: 200,
  },
});

export default inject('userStore', 'workoutStore')(StartScreen);
