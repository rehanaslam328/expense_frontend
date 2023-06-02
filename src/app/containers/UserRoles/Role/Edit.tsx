/** @format */

import { endpoints } from "static";
import { Toast } from "app/shared";
import { axiosCall } from "services";
import { RoleForm } from "./RoleForm";
import { useLoading } from "app/Hooks";
import { allPermissions } from "./roles";
import { roleEditProps } from "../Types";

const { ROLE } = endpoints;

export const EditRole = ({
  bool,
  toggle,
  refetch,
  current,
  setAlert,
  roleAlert,
  access_token,
  organization_id,
}: roleEditProps) => {
  const [loading, , setTrue, setFalse] = useLoading();

  const onSubmit = (values: { name: string }) => {
    const permissions = allPermissions.filter((vl: any) => vl[vl.id] === true);
    const list = allPermissions.reduce(
      (obj, item) => Object.assign(obj, { [item.id]: item[item.id] }),
      {}
    );
    if (!permissions.length) {
      setAlert(Boolean(!permissions.length));
      return;
    } else {
      setTrue();
      axiosCall({
        method: "put",
        data: { ...values, permissions: list, salesPerson: false },
        url: `${ROLE}/${current.id}`,
        headers: { authorization: access_token, organization: organization_id },
      }).then((res) => {
        setFalse();
        if (res) {
          toggle();
          refetch();
          Toast({ message: res.message, type: "success" });
        }
      });
    }
  };
  return (
    <>
      <RoleForm
        bool={bool}
        toggle={toggle}
        loading={loading}
        current={current}
        onSubmit={onSubmit}
        setAlert={setAlert}
        roleAlert={roleAlert}
      />
    </>
  );
};
