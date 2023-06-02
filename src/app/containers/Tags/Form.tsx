import { Initialvalues } from "./Constant";
import { Labels } from "static";
import { Form, Input, Button, Radio, Tooltip, Modal, Space } from "antd";
import { Buttonx, Icons } from "app/shared";
import { FormProps, ModalProps } from "./Types";
import { useEffect } from "react";

const { NEW_TAG, CANCEL, CREATE } = Labels;
const { RiDeleteBinLine, VscAdd } = Icons;

const Modalx = ({ visible, loading, toggle, onSubmit, current }: ModalProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (current && Object.keys(current).length)
            form.setFieldsValue({
                "name": current.name,
                "mandatory": current.mandatory === 1 ? true : false,
                "tag_options": current.tag_details
            });
    }, [current, form]);

    const handleClose = () => form.resetFields();
    return (
        <Modal
            title={NEW_TAG}
            style={{ top: 0 }}
            visible={visible}
            onCancel={toggle}
            maskClosable={false}
            destroyOnClose

            footer={null}
            afterClose={handleClose}
        >
            <Form
                layout="vertical"
                form={form}
                labelAlign="right"
                initialValues={Initialvalues}
                onFinish={onSubmit}
            >
                <Form.Item
                    name="name"
                    label="Tags Name"
                    rules={[{ required: true, message: "Tag Name Required" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="mandatory" label="Mandatory" rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value={true}>YES</Radio>
                        <Radio value={false}>NO</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.List name="tag_options">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item label={index === 0 ? "Options   " : ""} required={true} key={field.key}>
                                    <Form.Item
                                        {...field}
                                        rules={[{ required: true }]}
                                        noStyle
                                        name={[`${field.name}`, "name"]}
                                    >
                                        <Input style={{ width: "85%" }} size="middle" />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <Tooltip title="Delete">
                                            <Button
                                                shape="circle"
                                                style={{ margin: "5px" }}
                                                icon={<RiDeleteBinLine color="red" />}
                                                onClick={() => remove(field.name)}
                                            />
                                        </Tooltip>
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: "80%" }}
                                    icon={<VscAdd color="blue" />}
                                >
                                    Add field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
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

const TagForm = ({ onSubmit, toggle, bool, loading, current }: FormProps) =>
    <Modalx visible={bool} current={current} loading={loading} toggle={toggle} onSubmit={onSubmit} />;

export default TagForm;
