const SET_PROFILE_PHOTO = "SET_PROFILE_PHOTO";

export const ProfileReducer = (states = [], action) => {
  switch (action.type) {
    case SET_PROFILE_PHOTO:
      return {
        ...states,
        profile_photo_url: action.photo_url,
      };
    default:
      return states;
  }
};
