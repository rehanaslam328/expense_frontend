/** @format */

import { useState } from "react";
import {
  Layout,
  Button,
  PageHeader,
  Avatar,
  Popover,
  Typography,
  Divider,
  Input,
  List,
  Badge,
  Space,
  Dropdown,
  Menu,
} from "antd";
import { Link } from "react-router-dom";
import { routeNames } from "static";
import {
  VscAdd,
  VscClose,
  SiAddthis,
  HiReceiptTax,
  AiOutlineUser,
  CgOrganisation,
  AiOutlineSearch,
  AiFillCaretDown,
  AiOutlineSetting,
  AiOutlineUsergroupAdd,
  IoNotificationsOutline,
  HiOutlineCurrencyDollar,
  BsFillTagsFill
} from "../Icons";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const { Header } = Layout;
const { Title } = Typography;
const { ORGANIZATION_PROFILE, TAGS, CURRENCY, TAX, USERS } = routeNames;

const data = [
  {
    title: "Organization Profile",
    icon: <CgOrganisation size={18} />,
    link: ORGANIZATION_PROFILE,
  },
  {
    title: " Users & Roles",
    icon: <AiOutlineUsergroupAdd size={18} />,
    link: USERS,
  },
  {
    title: "Tags",
    icon: <BsFillTagsFill size={18} />,
    link: TAGS,
  },
  {
    title: "Currencies",
    icon: <HiOutlineCurrencyDollar size={18} />,
    link: CURRENCY,
  },
  {
    title: "Taxes",
    icon: <HiReceiptTax size={18} />,
    link: TAX,
  },
];

const items: ItemType[] = [
  {
    type: "group",
    label: "GENERAL",
    children: [
      {
        key: "1",
        label: "Add Trip",
        icon: <VscAdd />,
      },
      {
        key: "2",
        label: "Expense",
        icon: <VscAdd />,
      },
    ],
  },
  {
    type: "group",
    label: "SALES",
    children: [
      {
        key: "3",
        label: "Reports",
        icon: <VscAdd />,
      },
      {
        key: "4",
        label: "Advances",
        icon: <VscAdd />,
      },
    ],
  },
];

export const Headers = ({ toggle }: { toggle: () => void }) => {
  const [visible, setVisible] = useState(false);

  const hideVisible = () => setVisible(false);
  const handleVisible = (visble: boolean) => setVisible(visble);

  return (
    <>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          padding: "0",
          background: "#333956",
          height: "50px",
        }}
      >
        <PageHeader
          title={
            <Title level={5} style={{ color: "#adb0c3" }}>
              Expense
            </Title>
          }
          subTitle={
            <Title level={5} style={{ color: "#adb0c3" }}>
              Logo Here
            </Title>
          }
          style={{ padding: "7px 24px" }}
          tags={
            <Space>
              <Dropdown
                trigger={["click"]}
                overlay={<Menu style={{ padding: "10px", display: "flex" }} items={items} />}
              >
                <Typography style={{ paddingTop: "5px", paddingLeft: "40px" }}>
                  <SiAddthis size={20} color="#adb0c3" />
                </Typography>
              </Dropdown>

              <Space
              // style={{
              //   paddingLeft: "30px",
              // }}
              >
                <Input
                  name="search"
                  allowClear
                  prefix={
                    <Dropdown
                      trigger={["click"]}
                      overlay={
                        <Menu style={{ width: "270px", padding: "10px" }}>
                          <Menu.Item key="1">Trips</Menu.Item>
                          <Menu.Item key="2">Reports</Menu.Item>
                          <Menu.Item key="3">Expense</Menu.Item>
                          <Menu.Item key="4">Advances</Menu.Item>
                        </Menu>
                      }
                    >
                      <Space style={{ cursor: "pointer" }}>
                        <AiOutlineSearch size={16} />
                        <AiFillCaretDown />
                      </Space>
                    </Dropdown>
                  }
                  placeholder="Search Settings"
                  style={{
                    width: 300,
                    borderRadius: "50px",
                  }}
                />
              </Space>
            </Space>
          }
          extra={[
            <Button key="notif" onClick={toggle} type="link" style={{ padding: "0" }}>
              <Badge count={555}>
                <Avatar
                  key="1"
                  icon={<IoNotificationsOutline size={20} />}
                  style={{ color: "black" }}
                />
              </Badge>
            </Button>,
            <Popover
              key="popover"
              content={
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={item.icon}
                        title={<Link to={`${item.link}`}>{item.title}</Link>}
                      />
                    </List.Item>
                  )}
                />
              }
              title={
                <Typography>
                  Settings
                  <VscClose
                    size={25}
                    onClick={hideVisible}
                    style={{ cursor: "pointer", float: "right" }}
                  />
                  <Divider />
                  <Input.Search
                    name="search"
                    allowClear
                    enterButton
                    placeholder="Search Settings"
                  />
                </Typography>
              }
              trigger="click"
              visible={visible}
              color="#f3f8fe"
              overlayStyle={{ position: "fixed" }}
              overlayInnerStyle={{
                width: "300px",
                height: "calc(100vh - 70px)",
              }}
              arrowPointAtCenter
              onVisibleChange={handleVisible}
            >
              <Button type="link" style={{ paddingLeft: "0px" }}>
                <Avatar
                  key="1"
                  icon={<AiOutlineSetting size={22} />}
                  style={{
                    backgroundColor: "rgb(135 80 16 / 0%)",
                    color: "#adb0c3",
                  }}
                />
              </Button>
            </Popover>,
            <Button key="link" onClick={toggle} type="link" style={{ padding: "0" }}>
              <Avatar
                key="2"
                icon={<AiOutlineUser size={20} />}
                style={{ backgroundColor: "#875", color: "#adb0c3" }}
              />
            </Button>,
          ]}
        />
      </Header>
    </>
  );
};
