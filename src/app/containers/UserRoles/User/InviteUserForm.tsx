/** @format */

import { Form, Modal, Space } from "antd";
import { rules } from "utils";
import { Labels, Content } from "static";
import { InviteUserFormProps } from "../Types";
import { Buttonx, Icons, InputField, Selectx } from "app/shared";

const { enter_name } = Content;
const { AiOutlineUser, AiOutlineMail } = Icons;
const { EMAIL, ENTER, NAME, CANCEL, CREATE } = Labels;

const initialState = {
  name: "",
  email: "",
  role_id: null,
};

export const InviteUserForm = ({
  bool,
  roles,
  toggle,
  loading,
  current,
  onSubmit,
}: InviteUserFormProps) => {
  const [form] = Form.useForm();

  const handleClose = () => {
    form.setFieldsValue({ ...initialState });
  };

  if (current && Object.keys(current).length) form.setFieldsValue({ ...current });

  return (
    <>
      <Modal
        title="Invite User"
        style={{ top: 0 }}
        visible={bool}
        onCancel={toggle}
        maskClosable={false}
        destroyOnClose
        footer={null}
        afterClose={handleClose}
      >
        <Form name="invite-user-form" initialValues={initialState} form={form} onFinish={onSubmit}>
          <InputField
            label={EMAIL}
            name="email"
            rules={rules("email")}
            LeftIcon={<AiOutlineMail />}
          />
          <InputField
            size="middle"
            name="name"
            label={NAME}
            LeftIcon={<AiOutlineUser />}
            rules={rules(undefined, enter_name)}
            placeholder={`${ENTER} ${NAME}`}
          />
          <Selectx
            label="Role"
            name="role_id"
            placeholder="Enter Role"
            size="middle"
            options={roles}
            rules={rules(undefined, "Role required")}
            className="flex_root"
          />
          <Space className="steps-action">
            <Buttonx
              size="middle"
              btnText={CANCEL}
              htmlType="button"
              type="default"
              clickHandler={toggle}
            />
            <Buttonx size="middle" btnText={CREATE} loading={loading} />
          </Space>
        </Form>
      </Modal>
    </>
  );
};
