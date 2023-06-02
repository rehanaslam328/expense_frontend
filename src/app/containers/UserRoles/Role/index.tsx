/** @format */

import { useState } from "react";
import { EditRole } from "./Edit";
import { Toast } from "app/shared";
import { endpoints } from "static";
import RolesListing from "./Listing";
import { axiosCall } from "services";
import { CreateRole } from "./Create";
import { roleDetailProps } from "../Types";
import { useBool, useGetTokens } from "app/Hooks";
import { useGetroleListingQuery } from "store/query/roles";

const { ROLE } = endpoints;

export const RoleDetails = ({ bool, toggle }: roleDetailProps) => {
  const [current, setCurrent] = useState({});
  const [roleAlert, setAlert] = useState(false);
  const { bool: boolean, toggle: toggleEdit } = useBool();
  const { access_token, organization_id } = useGetTokens();
  const { data = [], refetch } = useGetroleListingQuery("");

  const handleClick = (curr: any) => {
    setCurrent({ ...curr, permissions: JSON.parse(curr.permissions) });
    toggleEdit();
  };

  const handleConfirm = (curr: any) => {
    axiosCall({
      method: "delete",
      url: `${ROLE}/${curr.id}`,
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
      <CreateRole
        bool={bool}
        toggle={toggle}
        refetch={refetch}
        setAlert={setAlert}
        roleAlert={roleAlert}
        access_token={access_token}
        organization_id={organization_id}
      />
      <RolesListing list={data} handleClick={handleClick} handleConfirm={handleConfirm} />
      {boolean && (
        <EditRole
          bool={boolean}
          refetch={refetch}
          current={current}
          setAlert={setAlert}
          toggle={toggleEdit}
          roleAlert={roleAlert}
          access_token={access_token}
          organization_id={organization_id}
        />
      )}
    </>
  );
};
