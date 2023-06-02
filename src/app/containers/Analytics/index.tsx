import { PageHeader, Space, Row, } from "antd";
import { Labels, Content } from "static";
import Cardx from "./card";
const { ANALYTICS, EXPENSE, REPORTS, _TRIPS, Activity } = Labels;
const { Analytics_Content } = Content
const { expense_data, report_data, trips_data, activity_log_data } = Analytics_Content
const Analytics = () => {
    return (
        <>
            <PageHeader title={ANALYTICS} />
            <Space direction="vertical" size="small" style={{ margin: "20Px" }}>
                <Cardx title={EXPENSE} dataSource={expense_data} span={16} column={3} />
                <Row gutter={16}>
                    <Cardx title={REPORTS} dataSource={report_data} span={8} column={1} />
                    <Cardx title={_TRIPS} dataSource={trips_data} span={8} column={1} />
                </Row>
                <Cardx title={Activity} dataSource={activity_log_data} span={8} column={1} />
            </Space>
        </>
    );
};
export default Analytics;