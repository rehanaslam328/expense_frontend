/** @format */

import { useState } from "react";
import { Toast } from "app/shared";
import { endpoints } from "static";
import ListingCarPreferences from "./Listing";
import CreateCarPreference from "./Create";
import EditCarPreferences from "./Edit";
import { useBool, useAxios } from "app/Hooks";
import { useGetListingQuery } from "store/query/CarTypePreferences";

const { CAR_TYPE_PREFERENCE } = endpoints;

const CarTypePreferences = () => {
  const { bool, toggle } = useBool();
  const [current, setCurrent] = useState({});
  const { bool: boolean, setTrue, setFalse } = useBool();

  const { data = [], refetch } = useGetListingQuery("");
  const { callAxios } = useAxios();

  const handleClick = (data: any) => {
    setCurrent(data);
    toggle();
  };

  const handleConfirm = (id: number) => {
    setTrue();
    callAxios({
      method: "delete",
      url: `${CAR_TYPE_PREFERENCE}/${id}`,
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
      <CreateCarPreference
        setTrue={setTrue}
        loading={boolean}
        refetch={refetch}
        setFalse={setFalse}
      />
      <ListingCarPreferences
        listing={data}
        loading={boolean}
        handleClick={handleClick}
        handleConfirm={handleConfirm}
      />

      {bool && Object.keys(current).length > 0 && (
        <EditCarPreferences
          bool={bool}
          toggle={toggle}
          setTrue={setTrue}
          current={current}
          refetch={refetch}
          loading={boolean}
          setFalse={setFalse}
        />
      )}
    </>
  );
};
export default CarTypePreferences;
