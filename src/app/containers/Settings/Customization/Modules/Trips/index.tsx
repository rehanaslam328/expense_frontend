import { Typography } from "antd";
import Tabs from "./Tabs";

const { Title } = Typography
const TripPrefrences = () => {
    return (
        <>
            <Title level={3}>Trips</Title>
            <Tabs />
        </>
    );
};

export default TripPrefrences;