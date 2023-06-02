/** @format */

import { Button, PageHeader, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { useBool, useAxios } from "app/Hooks";
import { FlightForm } from "./Form";
import { Toast, Icons } from "app/shared";
import { endpoints, Content, Labels, routeNames } from "static";
import { CreateProps, SubmitProps } from "../Types";

const { flight_preferences } = Content;
const { Title } = Typography;
const { FLIGHT_PREFERENCE } = endpoints;
const { NEW_FLIGHT_PREFERENCE } = Labels;
const { MdOutlineFlight, VscAdd, AiFillBackward } = Icons;
const { SETTING } = routeNames;

const CreateFlightPreference = ({ loading, refetch, setTrue, setFalse }: CreateProps) => {
  const { bool, toggle } = useBool();
  const { callAxios } = useAxios();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(SETTING);
  };

  const onSubmit = (values: SubmitProps) => {
    setTrue();
    callAxios({
      method: "post",
      data: values,
      url: FLIGHT_PREFERENCE,
    }).then((res) => {
      if (res) {
        toggle();
        setFalse();
        refetch();
        Toast({ message: res.message, type: "success" });
      }
    });
  };

  return (
    <>
      <FlightForm bool={bool} toggle={toggle} loading={loading} onSubmit={onSubmit} />
      <PageHeader
        title={
          <Space>
            <MdOutlineFlight size={25} />
            <Title level={3}>{flight_preferences}</Title>
          </Space>
        }
        extra={[
          <Button
            key="1"
            icon={<AiFillBackward size={14} />}
            className="pr-color"
            onClick={handleNavigate}
          >
          </Button>,
          <Button key="2" icon={<VscAdd size={14} />} className="pr-color" onClick={toggle}>
            {NEW_FLIGHT_PREFERENCE}
          </Button>,
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
export default CreateFlightPreference;
