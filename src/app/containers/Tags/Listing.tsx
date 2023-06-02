import { useMemo, Key } from "react";
import { Space, Table, Typography } from "antd";
import { Labels } from "static";
import { ListingProps } from "./Types";
import { RenderAction } from "app/shared";
import { useSearchParam } from "app/Hooks";

const { DELETE, TAG } = Labels;

const TagListing = ({
    total,
    loading,
    listing = [],
    handleClick,
    handleConfirm,
}: ListingProps) => {
    const { onChange, getParams } = useSearchParam("");
    const { page, pageSize } = getParams();

    const memoColumns = useMemo(
        () => [
            {
                title: "Tag Name",
                dataIndex: "name",
                key: "Name"
            },
            {
                title: "Option",
                dataIndex: "options",
                key: "option"
            },
            {
                title: "Action",
                dataIndex: "",
                width: 150,
                key: "x",
                align: "center" as const,
                render: (props: any) => {
                    const { name, organization_id } = props;
                    return (
                        <RenderAction
                            data={props}
                            title={`${DELETE} "${name}" ${TAG} ?`}
                            organization_id={organization_id}
                            handleClick={handleClick}
                            handleConfirm={handleConfirm}
                        />
                    );
                },
            },

        ],
        [handleConfirm, handleClick]
    );
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

    return (
        <>
            <Table
                bordered
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={memoColumns}
                loading={loading}
                onChange={onChange}
                pagination={{
                    total: total,
                    current: page, //Current page number
                    pageSize: pageSize, //Number of data items per page
                    size: "small",
                    showTotal: () => (
                      <Space>
                        <Typography.Title level={5} code>{`Total:  ${total}`}</Typography.Title>
                      </Space>
                    ),
                    showLessItems: true,
                    position: ["topRight"],
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "30", "50"],
                  }}
                dataSource={listing}
                rowKey={(record: any) => record.id}
            />
        </>
    );
};

export default TagListing;