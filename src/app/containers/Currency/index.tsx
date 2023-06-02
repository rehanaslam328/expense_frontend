/** @format */

import { useState } from "react";
import { Toast } from "app/shared";
import { endpoints } from "static";
import { EditCurrency } from "./Edit";
import CurrencyListing from "./Listing";
import { CreateCurrency } from "./Create";
import { useBool, useListing, useAxios } from "app/Hooks";
import { useGetCurrencyListQuery } from "store/query/organization";

const { CURRENCY } = endpoints;

const Currency = () => {
  const { bool, toggle } = useBool();
  const { currncy_list } = useListing();
  const [current, setCurrent] = useState({});
  const { bool: boolean, setTrue, setFalse } = useBool();

  const { data = [], refetch } = useGetCurrencyListQuery("");
  const { callAxios } = useAxios();

  const handleClick = (data: any) => {
    setCurrent(data);
    toggle();
  };

  const handleConfirm = (id: number) => {
    setTrue();
    callAxios({
      method: "delete",
      url: `${CURRENCY}/${id}`,
    }).then((res) => {
      if (res) {
        refetch();
        setFalse();
        Toast({ message: res.message, type: "success" });
      }
    });
  };

  return (
    <>
      <CreateCurrency
        setTrue={setTrue}
        loading={boolean}
        refetch={refetch}
        setFalse={setFalse}
        currncy_list={currncy_list}
      />
      <CurrencyListing
        listing={data}
        loading={boolean}
        handleClick={handleClick}
        handleConfirm={handleConfirm}
      />
      {bool && Object.keys(current).length > 0 && (
        <EditCurrency
          bool={bool}
          toggle={toggle}
          setTrue={setTrue}
          current={current}
          refetch={refetch}
          loading={boolean}
          setFalse={setFalse}
          currncy_list={currncy_list}
        />
      )}
    </>
  );
};
export default Currency;
