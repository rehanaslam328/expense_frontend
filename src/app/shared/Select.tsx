/** @format */

import { Form, Select, Divider, Space } from "antd";
import { Icons, Buttonx } from "app/shared";
import { SelectxProps } from "./types";

const { AiOutlineDown, VscAdd } = Icons;
const { Option } = Select;

const Selectx = ({
  label,
  name,
  rules = [],
  className,
  // mode,
  // status,
  // showSearch,
  placeholder = "Search or Select",
  options = [],
  loading = false,
  create_opt = false,
  size = "large",
  handleChange = () => {},
  handleToggle = () => {},
  defaultValue = null,
  disabled = false,
  bordered = true,
  style,
  noStyle = false,
  onDropdownVisibleChange = () => {},
  allowClear = true,
}: // labelInValue
SelectxProps) => {
  return (
    <Form.Item label={label} name={name} className={className} rules={rules} noStyle={noStyle}>
      <Select
        // mode="multiple"
        // status="error"
        // open
        style={style}
        bordered={bordered}
        showSearch
        allowClear={allowClear}
        disabled={disabled}
        loading={loading}
        placeholder={placeholder}
        value={defaultValue}
        optionFilterProp="children"
        // maxTagCount={"responsive" as const} //performance const
        // clearIcon={<CloseOutlined />}
        // notFoundContent={{}}
        // dropdownStyle={{}}
        size={size}
        onChange={handleChange}
        onDropdownVisibleChange={onDropdownVisibleChange}
        suffixIcon={<AiOutlineDown />}
        dropdownRender={(menu) => (
          <>
            {menu}
            {create_opt && <DropDownCreateOption handleToggle={handleToggle} />}
          </>
        )}
        filterOption={(input, option) =>
          // @ts-ignore
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          // @ts-ignore
          optionA?.children
            // @ts-ignore
            ?.toLowerCase()
            // @ts-ignore
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        {options.map((val: any) =>
          typeof val === "string" ? (
            <Option value={val} key={val}>
              {val}
            </Option>
          ) : (
            <Option value={val.id} key={val.id}>
              {val.country_name ? val.country_name : val.label}
            </Option>
          )
        )}
      </Select>
    </Form.Item>
  );
};
const DropDownCreateOption = ({ handleToggle }: any) => (
  <>
    <Divider style={{ margin: "8px 0" }} />
    <Space
      style={{
        display: "block",
      }}
    >
      <Buttonx
        size="small"
        type="dashed"
        icon={<VscAdd />}
        btnText="Create"
        clickHandler={handleToggle}
        style={{ marginBottom: "5px" }}
      />
    </Space>
  </>
);
export default Selectx;
