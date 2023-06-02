import { useMemo, Key } from "react";
import { Space, Table, Typography } from "antd";
import { Labels } from "static";
import { RenderAction } from "app/shared";
import { ListingProps } from "./Types";
import { useSearchParam } from "app/Hooks";

const {
  REPORT_NAME,
  REPORT_NUMBER,
  STATUS,
  APPROVER,
  TOTAL,
  TO_BE_REIMBURSED,
  DELETE,
  REPORT,
} = Labels;
const staticData = [
  {
    id:1,
    report_number: "REP101",
    report_name: "Report one",
    status: "pending",
    approver: "John",
    total: 100,
    reimbursed: 50,
  },
  {
    id:2,
    report_number: "REP102",
    report_name: "Report two",
    status: "draft",
    approver: "Mark",
    total: 80,
    reimbursed: 30,
  },
];
export const ListingReports = ({
  total,
  loading,
  //@ts-ignore
  listing = [],
  handleClick,
  handleConfirm,
}: ListingProps) => {
  const { onChange, getParams } = useSearchParam("");
  const { page, pageSize } = getParams();
  const memoColumns = useMemo(
    () => [
      {
        title: REPORT_NUMBER,
        dataIndex: "report_number",
        key: REPORT_NUMBER,
        width: 60,
        ellipsis: true,
      },
      {
        title: REPORT_NAME,
        dataIndex: "report_name",
        key: REPORT_NAME,
        width: 100,
        ellipsis: true,
      },
      { title: STATUS, dataIndex: "status", key: STATUS, width: 100, ellipsis: true },
      { title: APPROVER, dataIndex: "approver", key: APPROVER, width: 100, ellipsis: true },
      { title: TOTAL, dataIndex: "total", key: TOTAL, width: 50, ellipsis: true },
      {
        title: TO_BE_REIMBURSED,
        dataIndex: "reimbursed",
        key: TO_BE_REIMBURSED,
        width: 90,
        ellipsis: true,
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
              title={`${DELETE} "${name}" ${REPORT} ?`}
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
        onChange={onChange}
        dataSource={staticData}
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
