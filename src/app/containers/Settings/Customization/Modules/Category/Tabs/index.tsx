import { TabView } from "app/shared";
import Prefrences from "../../Trips/Prefrences";
import ActiveCategories from "../ActiveCategories";

const Tabs = () => {
    const tabsInfo = [
        {
            tab: "Active Categories",
            component: () => <ActiveCategories />
        },
        {
            tab: "Expense Types",
            component: () => <Prefrences />
        },

    ]

    return (
        <TabView tabsInfo={tabsInfo} />
    );
};

export default Tabs;