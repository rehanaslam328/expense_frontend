import { TabView, Icons } from "app/shared";
import ApprovalListing from "../Listing";
import { Content } from "static";
import PendingApprovals from "../PendingApprovals";
import TripListing from "../tripListing";
const { MdOutlineCardTravel, AiOutlineFolderOpen } = Icons;
const { pending_approvals, reports, trips } = Content;

const Tab = () => {
  const tabsInfo = [
    {
      tab: pending_approvals,
      component: () => <PendingApprovals />,
    },
    {
      tab: trips,
      icon: <MdOutlineCardTravel size={16} />,
      component: () => <ApprovalListing />,
    },
    {
      tab: reports,
      icon: <AiOutlineFolderOpen size={16} />,
      component: () => <TripListing />,
    },
  ];
  return <TabView tabsInfo={tabsInfo} />;
};
export default Tab;
