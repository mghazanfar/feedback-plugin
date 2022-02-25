import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { useSelector,useDispatch } from "react-redux";
import { setLanguage } from "../store/actions";

const languages = [
  {
    id: 1,
    language: "English",
  },
  {
    id: 2,
    language: "Arabic",
  },
  {
    id: 3,
    language: "Urdu",
  },
];

const SelectLanguage = (props) => {
  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch()
  const languageResource = useSelector(state => state.resourcesReducer.resource)
  console.log("resource",languageResource)
  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // width: "100%",
      }}
      resizeMode={"cover"}
      source={require("../assets/images/drawerBg.png")}
    >
      <TouchableOpacity
        style={{
          width: width * 0.1,
          height: width * 0.125,
          position: "absolute",
          zIndex: 99,
          left: width * 0.075,
        }}
        onPress={()=>props.navigation.goBack()}
      >
        <Image
          source={require("../assets/images/cross.png")}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </TouchableOpacity>

      <View
        style={{
          // height: height * 0.4,
          width: "90%",
          // backgroundColor: "red",
          justifyContent: "center",
          paddingVertical: height * 0.075,
          alignSelf: "flex-end",
          marginLeft: "10%",
          paddingLeft: '5%'
        }}
      >
        <Text allowFontScaling={false}
          style={{
            fontWeight: "500",
            color: "#fff",
            fontSize: width * 0.055,
            position: "absolute",
            top: -10,
            alignSelf: "center",
            textAlign:'center',
            paddingHorizontal: '15%',
            fontFamily:"SEGOEUI"
          }}
        > {languageResource.Select_language_of_your_feedback}
        </Text>
        <View>
          <FlatList
            scrollEnabled={false}
            data={languages}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: height * 0.015,
                    marginVertical: height * 0.015,
                    paddingHorizontal: width * 0.03,
                    backgroundColor: item.id === selectedId ? "blue" : "#fff",
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "70%",
                    borderRadius: 30,
                  }}
                  onPress={() => {
                    setSelectedId(item.id);
                    dispatch(setLanguage(item.id))
                    props.navigation.navigate("ProvideFeedback",{language: item.language});
                  }}
                >
                  <Text allowFontScaling={false}
                    style={{
                      color: item.id === selectedId ? "#fff" : "#000",
                    }}
                  >
                    {item.language}
                  </Text>
                  {item.id === selectedId ? (
                    <Image
                      resizeMode={"contain"}
                      style={{ width: 20, height: 20 }}
                      source={require("../assets/images/active.png")}
                    />
                  ) : (
                    <Image
                      resizeMode={"contain"}
                      style={{ width: 20, height: 20 }}
                      source={require("../assets/images/notactive.png")}
                    />
                  )}
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
            extraData={selectedId}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
