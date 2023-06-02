import { Table } from "antd";
import { Key } from "react";
import { useGetListingQuery } from "store/query/Category";

const columns = [
    {

        title: 'Categorey Name',
        // dataIndex: 'name',
        render: (value: any) =>
            <span style={{ color: value.is_active ? "blue" : "black" }}>
                {value.name}
            </span>

    },
    {
        title: 'Account Code',
        dataIndex: 'account_code'
    }
];


// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows: object[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
    getCheckboxProps: (record: any) => ({
        disabled: record.name === "Disabled User", // Column configuration not to be checked
        name: record.name,
    }),
};

const ActiveCategories = () => {

    const { data = [] } = useGetListingQuery("")

    return <>
        <Table
            rowKey={(record: any) => record.id}
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
            pagination={false} />
    </>
};

export default ActiveCategories;