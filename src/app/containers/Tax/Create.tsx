/** @format */

import { TaxForm } from "./Form";
import { endpoints } from "static";
import { Toast } from "app/shared";
import { axiosCall } from "services";
import { useLoading } from "app/Hooks";
import { CreateTaxProps, taxSubmitProps } from "./Types";

const { TAXES } = endpoints;

export const CreateTax = ({
  access_token,
  organization_id,
  bool,
  toggle,
  current,
  refetch,
}: CreateTaxProps) => {
  const [loading, , setTrue, setFalse] = useLoading();

  const onSubmit = (values: taxSubmitProps) => {
    setTrue();
    axiosCall({
      method: "post",
      data: values,
      url: TAXES,
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
      <TaxForm
        bool={bool}
        toggle={toggle}
        current={current}
        loading={loading}
        refetch={refetch}
        onSubmit={onSubmit}
      />
    </>
  );
};
