import { Form, Tooltip, Button, Typography, Row, Col, FormInstance } from "antd";
import { Selectx, InputField, Icons } from "app/shared";
import { getTotal } from "utils/Calculation";

const { Text, Title } = Typography;
const { RiDeleteBinLine, VscAdd } = Icons;

export const ExpenseDetail = ({
  categories,
  form
}: {
  categories?: object[];
  form:FormInstance
}) => {
  const itemizedData = Form.useWatch('expense_details', form)
  return (
    <>
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
            <th style={{ textAlign: "left", padding: "8px" }}>Category</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Description</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Amount</th>
          </tr>
        </thead>
        <Form.List name="expense_details">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                    <td style={{ textAlign: "left", padding: "8px" }}>
                      <Selectx
                        label="Category"
                        {...restField}
                        name={[`${name}`, "category_id"]}
                        rules={[
                          {
                            required: true,
                            message: "please select category",
                          },
                        ]}
                        placeholder="Select Catgeory"
                        size="large"
                        options={categories}
                        className="flex_root"
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px" }}>
                      <InputField
                        label="Description"
                        size="large"
                        name={[`${name}`, "description"]}
                        placeholder="Description"
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px" }}>
                      <InputField
                        label="Amount"
                        size="large"
                        name={[`${name}`, "amount"]}
                      />
                    </td>
                    <td>
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
                <Text onClick={() => add()} style={{ color: "blue", cursor: "pointer" }}>
                  <VscAdd color="blue" /> Add Anthor Line
                </Text>
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Title level={4}>Expense Total ($)</Title>
                </Col>
                <Col span={12}>
                  <Title level={4}>{getTotal(itemizedData)}</Title>
                </Col>
              </Row>
            </>
          )}
        </Form.List>
      </table>
    </>
  );
};
