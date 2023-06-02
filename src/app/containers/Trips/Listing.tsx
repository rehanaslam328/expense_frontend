import { useMemo, Key } from "react";
import { Table } from "antd";
// @ts-ignore
import { ListingProps } from "./Types";
const TripListing = ({ listing = [] }: ListingProps) => {
  const memoColumns = useMemo(
    () => [
      {
        title: "Trip#",
        dataIndex: "preferences",
      },
      {
        title: "Trip Detail",
        //name, depart_date,
        render: (value: any) => {
          return (
            <div>
              <p>{value.name}</p>
              <span>{value.depart_date[0] && value.depart_date[0].depart_date}</span> &nbsp; &nbsp;
              &nbsp;
              <span>{value.depart_date[1] && value.depart_date[1].depart_date}</span>
            </div>
          );
        },
      },
      {
        title: "Destination",
        //dest_aname, dest_country_id
        render: (value: any) => {
          return (
            <div>
              <p>{value?.dest_aname}</p>
            </div>
          );
        },
      },
      {
        title: "STATUS",
        dataIndex: "status",
      },
      {
        title: "APPROVER",
        dataIndex: "approver",
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
        dataSource={listing}
        pagination={false}
        rowKey={(record: any) => record.key}
      />
    </>
  );
};

export default TripListing;
