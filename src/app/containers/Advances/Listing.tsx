import { useMemo, Key } from "react";
import { Space, Table, Typography } from "antd";
import { Labels } from "static";
import { RenderAction } from "app/shared";
import { ListingProps } from "./Types";
import { useSearchParam } from "app/Hooks";

const { DATE, TRIP_NUMBER, REFERENCE_NUMBER, AMOUNT, REPORT_NAME, DELETE, CAR_TYPE_PREFERENCE } =
  Labels;
const staticData = [
  {
    id: 1,
    date: "04 Jan 2023",
    trip_number: "TRIP-101",
    reference_number: "REF-111",
    amount: 100,
    report_name: "Report one",
  },
  {
    id: 2,
    date: "05 Jan 2023",
    trip_number: "TRIP-102",
    reference_number: "REF-112",
    amount: 50,
    report_name: "Report two",
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
      { title: DATE, dataIndex: "date", key: DATE, width: 100, ellipsis: true },
      {
        title: TRIP_NUMBER,
        dataIndex: "trip_number",
        key: TRIP_NUMBER,
        width: 100,
        ellipsis: true,
      },
      {
        title: REFERENCE_NUMBER,
        dataIndex: "reference_number",
        key: REFERENCE_NUMBER,
        width: 100,
        ellipsis: true,
      },
      { title: AMOUNT, dataIndex: "amount", key: AMOUNT, width: 100, ellipsis: true },
      {
        title: REPORT_NAME,
        dataIndex: "report_name",
        key: REPORT_NAME,
        width: 100,
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
              title={`${DELETE} "${name}" ${CAR_TYPE_PREFERENCE} ?`}
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
