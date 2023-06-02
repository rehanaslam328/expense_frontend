import { Tabs } from "antd";
const { TabPane } = Tabs;
interface TabProps {
  tabsInfo: { tab: string; icon?: any; component: () => void }[];
}

export const TabView = (props: TabProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Tabs defaultActiveKey="0" onChange={onChange} style={{ padding: 24 }} size={"large"}>
      {props.tabsInfo.map((menu: any, index: any) => (
        <TabPane
          tab={
            <span>
              {" "}
              {menu.icon} {menu.tab}{" "}
            </span>
          }
          key={`${index}`}
        >
          {menu.component()}
        </TabPane>
      ))}
    </Tabs>
  );
};