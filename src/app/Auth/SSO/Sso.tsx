import { useEffect } from "react";
import { useTypedDispatch } from "store";
import { apiService, Logout } from "store/slices/authSlice";
import { RESET_STATE_ACTION_TYPE } from "store/action/resetState";

export const Sso = () => {
  const dispatch = useTypedDispatch();
  useEffect(() => {
    SsoFunction();
    //eslint-disable-next-line
  }, []);

  const SsoFunction = () => {
    let url = window.location.href;
    let origins: string[];
    let Api_Url = "";

    const validToken = () => {
      const { authReducer } = JSON.parse(localStorage.getItem("persist:root") as string);
      const {
        token: { access_token = "" },
      } = JSON.parse(authReducer);
      if (access_token) return access_token;
      return false;
    };
    if (url.includes("com")) {
      origins = [
        "https://accounts.seebiz.com",
        "https://www.accounts.seebiz.com",
        "https://accounts.seebiz.com/",
        "https://www.accounts.seebiz.com/",
      ];
      Api_Url = "https://books.api.seebiz.com/api/v1";
    } else if (url.includes("cloud")) {
      origins = [
        "https://accounts.seebiz.cloud",
        "https://www.accounts.seebiz.cloud",
        "https://accounts.seebiz.cloud/",
        "https://www.accounts.seebiz.cloud/",
      ];
      Api_Url = "https://booksapi.seebiz.cloud/api/v1";
    } else if (window.location.hostname === "localhost") {
      origins = ["http://localhost:3010"];
      Api_Url = "http://localhost:8000/api/v1";
    }
    // const s3BucketUrl = "https://seebiz-development.s3.amazonaws.com";
    window.addEventListener("message", async ({ origin, data }) => {
      if (origins?.includes(origin) && typeof data === "string") {
        console.log('in sso event');
        const [token, userAction] = data.split(":#:");
        console.log({userAction});
        if (userAction === "login") {
          if (!validToken()) {
            const data = { st: token, location: "event_listener" };
            await dispatch(
              apiService({ data, method: "post", url: `${Api_Url}/info`, isAuth: false })
            ).catch((err) => {
                console.log("error in login ----> ", err);
              });
          }
        }
        if (userAction === "logout") {
          console.log('logout from sso');
          dispatch(Logout({ url: `${Api_Url}/auth/sso_logout` }));
            dispatch({ type: RESET_STATE_ACTION_TYPE });
            localStorage.clear();
            sessionStorage.clear();
        }
      }
    });
  };

  return null;
};