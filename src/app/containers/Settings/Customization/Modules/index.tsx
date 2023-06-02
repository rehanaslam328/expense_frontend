import { Typography, List, Avatar, Divider, Row, Col, Affix } from "antd";
import { Content } from "static";
import "./index.css";
import { NavLink } from "react-router-dom";

const { Modules_list } = Content
const { Title, Text } = Typography
const Modules = () => {
    return (
        <>

            <div>
                <Title level={3}>Modules</Title>
                <Divider />
                <Affix offsetTop={50}>
                    <Row>
                        <Col offset={1} span={11}>
                            <Text>
                                Modules
                            </Text >
                        </Col>
                        <Col span={12}>
                            <Text>
                                Descriptions
                            </Text >
                        </Col>
                    </Row>
                    <Divider />
                </Affix>
            </div>

            <List
                dataSource={Modules_list}
                renderItem={item =>
                    <NavLink to={item.url}>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar shape="circle" icon={<item.icon />} />}
                                description={item.label} />
                            <div className="ant-list-item-meta">{item.description}</div>
                        </List.Item>
                    </NavLink>
                }
            />

        </>
    );
};

export default Modules;