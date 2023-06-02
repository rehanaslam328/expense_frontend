/** @format */

import { Button, PageHeader, Space, Typography } from "antd";
import { useBool, useAxios } from "app/Hooks";
import { ReportForm } from "./Form";
import { Toast, Icons } from "app/shared";
import { endpoints, Labels } from "static";
import { CreateProps, SubmitProps } from "./Types";

const { Title } = Typography;
const { ADVANCES } = endpoints;
const { _ADVANCES } = Labels;
const { BiMoney, VscAdd } = Icons;

export const CreateAdvance = ({ loading, refetch, setTrue, setFalse }: CreateProps) => {
  const { bool, toggle } = useBool();
  const { callAxios } = useAxios();

  const onSubmit = (values: SubmitProps) => {
    setTrue();
    callAxios({
      method: "post",
      data: values,
      url: ADVANCES,
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
      <ReportForm bool={bool} toggle={toggle} loading={loading} onSubmit={onSubmit} />
      <PageHeader
        title={
          <Space>
            <BiMoney size={25} />
            <Title level={3}>{_ADVANCES}</Title>
          </Space>
        }
        extra={[
          <Button key="2" icon={<VscAdd size={14} />} className="pr-color" onClick={toggle}>
            {_ADVANCES}
          </Button>
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
