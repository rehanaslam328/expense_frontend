/** @format */
import { useEffect } from "react";
import { Space, Modal, Form } from "antd";
import { rules } from "utils";
import { Labels, Content } from "static";
import { CurrencyFormProps } from "./Types";
import { Buttonx, Icons, InputField, Selectx } from "app/shared";

const { GrCurrency, CgArrowsExchange } = Icons;
const { enter_name, enter_currency_code, enter_symbol } = Content;
const { NAME, NEW_CURRENCY, ENTER, CURRENCY_CODE, SYMBOL, EXCHANGE_RATE, CREATE, CANCEL } = Labels;

type ModalProps = {
  visible: boolean;
} & Pick<CurrencyFormProps, "currncy_list" | "onSubmit" | "toggle" | "current" | "loading">;

const initialState = {
  name: "",
  currency_code: null,
  exchange_rate: "",
  symbol: "",
};

const Modalx = ({ visible, loading, toggle, onSubmit, current, currncy_list }: ModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (current && Object.keys(current).length)
      form.setFieldsValue({
        ...current,
        currency_code: `${current.currency_code} - ${current.name}`,
      });
  }, [current, form]);

  const handleClose = () => form.resetFields();

  return (
    <Modal
      title={NEW_CURRENCY}
      style={{ top: 0 }}
      visible={visible}
      onCancel={toggle}
      maskClosable={false}
      destroyOnClose
      footer={null}
      afterClose={handleClose}
    >
      <Form name={NEW_CURRENCY} initialValues={initialState} form={form} onFinish={onSubmit}>
        <InputField
          size="middle"
          name="name"
          label={NAME}
          LeftIcon={<GrCurrency />}
          rules={rules(undefined, enter_name)}
          placeholder={`${ENTER} ${NAME}`}
          disabled={Boolean(current?.name)}
        />
        <Selectx
          label={CURRENCY_CODE}
          name="currency_code"
          rules={rules(undefined, enter_currency_code)}
          placeholder={CURRENCY_CODE}
          size="middle"
          options={currncy_list}
          className="flex_root"
          disabled={Boolean(current?.currency_code)}
        />
        <InputField
          size="middle"
          label={SYMBOL}
          name="symbol"
          rules={rules(undefined, enter_symbol)}
          LeftIcon={<GrCurrency />}
          placeholder={SYMBOL}
        />
        <InputField
          size="middle"
          label={EXCHANGE_RATE}
          name="exchange_rate"
          rules={[]}
          LeftIcon={<CgArrowsExchange size={20} />}
          placeholder={EXCHANGE_RATE}
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

export const CurrencyForm = ({
  currncy_list,
  onSubmit,
  bool,
  loading,
  toggle,
  current,
}: CurrencyFormProps) => (
  <>
    <Modalx
      visible={bool}
      loading={loading}
      currncy_list={currncy_list}
      toggle={toggle}
      onSubmit={onSubmit}
      current={current}
    />
  </>
);
