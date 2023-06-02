/** @format */
import { useEffect } from "react";
import { Space, Modal, Form } from "antd";
import { rules } from "utils";
import { Labels, Content } from "static";
import { FormProps, ModalProps } from "./Types";
import { Buttonx, DatePickerx, InputField, Selectx } from "app/shared";
//@ts-ignore
const { enter_name } = Content;
//@ts-ignore
const { NAME, RECORD_ADVANCE, ENTER, CREATE, CANCEL } = Labels;

const initialState = {
  amount: "",
  currency_id: null,
  date: "",
  paid_id: null,
  reference_number:"",
  notes:"",
  trip_id:null
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
      title={RECORD_ADVANCE}
      style={{ top: 0 }}
      visible={visible}
      onCancel={toggle}
      maskClosable={false}
      destroyOnClose
      footer={null}
      afterClose={handleClose}
    >
      <Form
        name={RECORD_ADVANCE}
        initialValues={initialState}
        form={form}
        onFinish={onSubmit}
        layout="vertical"
      >
        <InputField
          label="Amount"
          name="amount"
          rules={rules(undefined, "Select Amount")}
          placeholder="0"
          addonBefore={
            <Selectx
              allowClear={false}
              name="currency_id"
              label="PKR"
              defaultValue="PKR"
              placeholder="Select Currency"
              options={[{ label: "PKR", value: 1 }]}
              // rules={rules(undefined, "Select Currency")}
              size="small"
              noStyle
            />
          }
        />
        <DatePickerx name="date" label="Date" rules={rules(undefined, "Enter Date")} />
        <Selectx
          name="paid_id"
          label="Paid Through"
          placeholder="Select"
          className="flex_root"
          options={[
            { label: "Trip One", id: 1 },
            { label: "Trip two", id: 2 },
          ]}
        />
        <InputField size="middle" name="reference_number" label="Reference#" />
        <InputField
          textareaField
          name="notes"
          label="Notes"
          placeholder={`${ENTER} Notes`}
        />
         <Selectx
          name="trip_id"
          label="Apply to Trip"
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