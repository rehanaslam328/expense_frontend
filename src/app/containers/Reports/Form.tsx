/** @format */
import { useEffect } from "react";
import { Space, Modal, Form, Row, Col } from "antd";
import { rules } from "utils";
import { Labels, Content } from "static";
import { FormProps, ModalProps } from "./Types";
import { Buttonx, InputField, DatePickerx, Selectx } from "app/shared";

const { enter_name } = Content;
const { REPORT_NAME, BUSINESS_PURPOSE, New_REPORT, ENTER, CREATE, CANCEL } = Labels;

const initialState = {
  report_name: "",
  business_purpose: "",
  start_date: "",
  end_date: "",
  trip_id: null,
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
      title={New_REPORT}
      style={{ top: 0 }}
      visible={visible}
      onCancel={toggle}
      maskClosable={false}
      destroyOnClose
      footer={null}
      afterClose={handleClose}
    >
      <Form
        initialValues={initialState}
        form={form}
        onFinish={onSubmit}
        layout="vertical"
      >
        <InputField
          size="middle"
          name="report_name"
          label={REPORT_NAME}
          rules={rules(undefined, enter_name)}
          placeholder={`${ENTER} ${REPORT_NAME}`}
        />
        <InputField
          textareaField
          name="business_purpose"
          label={BUSINESS_PURPOSE}
          placeholder={`${ENTER} ${BUSINESS_PURPOSE}`}
        />
        <Row>
          <Col span={12}>
            <DatePickerx name="start_date" label="Duration" />
          </Col>
          <Col span={12}>
            <DatePickerx name="end_date" label=" " />
          </Col>
        </Row>
        <Selectx
          name="trip_id"
          label="Trip"
          placeholder="Select"
          className="flex_root"
          options={[
            { label: "Trip One", id: 1 },
            { label: "Trip two", id: 2 },
          ]}
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

export const ReportForm = ({ onSubmit, bool, loading, toggle, current }: FormProps) => (
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
