import { Result } from "antd";
import Buttonx from "./Button";

export const NotFound = () => {
  return (
    <Result
      className="not-found"
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Buttonx type="link" linkTo="/dashboard" btnText="Back Home" />}
    />
  );
};
