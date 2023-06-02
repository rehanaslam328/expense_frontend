/** @format */

import { Form, Select, Spin } from "antd";
import { useBool } from "app/Hooks";
import { useDynamicSelectPagination } from "app/Hooks/useDynamicSelectPagination";
const { Option } = Select;

type paginateprops = {
  label: string;
  name: any;
  placeholder: string;
  disabled?: boolean;
  url: string;
};

const PaginateSelectX = ({
  label,
  name,
  placeholder = "Search or Select",
  disabled = false,
  url,
}: paginateprops) => {
  const { setTrue, setFalse } = useBool(true);

  const { fetching, options, hasContentLoading, handleScroll, debounceFetcher } =
    useDynamicSelectPagination(url);

  const handleCustomerChange = () => setFalse();

  const handleCustomerDeselect = () => {
    setTrue();
  };
  return (
    <Form.Item
      label={label}
      name={name}
      className="flex_root"
      rules={[
        {
          required: true,
          message: "please select one",
        },
      ]}
    >
      <Select
        disabled={disabled}
        placeholder={placeholder}
        allowClear
        showSearch
        loading={fetching}
        onSearch={debounceFetcher}
        onPopupScroll={handleScroll}
        onChange={handleCustomerChange}
        onDeselect={handleCustomerDeselect}
        filterOption={false}
        dropdownRender={(menu) => (
          <>
            {menu}
            {hasContentLoading && <Spin size="small" style={{ padding: "0 12px" }} />}
          </>
        )}
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
export default PaginateSelectX;
