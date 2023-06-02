import { Form, Modal, Space } from "antd";
import { rules } from "utils";
import { Labels, Content } from "static";
import { taxGroupFormProps } from "../Types";
import { TaxGroupList } from "./TaxGroupList";
import { Buttonx, InputField } from "app/shared";

const { enter_name } = Content;
const { ENTER, TAX, NAME, CANCEL, CREATE } = Labels;

type ModalProps = {
  open: boolean;
} & Omit<taxGroupFormProps, "bool">;

const initialState = {
  name: "",
};

const Modalx = ({
  toggle,
  open,
  loading,
  current,
  listing,
  onSubmit,
  setSelected,
  currSelected,
  setCurrSelected,
}: ModalProps) => {
  const [form] = Form.useForm();
  if (current && Object.keys(current).length) form.setFieldsValue({ ...current });

  let taxList = listing.filter((tx: any) => !tx.tax_group_details);

  const handleClose = () => {
    form.setFieldsValue({ ...initialState });
    open && toggle();
    setCurrSelected([]);
    setCurrSelected([]);
  };

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
          rules={rules(undefined, enter_name)}
          placeholder={`${ENTER} ${NAME}`}
        />

        <TaxGroupList
          data={taxList}
          currSelected={currSelected}
          setCurrSelected={setCurrSelected}
          setSelected={setSelected}
        />

        <Space className="steps-action">
          <Buttonx
            size="middle"
            btnText={CANCEL}
            htmlType="button"
            type="default"
            clickHandler={handleClose}
          />
          <Buttonx size="middle" btnText={CREATE} loading={loading} />
        </Space>
      </Form>
    </Modal>
  );
};

export const GroupForm = ({
  bool,
  toggle,
  loading,
  listing,
  current,
  onSubmit,
  setCurrent,
  setSelected,
  currSelected,
  setCurrSelected,
}: taxGroupFormProps) => {
  return (
    <>
      <Modalx
        open={bool}
        loading={loading}
        toggle={toggle}
        onSubmit={onSubmit}
        current={current}
        listing={listing}
        setCurrent={setCurrent}
        setSelected={setSelected}
        currSelected={currSelected}
        setCurrSelected={setCurrSelected}
      />
    </>
  );
};
