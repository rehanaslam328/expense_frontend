import { useMemo, Key } from "react";
import { Table } from "antd";
import { Labels } from "static";
import { RenderAction } from "app/shared";
import { ListingProps } from "../Types";

const { NAME, DELETE, TIME_PREFERENCE } = Labels;

const ListingTimePreferences = ({
  loading,
  listing = [],
  handleClick,
  handleConfirm,
}: ListingProps) => {
  const memoColumns = useMemo(
    () => [
      { title: NAME, dataIndex: "name", key: NAME, width: 600, ellipsis: true },
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
              title={`${DELETE} "${name}" ${TIME_PREFERENCE} ?`}
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
        dataSource={listing}
        loading={loading}
        pagination={false}
        rowKey={(record: any) => record.id}
      />
    </>
  );
};

export default ListingTimePreferences;
