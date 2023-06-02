import { Card, List, Col } from "antd";
import { Icons } from "app/shared";
import { Content } from "static";
const { TbStar } = Icons
const { Meta } = Card
const { Analytics_Content } = Content
const { expense_subtitle } = Analytics_Content
type cardProps = {
    title: String,
    dataSource: Array<Object>,
    span: number,
    column: number
}
const Cardx = ({ title, dataSource, span, column }: cardProps) => {
    return (
        <Col span={span}>
            <Card size="small">
                <Meta
                    title={title}
                    description={expense_subtitle}
                />
                <List
                    size="small"
                    dataSource={dataSource}
                    grid={{ column: column }}
                    renderItem={item =>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<TbStar />}
                                title={<a href="/expenses">{item}</a>}
                            />
                        </List.Item>} />
            </Card>
        </Col>
    );
};
export default Cardx;