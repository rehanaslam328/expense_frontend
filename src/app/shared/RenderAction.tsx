/** @format */
import { MouseEventHandler } from "react";
import { Button, Popconfirm, Space, Tooltip } from "antd";
import { Icons } from ".";
import { Labels } from "static";

const { YES, NO } = Labels;
const { AiOutlineEdit, RiDeleteBinLine } = Icons;

type Iprops = {
  data: any;
  title: string;
  organization_id?: number;
  handleClick: (data: any) => void;
  handleConfirm: MouseEventHandler | ((id: number) => void);
};

export const RenderAction = ({
  data,
  title,
  organization_id,
  handleClick,
  handleConfirm,
}: Iprops) => {
  return (
    <>
      <Space>
        <Tooltip title="Edit">
          <Button
            shape="circle"
            icon={<AiOutlineEdit />}
            onClick={() => handleClick(data)}
            disabled={!organization_id}
          />
        </Tooltip>
        <Popconfirm
          key="confirm"
          okText={YES}
          cancelText={NO}
          placement="left"
          title={title}
          onConfirm={() => handleConfirm(data.id)}
          disabled={!organization_id}
        >
          <Button key="deletebtn" shape="circle" disabled={!organization_id}>
            <RiDeleteBinLine size={15} />
          </Button>
        </Popconfirm>
      </Space>
    </>
  );
};
