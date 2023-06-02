/** @format */

import { Link, useNavigate } from "react-router-dom";
import { Avatar, Drawer, Row, Space, Typography, Col, Divider } from "antd";
import { AiOutlineUser, AiOutlineSetting } from "react-icons/ai";
import { useTypedDispatch } from "store";
import { Icons, Toast } from "app/shared";
import { routeNames, endpoints } from "static/routes";
import { Listx } from "app/containers/Organization/MenuList";
import { Logout, setOrganization } from "store/slices/authSlice";
import { RESET_STATE_ACTION_TYPE } from "store/action/resetState";
import { useGetOrganizationsQuery } from "store/query/organization";

const { VscClose } = Icons;
const { ORGANIZATION_LISTING, LOGIN } = routeNames;
const { LOGOUT } = endpoints;

export const MainDrawer = ({
  cacheToggle,
  collapsed,
}: {
  collapsed: boolean;
  cacheToggle: () => void;
}) => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { data: { organizations = [] } = {}, isLoading } = useGetOrganizationsQuery("", {
    skip: !collapsed,
  });

  if (organizations.length) {
    dispatch(setOrganization(organizations[0].organization_id));
  }

  const logout = () => {
    dispatch(Logout({ url: LOGOUT }))
      .unwrap()
      .then((res) => {
        if (res) {
          cacheToggle();
          dispatch({ type: RESET_STATE_ACTION_TYPE });
          localStorage.clear();
          navigate(LOGIN, { replace: true });
          Toast({ message: res.message });
        }
      });
  };

  return (
    <>
      <Drawer
        headerStyle={{
          backgroundColor: "#f3f8fe",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        }}
        title={
          <Space
            style={{
              alignItems: "inherit",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Typography style={{ textAlign: "end" }}>
              <VscClose size={25} onClick={cacheToggle} style={{ cursor: "pointer" }} />
            </Typography>
            <Row gutter={[8, 8]}>
              <Col span={24} style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Avatar size={80} icon={<AiOutlineUser />} />
              </Col>
              <Col span={24} style={{ display: "flex", justifyContent: "space-evenly" }}>
                Name
              </Col>
              <Col span={24} style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Typography.Text
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    fontWeight: "100px",
                    color: "#777",
                  }}
                  ellipsis={{ tooltip: "Organization Name here" }}
                >
                  Organization Name Here
                </Typography.Text>
              </Col>
              <Col span={24} style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Typography.Text
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    fontWeight: "100px",
                    color: "#777",
                  }}
                  ellipsis={{ tooltip: "Email here" }}
                >
                  demo@hardcode.com
                </Typography.Text>
              </Col>
              <Col offset={7}>
                <Typography.Link
                  style={{ color: "#2485e8", fontSize: "12px", paddingRight: "4px" }}
                  className="hover-underline"
                >
                  My Account
                </Typography.Link>
                <Divider
                  type="vertical"
                  style={{ borderLeft: "2px solid rgba(0, 0, 0, 0.5)", fontSize: "20px" }}
                />
                <Typography.Link
                  onClick={logout}
                  style={{ color: "#e4585a", fontSize: "12px", paddingLeft: "4px" }}
                >
                  Sign Out
                </Typography.Link>
              </Col>
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "12px",
                  borderTop: "1px solid rgba(0, 0, 0, 0.2)",
                }}
              >
                <Typography.Text style={{ fontSize: "14px" }}>My Organizations</Typography.Text>
                <Space style={{ paddingBottom: "5px" }}>
                  <Typography>
                    <AiOutlineSetting size={16} color="#2485e8" />
                  </Typography>

                  <Link to={ORGANIZATION_LISTING} onClick={cacheToggle}>
                    <Typography.Link
                      className="hover-underline"
                      style={{ fontSize: "14px", color: "#2485e8" }}
                    >
                      Manage
                    </Typography.Link>
                  </Link>
                </Space>
              </Col>
            </Row>
          </Space>
        }
        placement="right"
        onClose={cacheToggle}
        destroyOnClose
        closable={false}
        visible={collapsed}
      >
        <Listx isLoading={isLoading} organizations={organizations} />
      </Drawer>
    </>
  );
};
