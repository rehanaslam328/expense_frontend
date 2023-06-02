/** @format */
import { useEffect } from "react";
import { Form, Modal, Space, Checkbox } from "antd";
import { rules } from "utils";
import { TaxFormProps } from "./Types";
import { Labels, Content } from "static";
import { Buttonx, Icons, InputField } from "app/shared";

const { enter_name, enter_rate } = Content;
const { AiOutlineUser, AiOutlinePercentage } = Icons;
const { ENTER, TAX, NAME, RATE, CANCEL, CREATE, COMPOUND_TAX } = Labels;

type ModalProps = {
  open: boolean;
} & Pick<TaxFormProps, "onSubmit" | "toggle" | "current" | "loading">;

const initialState = {
  name: "",
  rate: "",
  is_compound: false,
};

const Modalx = ({ toggle, open, loading, current, onSubmit }: ModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current && Object.keys(current).length) form.setFieldsValue({ ...current });
  }, [current, form]);

  const handleClose = () => form.resetFields();

  return (
    <Modal
      title={`${ENTER} ${TAX}`}
      style={{ top: 0 }}
      open={open}
      onCancel={toggle}
      maskClosable={false}
      destroyOnClose
      footer={null}
      afterClose={handleClose}
    >
      <Form name={`${ENTER}-${TAX}`} initialValues={initialState} form={form} onFinish={onSubmit}>
        <InputField
          size="middle"
          name="name"
          label={NAME}
          LeftIcon={<AiOutlineUser />}
          rules={rules(undefined, enter_name)}
          placeholder={`${ENTER} ${NAME}`}
        />
        <InputField
          size="middle"
          label={RATE}
          name="rate"
          rules={rules(undefined, enter_rate)}
          addonAfter={<AiOutlinePercentage />}
          placeholder={RATE}
        />
        <Form.Item name="is_compound" valuePropName="checked">
          <Checkbox>{COMPOUND_TAX}</Checkbox>
        </Form.Item>
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

export const TaxForm = ({ loading, onSubmit, bool, toggle, current }: TaxFormProps) => {
  return (
    <>
      <Modalx
        open={bool}
        toggle={toggle}
        loading={loading}
        current={current}
        onSubmit={onSubmit}
      />
    </>
  );
};
