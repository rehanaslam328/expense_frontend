import { Button, PageHeader, Space, Typography } from "antd";
import { CreateProps, SubmitProps } from "./Types";
import { useAxios, useBool } from "app/Hooks";
import { routeNames, Labels, Content } from "static";
import { Toast } from "app/shared";
import { Icons } from "app/shared";
import TagForm from "./Form";

const { TAGS } = routeNames;
const { Title } = Typography;
const { NEW_TAG } = Labels
const { tag } = Content
const { BsFillTagsFill } = Icons

const CreateTag = ({ loading, refetch, setTrue, setFalse }: CreateProps) => {
    const { bool, toggle } = useBool();
    const { callAxios } = useAxios();

    const onsubmit = (values: SubmitProps) => {
        setTrue()
        callAxios({
            method: "post",
            data: values,
            url: TAGS,
        }).then((res) => {
            if (res) {
                toggle();
                setFalse();
                refetch();
                Toast({ message: res.message, type: "success" });
            }
        });
    };
    return (
        <>
            <PageHeader
                title={
                    <Space>
                        <BsFillTagsFill size={25} />
                        <Title level={3}>{tag}</Title>
                    </Space>
                }
                style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
                extra={[
                    <Button
                        key="2"
                        icon={<BsFillTagsFill size={14} />}
                        className="pr-color"
                        onClick={toggle}
                    >
                        {NEW_TAG}
                    </Button>,
                ]}
            />
            <TagForm bool={bool} toggle={toggle} loading={loading} onSubmit={onsubmit} />

        </>
    );
};

export default CreateTag;
