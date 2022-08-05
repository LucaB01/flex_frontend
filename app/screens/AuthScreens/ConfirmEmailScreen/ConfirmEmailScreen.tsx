import React, {useState} from 'react';
import {View} from 'react-native';
import s from '../../../../styles';
import { Background, Text, SizedBox, PrimaryButton, InputField } from '../../../components'
import UserStore from '../../../stores/UserStore';
import {inject} from 'mobx-react';
import { useNavigation } from "@react-navigation/native";
import translate from '../../../assets/translations/translation_config';

interface ConfirmEmailScreenProps {
  userStore?: UserStore;
}

const ConfirmEmailScreen = ({userStore}: ConfirmEmailScreenProps) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const confirmEmail = async () => {
    setLoading(true);

    const response = await userStore?.verify(code);

    if (response) {
      navigation.reset({
        index: 0,
        routes: [{name: 'SignInScreen' as never, key: 'APP'}],
      });
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
        <Text>{translate('emailConfirmation.emailConfirmationTitle')} {userStore?.currentUser?.email}</Text>
        <Text>
          {translate('emailConfirmation.emailConfirmationDescription')}
        </Text>
        <SizedBox height={10} />
        <InputField
          placeholder={translate('emailConfirmation.codeFromEmail')}
          onChange={value => {
            setCode(value);
          }}
          value={code}
        />
        <SizedBox height={10} />
        <SizedBox height={20} />
        <PrimaryButton
          title={translate('emailConfirmation.sendEmail')}
          loading={loading}
          onPress={() => {
            confirmEmail();
          }}
        />
      </View>
    </Background>
  );
};

export default inject('userStore')(ConfirmEmailScreen);
