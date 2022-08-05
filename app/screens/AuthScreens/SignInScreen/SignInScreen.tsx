import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import s from '../../../../styles';
import { useNavigation } from "@react-navigation/native";
import {
  Background,
  SizedBox,
  InputField,
  PrimaryButton,
  Text,
} from '../../../components/index';
import UserStore from '../../../stores/UserStore';
import {inject} from 'mobx-react';
import Toast from 'react-native-toast-message';
import translate from '../../../assets/translations/translation_config';

interface SignInProps {
  userStore?: UserStore;
}

const SignInScreen: React.FC<SignInProps> = ({userStore}: SignInProps) => {
  const [email, setEmail] = useState('luca@boehlerbrothers.com');
  const [password, setPassword] = useState('Test1234');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);

    const response = await userStore?.signIn(email, password);

    switch (response) {
      case 'true':
        navigation.navigate('HomeScreen' as never);
        break;
      case 'setupNotCompleted':
        navigation.navigate('WorkoutQuestionsScreen' as never);
        break;
      case 'confirm':
        navigation.navigate('ConfirmEmailScreen' as never);
        break;
      case 'false':
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          visibilityTime: 3000,
        });
        break;
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
        <Text>{translate('signIn.loginScreenTitle')}</Text>
        <SizedBox height={10} />
        <InputField
          placeholder={translate('signIn.email')}
          onChange={value => {
            setEmail(value);
          }}
          value={email}
        />
        <SizedBox height={10} />
        <InputField
          placeholder={translate('signIn.password')}
          onChange={value => {
            setPassword(value);
          }}
          value={password}
        />
        <SizedBox height={20} />
        <PrimaryButton
          title={translate('signIn.signIn')}
          loading={loading}
          onPress={() => {
            signIn();
          }}
        />
        <SizedBox height={20} />
        <PrimaryButton
          title={translate('signIn.signUp')}
          onPress={() => {
            navigation.navigate('SignUpScreen' as never);
          }}
        />
        <SizedBox height={20} />
        <PrimaryButton
          title={translate('signIn.forgotPassword')}
          onPress={() => {
            navigation.navigate('ForgotPasswordScreen' as never);
          }}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default inject('userStore')(SignInScreen);
