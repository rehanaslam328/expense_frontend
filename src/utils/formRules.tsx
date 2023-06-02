import { Rule } from "antd/lib/form";
import { RuleType } from "rc-field-form/lib/interface";

const passwordValidator = ({ getFieldValue }: any) => ({
  validator(_ex: any, value: any) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("Password not matched!"));
  },
});

export const rules = (
  name: RuleType = "email",
  message?: string,
  is_confirm: boolean = false
): Rule[] =>
  !message
    ? [{ type: name, required: true }]
    : !is_confirm
    ? [{ required: true, message }]
    : [{ required: true, message }, passwordValidator];
