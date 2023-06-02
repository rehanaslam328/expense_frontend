import { TabView } from "app/shared";
import Preferences from "../Preferences";
import Fields from "../Fields";

const Tabs = () => {
    const tabsInfo = [
        {
            tab: "Preferences",
            component: () => <Preferences />,
        },
        {
            tab: "Fields",
            component: () => <Fields />,
        }
    ];

    return (
        <TabView tabsInfo={tabsInfo} />
    );
};

export default Tabs;