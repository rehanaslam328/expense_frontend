/** @format */

import { useMemo } from "react";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import { Icons } from "app/shared";
import { roleListingProps } from "../Types";

const { AiOutlineEdit, RiDeleteBinLine } = Icons;

const RolesListing = ({ list, handleClick, handleConfirm }: roleListingProps) => {
  const memoColumns = useMemo(
    () => [
      {
        title: "ROLE NAME",
        dataIndex: "name",
        key: "role_name",
        width: 600,
        ellipsis: true,
      },
      {
        title: "Action",
        dataIndex: "",
        width: 100,
        key: "x",
        align: "center" as const,
        render: (props: any) => (
          <Space style={{ width: "100%", justifyContent: "center" }}>
            <Tooltip title="Edit">
              <Button shape="circle" icon={<AiOutlineEdit />} onClick={() => handleClick(props)} />
            </Tooltip>
            <Popconfirm
              key="confirm"
              placement="left"
              title={`Sure to delete "${props.name}" ?`}
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleConfirm(props)}
            >
              <Button key="deletebtn" shape="circle">
                <RiDeleteBinLine size={15} />
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [handleClick, handleConfirm]
  );

  return (
    <>
      <Table
        loading={false}
        bordered={false}
        dataSource={list}
        pagination={false}
        columns={memoColumns}
        rowKey={(record: any) => record.id}
      />
    </>
  );
};

export default RolesListing;
