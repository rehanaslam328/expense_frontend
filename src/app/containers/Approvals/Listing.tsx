import { useMemo, Key } from "react";
import { Table } from "antd";

const ApprovalListing = () => {
  let listing = [];

  for (let i = 0; i < 5; i++) {
    listing.push({
      key: i,
      submitter: `Edward King ${i}`,
      trip: `32`,
      trip_detail: `London, Park Lane no. ${i}`,
      destination: "New york",
      status: `${i % 2 === 0 ? `approved` : `rejected`}`,
    });
  }
  const memoColumns = useMemo(
    () => [
      {
        title: "Submitter",
        dataIndex: "submitter",
      },
      {
        title: "Trip",
        dataIndex: "trip",
      },
      {
        title: "Trip Detail",
        dataIndex: "trip_detail",
      },
      {
        title: "Destination",
        dataIndex: "destination",
      },
      {
        title: "Status",
        dataIndex: "status",
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

export default ApprovalListing;
