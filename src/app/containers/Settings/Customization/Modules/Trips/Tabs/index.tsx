import { TabView } from "app/shared";
import Prefrences from "../Prefrences";
import Fields from "../Fields";

const Tabs = () => {
    const tabsInfo = [
        {
            tab: "Prefrences",
            component: () => <Prefrences />,
        },
        {
            tab: "Fields",
            component: () => <Fields />,
        }
    ];

    return (<TabView tabsInfo={tabsInfo} />);
};

export default Tabs;