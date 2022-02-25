import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  Touchable,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  Modal,
  Easing,
  AppState,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Video from "react-native-video";
import RNFS from "react-native-fs";
import NetInfo from "@react-native-community/netinfo";

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  PlayBackType,
  RecordBackType,
} from "react-native-audio-recorder-player";
import { PERMISSIONS, request, check, RESULTS } from "react-native-permissions";
import RNFetchBlob from "rn-fetch-blob";
import MovToMp4 from "react-native-mov-to-mp4";
import DocumentPicker from "react-native-document-picker";
import StarRating from "react-native-star-rating";
import Pdf from "react-native-pdf";
const { width, height } = Dimensions.get("window");
import DeviceInfo from "react-native-device-info";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useSelector } from "react-redux";

const ProvideFeedback = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const languageResource = useSelector(state => state.resourcesReducer.resource)
  const languageID = useSelector(state => state.resourcesReducer.languageID)
  const [reviewstate, setreviewstate] = useState(false);
  const { language } = props.route.params;
  const [activestate, setactivestate] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [playTimeraw, setPlayTimeraw] = useState(0);
  const [recording, setrecording] = useState(0);
  const [audioRecorderPlayer, setaudioRecorderPlayer] = useState(
    new AudioRecorderPlayer()
  );
  audioRecorderPlayer.setSubscriptionDuration(0.1);
  const [recordingdata, setrecordingdata] = useState(null);

  const [fillerTime, setfillerTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [showAudioError, setshowAudioError] = useState(false);

  const [usercancelled, setusercancelled] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      console.log("starting........");
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    if (seconds == 60) {
      onStopRecord();
    }
  }, [seconds]);
  const [feedbackphoto, setfeedbackphoto] = useState(null);
  const [feedbacktext, setfeedbacktext] = useState("");
  const [videodata, setvideodata] = useState(null);

  const [keyboard, setkeyboard] = useState(false);
  const [docuement, setdocuement] = useState();

  const [showrating, setshowrating] = useState(false);
  const [rating, setrating] = useState(0);
  const [reviewText, setreviewText] = useState();

  const [picpreviewmodal, setpicpreviewmodal] = useState(false);
  const [videopreviewmodal, setvideopreviewmodal] = useState(false);
  const [audiopreview, setaudiopreview] = useState();
  const [pdfpreview, setpdfpreview] = useState(false);
  const [feedbackSubmitted, setfeedbackSubmitted] = useState(false);

  const circularProgressref = useRef();

  const [playertime, setplayertime] = useState(0);
  const appState = useRef(AppState.currentState);

  const [attachmentbtndisabled, setattachmentbtndisabled] = useState(false);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }
    appState.current = nextAppState;
    if (appState.current === "background") {
      // onStopRecord();
      if (!reviewstate && recordingdata != null) {
        Cancel();
      }
    }
    console.log("AppState", appState.current);
  };

  function Cancel(params) {
    onStopPlay();
    onStopRecord();

    setrecordingdata(null);
    setaudiopreview();
    setPlayTime();
    setTimeout(() => {
      setrecording(0);
      reset();
    }, 100);
  }

  useEffect(() => {
    if (playertime) {
      if (playertime == 100) {
        setTimeout(() => {
          setplayertime(0);
        }, 1000);
      }
    }
  }, [playertime]);

  var datatoSend = {
    id: 0,
    creation_time: new Date(),
    login_type: "mobile",
    feedback_type: null,
    feedback_language: language,
    feedback_format: null,
    feedback_size: null,
    supporting_document: docuement,
    document_format: docuement,
    document_size: null,
    department: "Mobile",
    is_vip: 0,
    app_layout: Platform.OS,
    contact_number: "123123123",
    customer_id: 0,
    default_language_cus_app: language,
    device_id: DeviceInfo.getUniqueId(),
    email: "test@gmail.com",
    emirates_id: DeviceInfo.getDeviceId(),
    entity_id: 1,
    full_name_ar: "test",
    full_name_en: "test",
    gender: "male",
    location_ip: DeviceInfo.getApplicationName(),
    nationality: "arabic",
    rating: rating,
    smartpass_user_id: 1,
    uae_pass_unique_user_id: DeviceInfo.getUniqueId(),
    user_type: 1,
  };

  useEffect(() => {
    if (rating == 0) {
      setreviewText("");
    } else if (rating >= 1 && rating <= 2) {
      setreviewText(languageResource.We_are_sorry_you_had_a_bad_experience_We_will_try_to_improve_our_service);
    } else if (rating == 3) {
      setreviewText(languageResource.Thank_you_for_letting_us_know_Your_feedback_helps_us_do_better);
    } else {
      setreviewText(languageResource.We_are_always_happy_to_serve_you);
    }
  }, [rating]);

  const option = [
    {
      id: 1,
      title: languageResource.Audio,
      image: require("../assets/images/microphone.png"),
      noactiveImage: require("../assets/images/microphone.png"),
      press: () => {
        setactivestate(1);
        // _onOpenActionSheet();
      },
    },
    {
      id: 2,
      title: languageResource.Video,
      image: require("../assets/images/videoplayer.png"),
      noactiveImage: require("../assets/images/videoplayer.png"),
      press: () => {
        setactivestate(2);
        _handlevideo();
      },
    },
    {
      id: 3,
      title: languageResource.Selfie,
      image: require("../assets/images/selfie.png"),
      noactiveImage: require("../assets/images/selfie.png"),
      press: () => {
        setactivestate(3);
        _onOpenActionSheet();
      },
    },
    {
      id: 4,
      title: languageResource.Text,
      image: require("../assets/images/message.png"),
      noactiveImage: require("../assets/images/selfie.png"),
      press: () => {
        setactivestate(4);
      },
    },
  ];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setkeyboard(true);
        // alert(2)
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setkeyboard(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (feedbacktext.length > 500) {
      setfeedbacktext("");
    }
  }, [feedbacktext]);

  function Clear() {
    netinfo().then((res) => {
      if (res) {
        setactivestate(0);
        setreviewstate(false);
        setrecording(0);
        setaudiopreview();
        if (activestate == 1) {
          PostAudioFeedback();
        } else if (activestate == 4) {
          handleTextSubmit();
        } else if (activestate == 3) {
          console.log("in 3");

          onStartCamera(feedbackphoto);
        } else if (activestate == 2) {
          postVideoFeedback(videodata);
        }

        if (docuement) {
          postDocumentFeedback();
        } else {
          setdocuement();
        }

        setshowrating(true);
      } else {
        alert(languageResource.No_internet_connection);
      }
    });
  }

  function skip() {
    setactivestate(0);
    setreviewstate(false);
    setrecording(0);
    setaudiopreview();
    if (activestate == 1) {
      PostAudioFeedback();
    } else if (activestate == 4) {
      handleTextSubmit();
    } else if (activestate == 3) {
      console.log("in 3");
      onStartCamera(feedbackphoto);
    } else if (activestate == 2) {
      postVideoFeedback(videodata);
    }
    setdocuement();
    setshowrating(true);
  }

  function Reset() {
    setrecording(0);
    setreviewstate(false);
    setPlayTime();
    setPlayTimeraw(0);
    setrecording();
    setrecordingdata(null);
    setfeedbackphoto(null);
    setfeedbacktext("");
    setvideodata(null);
    setdocuement();
    setshowrating(false);
    setaudiopreview();

    // onStopRecord()
  }

  const _onOpenActionSheet = () => {
    console.log("opeing camera");
    // console.log('firing')
    // const options = ["Open Camera", "Chose From Library", "Cancel"];
    // const destructiveButtonIndex = -1;
    // const cancelButtonIndex = 2;

    // showActionSheetWithOptions(
    //   {
    //     options,
    //     cancelButtonIndex,
    //     destructiveButtonIndex,
    //   },
    //   (buttonIndex) => {
    //     if (buttonIndex === 0) {
    try {
      launchCamera(
        {
          cameraType: "front",
        },

        (res) => {
          console.log(res);
          if (res.assets) {
            setusercancelled(false);
            setfeedbackphoto(res.assets[0]);
          } else {
            console.log(res);
            setusercancelled(true);
          }
        }
      );
    } catch (error) {
      console.log("cancelled");
      console.log(error);
    }
    //     } else if (buttonIndex === 1) {
    //       try {
    //         launchImageLibrary({}, (res) => setfeedbackphoto(res.assets[0]));
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }
    //   }
    // );
  };

  const _handlevideo = () => {
    try {
      launchCamera(
        {
          videoQuality: "high",
          mediaType: "video",
          durationLimit: 60,
        },
        (res) => {
          if (res?.assets) {
            if (res?.assets[0].duration >= 5) {
              setusercancelled(false);
              if (Platform.OS == "ios") {
                const filename = Date.now().toString();
                MovToMp4.convertMovToMp4(res.assets[0].uri, filename).then(
                  function (results) {
                    const videoData = {
                      uri: results,
                      fileName: filename + ".mp4",
                      duration: res.assets[0].duration,
                    };
                    console.log(videoData);
                    //here you can upload the video...
                    console.log(results);
                    setvideodata(videoData);
                    postVideoFeedback(videoData);
                  }
                );
              } else {
                console.log("lol");
                console.log(res.assets[0], "dataa");
                const videoDataAndroid = {
                  uri: res.assets[0].uri,
                  duration: res.assets[0].duration,
                  fileName: res.assets[0].fileName,
                  fileSize: res.assets[0].fileSize,
                };
                // postVideoFeedback(videoDataAndroid)
                setvideodata(videoDataAndroid);
              }

              //
            } else {
              setusercancelled(true);
              alert(languageResource.Video_should_be_more_than_5_seconds);
            }
          } else {
            console.log("lol");
            setusercancelled(true);
          }
        }
      );
    } catch (error) {
      console.log("lol lol");
      console.log(error);
    }
  };

  const PickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      setattachmentbtndisabled(false);
        if(res.size >= 5000000) {
          alert(languageResource.Unable_to_upload_attachments_more_than_5MBs)
        }
      else {
        if (
          res.type == "image/jpeg" ||
          res.type == "image/png" ||
          res.type == "image/heic"
        ) {
          {
            setdocuement(res);
          }
        } else if (res.type == "application/pdf") {
          setdocuement({
            uri: res.uri,
            cache: true,
            type: res.type,
          });
      }
      }

      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        setattachmentbtndisabled(false);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        setattachmentbtndisabled(false);
        throw err;
      }
    }
  };

  const onStartCamera = async (photo) => {
    if (Platform.OS === "android") {
      try {
        console.log("yo ", photo);

        postImageFeedback(photo);
        // const grants = await PermissionsAndroid.request([
        //   PermissionsAndroid.PERMISSIONS.CAMERA,
        // ]);
        // console.log(grants)

        // if (
        //   grants["android.permission.CAMERA"] ===
        //   PermissionsAndroid.RESULTS.GRANTED
        // ) {
        //   console.log("permissions granted");
        //   postImageFeedback(photo);
        // } else {
        //   console.log("All required permissions not granted");
        //   Linking.openSettings();
        //   return;
        // }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    if (Platform.OS == "ios") {
      console.log("if ch;aaa");
      check(PERMISSIONS.IOS.CAMERA).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            // Linking.openSettings()
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            request(PERMISSIONS.IOS.CAMERA);
            // Linking.openSettings()
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            postImageFeedback(photo);
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            Linking.openSettings();
            break;
        }
      });
    }
  };

  const onStartRecord = async () => {
    if (Platform.OS === "android") {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log("write external stroage", grants);

        if (
          grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.READ_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("permissions granted");
          onStartRecording();
        } else {
          setactivestate(5);
          console.log("All required permissions not granted");
          Linking.openSettings();
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    if (Platform.OS == "ios") {
      console.log("if ch;aaa");
      check(PERMISSIONS.IOS.MICROPHONE).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)"
            );
            setactivestate(5);
            // Linking.openSettings()
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable"
            );
            setactivestate(5);
            request(PERMISSIONS.IOS.MICROPHONE);
            // Linking.openSettings()
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            setactivestate(5);
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            onStartRecording();
            break;
          case RESULTS.BLOCKED:
            setactivestate(5);
            console.log("The permission is denied and not requestable anymore");
            Linking.openSettings();
            break;
        }
      });
    }
  };

  const onStartRecording = async () => {
    setSeconds(0);
    setPlayTime(0);
    setPlayTimeraw(0);

    setrecording(1);
    const dirs = RNFetchBlob.fs.dirs;

    const path = Platform.select({
      ios: "hello.m4a",
      android: `${dirs.CacheDir}/hello.m4a`,
    });
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log("audioSet", audioSet);

    toggle();

    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

    audioRecorderPlayer.addRecordBackListener((e) => {
      setPlayTimeraw(e.currentPosition);
      setPlayTime(timeConverter(e.currentPosition));
    });
    console.log(`uri: ${uri}`);
  };

  const timeConverter = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const onStopRecord = async () => {
    toggle();
    const result = await audioRecorderPlayer.stopRecorder();
    setrecording(2);
    audioRecorderPlayer.removeRecordBackListener();

    console.log(result, "resulttt");
    setaudiopreview(result);
    const data = new FormData();
    data.append("feedback_file", {
      uri: `${result}`,
      name: "audio " + new Date() + " .m4a",
      type: "audio/.m4a",
    });
    data.append("user", "test");
    data.append("domain", "audio");
    data.append("feedback_type", "audio");
    // datatoSend.feedback_format = ".m4a";
    // (datatoSend.full_name_en = "audio" + new Date() + ".m4a"),
    //   (datatoSend.feedback_type = "audio");
    // data.append("extraParams", datatoSend);
    console.log(data);

    setrecordingdata(data);
  };

  useEffect(() => {
    if (playTimeraw && playTimeraw < 5120) {
      alert(languageResource.Audio_should_be_minimum_5_seconds);
      setrecording(0);
      setPlayTime();
      setPlayTimeraw(0);
      setrecordingdata(null);
    }
  }, [recordingdata]);

  const onStartPlay = async (url) => {
    setrecording(3);
    console.log(url, "urlll");

    // setIsPlay(true);
    console.log("onStartPlay");
    //? Custom path
    // const msg = await this.audioRecorderPlayer.startPlayer(this.path);
    //? Default path

    const msg = await audioRecorderPlayer.startPlayer(url);
    const volume = await audioRecorderPlayer.setVolume(1.0);

    audioRecorderPlayer.addPlayBackListener((e) => {
      setplayertime((e.currentPosition / e.duration) * 100);

      if (e.currentPosition == e.duration) {
        onStopPlay();
      }

      // setCurrentPositionSec(e.currentPosition);
      // setCurrentDurationSec(e.duration);
      // setPlayTime(timeConverter(e.currentPosition));
      // setDuration(timeConverter(e.duration));
    });
  };

  useEffect(() => {
    console.log(playertime);
  }, [playertime]);
  useEffect(() => {
    console.log(playTimeraw);
  }, [playTimeraw]);

  const onStopPlay = async () => {
    setrecording(2);
    console.log("onStopPlay");
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const PostAudioFeedback = async () => {
    setfeedbackSubmitted(true);
    try {
      let res = await fetch(
        "http://uat-api-plugin.ajman.ae/api/create_feedback/",
        {
          method: "POST",
          headers: {
            Pragma: "no-cache",
            "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          },
          body: recordingdata,
        }
      );
      console.log("res", await res.json());
      // alert("Your audio feedback has been submitted successfully!");
      setrecordingdata(null);
    } catch (error) {
      alert(languageResource.Something_went_wrong_in_sharing_audio);
      setrecordingdata(null);
      console.log("err", error);
    }
  };

  const postVideoFeedback = async (vidData) => {
    setfeedbackSubmitted(true);
    const data = new FormData();
    data.append("feedback_file", {
      uri: Platform.OS === "ios" ? `file://${vidData.uri}` : vidData.uri,
      name: vidData.fileName,
      type: "video/mp4",
    });
    data.append("user", "admin");
    data.append("domain", "video");
    data.append("feedback_type", "video");
    // datatoSend.feedback_format = ".mp4";
    // (datatoSend.full_name_en = vidData.fileName),
    //   (datatoSend.feedback_type = "video/mp4");
    // data.append("extraParams", datatoSend);
    try {
      let res = await fetch(
        "http://uat-api-plugin.ajman.ae/api/create_feedback/",
        {
          method: "POST",
          headers: {
            Pragma: "no-cache",
            "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          },
          body: data,
        }
      );
      console.log("res", res);
      // alert("Your video feedback has been submitted successfully!");
      setvideodata(null);
    } catch (error) {
      alert(languageResource.Something_went_wrong_in_sharing_video);
      setvideodata(null);
      console.log("err", error);
    }
  };

  const postImageFeedback = async (cameraResponse) => {
    setfeedbackSubmitted(true);
    console.log(cameraResponse, "responbsees");
    try {
      const data = new FormData();
      data.append("feedback_file", {
        uri:
          Platform.OS === "ios"
            ? cameraResponse.uri.replace("file://", "")
            : cameraResponse.uri,
        name: cameraResponse.fileName,
        type: cameraResponse.type,
      });
      data.append("user", "admin");
      data.append("domain", "image");
      data.append("feedback_type", "image");
      // datatoSend.feedback_format = "jpg/png";
      // (datatoSend.full_name_en = cameraResponse.fileName),
      //   (datatoSend.feedback_type = cameraResponse.type);
      // data.append("extraParams", datatoSend);
      let res = await fetch(
        "http://uat-api-plugin.ajman.ae/api/create_feedback/",
        {
          method: "POST",
          headers: {
            Pragma: "no-cache",
            "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          },
          body: data,
        }
      );
      console.log("res", await res.json());
      // alert("Your image feedback has been submitted successfully!");
      setfeedbackphoto(null);
    } catch (error) {
      alert(languageResource.Something_went_wrong_in_sharing_image);
      console.log(error);
      setfeedbackphoto(null);
    }
  };

  const postDocumentFeedback = async () => {
    setfeedbackSubmitted(true);
    try {
      const data = new FormData();
      data.append("feedback_file", {
        uri:
          Platform.OS === "ios"
            ? docuement.uri.replace("file://", "")
            : docuement.uri,
        name: docuement.name,
        type: docuement.type,
      });
      data.append("user", "admin");
      data.append("domain", "attachment");
      data.append("feedback_type", "image");
      // datatoSend.feedback_format = "pdf/docx/xls";
      // (datatoSend.full_name_en = docuement.name),
      //   (datatoSend.feedback_type = docuement.type);
      let res = await fetch(
        "http://uat-api-plugin.ajman.ae/api/create_feedback/",
        {
          method: "POST",
          headers: {
            Pragma: "no-cache",
            "Cache-Control": "no-cache, no-store, max-age=0, must-revalidate",
          },
          body: data,
        }
      );
      console.log("res", await res.json());
      // alert("Your feedback file has been submitted successfully!");
      setdocuement();
    } catch (error) {
      alert(languageResource.Something_went_wrong_in_sharing_attachment);
      console.log(error);
      setdocuement();
    }
  };

  const postRatingFeedback = async () => {
    setfeedbackSubmitted(true);
    try {
      const data = new FormData();
      let path = RNFS.DocumentDirectoryPath + `/${Date.now()}ratingFile.txt`;
      console.log(RNFS.DocumentDirectoryPath + `/${Date.now()}ratingFile.txt`);
      RNFS.writeFile(path, "rating= " + rating, "utf8")
        .then(async (success) => {
          console.log("FILE WRITTEN!");
          console.log("success", success);
          RNFS.readFile(path, "utf8").then((file) =>
            console.log(file, "rating text", rating)
          );
          data.append("feedback_file", {
            uri: `file://${path}`,
            name: "ratingFile.txt",
            type: "file/txt",
          });
          data.append("user", "admin");
          data.append("domain", "rating");
          data.append("feedback_type", "text");
          // data.append("rating", rating);

          let res = await fetch(
            "http://uat-api-plugin.ajman.ae/api/create_feedback/",
            {
              method: "POST",
              headers: {
                Pragma: "no-cache",
                "Cache-Control":
                  "no-cache, no-store, max-age=0, must-revalidate",
              },
              body: data,
            }
          );
          console.log("res", await res.json());
          // alert("Your rating feedback has been submitted successfully!");
          setshowrating(false);
          setreviewstate(false);
          Reset();
          setrating(0);
          return (
            RNFS.unlink(path)
              .then(() => {
                console.log("FILE DELETED");
              })
              // `unlink` will throw an error, if the item to unlink does not exist
              .catch((err) => {
                console.log(err.message);
              })
          );
        })
        .catch((err) => {
          alert(languageResource.Something_went_wrong_in_sharing_ratings);
          console.log(err);
          setrating(0);
        });
    } catch (error) {
      alert(languageResource.Something_went_wrong_in_sharing_ratings);
      console.log(error);
    }
  };
  const handleTextSubmit = async () => {
    setfeedbackSubmitted(true);
    if (feedbacktext?.length < 6) {
      alert(languageResource.Your_feedback_must_contain_at_least_6_characters);
    } else {
      console.log("feedbacktext", feedbacktext);
      let path = RNFS.DocumentDirectoryPath + `/${Date.now()}test.txt`;
      console.log(RNFS.DocumentDirectoryPath + `/${Date.now()}test.txt`);
      RNFS.writeFile(path, feedbacktext, "utf8")
        .then(async (success) => {
          console.log("FILE WRITTEN!");
          console.log("success", success);
          RNFS.readFile(path, "utf8").then((file) =>
            console.log(file, "fileeee text")
          );

          // let result = await fetch(path);
          // console.log(await result.blob());
          // const fileData = await result.blob()
          const data = new FormData();
          data.append("feedback_file", {
            uri: `file://${path}`,
            name: "test.txt",
            type: "file/txt",
          });
          data.append("user", "admin");
          data.append("domain", "text");
          data.append("feedback_type", "text");

          let res = await fetch(
            "http://uat-api-plugin.ajman.ae/api/create_feedback/",
            {
              method: "POST",
              headers: {
                Pragma: "no-cache",
                "Cache-Control":
                  "no-cache, no-store, max-age=0, must-revalidate",
              },
              body: data,
            }
          );
          console.log("res asda", res);
          // console.log("res", await res.json());
          // alert("Your textfile feedback has been submitted successfully!");
          setfeedbacktext("");
          setreviewstate(true);
          RNFS.unlink(path)
            .then(() => {
              console.log("FILE DELETED");
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
            alert(languageResource.Something_went_wrong_in_sharing_text);
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err);
          alert(languageResource.Something_went_wrong_in_sharing_text);
          setfeedbacktext("");
        });
    }
  };

  async function netinfo() {
    let state = await NetInfo.fetch();
    console.log("---------------");
    console.log(state.isConnected, "state net");
    return state.isConnected;
  }

  return (
    <ImageBackground
      style={{
        flex: 1,

        // justifyContent: "center",
        // alignItems: "center",
        width: "100%",
      }}
      resizeMode={"cover"}
      source={require("../assets/images/drawerBg.png")}
    >
      {/* <Text allowFontScaling={false}>{playTime && playTime}</Text>
      <Text allowFontScaling={false}>{playTimeraw && playTimeraw}</Text> */}
      <Modal visible={picpreviewmodal} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={docuement?.uri ? { uri: docuement.uri } : feedbackphoto}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
          <Text
            allowFontScaling={false}
            onPress={() => setpicpreviewmodal(false)}
            style={{
              position: "absolute",
              alignSelf: "center",
              fontSize: 20,
              color: "white",
              bottom: "10%",
              textDecorationLine: "underline",
            }}
          >
            {languageResource.Done}
          </Text>
        </View>
      </Modal>
      <Modal visible={pdfpreview} animationType="fade" transparent>
        <View style={styles.PDFModalCont}>
          <View style={styles.PDFModalInner}>
            <TouchableOpacity
              style={styles.CrossImgCont}
              onPress={() => setpdfpreview(false)}
            >
              <Image
                source={require("../assets/images/cross.png")}
                resizeMode="contain"
                style={styles.modalImage}
              />
            </TouchableOpacity>

            <View style={styles.pdfView}>
              <Pdf
                style={styles.pdfObj}
                source={docuement && docuement}
                onLoadComplete={(numberOfPages, filePath) => {
                  console.log(`number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                  console.log(`current page: ${page}`);
                }}
                onError={(error) => {
                  console.log(error);
                }}
                onPressLink={(uri) => {
                  console.log(`Link presse: ${uri}`);
                }}
                style={styles.pdf}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={videopreviewmodal} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width, height: height * 0.8 }}>
            <Video
            paused={true}
            controls
              resizeMode="cover"
              source={{ uri: videodata?.uri }} // Can be a URL or a local file.
              repeat
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          <Text
            allowFontScaling={false}
            onPress={() => setvideopreviewmodal(false)}
            style={{
              position: "absolute",
              alignSelf: "center",
              color: "#fff",
              fontSize: 20,
              bottom: "5%",
              textDecorationLine: "underline",
            }}
          >
            {languageResource.Done}
          </Text>
        </View>
      </Modal>

      <View style={styles.innercont}>
        <TouchableOpacity
          style={{
            width: width * 0.1,
            height: width * 0.125,
            position: "absolute",
            zIndex: 99,
            left: width * -0.075,
          }}
          onPress={() => {
            onStopPlay();
            if (!feedbackSubmitted) {
              setreviewText("");
              onStopPlay();
              props.navigation.goBack();
              Cancel();
              // Alert.alert(
              //   "Warning",
              //   "Are you sure you want to cancel your feedback ?",
              //   [
              //     {
              //       text: "Cancel",
              //       onPress: () => console.log("Cancel Pressed"),
              //       style: "cancel",
              //     },
              //     {
              //       text: "OK",
              //       onPress: () => {
              //         setreviewText("");
              //         onStopPlay();
              //         props.navigation.goBack();
              //         Cancel();
              //       },
              //     },
              //   ]
              // );
            } else {
              onStopPlay();
              Cancel();
              props.navigation.goBack();
            }
          }}
        >
          <Image
            source={require("../assets/images/cross.png")}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
        {showrating ? (
          <>
            <View
              style={{
                width: width * 0.5,
                height: height * 0.6,
                marginLeft: width * 0.17,
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: "500",
                  color: "#fff",
                  fontSize: width * 0.055,
                  textAlign: "center",
                  // position: "absolute",
                  // alignSelf: "center",
                  paddingHorizontal: "15%",
                }}
              > {languageResource.Thanks_for_your_feedback}
              </Text>
              <Image
                source={require("../assets/images/rate.png")}
                resizeMode="contain"
                style={{
                  width: width * 0.3,
                  height: width * 0.3,
                  marginVertical: height * 0.03,
                }}
              />
              <Text allowFontScaling={false} style={{ fontWeight: "500" }}>
                {languageResource.Please_rate_us}
              </Text>
              <StarRating
                emptyStar={require("../assets/images/starempty.png")}
                fullStar={require("../assets/images/starfull.png")}
                maxStars={5}
                starSize={30}
                buttonStyle={{ paddingHorizontal: 7.5 }}
                rating={rating}
                selectedStar={(rating) => setrating(rating)}
                fullStarColor={"red"}
              />
              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  minHeight: height * 0.07,
                  fontSize: width * 0.04,
                  textAlign: "center",
                  width: width * 0.7,
                }}
              >
                {rating >= 1 && reviewText}
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: 10,
                  backgroundColor: "#147AF3",
                  padding: height * 0.01,
                  width: width * 0.3,
                  alignSelf: "center",
                }}
                onPress={() => {
                  postRatingFeedback();
                  props.navigation.replace("Home");
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    color: "#fff",
                    fontSize: width * 0.035,
                    textAlign: "center",
                    width: "100%",
                    // fontFamily: "Product Sans",
                  }}
                >{languageResource.Submit}
                </Text>
              </TouchableOpacity>
              {/* <Text allowFontScaling={false}
                onPress={() => {
                  setshowrating(false);
                  setreviewstate(false);
                  props.navigation.replace("Home");
                }}
                style={{
                  color: "#fff",
                  alignSelf: "center",
                  fontSize: width * 0.03,
                  textDecorationLine: "underline",
                }}
              >
                Skip
              </Text> */}
            </View>
              <View style={{ alignItems:'center',position: "absolute",bottom: "2.5%", 
            left: (languageID == 3 || languageID == 1) ? 0 : width*0.1}}>
            <Text 
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: width * 0.03,
              }}
            >{languageResource.This_feedback_will_be_used_for_quality_assurance_purposes}
            </Text>
            </View>
          </>
        ) : (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {activestate != 0 && activestate != 5 && !keyboard && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "90%",
                    position: "absolute",
                    top: height * 0.08,
                  }}
                >
                  {option.map((item) => {
                    return (
                      <View style={{ paddingHorizontal: 20 }}>
                        <TouchableOpacity
                          // onPress={() => {
                          //   item.press();
                          //   Reset();
                          // }}
                          style={{
                            width: width * 0.165,
                            height: width * 0.165,
                            backgroundColor: "rgba(0,0,0,0.1)",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: (width * 0.165) / 2,
                          }}
                        >
                          <View
                            style={{
                              width: width * 0.15,
                              height: width * 0.15,
                              backgroundColor:
                                activestate == item.id ? "#147AF3" : "#fff",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: width * 0.15,
                            }}
                          >
                            <Image
                              source={item.image}
                              resizeMode="contain"
                              style={{
                                width: "60%",
                                height: "60%",
                                tintColor:
                                  activestate == item.id ? "#fff" : "grey",
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                        {activestate == item.id && (
                          <>
                            <Text
                              allowFontScaling={false}
                              style={{
                                textAlign: "center",
                                color: "#fff",
                                paddingTop: 5,
                              }}
                            >
                              {item.title}
                            </Text>
                            <Image
                              source={require("../assets/images/smallarrow.png")}
                              resizeMode="contain"
                              style={{
                                width: 12.5,
                                height: 12.5,
                                alignSelf: "center",
                                marginTop: 2.5,
                              }}
                            />
                          </>
                        )}
                      </View>
                    );
                  })}
                </View>
              )}
              {activestate == 0 ? (
                <View
                  style={{
                    // height: height * 0.4,
                    width: "80%",
                    // backgroundColor: "red",
                    // marginLeft: width * 0.1,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontWeight: "500",
                      color: "#fff",
                      fontSize: width * 0.055,
                      paddingVertical: height * 0.02,
                      alignSelf: "center",
                      textAlign: "center",
                    }}
                  >{languageResource.How_was_your_experience}
                  </Text>
                  <FlatList
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignSelf: "center" }}
                    numColumns={2}
                    data={option}
                    renderItem={({ item }) => {
                      return (
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              paddingVertical: height * 0.02,
                              marginVertical: height * 0.015,
                              marginHorizontal: height * 0.015,
                              paddingHorizontal: width * 0.04,
                              backgroundColor: "#fff",
                              flexDirection: "row",
                              alignSelf: "center",
                              justifyContent: "space-between",
                              alignItems: "center",
                              borderRadius: 50,
                            }}
                            onPress={item.press}
                          >
                            <Image
                              resizeMode={"contain"}
                              style={{
                                width: 50,
                                height: 50,
                                tintColor: "grey",
                              }}
                              source={item.image}
                            />
                          </TouchableOpacity>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontSize: width * 0.04,
                              textAlign: "center",
                              color: "#fff",
                            }}
                          >
                            {" "}
                            {item.title}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              ) : activestate == 5 ? (
                <View style={{ alignItems: "center" }}>
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: width * 0.05, color: "#fff" }}
                  >{languageResource.Audio_Feedback}
                  </Text>
                  <Image
                    source={require("../assets/images/audioerror.png")}
                    resizeMode="contain"
                    style={{
                      width: width * 0.25,
                      height: width * 0.25,
                      marginVertical: height * 0.03,
                    }}
                  />
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: width * 0.05, color: "#fff" }}
                  >{languageResource.No_microphone_detected}
                  </Text>
                </View>
              ) : (
                <View style={styles.Box}>
                  {reviewstate ? (
                    <>
                      <Text allowFontScaling={false} style={styles.Label}>
                       {languageResource.Would_you_like_to_attach_any_supporting_documents}
                      </Text>
                      <View>
                        <TouchableOpacity
                          disabled={attachmentbtndisabled}
                          onPress={() => {
                            if (docuement?.type == "application/pdf") {
                              if (docuement) {
                                setpdfpreview(true);
                              }
                            } else if (docuement?.type == "image/jpeg") {
                              if (docuement) {
                                setpicpreviewmodal(true);
                              }
                            } else {
                              setattachmentbtndisabled(true);
                              PickDocument();
                            }
                          }}
                        >
                          {docuement?.type == "application/pdf" ? (
                            <Text
                              allowFontScaling={false}
                              style={{
                                color: "blue",
                                textDecorationLine: "underline",
                                alignSelf: "center",
                                textAlign: "center",
                                paddingBottom: 10,
                              }}
                            >{languageResource.View_PDF}
                            </Text>
                          ) : (
                            <Image
                              source={
                                docuement?.uri
                                  ? { uri: docuement.uri }
                                  : require("../assets/images/attachment.png")
                              }
                              resizeMode="contain"
                              style={{
                                width: width * 0.2,
                                height: width * 0.2,
                                alignSelf: "center",
                              }}
                            />
                          )}
                        </TouchableOpacity>
                        {/* <Text allowFontScaling={false}
                          style={{ textAlign: "center", paddingVertical: 5 }}
                        > */}
                        {/* {docuement?.name} */}
                        {/* {docuement?.length >1 ? docuement?.length + 'file selected' : ''} */}
                        {/* </Text> */}
                        {/* <Text allowFontScaling={false}
                          onPress={() => skip()}
                          // onPress={() => setshowrating(true)}
                          style={{
                            textDecorationLine: "underline",
                            textAlign: "center",
                          }}
                        >
                          SKIP
                        </Text> */}
                      </View>
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: width * 0.03,
                          textAlign: "center",
                        }}
                      >{languageResource.Attachments_should_be_of_type_png_jpg_and_PDF_and_should_be_less_than_5_MBs_in_size}
                      </Text>
                      {docuement && (
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-around",
                          }}
                        >
                          <TouchableOpacity
                            style={[
                              styles.RightBtn,
                              {
                                width: "90%",
                                height: height * 0.05,
                                alignSelf: "center",
                                borderColor: "#147AF3",
                                borderWidth: 1,
                                backgroundColor: "white",
                              },
                            ]}
                            onPress={() => setdocuement()}
                          >
                            <Text
                              allowFontScaling={false}
                              style={{ color: "#147AF3" }}
                            >{languageResource.Remove_Attachment}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.RightBtn,
                            {
                              width: "45%",
                              height: height * 0.05,
                              alignSelf: "center",
                              borderColor: "#147AF3",
                              borderWidth: 1,
                              backgroundColor: "white",
                            },
                          ]}
                          onPress={() => skip()}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{ color: "#147AF3" }}
                          >{languageResource.Skip}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.RightBtn,
                            {
                              width: "45%",
                              height: height * 0.05,
                              alignSelf: "center",
                            },
                          ]}
                          onPress={() => {
                            netinfo().then((res) => {
                              if (res) {
                                Clear();
                              } else {
                                alert(languageResource.No_internet_connection);
                              }
                            });
                          }}
                        >
                          <Text
                            allowFontScaling={false}
                            style={{ color: "#fff" }}
                          >{languageResource.Continue}
                            
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <Text allowFontScaling={false} style={styles.Label}>
                        {activestate == 1
                          ? languageResource.Please_tap_to_record_the_audio
                          : activestate == 2
                          ? languageResource.Record_Your_Video
                          : activestate == 3
                          ? languageResource.Capture_Your_Selfie
                          : activestate == 4
                          ? languageResource.Enter_Your_Feedback
                          : ""}
                      </Text>
                      {/* <TouchableOpacity
                        onPress={() => {
                          toggle();
                        }}
                        style={{
                          width: 50,
                          height: 50,
                          backgroundColor: "red",
                        }}
                      />
                      <Text allowFontScaling={false}>
                        {playTimeraw && playTimeraw} + {playTime && playTime} +{" "} + 
                        {playertime.toString()}
                      </Text> */}

                      {activestate == 1 ? (
                        <View>
                          {recording == 3 ? (
                            <AnimatedCircularProgress
                              size={120}
                              width={7}
                              style={{
                                alignSelf: "center",
                                transform: [
                                  {
                                    rotate: "270deg",
                                  },
                                ],
                              }}
                              fill={playertime}
                              tintColor="#1A73e9"
                              onAnimationComplete={() =>
                                console.log("onAnimationComplete")
                              }
                              ref={circularProgressref}
                              backgroundColor="#dcdcdc"
                              arcSweepAngle={360}
                            >
                              {(fill) => (
                                // <Image
                                //   source={require("../assets/images/play.png")}
                                //   resizeMode="contain"
                                //   style={{
                                //     width: width * 0.3,
                                //     height: width * 0.3,
                                //     alignSelf: "center",
                                //     transform: [
                                //       {
                                //         rotate: '90deg',
                                //       },
                                //     ]
                                //   }}
                                // />
                                <>
                                  <Text
                                    allowFontScaling={false}
                                    style={{
                                      // width: width * 0.3,
                                      // height: width * 0.3,
                                      color: "#444",
                                      fontWeight: "bold",
                                      alignSelf: "center",
                                      transform: [
                                        {
                                          rotate: "90deg",
                                        },
                                      ],
                                    }}
                                  >
                                    {" "}
                                    {timeConverter(
                                      (fill / 100) * playTimeraw - 1200
                                    )}
                                  </Text>
                                </>
                              )}
                            </AnimatedCircularProgress>
                          ) : recording == 1 ? (
                            <TouchableOpacity onPress={() => onStopRecord()}>
                              <AnimatedCircularProgress
                                size={120}
                                width={7}
                                style={{
                                  alignSelf: "center",
                                  transform: [
                                    {
                                      rotate: "270deg",
                                    },
                                  ],
                                }}
                                fill={(seconds / 60) * 100}
                                tintColor="#1A73e9"
                                onAnimationComplete={() =>
                                  console.log("onAnimationComplete")
                                }
                                ref={circularProgressref}
                                backgroundColor="#dcdcdc"
                                arcSweepAngle={360}
                              >
                                {(fill) => (
                                  <>
                                    <Image
                                      source={require("../assets/images/recording.png")}
                                      resizeMode="contain"
                                      style={{
                                        width: width * 0.3,
                                        height: width * 0.3,
                                        alignSelf: "center",
                                        transform: [
                                          {
                                            rotate: "90deg",
                                          },
                                        ],
                                      }}
                                    />
                                  </>
                                )}
                              </AnimatedCircularProgress>
                              {/* <Text allowFontScaling={false}>{seconds && seconds /60 * 100}</Text> */}
                              <Text
                                allowFontScaling={false}
                                style={{
                                  textAlign: "center",
                                  paddingTop: 10,
                                  color: "#444",
                                  // fontWeight:'bold'
                                }}
                              >
                                {/* {playTime ? playTime : ""}sad */}
                                {/* {seconds && seconds /60 * 100} */}
                                {seconds &&
                                  (seconds < 10
                                    ? "0:0" + seconds
                                    : "0:" + seconds)}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() =>
                                recording == 0
                                  ? onStartRecord()
                                  : // : recording == 1
                                  // ? onStopRecord()
                                  recording == 2
                                  ? onStartPlay(audiopreview)
                                  : recording == 3
                                  ? null
                                  : onStartRecord()
                              }
                            >
                              <Image
                                source={
                                  recording == 1
                                    ? require("../assets/images/recording.png")
                                    : recording == 2
                                    ? require("../assets/images/play.png")
                                    : // : recording == 3
                                      // ? require("../assets/images/playing.png")
                                      require("../assets/images/newmic.png")
                                }
                                resizeMode="contain"
                                style={{
                                  width: width * 0.3,
                                  height: width * 0.3,
                                  alignSelf: "center",
                                  // tintColor:  recording == 3 ? 'lightblue': null
                                }}
                              />
                            </TouchableOpacity>
                          )}
                          {/* <Text allowFontScaling={false}
                            style={{
                              textAlign: "center",
                              paddingTop: 10,
                              color: "red",
                            }}
                          >
                            {recording == 1 ? playTime : ""}
                          </Text> */}
                        </View>
                      ) : activestate == 2 ? (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            if (videodata) setvideopreviewmodal(true);
                          }}
                          style={{
                            width: width * 0.6,
                            height: height * 0.2,
                            // backgroundColor: "red",
                            alignSelf: "center",
                          }}
                        >
                          <Video
                            paused={true}
                            controls={true}
                            resizeMode="cover"
                            source={{ uri: videodata?.uri }} // Can be a URL or a local file.
                            style={{ width: "100%", height: "100%" }}
                          />
                        </TouchableOpacity>
                      ) : activestate == 3 ? (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => {
                            if (feedbackphoto) {
                              setpicpreviewmodal(true);
                            }
                          }}
                        >
                          <Image
                            source={feedbackphoto}
                            resizeMode="contain"
                            style={{
                              width: width * 0.6,
                              height: width * 0.4,
                              alignSelf: "center",
                            }}
                          />
                        </TouchableOpacity>
                      ) : activestate == 4 ? (
                        <View
                          style={{
                            width: width * 0.6,
                            height: "60%",
                            alignSelf: "center",
                          }}
                        >
                          <View
                            style={{
                              width: "100%",
                              height: "80%",
                              borderRadius: 5,
                              borderColor: "#B7B7B7",
                              borderWidth: 1,
                            }}
                          >
                            <TextInput
                              allowFontScaling={false}
                              Input
                              value={feedbacktext}
                              style={{
                                height: "100%",
                                color: "#000",
                                textAlignVertical: "top",
                              }}
                              keyboardType={"default"}
                              returnKeyType={"next"}
                              onChangeText={(text) => setfeedbacktext(text)}
                              multiline
                              onFocus={(e) => console.log(e)}
                            />
                          </View>
                          <Text
                            allowFontScaling={false}
                            style={{ alignSelf: "flex-end" }}
                          >
                            {feedbacktext?.length + "/ " + "500 characters"}
                          </Text>
                        </View>
                      ) : null}

                      {usercancelled ? (
                        <TouchableOpacity
                          style={[
                            styles.RightBtn,
                            { width: "100%", height: height * 0.06 },
                          ]}
                          onPress={() => {
                            if (activestate == 3) {
                              onStopPlay();
                              setfeedbackphoto(null);
                              _onOpenActionSheet();
                            } else if (activestate == 1) {
                              setrecordingdata(null);
                              setrecording(0);

                              onStartRecord();
                              onStopPlay();
                              setPlayTimeraw(0);
                              setPlayTime(0);
                              reset();
                              setTimeout(() => {
                                setPlayTime(0);
                                onStartRecord();
                              }, 1000);
                            } else if (activestate == 2) {
                              onStopPlay();
                              setvideodata(null);
                              _handlevideo();
                            }
                          }}
                        >
                          <Text style={{ color: "#fff" }}>{languageResource.Retake}</Text>
                        </TouchableOpacity>
                      ) : (
                        <View>
                          <View style={styles.BtnCont}>
                            {activestate != 4 ? (
                              <>
                                {feedbackphoto != null ||
                                recordingdata != null ||
                                videodata != null ? (
                                  <TouchableOpacity
                                    style={[
                                      styles.LeftBtn,
                                      {
                                        borderColor:
                                          recording == 1 || recording == 3
                                            ? "#ececec"
                                            : "#444",
                                      },
                                    ]}
                                    disabled={recording == 1 || recording == 3}
                                    onPress={() => {
                                      if (activestate == 3) {
                                        onStopPlay();
                                        setfeedbackphoto(null);
                                        _onOpenActionSheet();
                                      } else if (activestate == 1) {
                                        setrecordingdata(null);
                                        setrecording(0);

                                        onStartRecord();
                                        onStopPlay();
                                        setPlayTimeraw(0);
                                        setPlayTime(0);
                                        reset();
                                        setTimeout(() => {
                                          setPlayTime(0);
                                          onStartRecord();
                                        }, 1000);
                                      } else if (activestate == 2) {
                                        onStopPlay();
                                        setvideodata(null);
                                        _handlevideo();
                                      }
                                    }}
                                  >
                                    <Text
                                      allowFontScaling={false}
                                      style={{
                                        color:
                                          recording == 1 || recording == 3
                                            ? "#ececec"
                                            : "#444",
                                        fontSize: width * 0.033,
                                        fontFamily: "Product Sans",
                                      }}
                                    >
                                      {activestate == 3
                                        ? languageResource.Retake
                                        : languageResource.Recapture}
                                    </Text>
                                  </TouchableOpacity>
                                ) : null}
                                <TouchableOpacity
                                  style={[
                                    styles.RightBtn,
                                    {
                                      width:
                                        feedbackphoto != null ||
                                        recordingdata != null ||
                                        videodata != null
                                          ? "60%"
                                          : "100%",
                                    },
                                  ]}
                                  onPress={() => {
                                    if (activestate == 1) {
                                      if (recording != 1 && recording != 0) {
                                        console.log(recording);
                                        netinfo().then((res) => {
                                          if (res) {
                                            setPlayTime();
                                            setPlayTimeraw(0);
                                            setaudiopreview();
                                            onStopPlay();
                                            setshowrating(true);
                                            Clear();
                                          }
                                        });
                                        alert(languageResource.No_internet_connection);
                                      } else {
                                        alert(
                                          languageResource.Please_record_an_audio_to_proceed
                                        );
                                      }
                                    }
                                    //video
                                    else if (activestate == 2) {
                                      if (videodata) {
                                        netinfo().then((res) => {
                                          if (res) {
                                            setshowrating(true);
                                            Clear();
                                          } else {
                                            alert(languageResource.No_internet_connection);
                                          }
                                        });
                                      } else {
                                        alert(languageResource.Please_record_a_video_to_proceed );
                                      }
                                    }
                                    //selfie
                                    else if (activestate == 3) {
                                      if (feedbackphoto) {
                                        netinfo().then((res) => {
                                          if (res) {
                                            setshowrating(true);
                                            Clear();
                                          } else {
                                            alert(languageResource.No_internet_connection);
                                          }
                                        });
                                      } else {
                                        alert(
                                          languageResource.Please_take_a_picture_to_proceed
                                        );
                                      }
                                    } else {
                                      setshowrating(false);
                                    }
                                  }}
                                >
                                  <Text
                                    allowFontScaling={false}
                                    style={{
                                      color: "#fff",
                                      fontSize: width * 0.033,
                                      fontFamily: "Product Sans",
                                    }}
                                  >
                                    {languageResource.Submit}
                                  </Text>
                                </TouchableOpacity>
                              </>
                            ) : (
                              <TouchableOpacity
                                style={[styles.RightBtn, { width: "100%" }]}
                                onPress={() => {
                                  if (feedbacktext?.length >= 6) {
                                    netinfo().then((res) => {
                                      if (res) {
                                        setshowrating(true);
                                        Clear();
                                      } else {
                                        alert(languageResource.No_internet_connection);
                                      }
                                    });
                                  } else {
                                    setshowrating(false);
                                    alert(
                                      languageResource.Your_feedback_must_contain_at_least_6_characters
                                    );
                                  }
                                }}
                              >
                                <Text
                                  allowFontScaling={false}
                                  style={{ color: "#fff" }}
                                >
                                  {languageResource.Submit}
                                </Text>
                              </TouchableOpacity>
                            )}
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              if (activestate == 1) {
                                if (recording != 1 && recording != 0) {
                                  console.log(recording);
                                  setPlayTime();
                                  setPlayTimeraw(0);
                                  setaudiopreview();
                                  onStopPlay();
                                  setreviewstate(true);
                                } else {
                                  alert(languageResource.Please_record_an_audio_to_proceed);
                                }
                              }
                              //video
                              else if (activestate == 2) {
                                if (videodata) {
                                  setreviewstate(true);
                                } else {
                                  alert(languageResource.Please_record_a_video_to_proceed);
                                }
                              }
                              //selfie
                              else if (activestate == 3) {
                                if (feedbackphoto) {
                                  setreviewstate(true);
                                } else {
                                  alert(languageResource.Please_take_a_picture_to_proceed);
                                }
                              } else if (activestate == 4) {
                                if (feedbacktext?.length >= 6) {
                                  setreviewstate(true);
                                } else {
                                  setreviewstate(false);
                                  alert(
                                    languageResource.Your_feedback_must_contain_at_least_6_characters
                                  );
                                }
                              }
                            }}
                            style={[
                              styles.BtnCont,
                              {
                                backgroundColor: "#147AF3",
                                borderRadius: width * 0.01,
                                justifyContent: "center",
                              },
                            ]}
                          >
                            <Text
                              allowFontScaling={false}
                              style={{ color: "#fff" }}
                            >{languageResource.Add_Attachment}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  )}
                </View>
              )}
            </SafeAreaView>
          </TouchableWithoutFeedback>
        )}
      </View>
    </ImageBackground>
  );
};

export default ProvideFeedback;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  innercont: {
    width: "85%",
    height: "100%",
    justifyContent: "center",
    marginLeft: width * 0.15,
    // backgroundColor:'red',
  },
  title: {
    fontSize: 32,
  },
  Box: {
    width: "82.5%",
    borderRadius: width * 0.03,
    padding: width * 0.01,
    height: height * 0.475,
    backgroundColor: "#fff",
    // backgroundColor: "red",
    // marginLeft: width * 0.1,
    paddingBottom: height * 0.02,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingBottom: height * 0.02,
    elevation: 5,
  },
  Label: {
    fontWeight: "500",
    color: "#000",
    fontSize: width * 0.045,
    paddingVertical: height * 0.02,
    alignSelf: "center",
    fontFamily: "Product Sans",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  BtnCont: {
    width: "90%",
    height: height * 0.06,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  LeftBtn: {
    width: "35%",
    height: "90%",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  RightBtn: {
    width: "60%",
    height: "90%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#147AF3",
  },
  pdf: {
    flex: 1,
    width: width,
    height: height,
    // backgroundColor:'red'
  },
  PDFModalCont: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  PDFModalInner: {
    width: "100%",
    height: height * 0.8,
    borderRadius: width * 0.1,
    backgroundColor: "white",
    // backgroundColor: 'red',
    // alignItems: 'center',
    justifyContent: "center",
  },
  modalImage: {
    width: "40%",
    height: "40%",
  },
  pdfView: {
    height: "85%",
    width: width * 0.6,
  },
  pdfObj: {
    width: height * 0.5,
  },
  CrossImgCont: {
    width: width * 0.1,
    height: width * 0.1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: height * 0.01,
    right: width * 0.03,
    zIndex: 100,
  },
});
