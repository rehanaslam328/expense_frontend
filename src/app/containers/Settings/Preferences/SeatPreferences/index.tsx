/** @format */

import { useState } from "react";
import { Toast } from "app/shared";
import { endpoints } from "static";
import ListingSeatPreferences from "./Listing";
import CreateSeatPreference from "./Create";
import EditSeatPreferences from "./Edit";
import { useBool, useAxios } from "app/Hooks";
import { useGetListingQuery } from "store/query/SeatPreferences";

const { SEAT_PREFERENCE } = endpoints;

const SeatPreferences = () => {
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
      url: `${SEAT_PREFERENCE}/${id}`,
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
      <CreateSeatPreference
        setTrue={setTrue}
        loading={boolean}
        refetch={refetch}
        setFalse={setFalse}
      />
      <ListingSeatPreferences
        listing={data}
        loading={boolean}
        handleClick={handleClick}
        handleConfirm={handleConfirm}
      />

      {bool && Object.keys(current).length > 0 && (
        <EditSeatPreferences
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
export default SeatPreferences;
