//@ts-ignore
import { Upload, Form, Space, Tooltip, Button, Typography, Checkbox } from "antd";
import { Icons, DatePickerx, InputField, Buttonx, Selectx } from "app/shared";
import { useNavigate } from "react-router-dom";
import { rules } from "utils";
import { routeNames } from "static";
import { initialBulkValues } from "../Constant";
// import { FormProps } from "../Types";

const { Text } = Typography;
const { RiDeleteBinLine, VscAdd } = Icons;
const { EXPENSES } = routeNames;

export const BulkExpenseForm = ({
  loading,
  createFormData,
  // handleTagChange,
  onSubmit,
}: any) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { expense_categories, payment_modes, currencies, merchants } = createFormData;

  const handleNavigate = () => {
    navigate(EXPENSES);
  };
  return (
    <>
      <Form
        name="expense-form"
        initialValues={initialBulkValues}
        onFinish={onSubmit}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <table
          style={{
            borderCollapse: "collapse",
            borderSpacing: 0,
            width: "100%",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ background: "#d9d9d929" }}>
              {/* <th style={{ textAlign: "left", padding: "8px" }}>Image</th> */}
              <th style={{ textAlign: "left", padding: "8px" }}>EXPENSE DATE</th>
              <th style={{ textAlign: "left", padding: "8px" }}>MERCHANT</th>
              <th style={{ textAlign: "left", padding: "8px" }}>CATEGORY</th>
              <th style={{ textAlign: "left", padding: "8px" }}>AMOUNT</th>
              <th style={{ textAlign: "left", padding: "8px" }}>REIMURSABLE</th>
              <th style={{ textAlign: "left", padding: "8px" }}>PAID THORUGH</th>
              <th style={{ textAlign: "left", padding: "8px" }}>DESCRIPTION</th>
              <th style={{ textAlign: "left", padding: "8px" }}>REFERENCE#</th>
            </tr>
          </thead>
          <Form.List name="bulk_expenses">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <tbody>
                    <tr key={key}>
                      {/* <td style={{ textAlign: "left", padding: "8px", width: "10%" }}>
                        <Form.Item style={{ width: "50px" }}>
                          <Form.Item
                            name="dragger"
                            valuePropName="fileList"
                            // getValueFromEvent={normFile}
                            noStyle
                          >
                            <Upload.Dragger name="files" action="/upload.do">
                              <p className="ant-upload-drag-icon">
                                <VscAdd size={25} />
                              </p>
                            </Upload.Dragger>
                          </Form.Item>
                        </Form.Item>
                      </td> */}
                      <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                        <DatePickerx
                          {...restField}
                          name={[`${name}`, "date"]}
                          rules={rules(undefined, "Enter Expense Date")}
                        />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Selectx
                            {...restField}
                            name={[`${name}`, "merchant"]}
                            placeholder="Select Merchant"
                            className="flex_root"
                            options={merchants}
                          />
                        </div>
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          <Selectx
                            {...restField}
                            name={[`${name}`, "category_id"]}
                            placeholder="Select Category"
                            rules={rules(undefined, "Select Category")}
                            className="flex_root"
                            options={expense_categories}
                          />
                        </div>
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                        <InputField
                          {...restField}
                          name={[`${name}`, "total_amount"]}
                          rules={rules(undefined, "Select Amount")}
                          addonBefore={
                            <Selectx
                              {...restField}
                              name={[`${name}`, "currency_id"]}
                              defaultValue="PKR"
                              options={currencies}
                              size="small"
                              noStyle
                            />
                          }
                        />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "5%" }}>
                        <Form.Item
                          {...restField}
                          name={[`${name}`, "claim_reimbursement"]}
                          valuePropName="checked"
                        >
                          <Checkbox></Checkbox>
                        </Form.Item>
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                        <Selectx
                          {...restField}
                          name={[`${name}`, "paid_id"]}
                          placeholder="Select"
                          className="flex_root"
                          options={payment_modes}
                        />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                        <InputField {...restField} name={[`${name}`, "description"]} size="large" />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                        <InputField {...restField} name={[`${name}`, "ref_number"]} size="middle" />
                      </td>
                      <td>
                        <Tooltip title="Delete">
                          <Button
                            shape="circle"
                            style={{ marginBottom: "23px" }}
                            icon={<RiDeleteBinLine size={14} color="red" />}
                            onClick={() => remove(name)}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                    {/* <tr>
                      {tags?.map((tag: any) => {
                        return (
                          <>
                            <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                              <Selectx
                                label={tag.name}
                                {...restField} 
                                name={[`${name}`, `expense_tags${key}`]}
                                placeholder="Select Tags"
                                options={tag.tag_details}
                                className="flex_root"
                                handleChange={() => handleTagChange(key)}
                                rules={tag.mandatory ? rules(undefined, `Select ${tag.name}`) : []}
                              />
                            </td>
                          </>
                        );
                      })}
                    </tr> */}
                  </tbody>
                ))}
                <Form.Item>
                  <Text
                    onClick={() => add()}
                    style={{ color: "blue", cursor: "pointer", marginLeft: "20px" }}
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
            loading={loading}
          />
          <Buttonx
            btnText="Cancel"
            wrapperCol={{
              offset: 10,
            }}
            htmlType="button"
            type="default"
            clickHandler={handleNavigate}
          />
        </Space>
      </Form>
    </>
  );
};
