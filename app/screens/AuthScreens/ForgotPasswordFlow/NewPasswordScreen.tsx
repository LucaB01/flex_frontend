import { useNavigation } from "@react-navigation/native";
import { inject } from "mobx-react";
import React, { useState } from "react";
import {
  Text,
  SizedBox,
  PrimaryButton,
  InputField,
  Background,
} from "../../../components";
import UserStore from "../../../stores/UserStore";
import translate from "../../../assets/translations/translation_config";

interface NewPasswordScreenProps {
  userStore?: UserStore;
}

const NewPasswordScreen = ({ userStore }: NewPasswordScreenProps) => {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const createNewPassword = async () => {
    setLoading(true);

    if (code && newPassword && repeatedPassword) {
      const response = await userStore?.resetPassword(
        code,
        newPassword,
        repeatedPassword
      );

      if (response) {
        navigation.reset({
          index: 0,
          routes: [{ name: "SignInScreen" as never, key: "APP" }],
        });
      }
    }

    setLoading(false);
  };

  return (
    <Background>
      <Text>{translate("newPasswordScreen.newPW")}</Text>
      <SizedBox height={20} />

      <InputField
        placeholder={translate("newPasswordScreen.codeFromEmail")}
        value={code}
        onChange={(value) => setCode(value)}
      />
      <SizedBox height={20} />
      <InputField
        placeholder={translate("newPasswordScreen.newPassword")}
        value={newPassword}
        onChange={(value) => setNewPassword(value)}
      />
      <SizedBox height={20} />

      <InputField
        placeholder={translate("newPasswordScreen.repeatNewPassword")}
        value={repeatedPassword}
        onChange={(value) => setRepeatedPassword(value)}
      />
      <SizedBox height={20} />

      <PrimaryButton
        title={translate("newPasswordScreen.submitPassword")}
        onPress={createNewPassword}
      />
    </Background>
  );
};

export default inject("userStore")(NewPasswordScreen);
