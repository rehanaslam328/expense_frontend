/** @format */

import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, PageHeader, Space, Typography } from "antd";
import { EditTax } from "./Edit";
import { axiosCall } from "services";
import { CreateTax } from "./Create";
import { TaxListing } from "./Listing";
import { Icons, Toast } from "app/shared";
import { endpoints, Labels, routeNames } from "static";
import { EditTaxGroup, TaxGroup } from "./Group";
import { useLoading } from "app/Hooks/useLoading";
import { useBool, useGetTokens } from "app/Hooks";
import { useGetTaxListQuery } from "store/query/organization";

const { Title } = Typography;
const { HiReceiptTax, VscAdd, AiFillBackward } = Icons;
const { TAXES, TAX_GROUP } = endpoints;
const { NEW_TAX, GROUP, TAX_RATE, GO_BACk } = Labels;
const { SETTING } = routeNames;

export const TaxRate = () => {
  const [loading] = useLoading();
  const { bool, toggle } = useBool();
  const [current, setCurrent] = useState({});
  const { bool: editform, toggle: toggleEdit } = useBool();
  const { bool: creategroup, toggle: toggleGroup } = useBool();
  const { bool: editgroup, toggle: toggleEditGroup } = useBool();
  const [currSelected, setCurrSelected] = useState<number[]>([]);
  const { access_token, organization_id } = useGetTokens();

  const { data = [{}], refetch } = useGetTaxListQuery("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(SETTING);
  };

  const handleClick = (data: any) => {
    setCurrent(data);
    if (!data.tax_group_details) {
      toggleEdit();
    } else {
      setCurrSelected(data.tax_group_details.map((tx: any) => tx.tax_id));
      toggleEditGroup();
    }
  };

  const handleConfirm = (curr: any) => {
    axiosCall({
      method: "delete",
      url: !curr.tax_group_details ? `${TAXES}/${curr.id}` : `${TAX_GROUP}/${curr.id}`,
      headers: { authorization: access_token, organization: organization_id },
    }).then((res) => {
      if (res) {
        Toast({ message: res.message, type: "success" });
        refetch();
      }
    });
  };

  return (
    <>
      <PageHeader
        title={
          <Space>
            <HiReceiptTax size={25} />
            <Title level={3}>{TAX_RATE}</Title>
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
          <Button key="2" icon={<VscAdd size={14} />} className="pr-color" onClick={toggle}>
            {NEW_TAX}
          </Button>,
          <Button key="3" icon={<VscAdd size={14} />} className="pr-color" onClick={toggleGroup}>
            {`${NEW_TAX} ${GROUP}`}
          </Button>,
        ]}
        style={{ borderBottom: "1px solid gray", paddingBottom: "0" }}
      />
      <TaxListing
        listing={data}
        loading={loading}
        handleClick={handleClick}
        handleConfirm={handleConfirm}
      />
      <CreateTax
        bool={bool}
        toggle={toggle}
        current={current}
        refetch={refetch}
        access_token={access_token}
        organization_id={organization_id}
      />
      <TaxGroup
        listing={data}
        current={current}
        refetch={refetch}
        bool={creategroup}
        toggle={toggleGroup}
        setCurrent={setCurrent}
        currSelected={currSelected}
        access_token={access_token}
        organization_id={organization_id}
        setCurrSelected={setCurrSelected}
      />
      {editform && (
        <EditTax
          bool={editform}
          current={current}
          refetch={refetch}
          toggle={toggleEdit}
          access_token={access_token}
          organization_id={organization_id}
        />
      )}
      {editgroup && (
        <EditTaxGroup
          listing={data}
          bool={editgroup}
          refetch={refetch}
          current={current}
          setCurrent={setCurrent}
          toggle={toggleEditGroup}
          currSelected={currSelected}
          setCurrSelected={setCurrSelected}
        />
      )}
    </>
  );
};
