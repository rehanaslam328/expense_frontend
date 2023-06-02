import { useMemo } from "react";
import { Table } from "antd";
import { Labels } from "static";
import { RenderAction } from "app/shared";
import { TaxListingProps } from "./Types";

const { NAME, RATE, DELETE, TAX } = Labels;

export const TaxListing = ({
  loading,
  handleClick,
  listing = [],
  handleConfirm,
}: TaxListingProps) => {
  const memoColumns = useMemo(
    () => [
      {
        key: NAME,
        title: NAME,
        width: 600,
        sorter: true,
        ellipsis: true,
        dataIndex: "name",
      },
      {
        title: RATE,
        key: RATE,
        ellipsis: true,
        dataIndex: "",
        render: (props: any) => (
          <>
            {props && props.rate
              ? props.rate
              : props?.tax_group_details?.reduce(
                  (prev: any, curr: any) => prev + curr.tax_details?.rate,
                  0
                )}
          </>
        ),
      },
      {
        key: "x",
        width: 200,
        dataIndex: "",
        title: "Action",
        align: "center" as const,
        render: (props: any) => {
          const { name, organization_id } = props;
          return (
            <RenderAction
              data={props}
              title={`${DELETE} "${name}" ${TAX} ?`}
              organization_id={organization_id}
              handleClick={handleClick}
              handleConfirm={handleConfirm}
            />
          );
        },
      },
    ],
    [handleClick, handleConfirm]
  );

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  // @ts-ignore
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", sorter, extra);
  };

  return (
    <>
      <Table
        bordered
        loading={loading}
        onChange={onChange}
        dataSource={listing}
        columns={memoColumns}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        pagination={{
          // pageSize: 1,
          // defaultPageSize: 1,
          showLessItems: true,
          showSizeChanger: true,
          showQuickJumper: true,
          hideOnSinglePage: true,
          pageSizeOptions: ["10", "20", "30", "50"],
        }}
        rowKey={(record: any) => record.id}
      />
    </>
  );
};
