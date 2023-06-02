/** @format */

import { Button, PageHeader, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { useBool, useAxios } from "app/Hooks";
import { CurrencyForm } from "./Form";
import { Toast, Icons } from "app/shared";
import { endpoints, Content, Labels, routeNames } from "static";
import { CreateCurrencyProps, currencySubmitProps } from "./Types";

const { currency } = Content;
const { Title } = Typography;
const { CURRENCY } = endpoints;
const { NEW_CURRENCY, GO_BACk } = Labels;
const { GrCurrency, VscAdd, AiFillBackward } = Icons;
const { SETTING } = routeNames;

export const CreateCurrency = ({
  loading,
  refetch,
  setTrue,
  setFalse,
  currncy_list,
}: CreateCurrencyProps) => {
  const { bool, toggle } = useBool();
  const { callAxios } = useAxios();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(SETTING);
  };

  const onSubmit = (values: currencySubmitProps) => {
    setTrue();
    callAxios({
      method: "post",
      data: values,
      url: CURRENCY,
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
      <CurrencyForm
        bool={bool}
        toggle={toggle}
        loading={loading}
        onSubmit={onSubmit}
        currncy_list={currncy_list}
      />
      <PageHeader
        title={
          <Space>
            <GrCurrency size={25} />
            <Title level={3}>{currency}</Title>
          </Space>
        }
        extra={[
          <Button
            key="1"
            icon={<AiFillBackward size={14} />}
            className="pr-color"
            onClick={handleNavigate}
          >
            {GO_BACk}
          </Button>,
          <Button key="2" icon={<VscAdd size={14} />} className="pr-color" onClick={toggle}>
            {NEW_CURRENCY}
          </Button>,
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
