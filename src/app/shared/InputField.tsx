import { Form, Input, InputNumber } from "antd";
import { InputFieldProps } from "./types";

const InputField = ({
  label,
  name,
  handleChange = () => {},
  className = "flex_root",
  rules = [],
  hasFeedback = true,
  LeftIcon,
  size = "large",
  password = false,
  dependencies = [],
  disabled = false,
  addonBefore = null,
  addonAfter = null,
  placeholder = "",
  textareaField = false,
  numberField = false,
  defaultvalue = ""
}: InputFieldProps) => (
  <Form.Item
    label={label}
    name={name}
    className={className}
    dependencies={dependencies}
    rules={rules}
    hasFeedback={hasFeedback}


  >
    {!password ? (
      textareaField ? (
        <Input.TextArea
          autoComplete="current-password"
          size={size}
          disabled={disabled}
          placeholder={placeholder}

        />
      ) : numberField ? (
        <InputNumber
          prefix={LeftIcon}
          autoComplete="current-password"
          size={size}
          disabled={disabled}
          placeholder={placeholder}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
        />
      ) : (
        <Input
          type="text"
          prefix={LeftIcon}
          autoComplete="current-password"
          size={size}
          disabled={disabled}
          placeholder={placeholder}
          addonBefore={addonBefore}
          addonAfter={addonAfter}
          defaultValue={defaultvalue}
          onChange={handleChange}
        />
      )
    ) : (
      <Input.Password prefix={LeftIcon} autoComplete="current-password" size={size} />
    )}
  </Form.Item>
);

export default InputField;
