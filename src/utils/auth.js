const AUTH_USER = "AUTH_USER";
const MY_LOCATION = "MY_LOCATION";
const MY_REGION = "MY_REGION";
const MY_PROFILE = "MY_PROFILE";
const MY_COUNTRY = "MY_COUNTRY";

export function SetCrossData(data) {
  try {
    let crossDataObj = JSON.parse(data);
    localStorage.setItem(AUTH_USER, crossDataObj[AUTH_USER]);
    localStorage.setItem(MY_PROFILE, crossDataObj[MY_PROFILE]);
    localStorage.setItem(MY_COUNTRY, crossDataObj[MY_COUNTRY]);
    localStorage.setItem(MY_REGION, crossDataObj[MY_REGION]);
    localStorage.setItem(MY_LOCATION, crossDataObj[MY_LOCATION]);
    return true;
  } catch (ex) {
    return false;
  }
}

export function GetAuth() {
  try {
    const auth = JSON.parse(localStorage.getItem(AUTH_USER));
    return auth;
  } catch (ex) {
    return null;
  }
}
export function GetLocation() {
  try {
    const mylocation = JSON.parse(localStorage.getItem(MY_LOCATION));
    return mylocation;
  } catch (ex) {
    return null;
  }
}
export function GetRegion() {
  try {
    const region = JSON.parse(localStorage.getItem(MY_REGION));
    return region;
  } catch (ex) {
    return null;
  }
}
export function GetProfile() {
  try {
    const myProfile = JSON.parse(localStorage.getItem(MY_PROFILE));
    return myProfile;
  } catch (ex) {
    return null;
  }
}
export function GetCountry() {
  try {
    const myCountry = JSON.parse(localStorage.getItem(MY_COUNTRY));
    return myCountry;
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(AUTH_USER);
  localStorage.removeItem(MY_REGION);
  localStorage.removeItem(MY_LOCATION);
  localStorage.removeItem(MY_COUNTRY);
  localStorage.removeItem(MY_PROFILE);
  localStorage.clear();
}
