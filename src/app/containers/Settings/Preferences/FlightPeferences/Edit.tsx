/** @format */

import { endpoints } from "static";
import { Toast } from "app/shared";
import { useAxios } from "app/Hooks";
import { FlightForm } from "./Form";
import { SubmitProps, EditProps } from "../Types";

const { FLIGHT_PREFERENCE } = endpoints;

const EditFlightPreferences = ({
  refetch,
  current,
  bool,
  toggle,
  setTrue,
  setFalse,
  loading,
}: EditProps) => {
  const { callAxios } = useAxios();

  const onSubmit = (values: SubmitProps) => {
    setTrue();
    callAxios({
      method: "put",
      data: values,
      url: `${FLIGHT_PREFERENCE}/${current.id}`,
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
      <FlightForm
        bool={bool}
        toggle={toggle}
        loading={loading}
        current={current}
        onSubmit={onSubmit}
      />
    </>
  );
};
export default EditFlightPreferences;
