import { Card, Empty, Space } from "antd";
const PendingApprovals = () => {
  return (
    <div className="site-card-wrapper">
      <Space size="middle" style={{ display: "auto" }}>
        <Card title={`Pending Trips`} size="default" style={{ width: 300 }}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Pending Trips for Approval" />
        </Card>
        <Card title="Pending Reports" size="default" style={{ width: 300 }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Pending Reports for Approval"
          />
        </Card>
      </Space>
    </div>
  );
};
export default PendingApprovals;
