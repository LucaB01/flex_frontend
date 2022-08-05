import {View, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Background, StatCards, Text} from '../../../components/index';
import tobsi from '../../../assets/images/tobsi.png';
import WorkoutSlider from '../../../components/WorkoutSlider/WorkoutSlider';
import WorkoutStore from '../../../stores/WorkoutStore';
import { inject } from 'mobx-react';
import UserStore from '../../../stores/UserStore';

interface HomeScreenProps {
  workoutStore?: WorkoutStore;
  userStore?: UserStore;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  workoutStore,
  userStore
}: HomeScreenProps) => {
  useEffect(() => {
    if (!workoutStore?.workoutPlan) {
      getWorkoutPlan();
    }
  }, []);

  const getWorkoutPlan = async () => {
    await workoutStore?.getWorkoutPlan();
  };

  return (
    <Background>
      <View style={styles.homeScreenContainer}>
        <View style={styles.imageContainer}>
          <Image source={tobsi} style={styles.avatar} />
          <Text preset="header">Hello, {userStore?.currentUser?.username}</Text>
        </View>
        <StatCards />
        <WorkoutSlider key={JSON.stringify(workoutStore?.workoutPlan)} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 60,
    marginRight: 60,
  },

  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50, // remove
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 99,
    marginBottom: 5,
  },
});

export default inject("workoutStore", "userStore")(HomeScreen);
