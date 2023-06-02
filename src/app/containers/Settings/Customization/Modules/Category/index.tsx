
import { PageHeader, Space, Button, Typography } from "antd";
import { Icons } from "app/shared";
import Tabs from "./Tabs";

const { BiCategory, VscAdd } = Icons;
const { Title } = Typography;


const Category = () => {
    return (
        <>
            <PageHeader
                title={
                    <Space>
                        <BiCategory size={25} />
                        <Title level={3}>Categories</Title>
                    </Space>
                }
                extra={
                    <Button key="1" icon={<VscAdd size={14} />} className="pr-color" onClick={() => console.log("clicked")}>
                        New Categorey
                    </Button>
                }
            />
            <Tabs />
        </>
    );
};

export default Category;