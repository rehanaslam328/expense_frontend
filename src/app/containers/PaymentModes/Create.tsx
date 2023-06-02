import { Button, PageHeader, Space, Typography } from "antd";
import { Icons, Toast } from "app/shared";
import { useAxios, useBool } from "app/Hooks";
import { Content, Labels, endpoints } from "static";
import PaymentModeForm from "./Form";
import { CreateProps, SubmitProps } from "./Types";

const { Title } = Typography;
const { MdOutlinePayments, VscAdd } = Icons;
const { payment_through_account } = Content;
const { Create_New_PaidThrough } = Labels;
const { PAYMENTS_MODES } = endpoints

const CreateNewPaymentMode = ({ loading, setTrue, setFalse, refetch }: CreateProps) => {
    const { bool, toggle } = useBool();
    const { callAxios } = useAxios()

    const onSubmit = (values: SubmitProps) => {
        setTrue();
        callAxios({
            method: "post",
            data: values,
            url: PAYMENTS_MODES,
        }).then((res) => {
            if (res) {
                toggle();
                setFalse();
                refetch();
                Toast({ message: res.message, type: "success" });
            }
        });
    }

    return (
        <>
            <PaymentModeForm bool={bool} toggle={toggle} loading={loading} onSubmit={onSubmit} />
            <PageHeader
                title={
                    <Space>
                        <MdOutlinePayments size={25} />
                        <Title level={3}>{payment_through_account}</Title>
                    </Space>
                }
                extra={
                    <Button key="1" icon={<VscAdd size={14} />} className="pr-color" onClick={toggle}>
                        {Create_New_PaidThrough}
                    </Button>
                }
                style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
            />
        </>
    );
};

export default CreateNewPaymentMode;