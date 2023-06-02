/** @format */

import { Layout, Menu, Collapse } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons, Toast } from "app/shared";
import { routeNames, Labels } from "static";

const { Sider } = Layout;
const { Panel } = Collapse;
const { Item } = Menu;
const {
  AiOutlineDashboard,
  AiOutlineSetting,
  MdOutlineCardTravel,
  AiOutlineCheckCircle,
  AiOutlineFileText,
  TbFileAnalytics,
  VscReport,
  BiMoney,
} = Icons;
const { _DASHBOARD, HOME, SETTINGS, _TRIPS, _APPROVALS, _EXPENSES, REPORTS, ANALYTICS, _ADVANCES } =
  Labels;

export const SideBar = () => {
  const { pathname = routeNames.DASHBOARD } = useLocation();
  const navigate = useNavigate();
  const onChange = (key: string | string[]) => {
    if (key === "1") Toast({ message: "You have switched to My View" });
    else Toast({ message: "You have switched to Admin View" });
    navigate(routeNames.DASHBOARD);
  };
  return (
    <Sider
      collapsible
      collapsedWidth={70}
      className="uiux_sidebar"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* <div className="logo" /> */}
      <Collapse accordion expandIconPosition="end" defaultActiveKey={["1"]} onChange={onChange}>
        <Panel header="My view" key="1">
          <Menu theme="light" mode="inline" defaultSelectedKeys={[pathname]}>
            <Item key="/home" icon={<AiOutlineDashboard />}>
              <Link to={routeNames.DASHBOARD} state={{ path: { pathname } }}>
                {HOME}
              </Link>
            </Item>
            <Item key="/trips" icon={<MdOutlineCardTravel />}>
              <Link to={routeNames.TRIPS} state={{ path: { pathname } }}>
                {_TRIPS}
              </Link>
            </Item>
            <Item key="/expenses" icon={<AiOutlineFileText />}>
              <Link to={routeNames.EXPENSES} state={{ path: { pathname } }}>
                {_EXPENSES}
              </Link>
            </Item>
            <Item key="/reports" icon={<VscReport />}>
              <Link to={routeNames.REPORTS} state={{ path: { pathname } }}>
                {REPORTS}
              </Link>
            </Item>
            <Item key="/advances" icon={<BiMoney />}>
              <Link to={routeNames.ADVANCES} state={{ path: { pathname } }}>
                {_ADVANCES}
              </Link>
            </Item>
            <Item key="/approvals" icon={<AiOutlineCheckCircle />}>
              <Link to={routeNames.APPROVALS} state={{ path: { pathname } }}>
                {_APPROVALS}
              </Link>
            </Item>
            <Item key="/analytics" icon={<TbFileAnalytics />}>
              <Link to={routeNames.ANALYTICS} state={{ path: { pathname } }}>
                {ANALYTICS}
              </Link>
            </Item>
            <Item key="/settings" icon={<AiOutlineSetting />}>
              <Link to={routeNames.SETTING} state={{ path: { pathname } }}>
                {SETTINGS}
              </Link>
            </Item>
          </Menu>
        </Panel>
        <Panel header="Admin view" key="2">
          <Menu theme="light" mode="inline" defaultSelectedKeys={[pathname]}>
            <Item key="/dashboard" icon={<AiOutlineDashboard />}>
              <Link to={routeNames.DASHBOARD} state={{ path: { pathname } }}>
                {_DASHBOARD}
              </Link>
            </Item>
            <Item key="/trips" icon={<MdOutlineCardTravel />}>
              <Link to={routeNames.TRIPS} state={{ path: { pathname } }}>
                {_TRIPS}
              </Link>
            </Item>
            <Item key="/reports" icon={<VscReport />}>
              <Link to={routeNames.REPORTS} state={{ path: { pathname } }}>
                {REPORTS}
              </Link>
            </Item>
            <Item key="/advances" icon={<BiMoney />}>
              <Link to={routeNames.ADVANCES} state={{ path: { pathname } }}>
                {_ADVANCES}
              </Link>
            </Item>
            <Item key="/approvals" icon={<AiOutlineCheckCircle />}>
              <Link to={routeNames.APPROVALS} state={{ path: { pathname } }}>
                {_APPROVALS}
              </Link>
            </Item>
            <Item key="/settings" icon={<AiOutlineSetting />}>
              <Link to={routeNames.SETTING} state={{ path: { pathname } }}>
                {SETTINGS}
              </Link>
            </Item>
          </Menu>
        </Panel>
      </Collapse>
    </Sider>
  );
};
