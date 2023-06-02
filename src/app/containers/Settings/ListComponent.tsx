import { List, Col } from "antd";
import { NavLink } from "react-router-dom";

type Listprops = {
    icon: any;
    header: String;
    data: {
        label: string;
        url: string;
    }[];
};
const Listx = ({ header, data, icon }: Listprops) => {

    return (
        <Col xs={20} sm={20} md={10} lg={5} xl={4}>
            <List
                size="small"
                header={
                    <div className="listTitle">
                        <span className="listIcon"> {icon}</span> <h3>{header}</h3>
                    </div>
                }
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta description={<NavLink to={item.url}>{item.label}</NavLink>} />
                    </List.Item>
                )}
            />
        </Col>
    );
};
export default Listx;
