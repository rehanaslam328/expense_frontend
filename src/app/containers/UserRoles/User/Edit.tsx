/** @format */

import { endpoints } from "static";
import { Toast } from "app/shared";
import { axiosCall } from "services";
import { editInviteFormProps } from "../Types";
import { useLoading } from "app/Hooks/useLoading";
import { InviteUserForm } from "./InviteUserForm";

const { INVITE_USER } = endpoints;

export const EditInviteUserForm = ({
  bool,
  roles,
  toggle,
  current,
  refetch,
  access_token,
  organization_id,
}: editInviteFormProps) => {
  const [loading, , setTrue, setFalse] = useLoading();

  const onSubmit = (values: any) => {
    setTrue();
    axiosCall({
      method: "put",
      data: values,
      url: `${INVITE_USER}/${current.id}`,
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
        current={current}
        loading={loading}
        onSubmit={onSubmit}
      />
    </>
  );
};
