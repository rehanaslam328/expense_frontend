/** @format */

import { TaxForm } from "./Form";
import { Toast } from "app/shared";
import { endpoints } from "static";
import { axiosCall } from "services";
import { useLoading } from "app/Hooks";
import { EditTaxProps, taxSubmitProps } from "./Types";

const { TAXES } = endpoints;

export const EditTax = ({
  bool,
  toggle,
  current,
  refetch,
  access_token,
  organization_id,
}: EditTaxProps) => {
  const [loading, , setTrue, setFalse] = useLoading();

  const onSubmit = (values: taxSubmitProps) => {
    setTrue();
    axiosCall({
      method: "put",
      data: values,
      url: `${TAXES}/${current.id}`,
      headers: { authorization: access_token, organization: organization_id },
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
      <TaxForm
        bool={bool}
        toggle={toggle}
        loading={loading}
        current={current}
        refetch={refetch}
        onSubmit={onSubmit}
      />
    </>
  );
};
