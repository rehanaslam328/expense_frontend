import { Form, Button, Tooltip, DatePicker, Typography, FormInstance } from "antd";
import { useState } from "react";
import { Icons, Selectx, InputField, PaginateSelectX } from "app/shared";
import { rules } from "utils";
import { No_Entity } from "app/containers/Trips/No_Entity";
import { endpoints } from "static";
import { useGetCitiesQuery } from "store/query/Trip";

const THEADNAMES = ["DEPART FROM *", "ARRIVE AT *", "DEPARTURE DATE *", "DISCRIPTION", " "];

const { TRIP } = endpoints;
const { Text } = Typography;

const { RiDeleteBinLine, VscAdd } = Icons;
const TrainForm = ({ form }: { form: FormInstance }) => {
  const contry_id = Form.useWatch("trip_train_rents", form);
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
    if (open && field === "pickup") setid(contry_id && contry_id[key]?.depart_country);
    if (open && field === "dropoff") setid(contry_id && contry_id[key]?.arrive_country);
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
        <Form.List name="trip_train_rents">
          {(fields, { add, remove }) => (
            <>
              {handlefield(fields)}
              {fields.map(({ key, name, ...restField }) => (
                <tbody>
                  <tr>
                    <td style={{ textAlign: "left", padding: "8px", width: "25%" }}>
                      <PaginateSelectX
                        placeholder="select depart country"
                        label=""
                        name={[`${name}`, "depart_country"]}
                        url={`${TRIP}/countries`}
                      />
                      <Selectx
                        label=""
                        {...restField}
                        name={[`${name}`, "depart_city"]}
                        rules={[
                          {
                            required: true,
                            message: "please select depart city",
                          },
                        ]}
                        placeholder="select depart city"
                        size="middle"
                        options={cities}
                        className="flex_root"
                        disabled={contry_id && !contry_id[key]?.depart_country}
                        onDropdownVisibleChange={(open: boolean) => handleopen(open, key, "pickup")}
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "25%" }}>
                      <PaginateSelectX
                        placeholder="select arrive country"
                        label=""
                        name={[`${name}`, "arrive_country"]}
                        url={`${TRIP}/countries`}
                      />
                      <Selectx
                        label=""
                        {...restField}
                        name={[`${name}`, "arrive_city"]}
                        rules={[
                          {
                            required: true,
                            message: "please select arrive city",
                          },
                        ]}
                        placeholder="select arrive city"
                        size="middle"
                        options={cities}
                        className="flex_root"
                        disabled={contry_id && !contry_id[key]?.arrive_country}
                        onDropdownVisibleChange={(open: boolean) =>
                          handleopen(open, key, "dropoff")
                        }
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "25%" }}>
                      <Form.Item
                        name={[name, "depart_date"]}
                        rules={rules(undefined, "please select checkout date")}
                      >
                        <DatePicker showToday style={{ width: "100%" }} format={dateformat} />
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
                  <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <InputField
                        size="middle"
                        name={[`${name}`, "depart_place_name"]}
                        label="Depart place name"
                        placeholder="depart place name"
                      />
                    </td>
                    <td style={{ textAlign: "left", padding: "8px", width: "20%" }}>
                      <InputField
                        size="middle"
                        name={[`${name}`, "arrive_place_name"]}
                        label="Arrive place name"
                        placeholder="arrive place name"
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

export default TrainForm;
