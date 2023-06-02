import { Typography } from "antd";
import Tabs from "./Tabs";

const { Title } = Typography

const ExpensePrefrences = () => {
    return (
        <>
            <Title level={3}>Expense</Title>
            <Tabs />
        </>
    );
};

export default ExpensePrefrences;