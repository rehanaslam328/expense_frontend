import { Form, PageHeader, Space, Radio, FormInstance } from "antd";
import OneWay from "./OneWay";
import { Content } from "static";
import { PaginateSelectX, Selectx } from "app/shared";
import RoundTrip from "./RoundTrip";
import MultyCity from "./MultiCity";
import { useGetFormDataQuery } from "store/query/Trip";
const { TRIP_CONTENT } = Content;
const { FLIGHT } = TRIP_CONTENT;
const { FLIGHT_TYPE, SEAT_PREFERENCE, MEAL_PREFERENCE } = FLIGHT;

const Flight = ({ form }: { form: FormInstance }) => {
  const { data } = useGetFormDataQuery("");
  return (
    <>
      <h1> Flight Mode</h1>
      <PageHeader
        title={
          <Space>
            <Form.Item name={["trip_flights", "trip_type_id"]}>
              <Radio.Group>
                {FLIGHT_TYPE.map((type: { NAME: string; VALUE: number }, index: number) => (
                  <Radio key={index} value={type.VALUE}>
                    {type.NAME}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </Space>
        }
        style={{ borderBottom: "1px solid #80808033", background: "#d9d9d929", paddingBottom: "0" }}
        extra={[
          <Selectx
            style={{ width: 150 }}
            bordered={false}
            label=""
            name={["trip_flights", "seat_pref_id"]}
            placeholder={SEAT_PREFERENCE}
            size="middle"
            options={data?.seat_preference || []}
            className="flex_root"
          />,
          <div style={{ width: 150 }}>
            <PaginateSelectX
              placeholder={MEAL_PREFERENCE}
              label=""
              name={["trip_flights", "meal_pref_id"]}
              url="/mealpreference"
            />
          </div>,
        ]}
      />
      {Form.useWatch(["trip_flights", "trip_type_id"], form) === 1 && (
        <OneWay
          flight_preference={data?.flight_preference}
          time_preference={data?.time_preference}
        />
      )}
      {Form.useWatch(["trip_flights", "trip_type_id"], form) === 2 && (
        <RoundTrip
          flight_preference={data?.flight_preference}
          time_preference={data?.time_preference}
        />
      )}
      {Form.useWatch(["trip_flights", "trip_type_id"], form) === 3 && (
        <MultyCity
          flight_preference={data?.flight_preference}
          time_preference={data?.time_preference}
        />
      )}
    </>
  );
};
export default Flight;
