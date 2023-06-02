import { Button, Form } from "antd";
import { Link } from "react-router-dom";
import { ButtonProps } from "./types";

const Buttonx = ({
  type = "primary",
  shape = "round",
  size = "large",
  htmlType = "submit",
  clickHandler,
  loading = false,
  btnText = "Submit",
  block = false,
  className = "",
  linkTo = "",
  wrapperCol = {},
}: ButtonProps) => (
  <Form.Item wrapperCol={wrapperCol}>
    {linkTo ? (
      <Link to={linkTo}>
        <Button type={type} size={size} shape={shape} className={className}>
          {btnText}
        </Button>
      </Link>
    ) : (
      <Button
        type={type}
        className={className}
        shape={shape}
        size={size}
        htmlType={htmlType}
        onClick={clickHandler}
        loading={loading}
        block={block}
      >
        {btnText}
      </Button>
    )}
  </Form.Item>
);
export default Buttonx;
