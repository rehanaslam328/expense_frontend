/** @format */

import { useState } from "react";
import { Tabs, Button, Row } from "antd";
import { useBool } from "app/Hooks";
import { UserDetails } from "./User";
import { RoleDetails } from "./Role";

const { TabPane } = Tabs;

const UserRoles = () => {
  const [currTab, setCurrTab] = useState("1");
  const { bool, toggle: toggleUser } = useBool();
  const { bool: role, toggle: toggleRole } = useBool();

  return (
    <>
      <Row style={{ paddingLeft: "10px", paddingTop: "10px" }}>
        <Tabs
          tabBarExtraContent={
            <Button
              style={{ marginRight: "5rem" }}
              onClick={currTab === "1" ? toggleUser : toggleRole}
            >
              {currTab === "1" ? "Invite User" : "Create Role"}
            </Button>
          }
          onTabClick={(key) => setCurrTab(key)}
          style={{ width: "100%" }}
        >
          <TabPane tab="All Users" key="1">
            <UserDetails bool={bool} toggle={toggleUser} />
          </TabPane>
          <TabPane tab="Roles" key="2">
            <RoleDetails bool={role} toggle={toggleRole} />
          </TabPane>
        </Tabs>
      </Row>
    </>
  );
};
export default UserRoles;
