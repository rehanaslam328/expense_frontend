/** @format */

import { useMemo } from "react";
import { Button, Popconfirm, Space, Table, /*Tooltip,*/ Tag } from "antd";
import { Icons } from "app/shared";
import { inviteUserListingProps } from "../Types";

const { /*AiOutlineEdit,*/ RiDeleteBinLine } = Icons;

const UsersListing = ({
  list,
  // handleClick,
  handleConfirm,
}: inviteUserListingProps) => {
  const memoColumns = useMemo(
    () => [
      {
        title: "NAME",
        dataIndex: "name",
        key: "user_name",
        width: 600,
        ellipsis: true,
      },
      {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
        ellipsis: true,
      },
      {
        title: "ROLE",
        dataIndex: "role",
        key: "role",
        render: (role: any) => (
          <Tag color={role.name === "admin" ? "green" : "geekblue"} key={role.name}>
            {role.name.toUpperCase()}
          </Tag>
        ),
        ellipsis: true,
      },
      {
        title: "INVITE",
        dataIndex: "has_joined",
        key: "role",
        render: (tag: any) => (
          <Tag color={tag ? "green" : "geekblue"} key={tag}>
            {tag ? "Accept" : "Pending"}
          </Tag>
        ),
        ellipsis: true,
      },
      {
        title: "Action",
        dataIndex: "",
        width: 200,
        key: "x",
        align: "center" as const,
        render: (props: any) => (
          <Space>
            {/* <Tooltip title="Edit">
            <Button
              shape="circle"
              icon={<AiOutlineEdit />}
              onClick={() => handleClick(props)}
            />
          </Tooltip> */}
            <Popconfirm
              key="confirm"
              placement="left"
              title={`Sure to Cancel Invitaion to "${props.name}"?`}
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
    [handleConfirm]
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
export default UsersListing;
