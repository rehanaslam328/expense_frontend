/** @format */

import { useState } from "react";
import { Toast } from "app/shared";
import { endpoints } from "static";
import ListingFlightPreferences from "./Listing";
import CreateFlightPreference from "./Create";
import EditFlightPreferences from "./Edit";
import { useBool, useAxios } from "app/Hooks";
import { useGetListingQuery } from "store/query/FlightPreferences";

const { FLIGHT_PREFERENCE } = endpoints;

const FlightPreferences = () => {
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
      url: `${FLIGHT_PREFERENCE}/${id}`,
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
      <CreateFlightPreference
        setTrue={setTrue}
        loading={boolean}
        refetch={refetch}
        setFalse={setFalse}
      />
      <ListingFlightPreferences
        listing={data}
        loading={boolean}
        handleClick={handleClick}
        handleConfirm={handleConfirm}
      />

      {bool && Object.keys(current).length > 0 && (
        <EditFlightPreferences
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
export default FlightPreferences;
