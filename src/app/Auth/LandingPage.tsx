import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { routeNames } from "static";
import { Buttonx } from "app/shared";
import { ssoSignInPath } from "utils";

export const LandingPage = () => {
  const navigate = useNavigate();
  const sso_login = ssoSignInPath();
  const handleClick = () => {
    if (process.env.REACT_APP_SSO_ENABLE === "true") window.location.href = sso_login;
    else navigate(routeNames.LOGIN);
  };
  return (
    <>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography.Title
          style={{ color: "darkblue", fontSize: "100px" }}
          className="hover-underline"
        >
          Welcome to Expense
        </Typography.Title>
      </div>

      <div>
        <Buttonx
          btnText="Sign In"
          shape="default"
          type="ghost"
          clickHandler={handleClick}
          style={{ marginTop: "20px" }}
        />
      </div>
    </>
  );
};
