import { Content } from "static";
import { DatePicker, Form } from "antd";
import { Selectx, InputField, PaginateSelectX } from "app/shared";
import { rules } from "utils";
const { TRIP_CONTENT } = Content;
const { FLIGHT } = TRIP_CONTENT;
const { ROUND_TRIP_TABLE_HEDER } = FLIGHT;

type OneWayProps = {
  flight_preference: object[];
  time_preference: object[];
};

const RoundTrip = ({ flight_preference = [], time_preference = [] }: OneWayProps) => {
  const dateformat = "YYYY-MM-DD";

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
            {ROUND_TRIP_TABLE_HEDER.map((head: string) => (
              <th style={{ textAlign: "left", padding: "8px" }}>{head}</th>
            ))}
          </tr>
        </thead>
        <Form.List name={["trip_flights", "flight_details"]}>
          {(fields) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                        <PaginateSelectX
                          placeholder="select country"
                          label=""
                          name={[`${name}`, "depart_acode"]}
                          url="/airports"
                        />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                        <PaginateSelectX
                          placeholder="select country"
                          label=""
                          name={[`${name}`, "arrive_country"]}
                          url="/airports"
                        />
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                        <Form.Item
                          name={[name, "depart_date"]}
                          rules={rules(undefined, "please select depart date")}
                          className="flex_root"
                        >
                          <DatePicker format={dateformat} />
                        </Form.Item>
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                        <Form.Item
                          name={[name, "return_date"]}
                          rules={rules(undefined, "please select return date")}
                          className="flex_root"
                        >
                          <DatePicker format={dateformat} />
                        </Form.Item>
                      </td>
                      <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                        <InputField
                          size="middle"
                          name={[`${name}`, "description"]}
                          label=""
                          placeholder="Description"
                        />
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
                          label="Time preference: Return Time"
                          name={[`${name}`, "return_time"]}
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
            </>
          )}
        </Form.List>
      </table>
    </>
  );
};
export default RoundTrip;
