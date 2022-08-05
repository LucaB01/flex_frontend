import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserStore from '../../../stores/UserStore';
import {inject, observer} from 'mobx-react';
import {Background, PrimaryButton, Text} from '../../../components';

interface ProfileScreenProps {
  userStore?: UserStore;
}

const ProfileScreen = ({userStore}: ProfileScreenProps) => {
  const [first, setfirst] = useState(1);

  return (
    <Background>
      <Text>{userStore?.currentUser?.email}</Text>
      <Text>{first}</Text>
      <PrimaryButton title="Toggle" onPress={() => {
        setfirst(2);
      }} />
    </Background>
  );
};

export default inject('userStore')(observer(ProfileScreen));
