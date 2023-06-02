/** @format */

import { Button, PageHeader, Space, Typography } from "antd";
import { useBool, useAxios } from "app/Hooks";
import { ReportForm } from "./Form";
import { Toast, Icons } from "app/shared";
import { endpoints, Content, Labels } from "static";
import { CreateProps, SubmitProps } from "./Types";

const { reports } = Content;
const { Title } = Typography;
const { REPORTS } = endpoints;
const { New_REPORT } = Labels;
const { VscReport, VscAdd } = Icons;

export const CreateReport = ({ loading, refetch, setTrue, setFalse }: CreateProps) => {
  const { bool, toggle } = useBool();
  const { callAxios } = useAxios();

  const onSubmit = (values: SubmitProps) => {
    setTrue();
    callAxios({
      method: "post",
      data: values,
      url: REPORTS,
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
            <VscReport size={25} />
            <Title level={3}>{reports}</Title>
          </Space>
        }
        extra={[
          <Button key="2" icon={<VscAdd size={14} />} className="pr-color" onClick={toggle}>
            {New_REPORT}
          </Button>
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
