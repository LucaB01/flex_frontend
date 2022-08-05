import {inject} from 'mobx-react';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Fold} from 'react-native-animated-spinkit';
import {colors} from '../../../../colors';
import s from '../../../../styles';
import {Background, Text} from '../../../components';
import UserStore from '../../../stores/UserStore';
import WorkoutQuestionStore from '../../../stores/WorkoutQuestionStore';

interface GenerateWorkoutLoadingScreenProps {
  userStore?: UserStore;
  workoutQuestionStore: WorkoutQuestionStore;
}

const GenerateWorkoutLoadingScreen = ({
  userStore,
  workoutQuestionStore,
}: GenerateWorkoutLoadingScreenProps) => {
  useEffect(() => {
    if (!userStore?.currentUser?.setupCompleted) {
      //setSetupCompleted();
    }
    uploadUserAnswers();
  }, []);

  const setSetupCompleted = async () => {
    if (userStore?.currentUser) {
      const user = {...userStore?.currentUser};
      user.setupCompleted = true;
      await userStore?.updateUser(user);
    }
  };

  const uploadUserAnswers = async () => {
    const res = await workoutQuestionStore.createUserAnswer();

    if (res) {
      // Generate Workout with FUCKING SICK ALGORITHM 🔥
    }
  };

  return (
    <Background>
      <View
        style={[s.fullScreen, s.center, {paddingLeft: 50, paddingRight: 50}]}>
        <Fold style={{marginBottom: 10}} size={25} color={colors.white} />
        <Text>
          We are currently generating your workoutplan. This may take a few
          seconds
        </Text>
      </View>
    </Background>
  );
};

export default inject(
  'userStore',
  'workoutQuestionStore',
)(GenerateWorkoutLoadingScreen);
