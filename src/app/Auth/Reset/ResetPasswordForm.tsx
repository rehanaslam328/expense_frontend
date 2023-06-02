/** @format */

import qString from "query-string";
import { Form, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { rules } from "utils";
import { resetFormProps } from ".";
import { Labels, Content, routeNames } from "static";
import { Buttonx, InputField, Icons } from "app/shared";

const { SIGNIN, PASSWORD, CONFIRM_PASSWROD, CODE, SUBMIT } = Labels;
const { reset_password, enter_confirmation_code, password_field_required, enter_confirm_password } =
  Content;
const { LOGIN } = routeNames;
const { AiOutlineLock, AiOutlineNumber } = Icons;

const initialValues = {
  confirmation_code: "",
  password: "",
  password_confirmation: "",
};

export const ResetPasswordForm = ({ onSubmit, loading }: resetFormProps) => {
  const [form] = Form.useForm();
  const { search } = useLocation();
  const { token } = qString.parse(search);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography.Title className="hover-underline">{reset_password}</Typography.Title>
      <Form
        name={reset_password}
        labelCol={{
          span: 16,
        }}
        initialValues={{ ...initialValues, confirmation_code: token || "" }}
        form={form}
        onFinish={onSubmit}
        autoComplete="off"
        style={{
          background: "#fff",
          border: "1px solid #d3dee6",
          borderRadius: "10px",
          padding: "4rem",
          boxShadow: "0 10px 60px rgb(0 0 0 / 10%)",
        }}
        scrollToFirstError
        layout="vertical"
      >
        <InputField
          label={CODE}
          name="confirmation_code"
          rules={rules(undefined, enter_confirmation_code)}
          LeftIcon={<AiOutlineNumber />}
        />

        <InputField
          label={PASSWORD}
          name="password"
          rules={rules(undefined, password_field_required, true)}
          LeftIcon={<AiOutlineLock />}
          password
        />

        <InputField
          label={CONFIRM_PASSWROD}
          dependencies={["password"]}
          name="password_confirmation"
          rules={rules(undefined, enter_confirm_password, true)}
          LeftIcon={<AiOutlineLock />}
          password
        />
        <Buttonx
          type="link"
          size="small"
          className="login-form-forget hover-underline"
          btnText={SIGNIN}
          linkTo={LOGIN}
        />

        <Buttonx
          wrapperCol={{
            offset: 3,
            span: 16,
          }}
          block
          loading={loading}
          btnText={SUBMIT}
        />
      </Form>
    </div>
  );
};
