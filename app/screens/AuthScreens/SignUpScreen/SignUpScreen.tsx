import {useNavigation} from '@react-navigation/native';
import {inject} from 'mobx-react';
import React, {useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import s from '../../../../styles';
import {
  Background,
  SizedBox,
  Text,
  InputField,
  PrimaryButton,
} from '../../../components';
import UserStore from '../../../stores/UserStore';
import translate from '../../../assets/translations/translation_config';

interface SignUpScreenProps {
  userStore?: UserStore;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({
  userStore,
}: SignUpScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigation = useNavigation();

  const signUp = async () => {
    setLoading(true);

    if (password === '') {
      Toast.show({
        type: 'error',
        text1: 'nix gut',
        visibilityTime: 3000,
      });
      setLoading(false);
      return;
    }

    const response = await userStore?.signUp(email, password);
    const currentUser = userStore?.currentUser;

    if (response && currentUser) {
      navigation.navigate('ConfirmEmailScreen' as never);
    }

    setLoading(false);
  };

  return (
    <Background>
      <View
        style={[
          s.fullScreen,
          s.alignCenter,
          {paddingLeft: 20, paddingRight: 20},
        ]}>
        <Text>{translate('signUp.signUpScreenTitle')}</Text>
        <SizedBox height={10} />
        <InputField
          placeholder={translate('signUp.email')}
          onChange={value => {
            setEmail(value);
          }}
        />
        <SizedBox height={10} />
        <InputField
          placeholder={translate('signUp.password')}
          onChange={value => {
            setPassword(value);
          }}
        />
        <SizedBox height={10} />
        <InputField
          placeholder={translate('signUp.repeatPassword')}
          onChange={value => {
            setPassword(value);
          }}
        />
        <SizedBox height={10} />
        <PrimaryButton
          loading={loading}
          title={translate('signUp.signUp')}
          onPress={() => {
            signUp();
          }}
        />
      </View>
    </Background>
  );
};

export default inject('userStore')(SignUpScreen);
