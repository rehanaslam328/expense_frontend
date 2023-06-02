import {
  Form,
  Button,
  Tooltip,
  DatePicker,
  TimePicker,
  Typography,
  Radio,
  FormInstance,
} from "antd";
import { useState } from "react";
import { Icons, Selectx, InputField, PaginateSelectX } from "app/shared";
import { rules } from "utils";
import { No_Entity } from "app/containers/Trips/No_Entity";
import { endpoints } from "static";
import { useGetCitiesQuery } from "store/query/Trip";

const THEADNAMES = ["PICK-UP *", "DROP-OFF  *", "CAR TYPE", "DISCRIPTION", "NEED DRIVER", " "];

const { Text } = Typography;
const { TRIP } = endpoints;

const { RiDeleteBinLine, VscAdd } = Icons;
const CarForm = ({ form }: { form: FormInstance }) => {
  const contry_id = Form.useWatch("trip_car_rents", form);
  console.log("country_id", contry_id);
  const dateformat = "YYYY-MM-DD";
  const [isfield, setisfield] = useState(true);

  const [id, setid] = useState<number>();
  const { data: cities } = useGetCitiesQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const handlefield = (array: any) => {
    array.length === 0 ? setisfield(false) : setisfield(true);
  };

  const handleopen = (open: boolean, key: number, field: string) => {
    if (open && field === "pickup") setid(contry_id && contry_id[key]?.pickup_country);
    if (open && field === "dropoff") setid(contry_id && contry_id[key]?.dropoff_country);
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
        <Form.List name="trip_car_rents">
          {(fields, { add, remove }) => (
            <>
              {handlefield(fields)}
              {fields.map(({ key, name, ...restField }) => (
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Form.Item
                          name={[name, "pickup_date"]}
                          rules={rules(undefined, "please select checkin date")}
                        >
                          <DatePicker bordered={false} format={dateformat} />
                        </Form.Item>
                        <Form.Item
                          name={[name, "pickup_time"]}
                          rules={rules(undefined, "please select checkin time")}
                        >
                          <TimePicker bordered={false} />
                        </Form.Item>
                      </div>
                      <PaginateSelectX
                        placeholder="select pickup country"
                        label=""
                        name={[`${name}`, "pickup_country"]}
                        url={`${TRIP}/countries`}
                      />
                      <Selectx
                        label=""
                        {...restField}
                        name={[`${name}`, "pickup_city"]}
                        rules={[
                          {
                            required: true,
                            message: "please select pickup city",
                          },
                        ]}
                        placeholder="select pickup city"
                        size="middle"
                        options={cities}
                        className="flex_root"
                        disabled={contry_id && !contry_id[key]?.pickup_country}
                        onDropdownVisibleChange={(open: boolean) => handleopen(open, key, "pickup")}
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <Form.Item
                          name={[name, "dropoff_date"]}
                          rules={rules(undefined, "please select checkout date")}
                        >
                          <DatePicker bordered={false} format={dateformat} />
                        </Form.Item>
                        <Form.Item
                          name={[name, "dropoff_time"]}
                          rules={rules(undefined, "please select checkout time")}
                        >
                          <TimePicker bordered={false} />
                        </Form.Item>
                      </div>
                      <PaginateSelectX
                        placeholder="select dropoff country"
                        label=""
                        name={[`${name}`, "dropoff_country"]}
                        url={`${TRIP}/countries`}
                      />
                      <Selectx
                        label=""
                        {...restField}
                        name={[`${name}`, "dropoff_city"]}
                        rules={[
                          {
                            required: true,
                            message: "please select dropoff country",
                          },
                        ]}
                        placeholder="select dropoff country"
                        size="middle"
                        options={cities}
                        className="flex_root"
                        disabled={contry_id && !contry_id[key]?.dropoff_country}
                        onDropdownVisibleChange={(open: boolean) =>
                          handleopen(open, key, "dropoff")
                        }
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <Selectx
                        label=""
                        {...restField}
                        name={[`${name}`, "car_type_id"]}
                        rules={[
                          {
                            required: true,
                            message: "please select car type",
                          },
                        ]}
                        placeholder="car type"
                        size="middle"
                        options={[{ label: "SUV", id: "suv" }]}
                        className="flex_root"
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <InputField
                        size="middle"
                        name={[`${name}`, "description"]}
                        label=""
                        placeholder="Description"
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "17%" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Text> Need Driver:</Text>
                        <Form.Item name={[`${name}`, "with_driver"]}>
                          <Radio.Group>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>
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
                  <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <InputField
                        size="middle"
                        name={[`${name}`, "pickup_place_name"]}
                        label="Pickup place name"
                        placeholder="pickup place name"
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <InputField
                        size="middle"
                        name={[`${name}`, "dropoff_place_name"]}
                        label="Dropoff place name"
                        placeholder="dropoff place name"
                      />
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

export default CarForm;
