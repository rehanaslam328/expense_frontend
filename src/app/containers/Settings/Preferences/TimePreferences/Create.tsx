/** @format */

import { Button, PageHeader, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { useBool, useAxios } from "app/Hooks";
import { TimeForm } from "./Form";
import { Toast, Icons } from "app/shared";
import { endpoints, Content, Labels, routeNames } from "static";
import { CreateProps, SubmitProps } from "../Types";

const { time_preferences } = Content;
const { Title } = Typography;
const { TIME_PREFERENCE } = endpoints;
const { NEW_TIME_PREFERENCE } = Labels;
const { AiOutlineFieldTime, VscAdd, AiFillBackward } = Icons;
const { SETTING } = routeNames;

const CreateTimePreference = ({ loading, refetch, setTrue, setFalse }: CreateProps) => {
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
      url: TIME_PREFERENCE,
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
      <TimeForm bool={bool} toggle={toggle} loading={loading} onSubmit={onSubmit} />
      <PageHeader
        title={
          <Space>
            <AiOutlineFieldTime size={25} />
            <Title level={3}>{time_preferences}</Title>
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
            {NEW_TIME_PREFERENCE}
          </Button>,
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
export default CreateTimePreference;
