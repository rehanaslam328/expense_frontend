import { Tabs } from "antd";
import { TaxRate } from "./TaxRate";
const { TabPane } = Tabs;

export const TaxTabs = ({
  current,
  handleChange,
}: {
  current: string;
  handleChange: (curr: string) => void;
}) => {
  return (
    <>
      <Tabs
        tabPosition="left"
        activeKey={current}
        onChange={handleChange}
        style={{ height: "100%" }}
      >
        <TabPane tab="Tax Rates" key="1">
          <TaxRate />
        </TabPane>
        <TabPane tab="Tax Settings" key="2">
          Content of Tab 2
        </TabPane>
      </Tabs>
    </>
  );
};
