import { useLayoutEffect, useState } from "react";
import qString from "query-string";
import { Link, useLocation } from "react-router-dom";
import { axiosCall } from "services";
import { useLoading } from "app/Hooks";
import { Buttonx, PageLoader, Status } from "app/shared";
import { endpoints, Content, Labels, routeNames } from "static";

const { LOGIN } = Labels;
const { LOGIN: login } = routeNames;
const { EMAIL_VERIFIED } = endpoints;
const { account_verified, congratulations, account_not_verified } = Content;

const Button = () => (
  <Link to={login}>
    <Buttonx btnText={LOGIN} htmlType="button" />
  </Link>
);

export const Verification = () => {
  const { search } = useLocation();
  const [status, setStatus] = useState(false);
  const { token } = qString.parse(search);
  const [loading, , setTrue, setFalse] = useLoading(false);
  useLayoutEffect(() => {
    axiosCall({
      data: { register_confirm_token: token },
      method: "post",
      url: EMAIL_VERIFIED,
      isAuth: false,
    }).then((res) => {
      if (res) {
        setStatus(true);
        setTrue();
      } else setFalse();
    });
  }, [token, setTrue, setFalse, setStatus]);

  return loading ? (
    <Status
      status="success"
      title={account_verified}
      subTitle={congratulations}
      extra={<Button key="btn" />}
    />
  ) : !status ? (
    <PageLoader />
  ) : (
    <Status
      status="error"
      title={account_not_verified}
      subTitle=""
      extra={<Button key="confirm-btn" />}
    />
  );
};
