import { ColumnsType } from "antd/lib/table";
import { Table } from 'antd'
import { RenderAction } from "app/shared";
import { useState } from 'react'
import { Labels } from "static";
import { ListingProps } from "./Types";

const { DELETE, MERCHANT } = Labels;




const MerchantListing = ({ listing = [], handleConfirm, handleClick }: ListingProps) => {

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Merchant Code',
            dataIndex: 'merchant_code'
        },
        {
            title: "Action",
            dataIndex: "",
            width: 150,
            key: "x",
            align: "center" as const,
            render: (props: any) => {
                const { organization_id } = props;
                return (
                    <RenderAction
                        data={props}
                        title={`${DELETE} ${MERCHANT} ?`}
                        organization_id={organization_id}
                        handleClick={handleClick}
                        handleConfirm={handleConfirm}
                    />
                );
            },
        },
    ]

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={listing}
                pagination={false}
                rowKey={(record: any) => record.id} />
        </>
    );
};

export default MerchantListing;