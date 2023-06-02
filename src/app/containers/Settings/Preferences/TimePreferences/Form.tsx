/** @format */
import { useEffect } from "react";
import { Space, Modal, Form } from "antd";
import { rules } from "utils";
import { Labels, Content } from "static";
import { FormProps, ModalProps } from "../Types";
import { Buttonx, InputField } from "app/shared";

const { enter_name } = Content;
const { NAME, NEW_TIME_PREFERENCE, ENTER, CREATE, CANCEL } = Labels;

const initialState = {
  name: "",
};

const Modalx = ({ visible, loading, toggle, onSubmit, current }: ModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current && Object.keys(current).length)
      form.setFieldsValue({
        ...current,
      });
  }, [current, form]);

  const handleClose = () => form.resetFields();

  return (
    <Modal
      title={NEW_TIME_PREFERENCE}
      style={{ top: 0 }}
      visible={visible}
      onCancel={toggle}
      maskClosable={false}
      destroyOnClose
      footer={null}
      afterClose={handleClose}
    >
      <Form name={NEW_TIME_PREFERENCE} initialValues={initialState} form={form} onFinish={onSubmit}>
        <InputField
          size="middle"
          name="name"
          label={NAME}
          rules={rules(undefined, enter_name)}
          placeholder={`${ENTER} ${NAME}`}
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
  );
};

export const TimeForm = ({ onSubmit, bool, loading, toggle, current }: FormProps) => (
  <>
    <Modalx
      visible={bool}
      loading={loading}
      toggle={toggle}
      onSubmit={onSubmit}
      current={current}
    />
  </>
);