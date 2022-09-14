import { View, StyleSheet, Pressable, LayoutChangeEvent } from "react-native";
import React, { useState } from "react";
import {
  Background,
  Text,
  Header,
  InputField,
  PrimaryButton,
  Line,
} from "../../../../components";
import { inject, observer } from "mobx-react";
import UserStore from "../../../../stores/UserStore";
import { colors } from "../../../../../colors";
import { Toggle } from "../../../../components/CustomToggle/CustomToggle";

interface UserSettingScreenProps {
  userStore?: UserStore;
}

const UserSettingScreen = ({ userStore }: UserSettingScreenProps) => {
  const currentUser = userStore?.currentUser;

  return (
    <Background>
      <Header backIcon title="Persönliche Angaben" />
      <View style={styles.screenContainer}>
        <InputField label="Email" value={currentUser?.email} editable={false} />
        <InputField
          containerStyle={{ marginTop: 12 }}
          label="Name"
          value={currentUser?.username}
          editable={false}
        />
        <PrimaryButton
          style={{ marginTop: 24 }}
          preset="white"
          title="Passwort ändern"
          onPress={() => {}}
        />
        <Line />
        <Toggle leftText="Metric" rightText="Imperial" />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
});

export default inject("userStore")(observer(UserSettingScreen));
