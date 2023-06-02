/** @format */

import { Button, PageHeader, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { useBool, useAxios } from "app/Hooks";
import { CarTypeForm } from "./Form";
import { Toast, Icons } from "app/shared";
import { endpoints, Content, Labels, routeNames } from "static";
import { CreateProps, SubmitProps } from "../Types";

const { car_type_preferences } = Content;
const { Title } = Typography;
const { CAR_TYPE_PREFERENCE } = endpoints;
const { NEW_CAR_TYPE_PREFERENCE } = Labels;
const { AiFillCar, VscAdd, AiFillBackward } = Icons;
const { SETTING } = routeNames;

const CreateCarPreference = ({ loading, refetch, setTrue, setFalse }: CreateProps) => {
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
      url: CAR_TYPE_PREFERENCE,
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
      <CarTypeForm bool={bool} toggle={toggle} loading={loading} onSubmit={onSubmit} />
      <PageHeader
        title={
          <Space>
            <AiFillCar size={25} />
            <Title level={3}>{car_type_preferences}</Title>
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
            {NEW_CAR_TYPE_PREFERENCE}
          </Button>,
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
export default CreateCarPreference;
