import { useMemo, Key } from "react";
import { Table } from "antd";
import { Labels } from "static";
import { RenderAction } from "app/shared";
import { CurrencyListingProps } from "./Types";

// const { AiOutlineEdit, RiDeleteBinLine } = Icons;
const { NAME, SYMBOL, CODE, EXCHANGE_RATE, DELETE, _CURRENCY } = Labels;

const CurrencyListing = ({
  loading,
  listing = [],
  handleClick,
  handleConfirm,
}: CurrencyListingProps) => {
  const memoColumns = useMemo(
    () => [
      { title: NAME, dataIndex: "name", key: NAME, width: 600, ellipsis: true },
      { title: SYMBOL, dataIndex: "symbol", key: SYMBOL, ellipsis: true },
      { title: CODE, dataIndex: "currency_code", key: CODE, ellipsis: true },
      {
        title: EXCHANGE_RATE,
        dataIndex: "exchange_rate",
        key: EXCHANGE_RATE,
        ellipsis: true,
      },
      {
        title: "Action",
        dataIndex: "",
        width: 150,
        key: "x",
        align: "center" as const,
        render: (props: any) => {
          const { name } = props;
          return (
            <RenderAction
              data={props}
              title={`${DELETE} "${name}" ${_CURRENCY}`}
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

export default CurrencyListing;
