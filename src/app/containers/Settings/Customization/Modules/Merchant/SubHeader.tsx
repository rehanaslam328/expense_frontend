import { PageHeader, Space, Typography, Button } from "antd";
import { useAxios, useBool } from "app/Hooks";
import { Icons, Toast } from "app/shared";
import { MerchantForm } from "./Form";
import { CreateProps, SubmitProps } from "./Types";

const { AiOutlineShop, VscAdd } = Icons;
const { Title } = Typography;

export const SubHeader = ({ loading, setTrue, setFalse, refetch }: CreateProps) => {
    const { bool, toggle } = useBool();
    const { callAxios, bool: boolean } = useAxios();

    const onSubmit = (values: SubmitProps) => {
        setTrue()
        callAxios({

            method: "post",
            data: values,
            url: "/merchant"
        }).then((res) => {
            if (res) {
                toggle();
                setFalse()
                refetch();
                Toast({ message: res.message })
            }
        })
    }
    return (
        <>
            <MerchantForm bool={bool} toggle={toggle} loading={loading} onSubmit={onSubmit} boolean={boolean} />
            <PageHeader
                title={
                    <Space>
                        <AiOutlineShop size={25} />
                        <Title level={3}>Merchant</Title>
                    </Space>
                }
                extra={
                    <Button key="1" icon={<VscAdd size={14} />} className="pr-color" onClick={toggle}>
                        Create New Merchant
                    </Button>
                }
                style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
            />

        </>
    );
};