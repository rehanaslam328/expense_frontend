import { Button, PageHeader, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import TripListing from "./Listing";
import { Icons } from "app/shared";
import { Labels, routeNames } from "static";
import { useGetListingQuery } from "../../../store/query/Trip";
const { MdOutlineCardTravel } = Icons;
const { Title } = Typography;
const { NEW_TRIP_LABEL } = Labels;
const { NEW_TRIP } = routeNames;

const Trips = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(NEW_TRIP);
  };
  const {
    data,
    //@ts-ignore
    refetch,
  } = useGetListingQuery("");
  return (
    <>
      <PageHeader
        title={
          <Space>
            <MdOutlineCardTravel size={25} />
            <Title level={3}>Trips</Title>
          </Space>
        }
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
        extra={[
          <Button
            key="2"
            icon={<MdOutlineCardTravel size={14} />}
            className="pr-color"
            onClick={handleNavigate}
          >
            {NEW_TRIP_LABEL}
          </Button>,
        ]}
      />
      <TripListing listing={data?.trips?.data} />
    </>
  );
};

export default Trips;
