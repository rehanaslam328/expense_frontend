/** @format */

import { Avatar, Typography, List, Tag } from "antd";
import { Labels } from "static";
import { Icons } from "app/shared";
import { MenuListProps } from "./Types";

const { Meta } = List.Item;
const { OWNER, INVITEE } = Labels;
const { BsCheckCircleFill, CgOrganisation } = Icons;

export const Listx = ({ isLoading, organizations }: MenuListProps) => {
  return (
    <List
      itemLayout="horizontal"
      loading={isLoading}
      dataSource={organizations}
      renderItem={(item: any) => (
        <List.Item
          key={item.id}
          // @ts-ignore
          actions={[
            <Tag
              color={item.organizations.is_owner ? "success" : "warning"}
              icon={<CgOrganisation />}
              key="icon"
              style={{ borderRadius: "10px" }}
            >
              {item.organizations.is_owner ? OWNER : INVITEE}
            </Tag>,
          ]}
          extra={
            <BsCheckCircleFill
              size="15"
              color={item.organizations.is_default ? "green" : "orange"}
            />
          }
        >
          <Meta
            // logo will be here in
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" icon={item.organizations.logo} />
            }
            title={<Typography>{item?.organizations?.name}</Typography>}
            description={item?.organizations?.organization_plan?.name}
          />
        </List.Item>
      )}
    />
  );
};
