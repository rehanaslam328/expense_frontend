import { useMemo, Key } from "react";
import { Table } from "antd";

const TripListing = () => {
  let listing = [];

  for (let i = 0; i < 5; i++) {
    listing.push({
      key: i,
      submitter: `Edward King ${i}`,
      report: `32`,
      report_name: `London, Park Lane no. ${i}`,
      status: `${i % 2 === 0 ? `approved` : `rejected`}`,
      total: 500 / i + 1,
      to_be_reimubursed: `to_be_reimubursed ${i}`,
    });
  }
  const memoColumns = useMemo(
    () => [
      {
        title: "Submitter",
        dataIndex: "submitter",
      },
      {
        title: "Report#",
        dataIndex: "report",
      },
      {
        title: "Report Name",
        dataIndex: "report_name",
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "Total",
        dataIndex: "total",
      },
      {
        title: "To Be Reimubursed",
        dataIndex: "to_be_reimubursed",
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
