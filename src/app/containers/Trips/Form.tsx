import { useState } from "react";
import Flight from "./Trip_modes/Flight";
import { Form, Row, Col, Typography, Radio, Divider, Checkbox, Timeline } from "antd";
import { Labels, Content } from "static";
import { endpoints } from "static";
import { InputField, Buttonx, Icons, PaginateSelectX } from "app/shared";
import { initialState, TimeLine } from "./Constant";
import { rules } from "utils";
import { useAxios } from "app/Hooks";
import { DateFormat } from "utils";

const { MdOutlineFlight, VscAdd } = Icons;

const { NEW_TRIP_LABEL, CREATE } = Labels;
const { TRIP } = endpoints;
const { TRIP_CONTENT } = Content;
const {
  DOMESTIC,
  INTERNATIONAL,
  TRIP_NAME,
  TRIP_PLACEHOLDER,
  DESTINATION_COUNTRY,
  IS_VISA_REQUIRED,
  BISINESS_PURPSE,
  TRIP_ITINERARY,
  RULES,
} = TRIP_CONTENT;
//@ts-ignore
const { REQUIRE_NAME, REQUIRE_COUNTRY } = RULES;
const { Title } = Typography;

export const TripForm = () => {
  // const { data } = useGetFormDataQuery("");
  const [form] = Form.useForm();
  const [timelineArray, setTimelineArray] = useState(TimeLine);
  const [timelineComponents, setTimelinecomponents] = useState<any | null>([]);
  const { callAxios } = useAxios();

  const onSubmit = (values: object) => {
    //@ts-ignore
    const payload = DateFormat(values);
    callAxios({
      //@ts-ignore
      data: values,
      method: "post",
      url: TRIP,
    }).then((res) => {
      console.log(res);
    });
  };

  const handleTimeline = (index: number) => {
    const list = [...timelineArray];
    list[index].isShow = true;
    setTimelineArray([...list]);
    setTimelinecomponents([...timelineComponents, list[index]]);
  };
  return (
    <>
      <Row>
        <Col offset={1} span={22}>
          <Title level={4}> {NEW_TRIP_LABEL} </Title>
          <br />
          <Form form={form} initialValues={initialState} onFinish={onSubmit} layout="vertical">
            <Form.Item name="travel_type">
              <Radio.Group>
                <Radio value={DOMESTIC}>{DOMESTIC}</Radio>
                <Radio value={INTERNATIONAL}>{INTERNATIONAL}</Radio>
              </Radio.Group>
            </Form.Item>
            <Divider />
            <Row>
              <Col span={8}>
                <InputField
                  size="middle"
                  name="name"
                  label={TRIP_NAME}
                  rules={rules(undefined, REQUIRE_NAME)}
                  placeholder={TRIP_PLACEHOLDER}
                />
                {Form.useWatch("travel_type", form) === `${INTERNATIONAL}` && (
                  <>
                    <PaginateSelectX
                      placeholder={DESTINATION_COUNTRY}
                      label={DESTINATION_COUNTRY}
                      name="dest_country_id"
                      url={`${TRIP}/countries`}
                    />
                    <Form.Item name="is_visa_require" valuePropName="checked">
                      <Checkbox>{IS_VISA_REQUIRED}</Checkbox>
                    </Form.Item>
                  </>
                )}
                <InputField
                  size="large"
                  name="business_purpose"
                  label={BISINESS_PURPSE}
                  placeholder={BISINESS_PURPSE}
                  textareaField
                />
              </Col>
            </Row>
            <Divider />
            <Title level={5}> {TRIP_ITINERARY} </Title>
            <Divider />
            <Timeline>
              <Timeline.Item dot={<MdOutlineFlight size={25} />} color="blue">
                <Flight form={form} />
              </Timeline.Item>
              {timelineComponents.map(
                (
                  item: { name: string; component: any; isShow: boolean; icon: any },
                  index: number
                ) =>
                  item.isShow && (
                    <Timeline.Item key={index} dot={item.icon}>
                      {" "}
                      {item.component(form)}{" "}
                    </Timeline.Item>
                  )
              )}
            </Timeline>
            <div style={{ display: "flex", marginLeft: "20px" }}>
              {timelineArray.map(
                (
                  item: { name: string; component: any; isShow: boolean; icon: any },
                  index: number
                ) =>
                  !item.isShow && (
                    <div
                      style={{
                        width: "70px",
                        textAlign: "center",
                        cursor: "pointer",
                        color: "blue",
                        border: "1px solid rgba(0, 0, 0, 0.06)",
                        borderRadius: "20px",
                        padding: "2px",
                      }}
                      key={index}
                      onClick={() => handleTimeline(index)}
                    >
                      <VscAdd /> {item.name}
                    </div>
                  )
              )}
            </div>
            <br />
            <Buttonx size="middle" btnText={CREATE} />
          </Form>
        </Col>
      </Row>
    </>
  );
};
