import { Button, PageHeader, Space, Typography } from "antd";
import { Icons } from "app/shared";
import { useNavigate } from "react-router-dom";
import { Content, Labels, routeNames } from "static";

const { Title } = Typography;
const { AiOutlineFileText, VscAdd } = Icons;
const { expenses } = Content;
const { _NEW_EXPENSE } = Labels;
const { NEW_EXPENSE } = routeNames;

export const SubHeader = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(NEW_EXPENSE);
  };

  return (
    <>
      <PageHeader
        title={
          <Space>
            <AiOutlineFileText size={25} />
            <Title level={3}>{expenses}</Title>
          </Space>
        }
        extra={
          <Button key="1" icon={<VscAdd size={14} />} className="pr-color" onClick={handleNavigate}>
            {_NEW_EXPENSE}
          </Button>
        }
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
    </>
  );
};
