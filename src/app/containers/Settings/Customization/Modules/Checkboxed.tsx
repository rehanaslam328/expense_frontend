import { Checkbox, Typography, Divider, Form } from "antd";
import { InputField, Selectx } from "app/shared";

const { Title } = Typography

type checkbox = {
    title?: String,
    options: { label: string; value: string; field?: boolean, name?: string, type?: string, listoption?: any }[]
}
const Checkboxed = ({ title, options }: checkbox) => {

    const Fieldtype = (type: string | undefined, name: string, listoption?: any) => {
        switch (type) {
            case "numberField":
                return <InputField name={name} numberField size="small" />
            case "textareaField":
                return <InputField name={name} textareaField size="small" />
            case "dropdown":
                return <Selectx name={name} options={listoption} size="small" />
            default:
                return <InputField name={name} size="small" />
        }
    }

    return (
        <>
            {title &&
                <Title level={5}>
                    {title}
                </Title>
            }
            {options.map((option: { label: string, value: string, field?: boolean, name?: any, type?: string, listoption?: any }) => {
                return (
                    <>
                        <Form.Item name={option.value} valuePropName="checked">
                            <Checkbox>{option.label}</Checkbox>
                        </Form.Item>
                        {option.field &&
                            <Form.Item>
                                {Fieldtype(option.type, option.name, option.listoption)}
                            </Form.Item>
                        }
                    </>
                )
            })
            }
            <Divider />
        </>
    );
};

export default Checkboxed;