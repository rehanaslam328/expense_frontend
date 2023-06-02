/** @format */

import { useEffect, useState } from "react";
import { Checkbox, Row, Col, Modal, Typography, Form, Space, Alert } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { rules } from "utils";
import { RoleFormProps } from "../Types";
import { RoleCheckBox } from "./RoleCheckBox";
import { Buttonx, InputField } from "app/shared";
import { /*allPermissions,*/ systemModules, setPermissionsList } from "./roles";

const { Title } = Typography;
const initialState = {
  name: "",
};

export const RoleForm = ({
  bool,
  toggle,
  current,
  loading,
  onSubmit,
  setAlert,
  roleAlert,
}: RoleFormProps) => {
  const [form] = Form.useForm();
  const [itemPermissions, setItemPermission] = useState<CheckboxValueType[]>([]);
  if (current && Object.keys(current).length)
    form.setFieldsValue({
      name: current.name,
    });

  useEffect(() => {
    const list = [];
    if (current?.name) {
      for (const [key, value] of Object.entries(current.permissions)) {
        if (value) list.push(`${key}`);
      }
    }
    setPermissionsList(list);
    setItemPermission(list);
  }, [current]);

  const handleClose = () => {
    setItemPermission([]);
    setPermissionsList([]);
    setAlert(false);
  };
  const handleCancel = () => {
    toggle();
    setAlert(false);
  };

  return (
    <>
      <Modal
        title="Create Role"
        bodyStyle={{
          top: 0,
          maxHeight: "600px",
          paddingLeft: "24px",
          paddingRight: "24px",
          overflowY: "scroll",
        }}
        width={1000}
        footer={null}
        visible={bool}
        destroyOnClose
        onCancel={toggle}
        maskClosable={false}
        afterClose={handleClose}
      >
        <Form name="create-role-form" form={form} initialValues={initialState} onFinish={onSubmit}>
          <InputField
            name="name"
            label="Role Name"
            rules={rules(undefined, "Role Name Required")}
          />
          {roleAlert && (
            <Alert
              type="error"
              closable
              message={<div>Please Select atleast One Role permission</div>}
            />
          )}

          <Row
            style={{
              position: "sticky",
              top: "0",
              zIndex: "999",
              background: "darkgray",
              padding: "12px 5px",
            }}
          >
            <Col span={8}>
              <Checkbox value="All">
                <Title level={5}>Module Name</Title>
              </Checkbox>
            </Col>

            <Col span={12}>
              <Row gutter={[30, 6]}>
                <Col span={5} offset={4}>
                  <Title level={5}>View</Title>
                </Col>
                <Col span={5}>
                  <Title level={5}>Create</Title>
                </Col>
                <Col span={5}>
                  <Title level={5}>Edit</Title>
                </Col>
                <Col span={5}>
                  <Title level={5}>Delete</Title>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <Group style={{ width: "100%" }} onChange={onChange}> */}
          {systemModules.map((md: { title: string; permissions: string[] }) => (
            <RoleCheckBox
              key={md.title}
              title={md.title}
              list={md.permissions}
              itemPermissions={itemPermissions}
              setPermission={setItemPermission}
            />
          ))}
          <Space className="steps-action">
            <Buttonx
              size="middle"
              btnText="Cancel"
              htmlType="button"
              type="default"
              clickHandler={handleCancel}
            />
            <Buttonx size="middle" btnText="Create" loading={loading} />
          </Space>
        </Form>
        {/* </Group> */}
      </Modal>
    </>
  );
};
