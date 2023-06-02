import { Form, DatePicker } from "antd";

const { RangePicker } = DatePicker;

// const disabledDate = (current: any) => {
//   // Can not select days before today and today
//   return current && current < moment().endOf("day");
// };

const dateFormat = "YYYY-MM-DD";

const DatePickerx = ({
  is_date = true,
  disabled = false,
  name = "",
  label = "",
  rules = [],
}: any) => {
  return (
    <Form.Item name={name} label={label} rules={rules}>
      {is_date ? (
        <DatePicker
          size="middle"
          disabled={disabled}
          format={dateFormat}
          style={{ width: "100%" }}
        />
      ) : (
        <RangePicker />
      )}
    </Form.Item>
  );
};
export default DatePickerx;
