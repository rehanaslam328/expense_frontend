/** @format */

import { Button, PageHeader, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { useBool, useAxios } from "app/Hooks";
import { MealForm } from "./Form";
import { Toast, Icons } from "app/shared";
import { endpoints, Content, Labels, routeNames } from "static";
import { CreateProps, SubmitProps } from "../Types";

const { meal_preferences } = Content;
const { Title } = Typography;
const { MEAL_PREFERENCE } = endpoints;
const { NEW_MEAL_PREFERENCE } = Labels;
const { GiMeal, VscAdd, AiFillBackward } = Icons;
const { SETTING } = routeNames;

const CreateMealPreference = ({ loading, refetch, setTrue, setFalse }: CreateProps) => {
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
      url: MEAL_PREFERENCE,
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
      <MealForm bool={bool} toggle={toggle} loading={loading} onSubmit={onSubmit} />
      <PageHeader
        title={
          <Space>
            <GiMeal size={25} />
            <Title level={3}>{meal_preferences}</Title>
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
            {NEW_MEAL_PREFERENCE}
          </Button>,
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
export default CreateMealPreference;
