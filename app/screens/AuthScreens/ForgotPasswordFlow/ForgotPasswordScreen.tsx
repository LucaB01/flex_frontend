import React, {useState} from 'react';
import {View} from 'react-native';
import s from '../../../../styles';
import { SizedBox, InputField, Background, Text, PrimaryButton } from '../../../components';
import {isEmailValid} from '../../../helpers/EmailValidation';
import Toast from 'react-native-toast-message';
import UserStore from '../../../stores/UserStore';
import { inject } from 'mobx-react';
import { useNavigation } from "@react-navigation/native";
import translate from '../../../assets/translations/translation_config';

interface ForgotPasswordScreenProps {
  userStore?: UserStore;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  userStore,
}: ForgotPasswordScreenProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const sendEmail = async () => {
    setLoading(true);

    if (!isEmailValid(email)) {
      Toast.show({
        type: 'error',
        text1: 'Wrong email format!',
        visibilityTime: 3000,
      });
    }

    const response = await userStore?.forgotPassword(email.replace(/ /g, ''));
    if (response) {
      navigation.navigate('NewPasswordScreen' as never);
    }

    setLoading(false);
  };

  const checkSpace = (value: string) => {
    if (value.includes(' ')) {
      value = value.replace(' ', '');
    }
    setEmail(value);
  };

  return (
    <Background>
      <View
        style={[
          s.fullScreen,
          s.alignCenter,
          {paddingLeft: 20, paddingRight: 20},
        ]}>
        <Text>{translate('forgotPassword.forgotPasswordTitle')}</Text>
        <Text>{translate('forgotPassword.forgotPasswordDescription')}</Text>
        <SizedBox height={10} />
        <InputField
          placeholder={translate('forgotPassword.email')}
          onChange={value => {
            checkSpace(value);
          }}
          value={email}
        />
        <SizedBox height={10} />
        <SizedBox height={20} />
        <PrimaryButton
          title={translate('forgotPassword.sendEmail')}
          loading={loading}
          onPress={() => {
            sendEmail();
          }}
        />
      </View>
    </Background>
  );
};

export default inject('userStore')(ForgotPasswordScreen);
