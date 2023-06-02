import { useEffect } from "react"
import { Form, Modal, Space } from "antd";
import { InputField, Buttonx } from "app/shared";
import { rules } from "utils";
import { Content, Labels } from "static";
import { ModalProps, FormProps } from "./Types";

const { enter_name } = Content
const { CANCEL, CREATE, NEW_MERCHANT_LABEL, MERCHANT_NAME, MERCHANT_CODE } = Labels

const initialValues = {
    name: "",
    merchant_code: ""
};

const Modalx = ({ toggle, isOpen, onSubmit, current, boolean }: ModalProps) => {

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
            title={NEW_MERCHANT_LABEL}
            style={{ top: 0 }}
            open={isOpen}
            onCancel={toggle}
            maskClosable={false}
            destroyOnClose
            footer={null}
            afterClose={handleClose}
        >
            <Form onFinish={onSubmit} form={form} initialValues={initialValues}>
                <InputField
                    size="middle"
                    name="name"
                    label={MERCHANT_NAME}
                    rules={rules(undefined, enter_name)}
                />
                <InputField
                    size="middle"
                    name="merchant_code"
                    label={MERCHANT_CODE}

                />
                <Space className="steps-action">
                    <Buttonx
                        size="middle"
                        btnText={CANCEL}
                        htmlType="button"
                        type="default"
                        clickHandler={toggle}
                    />
                    <Buttonx size="middle" btnText={CREATE} loading={boolean} />
                </Space>
            </Form>
        </Modal>

    );
};

export const MerchantForm = ({
    onSubmit,
    bool,
    toggle,
    boolean,
    loading, current
}: FormProps) => (
    <>
        <Modalx
            toggle={toggle}
            loading={loading}
            isOpen={bool}
            boolean={boolean}
            onSubmit={onSubmit}
            current={current}
        />
    </>
)