import { Button, Form, Space, Tooltip, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useAxios } from "app/Hooks";
import { PageLoader, Toast, Icons, CheckBox, Buttonx } from "app/shared";
import { useEffect } from "react";
import { useGetListingQuery } from "store/query/ExpenseField";

const { Text } = Typography;
const { RiDeleteBinLine, VscAdd } = Icons;
const Fields = () => {
  const [form] = useForm();
  const { data = [], isLoading } = useGetListingQuery("");
  const { callAxios, bool } = useAxios();

  useEffect(() => {
    form.setFieldValue("status", data?.preferences?.status);
  }, [data]);

  const onSubmit = (values: object[]) => {
    callAxios({
      method: "put",
      data: values,
      url: "preferences/expense",
    }).then((res) => {
      if (res) {
        Toast({ message: res.message });
      }
    });
  };
  if (isLoading) return <PageLoader />;
  return (
    <>
      <Form name="form-pref" form={form} onFinish={onSubmit}>
        <table
          style={{
            borderCollapse: "collapse",
            borderSpacing: 0,
            width: "100%",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#d9d9d929" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>ENABLE</th>
              <th style={{ textAlign: "left", padding: "8px" }}>FIELD</th>
              <th style={{ textAlign: "left", padding: "8px" }}>MANDATORY</th>
              <th style={{ textAlign: "left", padding: "8px" }}>SHOW IN PDF</th>
            </tr>
          </thead>
          <Form.List name="status">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <tbody>
                    <tr key={key} style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                      <td style={{ textAlign: "left", padding: "8px" }}>
                        <CheckBox {...restField} name={[`${name}`, "is_enabled"]} />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px" }}>
                        <Text>{data?.preferences?.status[key]?.field_name_formatted}</Text>
                      </td>
                      <td style={{ textAlign: "left", padding: "8px" }}>
                        <CheckBox {...restField} name={[`${name}`, "is_mandatory"]} />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px" }}>
                        <CheckBox {...restField} name={[`${name}`, "is_pdf"]} />
                      </td>
                      <td style={{ display: "none" }}>
                        <Tooltip title="Delete">
                          <Button
                            shape="circle"
                            icon={<RiDeleteBinLine size={14} color="red" />}
                            onClick={() => remove(name)}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                ))}
                <Form.Item>
                  <Text
                    onClick={() => add()}
                    style={{ color: "blue", cursor: "pointer", display: "none" }}
                  >
                    <VscAdd color="blue" /> Add Anthor Line
                  </Text>
                </Form.Item>
              </>
            )}
          </Form.List>
        </table>
        <Space>
          <Buttonx
            btnText="Save"
            wrapperCol={{
              offset: 10,
            }}
            loading={bool}
          />
        </Space>
      </Form>
    </>
  );
};
export default Fields;