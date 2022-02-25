import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { FloatingWidget } from "../components/FloatingWidget";
const { width, height } = Dimensions.get("window");
const Home = (props) => {
  return (
    //   <ActionSheetProvider>
    //   <FloatingWidget navigation={navigation} />
    // </ActionSheetProvider>
    <View style={styles.Container}>
      <TouchableOpacity
        style={styles.ImgCont}
        onPress={() => props.navigation.navigate("SelectLanguage")}
      >
        <Image
          source={require("../assets/images/smiley2.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "100%", alignItems: "flex-end" }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    // backgroundColor:'red'
  },
  ImgCont: {
    left: width * 0.12,
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: "flex-end",
  },
});
