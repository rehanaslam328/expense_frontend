import { Row, Col, Typography } from "antd";
import { Content } from "static";
import Listx from "./ListComponent";
import {
  FaUserCircle,
  GrOrganization,
  AiOutlineControl,
  MdOutlineRoomPreferences,
  SiAutomattic,
  GrIntegration,
  AiOutlineCode,
} from "app/shared/Icons";

const Setting = () => {
  const { Title } = Typography;
  const { Setting_Prefrence } = Content
  const { orgnization, User_control, customization, automation, preferences, integrations, developer_space } = Setting_Prefrence

  return (
    <>
      <Row justify="start" style={{ marginTop: "10px" }}>
        <Col xs={20} sm={20} md={10} lg={5} xl={4} offset={2}>
          <Title level={3}> Settings </Title>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: "20px" }}>
        <Listx header=" Organization" data={orgnization} icon={<GrOrganization />} />
        <Listx header=" Users and Control" data={User_control} icon={<FaUserCircle />} />
        <Listx header=" Customization" data={customization} icon={<AiOutlineControl />} />
        <Listx header=" Automation" data={automation} icon={<SiAutomattic />} />
      </Row>

      <Row justify="center" style={{ marginTop: "20px" }}>
        <Listx header="Preferences" data={preferences} icon={<MdOutlineRoomPreferences />} />
        <Listx header=" Integrations" data={integrations} icon={<GrIntegration />} />
        <Listx header=" Developer Space" data={developer_space} icon={<AiOutlineCode />} />
        <Col xs={0} sm={0} md={10} lg={5} xl={4}></Col>
      </Row>
    </>
  );
};

export default Setting;