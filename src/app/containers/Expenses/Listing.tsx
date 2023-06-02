import { useMemo, Key } from "react";
import { Space, Table, Typography } from "antd";
import { Labels } from "static";
import { RenderAction } from "app/shared";
import { useSearchParam } from "app/Hooks";
import { ListingProps } from "./Types";

const { DELETE, EXPENSE } = Labels;

export const ExpenseListing = ({ total, loading, listing = [], handleConfirm }: ListingProps) => {
  const { onChange, getParams } = useSearchParam("");
  const { page, pageSize } = getParams();

  const memoColumns = useMemo(
    () => [
      // {
      //   title: "Expense Details",
      //   dataIndex: "expense_details",
      //   width: 200,
      //   ellipsis: true,
      // },
      { title: "Merchant", dataIndex: "merchant_name", width: 200, ellipsis: true },
      { title: "Amount", dataIndex: "total_amount", width: 200, ellipsis: true },
      { title: "Report Name", dataIndex: "report_name", width: 200, ellipsis: true },
      { title: "Status", dataIndex: "status", width: 200, ellipsis: true },
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
              title={`${DELETE} ${EXPENSE} ?`}
              organization_id={organization_id}
              handleClick={() => console.log("clicked")}
              handleConfirm={handleConfirm}
            />
          );
        },
      },
    ],
    []
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
        onChange={onChange}
        dataSource={listing}
        loading={loading}
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
        rowKey={(record: any) => record.id}
      />
    </>
  );
};
