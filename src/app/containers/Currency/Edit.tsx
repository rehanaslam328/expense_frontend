/** @format */

import { endpoints } from "static";
import { Toast } from "app/shared";
import { useAxios } from "app/Hooks";
import { CurrencyForm } from "./Form";
import { currencySubmitProps, EditCurrencyProps } from "./Types";

const { CURRENCY } = endpoints;

export const EditCurrency = ({
  currncy_list,
  refetch,
  current,
  bool,
  toggle,
  setTrue,
  setFalse,
  loading,
}: EditCurrencyProps) => {
  const { callAxios } = useAxios();

  const onSubmit = (values: currencySubmitProps) => {
    setTrue();
    callAxios({
      method: "put",
      data: values,
      url: `${CURRENCY}/${current.id}`,
    }).then((res) => {
      if (res) {
        setFalse();
        toggle();
        refetch();
        Toast({ message: res.message, type: "success" });
      }
    });
  };

  return (
    <>
      <CurrencyForm
        bool={bool}
        toggle={toggle}
        loading={loading}
        current={current}
        onSubmit={onSubmit}
        currncy_list={currncy_list}
      />
    </>
  );
};
