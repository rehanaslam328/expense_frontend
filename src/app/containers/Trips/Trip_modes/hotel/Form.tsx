import { Form, Button, Tooltip, DatePicker, TimePicker, Typography, FormInstance } from "antd";
import { No_Entity } from "app/containers/Trips/No_Entity";
import { useState } from "react";
import { Icons, Selectx, InputField, PaginateSelectX } from "app/shared";
import { rules } from "utils";
import { useGetCitiesQuery } from "store/query/Trip";
import { endpoints } from "static";
//@ts-ignore
import moment from "moment";

const THEADNAMES = [
  "Name *",
  "LOCATION *",
  "CITY",
  "CHECK-IN *",
  "CHECK-OUT *",
  "DISCRIPTION",
  " ",
];

const { Text } = Typography;
const { TRIP } = endpoints;

const { RiDeleteBinLine, VscAdd } = Icons;
const HotelForm = ({ form }: { form: FormInstance }) => {
  const contry_id = Form.useWatch("trip_hotels", form);
  const dateformat = "YYYY-MM-DD";
  const [isfield, setisfield] = useState(true);
  const [id, setid] = useState<number>();
  const { data: cities } = useGetCitiesQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const handlefield = (array: any) => {
    array.length === 0 ? setisfield(false) : setisfield(true);
  };

  const handleopen = (open: boolean, key: number) => {
    if (open) setid(contry_id && contry_id[key]?.country);
  };

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
          <tr style={{ background: "#d9d9d929" }}>
            {isfield ? (
              THEADNAMES.map((head: string) => (
                <th style={{ textAlign: "left", padding: "8px", width: "auto" }}>{head}</th>
              ))
            ) : (
              <No_Entity />
            )}
          </tr>
        </thead>
        <Form.List name="trip_hotels">
          {(fields, { add, remove }) => (
            <>
              {handlefield(fields)}
              {fields.map(({ key, name, ...restField }) => (
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                      <InputField
                        size="middle"
                        name={[`${name}`, "name"]}
                        label=""
                        placeholder="hotal name"
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                      <PaginateSelectX
                        placeholder="select country"
                        label=""
                        name={[`${name}`, "country"]}
                        url={`${TRIP}/countries`}
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                      <Selectx
                        label=""
                        {...restField}
                        name={[`${name}`, "city"]}
                        rules={[
                          {
                            required: true,
                            message: "please select city",
                          },
                        ]}
                        placeholder="select city"
                        size="middle"
                        options={cities}
                        className="flex_root"
                        disabled={contry_id && !contry_id[key]?.country}
                        onDropdownVisibleChange={(open: boolean) => handleopen(open, key)}
                      />
                    </td>

                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Form.Item
                          name={[name, "checkin_date_dummy"]}
                          rules={rules(undefined, "please select checkin date")}
                        >
                          <DatePicker
                            onChange={(_, dateString) => {
                              const trips = form.getFieldsValue();
                              trips.trip_hotels[key].checkin_date = dateString;
                              console.log("trips =>", trips);
                              form.setFieldsValue({ trips });
                            }}
                            format={dateformat}
                          />
                        </Form.Item>
                        <Form.Item
                          name={[name, "checkin_time_dumy"]}
                          rules={rules(undefined, "please select checkin time")}
                        >
                          <TimePicker
                            onChange={(_, timeString: string) => {
                              const trips = form.getFieldsValue();
                              trips.trip_hotels[key].checkin_time = timeString;
                              console.log("trips =>", trips);
                              form.setFieldsValue({ trips });
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Form.Item
                          name={[name, "checkout_date"]}
                          rules={rules(undefined, "please select checkout date")}
                        >
                          <DatePicker format={dateformat} />
                        </Form.Item>
                        <Form.Item
                          name={[name, "checkout_time"]}
                          rules={rules(undefined, "please select checkout time")}
                        >
                          <TimePicker bordered={false} />
                        </Form.Item>
                      </div>
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "15%" }}>
                      <InputField
                        size="middle"
                        name={[`${name}`, "description"]}
                        label=""
                        placeholder="Description"
                      />
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
    </>
  );
};

export default HotelForm;
