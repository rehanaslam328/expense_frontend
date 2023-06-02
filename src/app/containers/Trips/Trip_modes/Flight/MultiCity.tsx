import { Form, Button, Tooltip, DatePicker, Typography, Divider } from "antd";
import { Icons, Selectx, InputField, PaginateSelectX } from "app/shared";
import { useState } from "react";
import { Content } from "static";
import { rules } from "utils";
import { No_Entity } from "app/containers/Trips/No_Entity";

const { TRIP_CONTENT } = Content;
const { FLIGHT } = TRIP_CONTENT;
const { ONE_MULTY_WAY_TRIP_TABLE_HEADER } = FLIGHT;
const { Text } = Typography;

const { RiDeleteBinLine, VscAdd } = Icons;
type OneWayProps = {
  flight_preference: object[];
  time_preference: object[];
};
const Multycity = ({ flight_preference = [], time_preference = [] }: OneWayProps) => {
  const dateformat = "YYYY-MM-DD";
  const [isfield, setisfield] = useState(true);

  const handlefield = (array: any) => {
    array.length === 0 ? setisfield(false) : setisfield(true);
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
              ONE_MULTY_WAY_TRIP_TABLE_HEADER.map((head: string) => (
                <th style={{ textAlign: "left", padding: "8px", width: "auto" }}>{head}</th>
              ))
            ) : (
              <No_Entity />
            )}
          </tr>
        </thead>
        <Form.List name={["trip_flights", "flight_details"]}>
          {(fields, { add, remove }) => (
            <>
              {handlefield(fields)}
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left", padding: "8px", width: "25%" }}>
                        <PaginateSelectX
                          placeholder="select country"
                          label=""
                          name={[`${name}`, "depart_acode"]}
                          url="/airports"
                        />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "25%" }}>
                        <PaginateSelectX
                          placeholder="select country"
                          label=""
                          name={[`${name}`, "arrive_country"]}
                          url="/airports"
                        />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "25%" }}>
                        <Form.Item
                          name={[name, "depart_date"]}
                          rules={rules(undefined, "please select depart date")}
                          className="flex_root"
                        >
                          <DatePicker format={dateformat} />
                        </Form.Item>
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "25%" }}>
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
                    <tr>
                      <td style={{ textAlign: "left", padding: "8px" }}>
                        <Selectx
                          {...restField}
                          label="Time preference: Departure Time"
                          name={[`${name}`, "time_pref_id"]}
                          placeholder="select"
                          size="middle"
                          options={time_preference}
                          className="flex_root"
                        />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px" }}>
                        <Selectx
                          label="Flight preference: Class"
                          name={[`${name}`, "flight_pref_id"]}
                          placeholder="select"
                          size="middle"
                          options={flight_preference}
                          className="flex_root"
                        />
                      </td>
                    </tr>
                  </tbody>
                </>
              ))}
              <tr>
                <td colSpan={5}>
                  <Divider />
                </td>
              </tr>
              <Form.Item>
                <Text
                  onClick={() => add()}
                  style={{ color: "blue", cursor: "pointer", marginLeft: "20px", width: "100%" }}
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

export default Multycity;
