// import React from 'react';

import { Form, Modal, Space } from "antd";
import { useEffect } from "react";
import { Labels, Content } from "static";
import { FormProps, ModalProps } from "./Types";
import { rules } from "utils";
import { Buttonx, InputField } from "app/shared";

const { enter_name } = Content
const { Create_New_PaidThrough, CREATE, CANCEL, ENTER, NAME } = Labels;

const initialState = {
    name: ""
}

const Modalx = ({ visible, loading, toggle, onSubmit, current }: ModalProps) => {

    const [form] = Form.useForm()

    useEffect(() => {
        if (current && Object.keys(current).length)
            form.setFieldsValue({
                ...current,
            });
    }, [current, form]);

    const handleClose = () => form.resetFields();

    return (
        <Modal
            title={Create_New_PaidThrough}
            style={{ top: 0 }}
            visible={visible}
            onCancel={toggle}
            maskClosable={false}
            destroyOnClose
            footer={null}
            afterClose={handleClose}
        >
            <Form
                name={Create_New_PaidThrough}
                initialValues={initialState}
                form={form}
                onFinish={onSubmit}
            >
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
    )
}

const PaymentModeForm = ({ onSubmit, bool, loading, toggle, current }: FormProps) => {
    return (
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
};

export default PaymentModeForm;