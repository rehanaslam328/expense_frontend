/** @format */

import { useNavigate } from "react-router-dom";
import { Avatar, Typography, List, Tag, Button, Badge, Card, Space, PageHeader } from "antd";
import { useTypedDispatch } from "store";
import { Icons, Toast } from "app/shared";
import { endpoints, Labels, routeNames } from "static";
import { setOrganization } from "store/slices/authSlice";
import { set_organization } from "store/slices/OrganizationSlice";
import { useGetOrganizationsQuery } from "store/query/organization";

const { Meta } = List.Item;
const { Title } = Typography;
const { ORGANIZATION_CREATE, SETTING } = routeNames;
const { CgOrganisation, VscAdd, AiFillBackward } = Icons;
const { SET_ORGANIZATION } = endpoints;
const { SET_AS_DEFAULT, OWNER, INVITEE, GO_BACk } = Labels;

const ListItems = ({
  item,
  handleClick,
  handleEditClick,
}: {
  item: any;
  handleClick: (org: number) => void;
  handleEditClick: (org: number) => void;
}) => (
  <List.Item
    key={item.id}
    actions={[
      <Tag
        key="icon"
        color={item.organizations.is_owner ? "success" : "warning"}
        icon={<CgOrganisation />}
        style={{ borderRadius: "10px" }}
      >
        {item.organizations.is_owner ? OWNER : INVITEE}
      </Tag>,
    ]}
    extra={
      <Space>
        <Button shape="round" onClick={() => handleClick(item.organization_id)}>
          {SET_AS_DEFAULT}
        </Button>
        <Button shape="round" onClick={() => handleEditClick(item.organization_id)}>
          Edit
        </Button>
      </Space>
    }
  >
    <Meta
      // logo will be here in
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" icon={item.organizations.logo} />}
      title={<Typography>{item?.organizations?.name}</Typography>}
      description={item?.organizations?.organization_plan?.name}
    />
  </List.Item>
);

const OrganizationListing = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { data: { organizations = [] } = {}, isLoading, refetch } = useGetOrganizationsQuery("");

  const handleClick = (org_id: number) => {
    dispatch(set_organization({ url: `${SET_ORGANIZATION}/${org_id}`, method: "post" }))
      .unwrap()
      .then((res) => {
        if (res) {
          refetch();
          dispatch(setOrganization(org_id));
          Toast({ message: res.message, type: "success" });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      });
  };
  const handleNavigate = () => {
    navigate(SETTING);
  };

  const handleEditClick = (org_id: number) => {
    navigate(`/organization-profile?org=${org_id}`);
  };

  return (
    <>
      <PageHeader
        title={
          <Space>
            <Title level={4}>Organizations</Title>
          </Space>
        }
        extra={[
          <Button
            key="1"
            icon={<AiFillBackward size={14} />}
            className="pr-color"
            onClick={handleNavigate}
          >
            {GO_BACk}
          </Button>,
          <Button
            key="2"
            icon={<VscAdd size={14} />}
            className="pr-color"
            onClick={() => navigate(`${ORGANIZATION_CREATE}?org=create`)}
          >
            New Organization
          </Button>,
        ]}
      />
      <List
        itemLayout="horizontal"
        loading={isLoading}
        bordered
        style={{ margin: "20px" }}
        dataSource={organizations}
        renderItem={(item: any) =>
          item.organizations.is_default ? (
            <Badge.Ribbon placement="start" text="default" color="green" className="ribbon_tr">
              <Card size="small">
                <ListItems
                  item={item}
                  handleClick={handleClick}
                  handleEditClick={handleEditClick}
                />
              </Card>
            </Badge.Ribbon>
          ) : (
            <ListItems item={item} handleClick={handleClick} handleEditClick={handleEditClick} />
          )
        }
      />
    </>
  );
};

export default OrganizationListing;
