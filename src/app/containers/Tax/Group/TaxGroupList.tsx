import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "Name",
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "Rate",
  },
];

export const TaxGroupList = ({
  data,
  setSelected,
  currSelected,
  setCurrSelected,
}: {
  currSelected: number[];
  data: object[];
  setSelected: any;
  setCurrSelected: any;
}) => {
  const onSelectChange = (selectedRowKeys: any) => {
    setSelected(selectedRowKeys);
    setCurrSelected(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys: currSelected,
    onChange: onSelectChange,
    onSelect: (dt: any, current: boolean, selectedRows: object[]) => {
      console.log({ dt, current, selectedRows });
    },
  };
  return (
    <>
      <Table
        pagination={false}
        showHeader={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        rowKey={(record: any) => record.id}
      />
    </>
  );
};
