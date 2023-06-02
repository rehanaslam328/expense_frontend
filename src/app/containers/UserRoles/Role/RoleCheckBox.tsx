/** @@format */

import { useState } from "react";
import { Checkbox, Row, Col, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useBool } from "app/Hooks";
import { generateRoleOptions } from "utils";
import { roleCheckboxFormProps } from "../Types";
import { systemPermissions, setPermissionsList } from "./roles";

const { Group } = Checkbox;
const { Title } = Typography;

export const RoleCheckBox = ({
  title,
  list,
  itemPermissions,
  setPermission,
}: roleCheckboxFormProps) => {
  const [checked, setChecked] = useState(false);
  const { bool: intermediate, setTrue, setFalse } = useBool();
  const onChange = (checkedValues: CheckboxValueType[]) => {
    setPermissionsList(checkedValues);
    setPermission(checkedValues);
    if (!checkedValues.length) {
      setFalse();
      setChecked(false);
    } else if (checkedValues.length < systemPermissions.length) setTrue();
  };

  const onTitleChecked = (e: CheckboxChangeEvent) => {
    if (intermediate) {
      setFalse();
      setPermission([]);
      setChecked(false);
      setPermissionsList([]);
    } else {
      setChecked(e.target.checked);
      const permissions = e.target.checked ? generateRoleOptions(list) : [];
      setPermissionsList(permissions);
      setPermission(permissions);
    }
  };

  return (
    <>
      <Row>
        <Col span={24} style={{ background: "#f8f8f8" }}>
          <Checkbox
            value={title}
            checked={checked}
            indeterminate={intermediate}
            onChange={onTitleChecked}
          >
            <Title level={5}>{title}</Title>
          </Checkbox>
        </Col>
      </Row>

      <Group style={{ width: "100%" }} onChange={onChange} value={itemPermissions}>
        {list.map((title: string) => (
          <Row key={title}>
            <Col span={8}>
              <Title level={5} style={{ paddingLeft: "2rem" }}>
                {title}
              </Title>
            </Col>

            <Col span={12}>
              <Row gutter={[30, 6]}>
                <Col span={5} offset={4}>
                  <Checkbox value={`${title}View`} />
                </Col>
                <Col span={5}>
                  <Checkbox value={`${title}Create`} />
                </Col>
                <Col span={5}>
                  <Checkbox value={`${title}Edit`} />
                </Col>
                <Col span={5}>
                  <Checkbox value={`${title}Delete`} />
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </Group>
    </>
  );
};
