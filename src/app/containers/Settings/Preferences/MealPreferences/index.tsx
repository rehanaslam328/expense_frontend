/** @format */

import { useState } from "react";
import { Toast } from "app/shared";
import { endpoints } from "static";
import ListingMealPreferences from "./Listing";
import CreateMealPreference from "./Create";
import EditMealPreferences from "./Edit";
import { useBool, useAxios } from "app/Hooks";
import { useListMealQuery } from "store/query/MealPreferences";

const { MEAL_PREFERENCE } = endpoints;

const MealPreferences = () => {
  const { bool, toggle } = useBool();
  const [current, setCurrent] = useState({});
  const { bool: boolean, setTrue, setFalse } = useBool();

  const { data = [], refetch, isLoading } = useListMealQuery("");
  const { callAxios } = useAxios();

  const handleClick = (data: any) => {
    setCurrent(data);
    toggle();
  };

  const handleConfirm = (id: number) => {
    setTrue();
    callAxios({
      method: "delete",
      url: `${MEAL_PREFERENCE}/${id}`,
    }).then((res) => {
      if (res) {
        refetch();
        setFalse();
        Toast({ message: res.message});
      }
    });
  };

  return (
    <>
      <CreateMealPreference
        setTrue={setTrue}
        loading={boolean}
        refetch={refetch}
        setFalse={setFalse}
      />
      <ListingMealPreferences
        listing={data}
        loading={boolean || isLoading}
        handleClick={handleClick}
        handleConfirm={handleConfirm}
      />

      {bool && Object.keys(current).length > 0 && (
        <EditMealPreferences
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
export default MealPreferences;
