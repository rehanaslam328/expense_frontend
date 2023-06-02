const sso_url = process.env.REACT_APP_SSO_URL;

export const ssoForgetPasswordPath = (endPoint = `http://${window.location.host}/login`) =>
  `${sso_url}/forgotPassword?serviceUrl=${endPoint}`;

export const ssoSignInPath = (endPoint = `http://${window.location.host}`) =>
  `${sso_url}/login?serviceUrl=${endPoint}`;

export const ssoSignUpPath = (endPoint = `http://${window.location.host}`) =>
  `${sso_url}/signup?serviceUrl=${endPoint}`;

export const ssoMyProfilePath = () => `${sso_url}/myProfile`;

export const ssoLogoutPath = () => `${sso_url}/logout?lg=books`;
