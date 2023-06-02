import { Form, Checkbox } from "antd";
import { CheckBoxTypes } from "./types";

const CheckBox = ({ name = "", noStyle = true, label = "" }: CheckBoxTypes) => {
  return (
    <Form.Item name={name} valuePropName="checked" noStyle={noStyle}>
      <Checkbox>{label}</Checkbox>
    </Form.Item>
  );
};
export default CheckBox;
