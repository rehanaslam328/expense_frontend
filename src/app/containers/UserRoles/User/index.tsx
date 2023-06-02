/** @format */

import { useState } from "react";
import { endpoints } from "static";
import { Toast } from "app/shared";
import UsersListing from "./Listing";
import { axiosCall } from "services";
import { CreateInviteUser } from "./Create";
import { EditInviteUserForm } from "./Edit";
import { inviteUserDetailProps } from "../Types";
import { useBool, useGetTokens } from "app/Hooks";
import { useGetroleListingQuery } from "store/query/roles";
import { useGetInviteeListingQuery } from "store/query/invite";

const { INVITE_USER } = endpoints;

export const UserDetails = ({ bool, toggle }: inviteUserDetailProps) => {
  const [current, setCurrent] = useState({});
  const { access_token, organization_id } = useGetTokens();
  const { bool: editInvite, toggle: toggleInvite } = useBool();
  const { data: roles = [] } = useGetroleListingQuery("");
  const { data = [], refetch } = useGetInviteeListingQuery("");
  const roles_list = roles.map(({ id, name }: { id: number; name: string }) => ({
    id,
    label: name,
  }));

  const handleClick = (data: any) => {
    setCurrent(data);
    toggleInvite();
  };

  const handleConfirm = (curr: any) => {
    axiosCall({
      method: "delete",
      url: `${INVITE_USER}/${curr.id}`,
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
      <CreateInviteUser
        bool={bool}
        toggle={toggle}
        refetch={refetch}
        roles={roles_list}
        access_token={access_token}
        organization_id={organization_id}
      />
      <UsersListing list={data} handleConfirm={handleConfirm} handleClick={handleClick} />
      {editInvite && (
        <EditInviteUserForm
          bool={editInvite}
          current={current}
          refetch={refetch}
          roles={roles_list}
          toggle={toggleInvite}
          access_token={access_token}
          organization_id={organization_id}
        />
      )}
    </>
  );
};
