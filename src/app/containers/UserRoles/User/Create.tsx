/** @format */

import { endpoints } from "static";
import { Toast } from "app/shared";
import { axiosCall } from "services";
import { useLoading } from "app/Hooks/useLoading";
import { InviteUserForm } from "./InviteUserForm";
import { createInviteProps, submitCreateUserProps } from "../Types";

const { INVITE_USER } = endpoints;

export const CreateInviteUser = ({
  bool,
  roles,
  toggle,
  refetch,
  access_token,
  organization_id,
}: createInviteProps) => {
  const [loading, , setTrue, setFalse] = useLoading();

  const onSubmit = (values: submitCreateUserProps) => {
    setTrue();
    console.log({ values });
    axiosCall({
      method: "post",
      data: values,
      url: INVITE_USER,
      headers: {
        authorization: access_token,
        organization: organization_id,
      },
    }).then((res) => {
      setFalse();
      if (res) {
        toggle();
        refetch();
        Toast({ message: res.message, type: "success" });
      }
    });
  };

  return (
    <>
      <InviteUserForm
        bool={bool}
        roles={roles}
        toggle={toggle}
        loading={loading}
        onSubmit={onSubmit}
      />
    </>
  );
};
