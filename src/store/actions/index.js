export const setAuthState = (email, authState, first_name, last_name) => ({
  type: "AUTH_USER",
  email: email,
  authState: authState,
  first_name: first_name,
  last_name: last_name,
});

export const logOut = () => ({
  type: "LOGOUT",
});

export const setProfilePhoto = (photo_url) => ({
  type: "SET_PROFILE_PHOTO",
  photo_url: photo_url,
});
