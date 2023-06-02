/** @format */

import { MouseEventHandler, ReactNode, CSSProperties } from "react";
import { Rule } from "antd/lib/form";
import { OptionProps } from "antd/lib/select";
import { NamePath } from "antd/lib/form/interface";
import { ResultStatusType } from "antd/lib/result";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { FilterFunc, DefaultOptionType } from "rc-select/lib/Select";

export interface Options {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export type InputFieldProps = {
  label?: string;
  name: string | string[];
  className?: string;
  rules?: Rule[];
  hasFeedback?: boolean;
  LeftIcon?: ReactNode;
  size?: SizeType;
  password?: boolean;
  dependencies?: NamePath[];
  disabled?: boolean;
  value?: string;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  placeholder?: string;
  textareaField?: boolean;
  numberField?: boolean;
  defaultvalue?: any;
  handleChange?:()=>void
};

export type BtnProps = {
  type: "link" | "text" | "ghost" | "primary" | "default" | "dashed";
  shape: "default" | "round" | "circle";
  size: SizeType;
  htmlType: "submit" | "button" | "reset";
  loading: boolean;
  icon: ReactNode;
  btnText: string;
  block: boolean;
  className: string;
  style: CSSProperties;
  clickHandler: MouseEventHandler<HTMLElement> | undefined;
  linkTo?: string;
  wrapperCol?: object;
};

export type ButtonProps = Partial<BtnProps>;

export type StatusProps = {
  status: ResultStatusType;
  title: ReactNode;
  subTitle: ReactNode;
  extra: ReactNode;
};

type omitKeys = "password" | "dependencies" | "addonBefore" | "addonAfter" | "LeftIcon";

type selectProps = {
  mode?: "multiple" | "tag";
  status?: "error" | "warning";
  showSearch?: boolean;
  allowClear?: boolean;
  create_opt?: boolean;
  optionFilterProp?: string;
  clearIcon?: ReactNode;
  notFoundContent?: ReactNode;
  suffixIcon?: ReactNode;
  dropdownRender?: ReactNode;
  filterOption?: FilterFunc<OptionProps>;
  filterSort?: DefaultOptionType;
  options: any; // string[] | object[];
  loading?: boolean;
  handleChange?: any;
  handleToggle?: any;
  onDropdownVisibleChange: any;
  size: SizeType;
  defaultValue?: string | string[] | number | number[] | null;
  disabled?: boolean;
  bordered?: boolean;
  style: any;
  noStyle?: boolean;
};

export type SelectxProps = Omit<InputFieldProps, omitKeys> & Partial<selectProps>;

export type CheckBoxTypes = {
  name: string  | string[];
  noStyle?: boolean;
  label?: string;
};
