import * as actionTypes from "./actionTypes";

const Resources = {
  English: {
    Feedback: "Feedback",
    Select_language_of_your_feedback: "Select language of your feedback",
    Continue: "Continue",
    How_was_your_experience: "How was your experience?",
    Audio: "Audio",
    Video: "Video",
    Text: "Text",
    Selfie: "Selfie",
    Your_feedback_must_contain_at_least_6_characters:
      "Your feedback must contain at least 6 characters",
    Message_Feedback: "Message Feedback",
    Characters: "Characters",
    Back: "Back",
    Next: "Next",
    Audio_Feedback: "Audio Feedback",
    Seconds: "Seconds",
    Rerecord: "Rerecord",
    Record: "Record",
    Selfie_Feedback: "Selfie Feedback",
    Capture: "Capture",
    Retake_Recapture: "Retake/Re-capture",
    Video_Feedback: "Video Feedback",
    Add_Attachment: "Add Attachment",
    Thanks_for_your_feedback: "Thanks for your feedback",
    Please_rate_us: "Please rate us",
    Rating: "Rating",
    This_feedback_will_be_used_for_quality_assurance_purposes:
      "This feedback will be used for quality assurance purposes",
    We_are_always_happy_to_serve_you: "We are always happy to serve you",
    Thank_you_for_letting_us_know_Your_feedback_helps_us_do_better:
      "Thank you for letting us know. Your feedback helps us do better",
    We_are_sorry_you_had_a_bad_experience_We_will_try_to_improve_our_service:
      "We are sorry you had a bad experience. We will try to improve our service",
    Would_you_like_to_attach_any_supporting_documents:
      "Would you like to attach any supporting documents?",
    Skip: "Skip",
    Attachments_should_be_of_type_png_jpg_and_PDF_and_should_be_less_than_5_MBs_in_size:
      "Attachments should be of type .png, .jpg and .PDF and should be less than 5 MBs in size",
    Next_Send: "Next/Send",
    Upload_file: "Upload file",
    Remove_Attachment: "Remove Attachment",
    Submit: "Submit",
    You_have_reached_the_daily_limit_for_feedback_today_Please_visit_the_app_tomorrow_to_submit_more_feedbacks:
      "You have reached the daily limit for feedback today. Please visit the app tomorrow to submit more feedbacks.",
    No_microphone_detected: "No microphone detected",
    No_camera_detected: "No camera detected",
    No_microphone_and_camera_detected: "No microphone and camera detected",
    Retry: "Retry",
    Unable_to_upload_attachments_more_than_5MBs:
      "Unable to upload attachments greater than 5MBs",
    This_feedback_will_be_used_for_quality_assurance_purposes:
      "This feedback will be used for quality assurance purposes",
    View_PDF: "View PDF",
    Done: "Done",
    Something_went_wrong_in_sharing_ratings:
      "Something went wrong in sharing ratings",
    Something_went_wrong_in_sharing_image:
      "Something went wrong in sharing image",
    Something_went_wrong_in_sharing_audio:
      "Something went wrong in sharing audio",
    Something_went_wrong_in_sharing_video:
      "Something went wrong in sharing video",
    Something_went_wrong_in_sharing_text:
      "Something went wrong in sharing text feedback",
    Something_went_wrong_in_sharing_attachment:
      "Something went wrong in sharing attachment",
    Please_tap_to_record_the_audio: "Please tap to record the audio",
    Record_Your_Video: "Record Your Video",
    Capture_Your_Selfie: "Capture Your Selfie",
    Enter_Your_Feedback: "Enter Your Feedback",
    Retake: "Retake",
    Recapture: "Re-capture",
    No_internet_connection: "No internet connection",
    Please_record_an_audio_to_proceed: "Please record an audio to proceed",
    Please_record_a_video_to_proceed: "Please record a video to proceed",
    Please_take_a_picture_to_proceed: "Please take a picture to proceed",
    Video_should_be_more_than_5_seconds: "Video should be more than 5 seconds",
    Audio_should_be_minimum_5_seconds: "Audio should be minimum 5 seconds",
  },
  Arabic: {
    Feedback: "??????????",
    Select_language_of_your_feedback: "?????? ?????? ????????????????",
    Continue: "????????????",
    How_was_your_experience: "?????? ???????? ??????????????",
    Audio: "????????",
    Video: "??????????",
    Text: "????",
    Selfie: "????????/??????????",
    Your_feedback_must_contain_at_least_6_characters:
      "?????? ???? ?????????? ???????????????? ?????? 6 ???????? ?????? ??????????",
    Message_Feedback: "?????????? ????????????",
    Characters: "????????????",
    Back: "????????",
    Next: "????????????",
    Audio_Feedback: "???????? ?????????? ??????????????",
    Seconds: "??????????",
    Rerecord: "?????????? ??????????????",
    Record: "??????",
    Selfie_Feedback: "?????????????? ??????????",
    Capture: "????????????",
    Retake_Recapture: "?????????? ????????????",
    Video_Feedback: "???????? ?????????? ?????? ??????????????",
    Add_Attachment: "?????????? ????????",
    Thanks_for_your_feedback: "???????? ??????????????????",
    Please_rate_us: "???????? ???? ???????????? ??????????????",
    Rating: "??????????",
    This_feedback_will_be_used_for_quality_assurance_purposes:
      "???????? ?????????????? ?????? ?????????????????? ???????????? ???????? ????????????",
    We_are_always_happy_to_serve_you: "?????? ?????????? ?????????? ????????????",
    Thank_you_for_letting_us_know_Your_feedback_helps_us_do_better:
      "???????? ???? ????????????????. ?????????????? ???????????????? ?????? ???????????? ???????? ????????.",
    We_are_sorry_you_had_a_bad_experience_We_will_try_to_improve_our_service:
      "?????? ???????? ???????? ???????? ???????????? ????????. ???????????? ?????????? ??????????????.",
    Would_you_like_to_attach_any_supporting_documents:
      "???? ???????? ???? ?????????? ???? ?????????????? ??????????????",
    Skip: " ????????",
    Attachments_should_be_of_type_png_jpg_and_PDF_and_should_be_less_than_5_MBs_in_size:
      "?????? ???? ???????? ???????????????? ???? ?????????? png, jpg ???? PDF ???????? ???? 5MBs ???? ??????????",
    Next_Send: "????????????",
    Upload_file: "?????? ??????",
    Remove_Attachment: "?????????? ????????",
    Submit: "??????????",
    You_have_reached_the_daily_limit_for_feedback_today_Please_visit_the_app_tomorrow_to_submit_more_feedbacks:
      "?????? ???????? ?????? ???????? ???????????? ?????????????????? ??????????. ???????? ?????????? ?????????????? ???????? ???????????? ???????????? ???? ??????????????????",
    No_microphone_detected: "???? ?????? ?????????? ???? ????????????????",
    No_camera_detected: "???? ?????? ?????????? ???? ????????????????",
    No_microphone_and_camera_detected: "???? ?????? ?????????? ???? ???????????????? ??????????????",
    Retry: "?????? ????????????????",
    Unable_to_upload_attachments_more_than_5MBs:
      "?????????? ?????????? ???????????????? ???????? ???????? ?????????? ???? 5 ???????? ????????",
    This_feedback_will_be_used_for_quality_assurance_purposes:
      "???????? ?????????????? ?????? ?????????????????? ???????????? ???????? ????????????",
    View_PDF: "?????? ?????? PDF",
    Done: "????????",
    Something_went_wrong_in_sharing_ratings:
      "?????? ?????? ???? ???? ???????????? ??????????????????",
    Something_went_wrong_in_sharing_image:
      "?????? ?????? ???? ???? ???????????? ????????????",
    Something_went_wrong_in_sharing_audio:
      "?????? ?????? ???? ???? ???????????? ??????????",
    Something_went_wrong_in_sharing_video:
    "?????? ?????? ???? ???? ???????????? ??????????????",
    Something_went_wrong_in_sharing_text:
      "?????? ?????? ???? ???? ???????????? ?????????????????? ????????????",
    Something_went_wrong_in_sharing_attachment:
      "?????? ?????? ???? ???????????? ????????????",
    Please_tap_to_record_the_audio: "???????? ?????????? ???????????? ??????????",
    Record_Your_Video: "?????? ?????????????? ?????????? ????",
    Capture_Your_Selfie: "?????????? ?????????? ??????????????",
    Enter_Your_Feedback: "???????? ????????????????",
    Retake: "??????????",
    Recapture: "?????????? ????????????????",
    No_internet_connection: "???? ???????? ?????????? ??????????????????",
    Please_record_an_audio_to_proceed: "???????? ?????????? ?????????? ????????????????",
    Please_record_a_video_to_proceed: "???????????? ?????????? ?????????????? ????????????????",
    Please_take_a_picture_to_proceed: "???????? ???????????? ???????? ?????????? ????????",
    Video_should_be_more_than_5_seconds: "?????? ???? ???????? ?????? ?????????????? ???? 5 ??????????",
    Audio_should_be_minimum_5_seconds: "?????? ?????? ?????? ?????? ?????????? ???? 5 ??????????",
  },
  Urdu: {
    Feedback: "?????????? ????????",
    Select_language_of_your_feedback: "???????? ???????????? ???? ???????? ?????????? ????????",
    Continue: "??????",
    How_was_your_experience: "???? ???? ?????????? ???????? ????????",
    Audio: "???????? ",
    Video: "??????????",
    Text: "??????????",
    Selfie: "??????????",
    Your_feedback_must_contain_at_least_6_characters:
      "???? ???? ???????? ?????? ???? ???? ???? 6 ???????? ???????? ???????????? ",
    Message_Feedback: "???????????? ????????",
    Characters: "????????",
    Add_Attachment: "?????????? ??????????????????",
    Back: "??????????",
    Next: "??????",
    Audio_Feedback: "???????? ????????",
    Seconds: "??????????",
    Rerecord: "???????????? ???????????? ????????",
    Record: "???????????? ????????",
    Selfie_Feedback: "?????????? ????????",
    Capture: "?????????? ??????",
    Retake_Recapture: "?????? ?????????? ??????",
    Video_Feedback: "?????????? ???????? ",
    Thanks_for_your_feedback: "???????? ?????????? ???????? ???? ??????????",
    Please_rate_us: "?????????? ???????? ???? ?????? ??????????",
    Rating: "??????????",
    This_feedback_will_be_used_for_quality_assurance_purposes:
      "???????? ?????? ?????????? ???????? ???? ?????????? ???? ???????? ???????? ???? ?????? ?????????????? ???? ???????? ????",
    We_are_always_happy_to_serve_you: "???????? ???????? ?????????? ?????? ???????? ???? ???????? ????",
    Thank_you_for_letting_us_know_Your_feedback_helps_us_do_better:
      "???????? ???????????? ???? ???????? ???????? ???????? ???? ??????????. ???????? ????????  ???????? ???????? ???????? ?????? ?????? ???????? ????.",
    We_are_sorry_you_had_a_bad_experience_We_will_try_to_improve_our_service:
      "???????? ?????????? ???? ???? ???? ???? ?????? ?????????? ???????? ???? ???????? ???????? ???? ???????? ?????????? ???? ???????? ???????? ??????",
    Would_you_like_to_attach_any_supporting_documents:
      "?????? ???? ???????? ?????????? ?????????????? ???????? ?????????? ??????",
    Skip: "?????? ??????????",
    Attachments_should_be_of_type_png_jpg_and_PDF_and_should_be_less_than_5_MBs_in_size:
      "?????????????? .png?? .jpg ?????? .PDF ?????? ???? ???????? ???????????? ?????? ???? ???? ???????? 5 MB ???? ???? ???????? ????????????",
    Next_Send: "??????",
    Upload_file: "???????? ?????????? ????????",
    Remove_Attachment: "???????????? ???? ?????? ??????",
    Submit: "?????? ??????????",
    You_have_reached_the_daily_limit_for_feedback_today_Please_visit_the_app_tomorrow_to_submit_more_feedbacks:
      "???? ???? ???????????? ???? ???????????? ???? ???? ???? ???????? ?????? ???????? ???????? ?????? ?????? ?????? ?????????? ???? ?????? ???????? ?????? ???? ?????? ???????????? ??????????",
    No_microphone_detected: "???????????????????? ???????? ??????",
    No_camera_detected: "?????????? ???????? ??????",
    No_microphone_and_camera_detected: " ???????????????????? ?????? ?????????? ???????? ??????",
    Retry: "???????????? ???????? ????????",
    Unable_to_upload_attachments_more_than_5MBs:"5MBs ???? ?????????? ?????????????? ???? ?????? ???????? ???? ????????",
    This_feedback_will_be_used_for_quality_assurance_purposes:
      "???????? ?????? ?????????? ???????? ???? ?????????? ???? ???????? ???????? ???? ?????? ?????????????? ???? ???????? ????s",
    View_PDF: "PDF ????????????",
    Done: "??????",
    Something_went_wrong_in_sharing_ratings:
      "???????? ???????? ???? ???????????? ???????? ?????? ?????? ?????? ???? ????????",
    Something_went_wrong_in_sharing_image:
      "?????????? ???????? ???????? ?????? ?????? ?????? ???? ????????",
    Something_went_wrong_in_sharing_audio:
      "???????? ???? ???????????? ???????? ?????? ?????? ?????? ???? ??????",
    Something_went_wrong_in_sharing_video:
      "?????????? ???????? ???????? ?????? ?????? ?????? ???? ????????",
    Something_went_wrong_in_sharing_text:
      "?????? ???? ???????????? ???? ???????????? ???????? ?????? ?????? ?????? ???? ????????",
    Something_went_wrong_in_sharing_attachment:
      "???????????? ???? ???????????? ???????? ?????? ?????? ?????? ???? ????????",
    Please_tap_to_record_the_audio: "???????? ?????? ???????? ???????????? ???????? ???? ?????? ??????????????",
    Record_Your_Video: "???????? ?????????? ???????????? ??????????",
    Capture_Your_Selfie: "???????? ?????????? ?????????? ??????????",
    Enter_Your_Feedback: "???????? ???????? ?????? ??????????",
    Retake: "???????????? ????????",
    Recapture: "???????????? ????????",
    No_internet_connection: "?????????????? ?????????? ???????? ??????",
    Please_record_an_audio_to_proceed: "?????? ?????????? ???? ?????? ???????? ?????? ?????? ???????? ???????????? ??????????",
    Please_record_a_video_to_proceed: "?????? ?????????? ???? ?????? ???????? ?????? ?????? ?????????? ???????????? ??????????",
    Please_take_a_picture_to_proceed: "???????? ?????? ?????? ?????????? ???? ?????? ?????? ?????????? ????????",
    Video_should_be_more_than_5_seconds: "?????????? 5 ?????????? ???? ?????????? ???????? ????????????",
    Audio_should_be_minimum_5_seconds: "???????? ???? ???? ???? 5 ?????????? ???? ???????? ????????????",
  },
};
export const setLanguage = (id) => {
  let langID, resource, langName;
  if (id == 1) {
    (langID = 1), (langName = "English"), (resource = Resources.English);
  } else if (id == 2) {
    (langID = 2), (resource = Resources.Arabic), (langName = "Arabic");
  } else {
    (langID = 3), (resource = Resources.Urdu), (langName = "Urdu");
  }
  return {
    type: actionTypes.SET_LANGUAGE,
    languageID: langID,
    languageName: langName,
    resource: resource,
  };
};
