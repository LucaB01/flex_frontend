import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import UserStore from "../../../stores/UserStore";
import { inject, observer } from "mobx-react";
import { Background, PrimaryButton, Text } from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import s from "../../../../styles";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../../colors";

interface ProfileScreenProps {
  userStore?: UserStore;
}

const ProfileScreen = ({ userStore }: ProfileScreenProps) => {
  const currentUser = userStore?.currentUser;
  const navigation = useNavigation();

  return (
    <Background>
      <View style={styles.screenContainer}>
        <View
          style={[
            s.row,
            s.alignCenter,
            { paddingLeft: 12, marginTop: 30, marginBottom: 24 },
          ]}
        >
          {currentUser?.avatar ? (
            <Image source={{ uri: currentUser?.avatar }} />
          ) : (
            <FontAwesomeIcon icon="user-circle" color="white" size={50} />
          )}
          <Text
            style={{ marginLeft: 12 }}
            numberOfLines={1}
            preset="smallTitle"
          >
            {currentUser?.email}
          </Text>
        </View>
        <PrimaryButton
          leftIcon={"user-edit"}
          leftIconColor={colors.primaryColor}
          leftIconSize={25}
          preset="secondary"
          style={{
            justifyContent: "flex-start",
            paddingLeft: 24,
            height: 60,
            marginTop: 20,
          }}
          textStyle={{ paddingLeft: 12 }}
          title="Persönliche Einstellungen"
          onPress={() => navigation.navigate("UserSettingScreen")}
        />
        <PrimaryButton
          leftIcon={"wrench"}
          leftIconColor={colors.primaryColor}
          leftIconSize={25}
          style={{
            justifyContent: "flex-start",
            paddingLeft: 24,
            marginVertical: 24,
            height: 60,
          }}
          textStyle={{ paddingLeft: 12 }}
          preset="secondary"
          title="Trainingseinstellungen"
          onPress={() => navigation.navigate("" as any)}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
  },
});
export default inject("userStore")(observer(ProfileScreen));
