/** @format */

import { Button, PageHeader, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { useBool, useAxios } from "app/Hooks";
import { SeatForm } from "./Form";
import { Toast, Icons } from "app/shared";
import { endpoints, Content, Labels, routeNames } from "static";
import { CreateProps, SubmitProps } from "../Types";

const { seat_preferences } = Content;
const { Title } = Typography;
const { SEAT_PREFERENCE } = endpoints;
const { NEW_SEAT_PREFERENCE } = Labels;
const { MdOutlineAirlineSeatReclineNormal, VscAdd, AiFillBackward } = Icons;
const { SETTING } = routeNames;

const CreateSeatPreference = ({ loading, refetch, setTrue, setFalse }: CreateProps) => {
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
      url: SEAT_PREFERENCE,
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
      <SeatForm bool={bool} toggle={toggle} loading={loading} onSubmit={onSubmit} />
      <PageHeader
        title={
          <Space>
            <MdOutlineAirlineSeatReclineNormal size={25} />
            <Title level={3}>{seat_preferences}</Title>
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
            {NEW_SEAT_PREFERENCE}
          </Button>,
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
export default CreateSeatPreference;
